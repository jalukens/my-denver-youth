import { useState } from 'react';
import { MapPin, CreditCard } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { useI18n } from '@/lib/i18n';
import { experienceVenues, family } from '@/lib/mockData';
import type { ExperienceVenue } from '@/lib/types';

export default function ExperiencesPage() {
  const { t, language } = useI18n();
  const [selectedVenue, setSelectedVenue] = useState<ExperienceVenue | null>(null);

  const freeVenues = experienceVenues.filter((v) => v.discountType === 'free');
  const discountedVenues = experienceVenues.filter((v) => v.discountType === 'discounted');

  return (
    <div className="flex flex-col">
      {/* Header */}
      <Header title={t('experiences.title')} />

      {/* Subtitle */}
      <div className="px-4 pt-3 pb-1">
        <p className="text-sm text-denver-gray-mid">
          {language === 'es'
            ? 'Muestra tu Tarjeta Mi Denver para entrada gratuita y con descuento a los mejores lugares culturales de Denver'
            : "Show your My Denver Card for free & discounted entry to Denver's best cultural venues"}
        </p>
      </div>

      <div className="px-4 py-3 space-y-6">
        {/* Free Section */}
        <div>
          <h2 className="text-sm font-heading font-semibold text-denver-navy mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-denver-green" />
            {t('experiences.freeSection')}
          </h2>
          <div className="space-y-2">
            {freeVenues.map((venue) => (
              <button
                key={venue.id}
                className="w-full text-left"
                onClick={() => setSelectedVenue(venue)}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 p-3">
                    <div className="w-12 h-12 rounded-xl bg-denver-gray-soft flex items-center justify-center text-2xl shrink-0">
                      {venue.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-denver-navy line-clamp-1">
                        {language === 'es' ? venue.nameEs : venue.name}
                      </h3>
                      <p className="text-xs text-denver-gray-mid">{venue.neighborhood}</p>
                      <Badge variant="free" className="mt-1 text-[10px]">
                        {language === 'es' ? venue.discountLabelEs : venue.discountLabel}
                      </Badge>
                    </div>
                  </div>
                </Card>
              </button>
            ))}
          </div>
        </div>

        {/* Discounted Section */}
        <div>
          <h2 className="text-sm font-heading font-semibold text-denver-navy mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-denver-orange" />
            {t('experiences.discountedSection')}
          </h2>
          <div className="space-y-2">
            {discountedVenues.map((venue) => (
              <button
                key={venue.id}
                className="w-full text-left"
                onClick={() => setSelectedVenue(venue)}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 p-3">
                    <div className="w-12 h-12 rounded-xl bg-denver-gray-soft flex items-center justify-center text-2xl shrink-0">
                      {venue.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-denver-navy line-clamp-1">
                        {language === 'es' ? venue.nameEs : venue.name}
                      </h3>
                      <p className="text-xs text-denver-gray-mid">{venue.neighborhood}</p>
                      <Badge variant="discounted" className="mt-1 text-[10px]">
                        {language === 'es' ? venue.discountLabelEs : venue.discountLabel}
                      </Badge>
                    </div>
                  </div>
                </Card>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Barcode Sheet */}
      <Sheet open={!!selectedVenue} onOpenChange={(open) => !open && setSelectedVenue(null)}>
        <SheetContent>
          {selectedVenue && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <span className="text-2xl">{selectedVenue.emoji}</span>
                  {language === 'es' ? selectedVenue.nameEs : selectedVenue.name}
                </SheetTitle>
                <SheetDescription>
                  {t('experiences.showCard')}
                </SheetDescription>
              </SheetHeader>
              <div className="px-6 py-4 space-y-4">
                <p className="text-sm text-denver-gray-mid">
                  {language === 'es' ? selectedVenue.descriptionEs : selectedVenue.description}
                </p>

                <div className="flex items-center gap-2 text-sm text-denver-gray-mid">
                  <MapPin className="w-4 h-4" />
                  {selectedVenue.address}
                </div>

                <Badge
                  variant={selectedVenue.discountType as 'free' | 'discounted'}
                  className="text-sm px-3 py-1"
                >
                  {language === 'es' ? selectedVenue.discountLabelEs : selectedVenue.discountLabel}
                </Badge>

                {/* Barcode representation */}
                <div className="bg-white border border-denver-gray-soft rounded-xl p-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <CreditCard className="w-5 h-5 text-denver-gold" />
                    <span className="font-heading font-bold text-denver-navy text-sm">
                      My Denver Card
                    </span>
                  </div>
                  {/* Barcode bars */}
                  <div className="flex items-end justify-center gap-[2px] h-16 mb-2">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-denver-navy rounded-sm"
                        style={{
                          width: i % 3 === 0 ? 3 : 2,
                          height: `${50 + ((i * 17) % 50)}%`,
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs font-mono text-denver-gray-mid">
                    {family.denverCardNumber}
                  </p>
                  <p className="text-xs text-denver-gray-mid mt-1">
                    The {family.name} Family
                  </p>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
