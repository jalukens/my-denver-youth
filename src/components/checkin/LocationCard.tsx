import { BookOpen, Dumbbell, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { CheckInLocation } from '@/lib/types';
import { cn } from '@/lib/utils';

interface LocationCardProps {
  location: CheckInLocation;
  onClick: () => void;
}

export function LocationCard({ location, onClick }: LocationCardProps) {
  const isLibrary = location.type === 'library';
  const accentColor = isLibrary ? '#162B4D' : '#0D1B35'; // denver-navy-mid : denver-navy
  const Icon = isLibrary ? BookOpen : Dumbbell;

  return (
    <Card
      className="hover:shadow-md transition-shadow cursor-pointer"
      style={{ borderLeft: `4px solid ${accentColor}` }}
      onClick={onClick}
    >
      <div className="p-4 flex items-center gap-3">
        {/* Icon */}
        <div
          className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center shrink-0',
            isLibrary ? 'bg-denver-purple/10' : 'bg-denver-navy/10'
          )}
        >
          <Icon
            className={cn(
              'w-5 h-5',
              isLibrary ? 'text-denver-purple' : 'text-denver-navy'
            )}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="font-medium text-denver-navy">{location.name}</div>
          <div className="flex items-center gap-2 mt-0.5">
            <Badge variant={location.type}>
              {isLibrary ? 'Library' : 'Rec Center'}
            </Badge>
            <span className="text-xs text-denver-gray-mid">
              {location.distance.toFixed(1)} mi
            </span>
            <span className="text-xs text-denver-gray-mid">
              {location.neighborhood}
            </span>
          </div>
        </div>

        {/* Arrow */}
        <ChevronRight className="w-5 h-5 text-denver-gray-mid shrink-0" />
      </div>
    </Card>
  );
}
