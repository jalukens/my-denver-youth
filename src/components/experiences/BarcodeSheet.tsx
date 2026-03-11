import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { ExperienceVenue } from '@/lib/types';

interface BarcodeSheetProps {
  venue: ExperienceVenue | null;
  cardNumber: string;
  familyName: string;
  open: boolean;
  onClose: () => void;
  lang: 'en' | 'es';
  t: (key: string) => string;
}

function generateBarcodeBars(cardNumber: string): { x: number; width: number }[] {
  const bars: { x: number; width: number }[] = [];
  let x = 10;

  // Start pattern: thin-thin-thick
  bars.push({ x, width: 2 });
  x += 4;
  bars.push({ x, width: 2 });
  x += 4;
  bars.push({ x, width: 4 });
  x += 6;

  // Data bars: each character creates 3-4 bars
  for (let i = 0; i < cardNumber.length; i++) {
    const charCode = cardNumber.charCodeAt(i);

    const barCount = 3 + (charCode % 2);
    for (let j = 0; j < barCount; j++) {
      const barWidth = 1 + ((charCode + j * 7) % 3);
      bars.push({ x, width: barWidth });
      x += barWidth + 2;
    }
    x += 2;
  }

  // End pattern: thick-thin-thin
  bars.push({ x, width: 4 });
  x += 6;
  bars.push({ x, width: 2 });
  x += 4;
  bars.push({ x, width: 2 });

  return bars;
}

export function BarcodeSheet({
  venue,
  cardNumber,
  familyName,
  open,
  onClose,
  lang,
  t,
}: BarcodeSheetProps) {
  if (!venue) return null;

  const bars = generateBarcodeBars(cardNumber);
  const isFree = venue.discountType === 'free';
  const totalWidth = bars.length > 0 ? bars[bars.length - 1].x + bars[bars.length - 1].width + 10 : 200;

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent>
        <SheetHeader>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{venue.emoji}</span>
            <div>
              <SheetTitle>
                {lang === 'es' ? venue.nameEs : venue.name}
              </SheetTitle>
              <Badge variant={isFree ? 'free' : 'discounted'} className="mt-1">
                {lang === 'es' ? venue.discountLabelEs : venue.discountLabel}
              </Badge>
            </div>
          </div>
        </SheetHeader>

        <div className="px-6 py-4 space-y-4">
          {/* Barcode */}
          <div className="bg-white border border-denver-gray-soft rounded-xl p-6 flex flex-col items-center">
            <svg
              viewBox={`0 0 ${totalWidth} 80`}
              className="w-full max-w-[280px] h-20"
              preserveAspectRatio="xMidYMid meet"
            >
              {bars.map((bar, i) => (
                <rect
                  key={i}
                  x={bar.x}
                  y={4}
                  width={bar.width}
                  height={72}
                  fill="black"
                  rx={0.5}
                />
              ))}
            </svg>

            {/* Card number */}
            <div className="mt-3 font-mono text-sm tracking-wider text-denver-navy">
              {cardNumber}
            </div>
          </div>

          {/* Instructions */}
          <p className="text-sm text-denver-gray-mid text-center">
            {t('experiences.showBarcode')}
          </p>

          {/* Validity */}
          <div className="text-center">
            <p className="text-xs text-denver-gray-mid">
              {t('experiences.validFor')}
            </p>
            <p className="text-sm font-medium text-denver-navy">{familyName}</p>
          </div>

          {/* Close button */}
          <Button variant="outline" className="w-full" onClick={onClose}>
            {t('common.close')}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
