import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatCurrency } from '@/lib/utils';
import type { FundingAccount } from '@/lib/types';

interface FundingCardProps {
  account: FundingAccount;
  compact?: boolean;
  lang: 'en' | 'es';
  t: (key: string) => string;
}

export function FundingCard({
  account,
  compact = false,
  lang,
  t,
}: FundingCardProps) {
  const name = lang === 'es' ? account.nameEs : account.name;
  const description =
    lang === 'es' ? account.descriptionEs : account.description;
  const percentage = (account.balance / account.maxBalance) * 100;

  if (compact) {
    return (
      <div className="flex items-center gap-3 py-2">
        <div
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ backgroundColor: account.color }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-denver-navy truncate">
              {name}
            </span>
            <span className="text-sm font-semibold text-denver-navy ml-2">
              {formatCurrency(account.balance)}
            </span>
          </div>
          <Progress
            value={account.balance}
            max={account.maxBalance}
            color={account.color}
            className="mt-1"
          />
        </div>
      </div>
    );
  }

  return (
    <Card>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div
            className="w-3 h-3 rounded-full mt-1.5 shrink-0"
            style={{ backgroundColor: account.color }}
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-medium text-denver-navy">{name}</span>
              <span className="font-heading font-bold text-lg text-denver-navy">
                {formatCurrency(account.balance)}
              </span>
            </div>

            <p className="text-xs text-denver-gray-mid mt-1">{description}</p>

            <Progress
              value={account.balance}
              max={account.maxBalance}
              color={account.color}
              className="mt-3"
            />

            <div className="flex items-center justify-between mt-1.5 text-xs text-denver-gray-mid">
              <span>
                {formatCurrency(account.balance)} / {formatCurrency(account.maxBalance)}
              </span>
              {account.expirationDate && (
                <span>
                  {t('funding.expires')}: {account.expirationDate}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
