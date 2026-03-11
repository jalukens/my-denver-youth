import { useState } from 'react';
import {
  ArrowDownCircle,
  ArrowUpCircle,
  ChevronDown,
  HelpCircle,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';
import { useI18n } from '@/lib/i18n';
import { fundingAccounts, transactions, categoryLabels } from '@/lib/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function FundingPage() {
  const { t, language } = useI18n();
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);

  const totalBalance = fundingAccounts.reduce((sum, a) => sum + a.balance, 0);

  return (
    <div className="flex flex-col">
      <Header title={t('funding.title')} />

      <div className="px-4 py-3 space-y-4">
        {/* Total funding card */}
        <div className="rounded-xl bg-gradient-to-r from-denver-navy to-denver-sky p-5 text-white shadow-lg">
          <p className="text-xs text-white/70 uppercase tracking-wide">
            {t('funding.totalAvailable')}
          </p>
          <p className="text-3xl font-heading font-bold mt-1">
            {formatCurrency(totalBalance)}
          </p>
          <p className="text-xs text-white/60 mt-2">
            {fundingAccounts.length}{' '}
            {language === 'es' ? 'cuentas de fondos' : 'funding accounts'}
          </p>
        </div>

        {/* Funding Accounts */}
        <div>
          <h2 className="text-sm font-heading font-semibold text-denver-navy mb-3">
            {language === 'es' ? 'Cuentas de Fondos' : 'Funding Accounts'}
          </h2>
          <div className="space-y-3">
            {fundingAccounts.map((account) => {
              const used = account.maxBalance - account.balance;
              const eligibleLabels = account.eligibleCategories.map(
                (cat) => categoryLabels[cat]?.[language] || cat
              );

              return (
                <Card key={account.id}>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: account.color }}
                        />
                        <h3 className="text-sm font-semibold text-denver-navy">
                          {language === 'es' ? account.nameEs : account.name}
                        </h3>
                      </div>
                      <Badge variant="default" className="text-[10px]">
                        {account.type}
                      </Badge>
                    </div>

                    <div className="flex items-end justify-between mb-2">
                      <div>
                        <span className="text-xl font-heading font-bold text-denver-navy">
                          {formatCurrency(account.balance)}
                        </span>
                        <span className="text-xs text-denver-gray-mid ml-1">
                          / {formatCurrency(account.maxBalance)}
                        </span>
                      </div>
                      <span className="text-xs text-denver-gray-mid">
                        {formatCurrency(used)} {t('funding.used')}
                      </span>
                    </div>

                    <Progress
                      value={account.balance}
                      max={account.maxBalance}
                      color={account.color}
                    />

                    <div className="mt-3 space-y-1.5">
                      <p className="text-xs text-denver-gray-mid">
                        {language === 'es' ? account.descriptionEs : account.description}
                      </p>

                      {account.expirationDate && (
                        <p className="text-xs text-denver-gray-mid">
                          {t('funding.expires')}: {formatDate(account.expirationDate, language)}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-1 mt-2">
                        <span className="text-[10px] text-denver-gray-mid">
                          {t('funding.eligibleFor')}:
                        </span>
                        {eligibleLabels.map((label) => (
                          <Badge key={label} variant="default" className="text-[10px] px-1.5 py-0">
                            {label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* How Funding Works */}
        <Collapsible open={howItWorksOpen} onOpenChange={setHowItWorksOpen}>
          <Card>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-denver-purple" />
                  <span className="text-sm font-semibold text-denver-navy">
                    {language === 'es' ? 'Como Funcionan los Fondos' : 'How Funding Works'}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-denver-gray-mid transition-transform ${
                    howItWorksOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-4 pb-4 space-y-3">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-denver-purple/10 text-denver-purple flex items-center justify-center text-xs font-bold shrink-0">
                    1
                  </div>
                  <p className="text-xs text-denver-gray-mid">
                    {language === 'es'
                      ? 'Las familias elegibles reciben fondos de multiples fuentes como My Spark, DPS y CCCAP.'
                      : 'Eligible families receive funding from multiple sources like My Spark, DPS, and CCCAP.'}
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-denver-purple/10 text-denver-purple flex items-center justify-center text-xs font-bold shrink-0">
                    2
                  </div>
                  <p className="text-xs text-denver-gray-mid">
                    {language === 'es'
                      ? 'Los fondos se aplican automaticamente al registrarse en programas elegibles.'
                      : 'Funding is automatically applied when registering for eligible programs.'}
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-denver-purple/10 text-denver-purple flex items-center justify-center text-xs font-bold shrink-0">
                    3
                  </div>
                  <p className="text-xs text-denver-gray-mid">
                    {language === 'es'
                      ? 'El sistema usa una "cascada" de fondos, aplicando cada fuente hasta cubrir el costo total.'
                      : 'The system uses a funding "waterfall," applying each source until the total cost is covered.'}
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Transaction History */}
        <div>
          <h2 className="text-sm font-heading font-semibold text-denver-navy mb-3">
            {t('funding.transactions')}
          </h2>

          {transactions.length === 0 ? (
            <p className="text-sm text-denver-gray-mid text-center py-4">
              {t('funding.noTransactions')}
            </p>
          ) : (
            <Card>
              <div className="divide-y divide-denver-gray-soft">
                {transactions.map((txn) => {
                  const account = fundingAccounts.find((a) => a.id === txn.fundingAccountId);

                  return (
                    <div key={txn.id} className="flex items-center gap-3 p-3">
                      <div className="shrink-0">
                        {txn.type === 'credit' ? (
                          <ArrowDownCircle className="w-8 h-8 text-denver-green" />
                        ) : (
                          <ArrowUpCircle className="w-8 h-8 text-denver-gray-mid" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-denver-navy line-clamp-1">
                          {txn.programName}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-denver-gray-mid mt-0.5">
                          {txn.childName && <span>{txn.childName}</span>}
                          {txn.childName && <span className="text-denver-gray-soft">|</span>}
                          <span>{formatDate(txn.date, language)}</span>
                        </div>
                        {account && (
                          <div className="flex items-center gap-1 mt-0.5">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: account.color }}
                            />
                            <span className="text-[10px] text-denver-gray-mid">
                              {language === 'es' ? account.nameEs : account.name}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="shrink-0 text-right">
                        <span
                          className={`text-sm font-semibold ${
                            txn.type === 'credit' ? 'text-denver-green' : 'text-denver-gray-mid'
                          }`}
                        >
                          {txn.type === 'credit' ? '+' : '-'}
                          {formatCurrency(txn.amount)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
