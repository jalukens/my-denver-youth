import { useState, useEffect, useCallback } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import type { FundingAccount } from '@/lib/types';
import { cn } from '@/lib/utils';

interface FundingBreakdownProps {
  programCost: number;
  eligibleFunding: FundingAccount[];
  onComplete: () => void;
  lang: 'en' | 'es';
  t: (key: string) => string;
}

type StepState = 'inactive' | 'active' | 'complete';

interface FundingStep {
  account: FundingAccount;
  amount: number;
  state: StepState;
}

export function FundingBreakdown({
  programCost,
  eligibleFunding,
  onComplete,
  lang,
  t,
}: FundingBreakdownProps) {
  const [steps, setSteps] = useState<FundingStep[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [familyCost, setFamilyCost] = useState(programCost);

  // Build funding steps
  useEffect(() => {
    let remaining = programCost;
    const fundingSteps: FundingStep[] = [];

    for (const account of eligibleFunding) {
      if (remaining <= 0) break;
      const amount = Math.min(account.balance, remaining);
      remaining -= amount;
      fundingSteps.push({ account, amount, state: 'inactive' });
    }

    setSteps(fundingSteps);
    setFamilyCost(remaining);
    setCurrentStep(0);
  }, [programCost, eligibleFunding]);

  // Animate steps
  useEffect(() => {
    if (currentStep < 0 || currentStep >= steps.length) {
      if (currentStep >= steps.length && steps.length > 0) {
        onComplete();
      }
      return;
    }

    // Mark current step as active
    setSteps((prev) =>
      prev.map((s, i) => (i === currentStep ? { ...s, state: 'active' } : s))
    );

    // After 800ms, mark as complete and move to next
    const timer = setTimeout(() => {
      setSteps((prev) =>
        prev.map((s, i) =>
          i === currentStep ? { ...s, state: 'complete' } : s
        )
      );
      setCurrentStep((prev) => prev + 1);
    }, 800);

    return () => clearTimeout(timer);
  }, [currentStep, steps.length, onComplete]);

  return (
    <div className="space-y-4">
      {/* Program cost header */}
      <div className="flex items-center justify-between p-3 bg-denver-gray-soft/50 rounded-lg">
        <span className="text-sm font-medium text-denver-navy">
          {t('funding.programCost')}
        </span>
        <span className="text-base font-bold text-denver-navy">
          {formatCurrency(programCost)}
        </span>
      </div>

      {/* Funding steps */}
      <div className="space-y-2">
        {steps.map((step, i) => {
          const name =
            lang === 'es' ? step.account.nameEs : step.account.name;

          return (
            <div
              key={step.account.id}
              className={cn(
                'flex items-center gap-3 p-3 rounded-lg border transition-all duration-300',
                step.state === 'inactive' &&
                  'border-denver-gray-soft bg-white opacity-50',
                step.state === 'active' &&
                  'border-denver-teal bg-denver-teal/5 animate-pulse',
                step.state === 'complete' &&
                  'border-denver-teal/30 bg-denver-teal-light'
              )}
            >
              {/* Status icon */}
              <div
                className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center shrink-0',
                  step.state === 'inactive' && 'bg-denver-gray-soft',
                  step.state === 'active' && 'bg-denver-teal/20',
                  step.state === 'complete' && 'bg-denver-teal/15'
                )}
              >
                {step.state === 'active' && (
                  <Loader2 className="w-3.5 h-3.5 text-denver-teal animate-spin" />
                )}
                {step.state === 'complete' && (
                  <Check className="w-3.5 h-3.5 text-denver-teal" />
                )}
              </div>

              {/* Account name */}
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-denver-navy truncate block">
                  {name}
                </span>
              </div>

              {/* Amount */}
              <span
                className={cn(
                  'text-sm font-semibold',
                  step.state === 'complete'
                    ? 'text-denver-teal'
                    : 'text-denver-gray-mid'
                )}
              >
                -{formatCurrency(step.amount)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Final cost */}
      <div
        className={cn(
          'flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-500',
          currentStep >= steps.length
            ? familyCost === 0
              ? 'border-denver-teal/40 bg-denver-teal-light'
              : 'border-denver-navy bg-denver-navy/5'
            : 'border-denver-gray-soft bg-denver-gray-soft/50'
        )}
      >
        <span className="text-sm font-medium text-denver-navy">
          {t('funding.yourCost')}
        </span>
        <span
          className={cn(
            'text-lg font-bold',
            familyCost === 0 ? 'text-denver-teal' : 'text-denver-navy'
          )}
        >
          {familyCost === 0 ? 'FREE' : formatCurrency(familyCost)}
        </span>
      </div>
    </div>
  );
}
