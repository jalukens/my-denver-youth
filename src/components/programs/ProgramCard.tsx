import { Link } from 'react-router-dom';
import { MapPin, Users, Clock, MessageCircle, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  getCategoryIcon,
  getCategoryAccentColor,
  getCategoryColor,
  getAvailabilityStatus,
  formatCurrency,
} from '@/lib/utils';
import type { Program } from '@/lib/types';

interface ProgramCardProps {
  program: Program;
  lang: 'en' | 'es';
}

const dayAbbreviations: Record<string, string> = {
  Monday: 'M',
  Tuesday: 'T',
  Wednesday: 'W',
  Thursday: 'Th',
  Friday: 'F',
  Saturday: 'Sa',
  Sunday: 'Su',
};

const mockSentiment: Record<string, number> = {
  'prog-001': 4.2,
  'prog-002': 4.6,
  'prog-003': 4.0,
  'prog-004': 3.9,
  'prog-005': 4.3,
  'prog-006': 3.8,
  'prog-007': 4.5,
  'prog-008': 4.1,
  'prog-009': 4.1,
  'prog-010': 4.4,
};

export function ProgramCard({ program, lang }: ProgramCardProps) {
  const categoryIcon = getCategoryIcon(program.category);
  const accentColor = getCategoryAccentColor(program.category);
  const categoryColorClasses = getCategoryColor(program.category);
  const availability = getAvailabilityStatus(program.spotsAvailable);

  return (
    <Link to={`/program/${program.id}`}>
      <Card
        className="hover:shadow-md transition-shadow"
        style={{ borderLeft: `4px solid ${accentColor}` }}
      >
        <div className="p-4">
          <div className="flex gap-3">
            {/* Category icon */}
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
              style={{
                background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}10)`,
              }}
            >
              {categoryIcon}
            </div>

            {/* Program info */}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-denver-navy line-clamp-1">
                {lang === 'es' ? program.nameEs : program.name}
              </div>
              <div className="text-xs text-denver-gray-mid mt-0.5">
                {lang === 'es' && program.providerEs
                  ? program.providerEs
                  : program.provider}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-semibold text-denver-navy">
                  {program.cost === 0
                    ? lang === 'es'
                      ? 'Gratis'
                      : 'Free'
                    : formatCurrency(program.cost)}
                </span>
                <Badge className={categoryColorClasses}>{program.category}</Badge>
                <span className={`text-xs ${availability.color}`}>
                  {lang === 'es' ? availability.labelEs : availability.label}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex items-center gap-3 mt-3 text-xs text-denver-gray-mid">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>
                {program.schedule.days.map((d) => dayAbbreviations[d] || d).join(' ')}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{program.location.neighborhood}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>
                {program.ageRange.min}-{program.ageRange.max}y
              </span>
            </div>
            {mockSentiment[program.id] && (
              <div className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3" />
                <span>{mockSentiment[program.id].toFixed(1)}</span>
              </div>
            )}
            {program.spotsAvailable > 0 && program.spotsAvailable <= 3 && (
              <div className="flex items-center gap-1 text-amber-500">
                <Zap className="w-3 h-3" />
                <span>{program.spotsAvailable} left</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
