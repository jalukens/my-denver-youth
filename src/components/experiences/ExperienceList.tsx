import { Badge } from '@/components/ui/badge';
import { ExperienceCard } from './ExperienceCard';
import type { ExperienceVenue } from '@/lib/types';

interface ExperienceListProps {
  venues: ExperienceVenue[];
  lang: 'en' | 'es';
  onVenueClick: (venue: ExperienceVenue) => void;
  t: (key: string) => string;
}

export function ExperienceList({
  venues,
  lang,
  onVenueClick,
  t,
}: ExperienceListProps) {
  const freeVenues = venues.filter((v) => v.discountType === 'free');
  const discountedVenues = venues.filter((v) => v.discountType === 'discounted');

  return (
    <div className="space-y-6">
      {/* Free Admission */}
      {freeVenues.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-base font-heading font-semibold text-denver-navy">
              {t('experiences.freeAdmission')}
            </h2>
            <Badge variant="free">{freeVenues.length}</Badge>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {freeVenues.map((venue) => (
              <ExperienceCard
                key={venue.id}
                venue={venue}
                lang={lang}
                onClick={() => onVenueClick(venue)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Discounted Admission */}
      {discountedVenues.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-base font-heading font-semibold text-denver-navy">
              {t('experiences.discountedAdmission')}
            </h2>
            <Badge variant="discounted">{discountedVenues.length}</Badge>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {discountedVenues.map((venue) => (
              <ExperienceCard
                key={venue.id}
                venue={venue}
                lang={lang}
                onClick={() => onVenueClick(venue)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
