import type { Program, Child, Family, FundingAccount } from './types';
import { calculateFundingWaterfall, getEligibleFunding, isChildEligible } from './utils';

export interface AiRecommendation {
  program: Program;
  child: Child;
  matchScore: number;
  matchReasons: string[];
  fundingBreakdown: { name: string; amount: number }[];
  outOfPocket: number;
}

export function getAiRecommendations(
  query: string,
  family: Family,
  programs: Program[],
  fundingAccounts: FundingAccount[]
): AiRecommendation[] {
  const q = query.toLowerCase();

  // Keyword -> category mapping
  const categoryMap: Record<string, string[]> = {
    sports: ['sports', 'soccer', 'basketball', 'futbol', 'deportes', 'athletic'],
    stem: ['stem', 'science', 'coding', 'code', 'robot', 'tech', 'ciencia', 'tecnologia', 'computer'],
    arts: ['art', 'draw', 'paint', 'creative', 'arte', 'dibujo', 'pintura'],
    outdoor: ['outdoor', 'nature', 'garden', 'naturaleza', 'jardin'],
    music: ['music', 'sing', 'instrument', 'musica', 'cantar'],
    dance: ['dance', 'baile', 'danza', 'movement'],
    academic: ['academic', 'study', 'learn', 'academico'],
  };

  // Detect categories from query
  const matchedCategories: string[] = [];
  for (const [cat, keywords] of Object.entries(categoryMap)) {
    if (keywords.some((kw) => q.includes(kw))) {
      matchedCategories.push(cat);
    }
  }

  // Detect cost preferences
  const wantsFree = ['free', 'gratis', 'affordable', 'cheap', 'barato', 'no cost'].some((kw) =>
    q.includes(kw)
  );

  // Detect schedule preferences
  const wantsWeekend = [
    'weekend',
    'saturday',
    'sunday',
    'fin de semana',
    'sabado',
    'domingo',
  ].some((kw) => q.includes(kw));
  const wantsAfterSchool = [
    'after school',
    'afterschool',
    'afternoon',
    'despues de escuela',
    'tarde',
  ].some((kw) => q.includes(kw));

  // Detect age from query (e.g., "8 year old", "my 12 year old")
  const ageMatch = q.match(/(\d+)\s*(?:year|ano|yr)/);
  const targetAge = ageMatch ? parseInt(ageMatch[1]) : null;

  const recommendations: AiRecommendation[] = [];

  for (const program of programs) {
    for (const child of family.children) {
      if (!isChildEligible(child, program)) continue;
      if (targetAge && child.age !== targetAge) continue;

      let score = 0;
      const reasons: string[] = [];

      // Category match
      if (matchedCategories.length === 0 || matchedCategories.includes(program.category)) {
        score += matchedCategories.length > 0 ? 30 : 5;
        if (matchedCategories.includes(program.category)) {
          reasons.push(`Matches "${program.category}" interest`);
        }
      } else {
        continue; // Skip non-matching categories when categories are specified
      }

      // Tag matches
      for (const tag of program.tags) {
        if (q.includes(tag.toLowerCase())) {
          score += 10;
          reasons.push(`Matches "${tag}"`);
        }
      }

      // Age match
      reasons.push(`${child.name} (age ${child.age}) is eligible`);
      score += 10;

      // Schedule preferences
      if (wantsWeekend && program.schedule.days.some((d) => d === 'Saturday' || d === 'Sunday')) {
        score += 15;
        reasons.push('Weekend schedule');
      }
      if (
        wantsAfterSchool &&
        program.schedule.days.some((d) => !['Saturday', 'Sunday'].includes(d))
      ) {
        score += 10;
        reasons.push('After-school schedule');
      }

      // Calculate funding
      const eligible = getEligibleFunding(program, fundingAccounts);
      const waterfall = calculateFundingWaterfall(program.cost, eligible);
      const totalFunded = waterfall.reduce((sum, w) => sum + w.amount, 0);
      const outOfPocket = Math.max(0, program.cost - totalFunded);

      if (wantsFree && outOfPocket === 0) {
        score += 20;
        reasons.push('Fully covered by funding');
      } else if (wantsFree && outOfPocket > 0) {
        score -= 10;
      }

      if (outOfPocket === 0) {
        reasons.push('No out-of-pocket cost');
      }

      // Availability bonus
      if (program.spotsAvailable > 0) {
        score += 5;
      } else {
        score -= 20;
      }

      const fundingBreakdown = waterfall.map((w) => {
        const account = fundingAccounts.find((a) => a.id === w.fundingId);
        return { name: account?.name || w.fundingId, amount: w.amount };
      });

      recommendations.push({
        program,
        child,
        matchScore: score,
        matchReasons: reasons,
        fundingBreakdown,
        outOfPocket,
      });
    }
  }

  // Sort by score descending, return top 4
  return recommendations.sort((a, b) => b.matchScore - a.matchScore).slice(0, 4);
}
