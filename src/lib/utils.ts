import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Program, Child, FundingAccount } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string, lang: 'en' | 'es' = 'en'): string {
  const date = new Date(dateString + 'T00:00:00');
  const locale = lang === 'es' ? 'es-US' : 'en-US';
  return date.toLocaleDateString(locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatTime(timeString: string): string {
  return timeString;
}

export function isChildEligible(child: Child, program: Program): boolean {
  return child.age >= program.ageRange.min && child.age <= program.ageRange.max;
}

export function getEligibleFunding(
  program: Program,
  fundingAccounts: FundingAccount[]
): FundingAccount[] {
  return fundingAccounts.filter(
    (account) =>
      program.acceptedFunding.includes(account.id) &&
      account.eligibleCategories.includes(program.category) &&
      account.balance > 0
  );
}

export function calculateFundingWaterfall(
  programCost: number,
  eligibleFunding: FundingAccount[]
): { fundingId: string; amount: number; remaining: number }[] {
  let remainingCost = programCost;
  const result: { fundingId: string; amount: number; remaining: number }[] = [];

  for (const account of eligibleFunding) {
    if (remainingCost <= 0) break;

    const amount = Math.min(account.balance, remainingCost);
    remainingCost -= amount;

    result.push({
      fundingId: account.id,
      amount,
      remaining: account.balance - amount,
    });
  }

  return result;
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    sports: 'bg-denver-teal/15 text-denver-teal',
    stem: 'bg-denver-navy-mid/15 text-denver-navy-mid',
    arts: 'bg-denver-amber/15 text-denver-amber',
    outdoor: 'bg-denver-teal/15 text-denver-teal',
    academic: 'bg-denver-amber/15 text-denver-amber',
    music: 'bg-denver-navy/15 text-denver-navy',
    dance: 'bg-denver-red/10 text-denver-red',
    'life-skills': 'bg-denver-amber/15 text-denver-amber',
  };
  return colors[category] || 'bg-denver-gray-soft text-denver-navy';
}

export function getCategoryAccentColor(category: string): string {
  const colors: Record<string, string> = {
    sports: '#1A7A6E',
    stem: '#162B4D',
    arts: '#F5A623',
    outdoor: '#1A7A6E',
    academic: '#F5A623',
    music: '#0D1B35',
    dance: '#F04E37',
    'life-skills': '#F5A623',
  };
  return colors[category] || '#0D1B35';
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    sports: '⚽',
    stem: '💻',
    arts: '🎨',
    outdoor: '🌲',
    academic: '📚',
    music: '🎵',
    dance: '💃',
    'life-skills': '🌟',
  };
  return icons[category] || '📌';
}

export function getAvailabilityStatus(spotsAvailable: number): {
  label: string;
  labelEs: string;
  color: string;
} {
  if (spotsAvailable === 0) {
    return { label: 'Full', labelEs: 'Lleno', color: 'text-denver-red' };
  }
  if (spotsAvailable <= 3) {
    return {
      label: 'Almost Full',
      labelEs: 'Casi Lleno',
      color: 'text-denver-amber',
    };
  }
  return {
    label: 'Available',
    labelEs: 'Disponible',
    color: 'text-denver-teal',
  };
}

export function generateCalendarUrl(
  title: string,
  startDate: string,
  startTime: string,
  endTime: string,
  location: string
): string {
  const formatDateTime = (date: string, time: string): string => {
    const [year, month, day] = date.split('-');
    const [hours, minutes] = time
      .replace(/[AP]M/i, '')
      .trim()
      .split(':');
    let h = parseInt(hours);
    if (time.toUpperCase().includes('PM') && h !== 12) h += 12;
    if (time.toUpperCase().includes('AM') && h === 12) h = 0;
    return `${year}${month}${day}T${String(h).padStart(2, '0')}${minutes || '00'}00`;
  };

  const start = formatDateTime(startDate, startTime);
  const end = formatDateTime(startDate, endTime);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${start}/${end}`,
    location: location,
    sf: 'true',
  });

  return `https://www.google.com/calendar/render?${params.toString()}`;
}
