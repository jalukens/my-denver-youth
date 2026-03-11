import { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { Category, Day } from '@/lib/types';

export interface FilterState {
  age: number | null;
  category: Category | null;
  day: Day | null;
  neighborhood: string | null;
  hasSpots: boolean;
}

const categoryLabels: Record<Category, string> = {
  sports: 'Sports',
  stem: 'STEM',
  arts: 'Arts',
  outdoor: 'Outdoor',
  academic: 'Academic',
  music: 'Music',
  dance: 'Dance',
  'life-skills': 'Life Skills',
};

const dayLabels: Record<Day, string> = {
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
  Sunday: 'Sun',
};

const ageOptions = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

interface ProgramFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  neighborhoods?: string[];
}

export function ProgramFilters({
  filters,
  onFiltersChange,
  neighborhoods = [],
}: ProgramFiltersProps) {
  const [expandedChip, setExpandedChip] = useState<string | null>(null);

  const activeCount = [
    filters.age,
    filters.category,
    filters.day,
    filters.neighborhood,
    filters.hasSpots ? true : null,
  ].filter(Boolean).length;

  const toggleChip = (chip: string) => {
    setExpandedChip((prev) => (prev === chip ? null : chip));
  };

  const clearAll = () => {
    onFiltersChange({
      age: null,
      category: null,
      day: null,
      neighborhood: null,
      hasSpots: false,
    });
    setExpandedChip(null);
  };

  return (
    <div className="space-y-2 relative z-10">
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {/* Age chip */}
        <button
          onClick={() => toggleChip('age')}
          className={cn(
            'shrink-0 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium border transition-colors',
            filters.age
              ? 'bg-denver-navy text-white border-denver-navy'
              : 'bg-white text-denver-gray-mid border-denver-gray-soft hover:border-denver-gray-mid/40'
          )}
        >
          Age {filters.age ? `(${filters.age})` : ''}
          <ChevronDown className="w-3 h-3" />
        </button>

        {/* Category chip */}
        <button
          onClick={() => toggleChip('category')}
          className={cn(
            'shrink-0 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium border transition-colors',
            filters.category
              ? 'bg-denver-navy text-white border-denver-navy'
              : 'bg-white text-denver-gray-mid border-denver-gray-soft hover:border-denver-gray-mid/40'
          )}
        >
          Category{' '}
          {filters.category ? `(${categoryLabels[filters.category]})` : ''}
          <ChevronDown className="w-3 h-3" />
        </button>

        {/* Day chip */}
        <button
          onClick={() => toggleChip('day')}
          className={cn(
            'shrink-0 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium border transition-colors',
            filters.day
              ? 'bg-denver-navy text-white border-denver-navy'
              : 'bg-white text-denver-gray-mid border-denver-gray-soft hover:border-denver-gray-mid/40'
          )}
        >
          Day {filters.day ? `(${dayLabels[filters.day]})` : ''}
          <ChevronDown className="w-3 h-3" />
        </button>

        {/* Neighborhood chip */}
        <button
          onClick={() => toggleChip('neighborhood')}
          className={cn(
            'shrink-0 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium border transition-colors',
            filters.neighborhood
              ? 'bg-denver-navy text-white border-denver-navy'
              : 'bg-white text-denver-gray-mid border-denver-gray-soft hover:border-denver-gray-mid/40'
          )}
        >
          Neighborhood{' '}
          {filters.neighborhood ? `(${filters.neighborhood})` : ''}
          <ChevronDown className="w-3 h-3" />
        </button>

        {/* Available Only chip */}
        <button
          onClick={() =>
            onFiltersChange({ ...filters, hasSpots: !filters.hasSpots })
          }
          className={cn(
            'shrink-0 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium border transition-colors',
            filters.hasSpots
              ? 'bg-denver-navy text-white border-denver-navy'
              : 'bg-white text-denver-gray-mid border-denver-gray-soft hover:border-denver-gray-mid/40'
          )}
        >
          Available Only
        </button>

        {/* Clear all */}
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="shrink-0 inline-flex items-center gap-1 text-xs text-denver-red hover:text-denver-red/80 font-medium"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      {/* Active filter count */}
      {activeCount > 0 && (
        <div className="flex items-center gap-1">
          <Badge variant="info">{activeCount} active</Badge>
        </div>
      )}

      {/* Expanded options */}
      {expandedChip === 'age' && (
        <div className="flex flex-wrap gap-1.5 p-2 bg-denver-gray-soft/50 rounded-lg">
          {ageOptions.map((age) => (
            <button
              key={age}
              onClick={() => {
                onFiltersChange({
                  ...filters,
                  age: filters.age === age ? null : age,
                });
                setExpandedChip(null);
              }}
              className={cn(
                'px-2.5 py-1 rounded-full text-xs font-medium transition-colors',
                filters.age === age
                  ? 'bg-denver-navy text-white'
                  : 'bg-white text-denver-gray-mid border border-denver-gray-soft'
              )}
            >
              {age}
            </button>
          ))}
        </div>
      )}

      {expandedChip === 'category' && (
        <div className="flex flex-wrap gap-1.5 p-2 bg-denver-gray-soft/50 rounded-lg">
          {(Object.entries(categoryLabels) as [Category, string][]).map(
            ([key, label]) => (
              <button
                key={key}
                onClick={() => {
                  onFiltersChange({
                    ...filters,
                    category: filters.category === key ? null : key,
                  });
                  setExpandedChip(null);
                }}
                className={cn(
                  'px-2.5 py-1 rounded-full text-xs font-medium transition-colors',
                  filters.category === key
                    ? 'bg-denver-navy text-white'
                    : 'bg-white text-denver-gray-mid border border-denver-gray-soft'
                )}
              >
                {label}
              </button>
            )
          )}
        </div>
      )}

      {expandedChip === 'day' && (
        <div className="flex flex-wrap gap-1.5 p-2 bg-denver-gray-soft/50 rounded-lg">
          {(Object.entries(dayLabels) as [Day, string][]).map(
            ([key, label]) => (
              <button
                key={key}
                onClick={() => {
                  onFiltersChange({
                    ...filters,
                    day: filters.day === key ? null : key,
                  });
                  setExpandedChip(null);
                }}
                className={cn(
                  'px-2.5 py-1 rounded-full text-xs font-medium transition-colors',
                  filters.day === key
                    ? 'bg-denver-navy text-white'
                    : 'bg-white text-denver-gray-mid border border-denver-gray-soft'
                )}
              >
                {label}
              </button>
            )
          )}
        </div>
      )}

      {expandedChip === 'neighborhood' && (
        <div className="flex flex-wrap gap-1.5 p-2 bg-denver-gray-soft/50 rounded-lg">
          {neighborhoods.map((neighborhood) => (
            <button
              key={neighborhood}
              onClick={() => {
                onFiltersChange({
                  ...filters,
                  neighborhood:
                    filters.neighborhood === neighborhood
                      ? null
                      : neighborhood,
                });
                setExpandedChip(null);
              }}
              className={cn(
                'px-2.5 py-1 rounded-full text-xs font-medium transition-colors',
                filters.neighborhood === neighborhood
                  ? 'bg-denver-navy text-white'
                  : 'bg-white text-denver-gray-mid border border-denver-gray-soft'
              )}
            >
              {neighborhood}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
