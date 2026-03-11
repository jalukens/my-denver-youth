import { FundingCard } from './FundingCard';
import { formatCurrency } from '@/lib/utils';
import type { FundingAccount } from '@/lib/types';

interface FundingWaterfallProps {
  accounts: FundingAccount[];
  lang: 'en' | 'es';
  t: (key: string) => string;
}

export function FundingWaterfall({
  accounts,
  lang,
  t,
}: FundingWaterfallProps) {
  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

  return (
    <div className="space-y-4">
      {/* Total balance */}
      <div className="text-center">
        <div className="text-3xl font-heading font-bold text-denver-navy">
          {formatCurrency(totalBalance)}
        </div>
        <div className="text-sm text-denver-gray-mid mt-1">
          {t('funding.totalAvailable')}
        </div>
      </div>

      {/* Individual accounts */}
      <div className="space-y-3">
        {accounts.map((account) => (
          <FundingCard
            key={account.id}
            account={account}
            lang={lang}
            t={t}
          />
        ))}
      </div>
    </div>
  );
}
