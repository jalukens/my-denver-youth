import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ExperienceVenue } from '@/lib/types';

interface ExperienceCardProps {
  venue: ExperienceVenue;
  lang: 'en' | 'es';
  onClick: () => void;
}

export function ExperienceCard({ venue, lang, onClick }: ExperienceCardProps) {
  const isFree = venue.discountType === 'free';

  return (
    <Card
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="p-4">
        {/* Emoji icon */}
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3 ${
            isFree ? 'bg-denver-teal-light' : 'bg-denver-amber/10'
          }`}
        >
          {venue.emoji}
        </div>

        {/* Name */}
        <div className="text-base font-semibold text-denver-navy text-center">
          {lang === 'es' ? venue.nameEs : venue.name}
        </div>

        {/* Description */}
        <div className="text-sm text-denver-gray-mid line-clamp-2 text-center mt-1">
          {lang === 'es' ? venue.descriptionEs : venue.description}
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between mt-3">
          <Badge variant={isFree ? 'free' : 'discounted'}>
            {lang === 'es' ? venue.discountLabelEs : venue.discountLabel}
          </Badge>
          <span className="text-xs text-denver-gray-mid">{venue.neighborhood}</span>
        </div>
      </div>
    </Card>
  );
}
