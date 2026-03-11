import { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  ChevronLeft,
  CheckCircle2,
  ArrowRight,
  PartyPopper,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useI18n } from '@/lib/i18n';
import {
  programs,
  family,
  fundingAccounts,
} from '@/lib/mockData';
import {
  formatCurrency,
  getCategoryIcon,
  getEligibleFunding,
  calculateFundingWaterfall,
  isChildEligible,
  cn,
} from '@/lib/utils';

export default function RegisterPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t, language } = useI18n();

  const program = programs.find((p) => p.id === id);
  const initialChildId = searchParams.get('child') || '';

  const [step, setStep] = useState(initialChildId ? 2 : 1);
  const [selectedChildId, setSelectedChildId] = useState(initialChildId);
  const [waterfallAnimated, setWaterfallAnimated] = useState(false);

  const selectedChild = family.children.find((c) => c.id === selectedChildId);
  const eligibleChildren = useMemo(
    () =>
      program
        ? family.children.filter((child) => isChildEligible(child, program))
        : [],
    [program]
  );

  const eligibleFunding = useMemo(
    () => (program ? getEligibleFunding(program, fundingAccounts) : []),
    [program]
  );

  const waterfallResults = useMemo(
    () =>
      program
        ? calculateFundingWaterfall(program.cost, eligibleFunding)
        : [],
    [program, eligibleFunding]
  );

  const totalFunded = waterfallResults.reduce((sum, w) => sum + w.amount, 0);
  const familyCost = program ? Math.max(0, program.cost - totalFunded) : 0;

  // Trigger waterfall animation when entering step 2
  useEffect(() => {
    if (step === 2) {
      setWaterfallAnimated(false);
      const timer = setTimeout(() => setWaterfallAnimated(true), 100);
      return () => clearTimeout(timer);
    }
  }, [step]);

  if (!program) {
    return (
      <div className="flex flex-col">
        <div className="sticky top-0 z-40 bg-white px-4 py-3">
          <button onClick={() => navigate(-1)} className="p-1">
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="px-4 py-8 text-center">
          <p className="text-sm text-denver-gray-mid">
            {language === 'es' ? 'Programa no encontrado' : 'Program not found'}
          </p>
        </div>
      </div>
    );
  }

  const programName = language === 'es' ? program.nameEs : program.name;

  const handleChildSelect = (childId: string) => {
    setSelectedChildId(childId);
    setStep(2);
  };

  const handleConfirm = () => {
    setStep(3);
  };

  const stepLabels = [
    language === 'es' ? 'Seleccionar' : 'Select',
    language === 'es' ? 'Fondos' : 'Funding',
    language === 'es' ? 'Confirmar' : 'Confirm',
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="flex items-center px-4 py-3">
          <button
            onClick={() => {
              if (step > 1 && step < 3) setStep(step - 1);
              else navigate(-1);
            }}
            className="p-1 -ml-1 text-denver-gray-mid"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="flex-1 text-center text-base font-heading font-semibold text-denver-navy">
            {t('register.title')} - {programName}
          </h1>
          <div className="w-8" />
        </div>

        {/* Step progress indicator */}
        <div className="flex items-center gap-2 px-6 pb-3">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={cn(
                  'w-full h-1.5 rounded-full transition-all duration-300',
                  s <= step ? 'bg-denver-navy' : 'bg-denver-gray-soft'
                )}
              />
              <span
                className={cn(
                  'text-[10px] font-medium transition-colors',
                  s <= step ? 'text-denver-navy' : 'text-denver-gray-mid'
                )}
              >
                {stepLabels[s - 1]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 px-4 py-4">
        {/* Step 1: Select Child */}
        {step === 1 && (
          <div className="space-y-4 fade-in">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">{getCategoryIcon(program.category)}</div>
              <h2 className="text-lg font-heading font-bold text-denver-navy">
                {t('register.selectChild')}
              </h2>
              <p className="text-xs text-denver-gray-mid mt-1">
                {language === 'es'
                  ? 'Selecciona quien se registrara'
                  : 'Select who will be registered'}
              </p>
            </div>

            {eligibleChildren.length === 0 ? (
              <p className="text-sm text-denver-gray-mid text-center py-4">
                {language === 'es'
                  ? 'Ningun hijo es elegible por edad.'
                  : 'No children are eligible by age.'}
              </p>
            ) : (
              <div className="space-y-3">
                {eligibleChildren.map((child) => (
                  <button
                    key={child.id}
                    className="w-full"
                    onClick={() => handleChildSelect(child.id)}
                  >
                    <Card className="hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-denver-gold/20 flex items-center justify-center text-2xl">
                            {child.avatar}
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-semibold text-denver-navy">
                              {child.name}
                            </p>
                            <p className="text-xs text-denver-gray-mid">
                              {language === 'es'
                                ? `${child.age} anos`
                                : `Age ${child.age}`}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-denver-gray-mid" />
                      </div>
                    </Card>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 2: Funding Breakdown */}
        {step === 2 && selectedChild && (
          <div className="space-y-4 fade-in">
            <div className="text-center mb-4">
              <h2 className="text-lg font-heading font-bold text-denver-navy">
                {t('register.fundingBreakdown')}
              </h2>
              <p className="text-xs text-denver-gray-mid mt-1">
                {selectedChild.avatar} {selectedChild.name} /{' '}
                {programName}
              </p>
            </div>

            {/* Total cost */}
            <Card>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-denver-gray-mid">{t('register.totalCost')}</span>
                  <span className="text-lg font-heading font-bold text-denver-navy">
                    {formatCurrency(program.cost)}
                  </span>
                </div>

                {/* Funding waterfall animation */}
                <div className="space-y-3">
                  {waterfallResults.map((w, index) => {
                    const account = fundingAccounts.find((a) => a.id === w.fundingId);
                    if (!account) return null;
                    const percentage = (w.amount / program.cost) * 100;

                    return (
                      <div
                        key={w.fundingId}
                        className="space-y-1"
                        style={{
                          opacity: waterfallAnimated ? 1 : 0,
                          transition: `opacity 0.4s ease-out ${index * 0.3}s`,
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: account.color }}
                            />
                            <span className="text-xs font-medium text-denver-navy">
                              {language === 'es' ? account.nameEs : account.name}
                            </span>
                          </div>
                          <span className="text-xs font-semibold text-denver-navy">
                            -{formatCurrency(w.amount)}
                          </span>
                        </div>
                        <div
                          className="h-2 rounded-full overflow-hidden bg-denver-gray-soft"
                          style={{
                            transition: `width 0.6s ease-out ${index * 0.3 + 0.2}s`,
                          }}
                        >
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              backgroundColor: account.color,
                              width: waterfallAnimated ? `${percentage}%` : '0%',
                              transitionDelay: `${index * 0.3 + 0.2}s`,
                            }}
                          />
                        </div>
                        <p className="text-[10px] text-denver-gray-mid">
                          {language === 'es' ? 'Restante' : 'Remaining'}:{' '}
                          {formatCurrency(w.remaining)}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-denver-gray-soft mt-4 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-denver-navy">
                      {t('register.familyCost')}
                    </span>
                    <span
                      className={cn(
                        'text-lg font-heading font-bold',
                        familyCost === 0 ? 'text-denver-green' : 'text-denver-navy'
                      )}
                    >
                      {familyCost === 0
                        ? (language === 'es' ? 'Gratis' : 'Free')
                        : formatCurrency(familyCost)}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Button
              size="lg"
              className="w-full"
              onClick={handleConfirm}
            >
              {t('register.confirm')}
            </Button>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && selectedChild && (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-8 fade-in">
            <div className="w-20 h-20 rounded-full bg-denver-teal-light flex items-center justify-center scale-in">
              <CheckCircle2 className="w-10 h-10 text-denver-green" />
            </div>

            <div>
              <h2 className="text-xl font-heading font-bold text-denver-navy">
                {t('register.success')}
              </h2>
              <p className="text-sm text-denver-gray-mid mt-2">
                <span className="font-medium text-denver-navy">
                  {selectedChild.name}
                </span>{' '}
                {t('register.successMessage')}{' '}
                <span className="font-medium text-denver-navy">{programName}</span>
              </p>
            </div>

            <Card className="w-full">
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-denver-gray-mid">{t('register.totalCost')}</span>
                  <span className="font-semibold">{formatCurrency(program.cost)}</span>
                </div>
                {waterfallResults.map((w) => {
                  const account = fundingAccounts.find((a) => a.id === w.fundingId);
                  return (
                    <div key={w.fundingId} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: account?.color }}
                        />
                        <span className="text-denver-gray-mid">
                          {account ? (language === 'es' ? account.nameEs : account.name) : ''}
                        </span>
                      </div>
                      <span className="text-denver-green">-{formatCurrency(w.amount)}</span>
                    </div>
                  );
                })}
                <div className="border-t border-denver-gray-soft pt-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold">{t('register.familyCost')}</span>
                    <span
                      className={cn(
                        'font-bold',
                        familyCost === 0 ? 'text-denver-green' : 'text-denver-navy'
                      )}
                    >
                      {familyCost === 0
                        ? (language === 'es' ? 'Gratis' : 'Free')
                        : formatCurrency(familyCost)}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <div className="w-full space-y-2 pt-4">
              <Button
                size="lg"
                className="w-full"
                onClick={() => navigate(`/program/${program.id}`)}
              >
                {t('register.viewDetails')}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full"
                onClick={() => navigate('/explore')}
              >
                {t('register.backToExplore')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
