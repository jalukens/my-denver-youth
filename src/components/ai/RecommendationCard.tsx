import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getCategoryIcon, formatCurrency } from '@/lib/utils';
import type { AiRecommendation } from '@/lib/aiMock';

const dayAbbreviations: Record<string, string> = {
  Monday: 'M',
  Tuesday: 'T',
  Wednesday: 'W',
  Thursday: 'Th',
  Friday: 'F',
  Saturday: 'Sa',
  Sunday: 'Su',
};

interface RecommendationCardProps {
  recommendation: AiRecommendation;
  lang: 'en' | 'es';
  t: (key: string) => string;
}

export function RecommendationCard({
  recommendation,
  lang,
  t,
}: RecommendationCardProps) {
  const program = recommendation.program;
  const categoryIcon = getCategoryIcon(program.category);
  const totalFunding = recommendation.fundingBreakdown.reduce(
    (sum: number, f: { name: string; amount: number }) => sum + f.amount,
    0
  );
  const familyCost = Math.max(0, program.cost - totalFunding);
  const isFree = familyCost === 0;

  return (
    <Card className="p-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <span className="text-2xl">{categoryIcon}</span>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-denver-navy">
            {lang === 'es' ? program.nameEs : program.name}
          </div>
          <div className="text-xs text-denver-gray-mid">
            {lang === 'es' && program.providerEs
              ? program.providerEs
              : program.provider}
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div className="text-xs text-denver-gray-mid mt-2">
        {program.schedule.days.map((d) => dayAbbreviations[d] || d).join(', ')}{' '}
        &middot; {program.schedule.startTime} - {program.schedule.endTime}
      </div>

      {/* Funding breakdown */}
      {recommendation.fundingBreakdown.length > 0 && (
        <div className="mt-3 space-y-1">
          {recommendation.fundingBreakdown.map((f: { name: string; amount: number }, i: number) => (
            <div
              key={i}
              className="flex items-center justify-between text-xs"
            >
              <span className="text-denver-gray-mid">{f.name}</span>
              <span className="text-denver-teal font-medium">
                -{formatCurrency(f.amount)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Family cost */}
      <div className="mt-3 pt-2 border-t border-denver-gray-soft">
        <div className="flex items-center justify-between">
          <span className="text-sm text-denver-gray-mid">{t('ai.yourCost')}</span>
          <span
            className={`text-base font-bold ${
              isFree ? 'text-denver-teal' : 'text-denver-navy'
            }`}
          >
            {isFree ? 'FREE' : formatCurrency(familyCost)}
          </span>
        </div>
      </div>

      {/* Match reasons */}
      {recommendation.matchReasons.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {recommendation.matchReasons.map((reason, i) => (
            <span
              key={i}
              className="inline-flex items-center rounded-full bg-denver-gray-soft px-2 py-0.5 text-[10px] text-denver-gray-mid"
            >
              {reason}
            </span>
          ))}
        </div>
      )}

      {/* View Program link */}
      <div className="mt-3">
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link to={`/program/${program.id}`}>{t('ai.viewProgram')}</Link>
        </Button>
      </div>
    </Card>
  );
}
