import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import type { FundingAccount } from '@/lib/types';

interface FundingSummaryStripProps {
  accounts: FundingAccount[];
  lang: 'en' | 'es';
}

export function FundingSummaryStrip({ accounts, lang }: FundingSummaryStripProps) {
  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

  return (
    <Link to="/funding">
      <Card className="hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between p-4">
          <div>
            <div className="font-heading font-bold text-xl text-denver-navy">
              {formatCurrency(totalBalance)}
            </div>
            <div className="text-[11px] font-bold text-[#5A5A52] uppercase tracking-wider">
              {lang === 'es' ? 'disponible' : 'available'}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: account.color }}
                />
              ))}
            </div>
            <ChevronRight className="w-4 h-4 text-denver-gray-mid" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
