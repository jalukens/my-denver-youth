import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  formatCurrency,
  formatDate,
  generateCalendarUrl,
} from '@/lib/utils';
import type { Program, Child } from '@/lib/types';

interface ConfirmationScreenProps {
  program: Program;
  child: Child;
  familyCost: number;
  lang: 'en' | 'es';
  t: (key: string) => string;
}

export function ConfirmationScreen({
  program,
  child,
  familyCost,
  lang,
  t,
}: ConfirmationScreenProps) {
  const calendarUrl = generateCalendarUrl(
    program.name,
    program.schedule.startDate,
    program.schedule.startTime,
    program.schedule.endTime,
    program.location.address
  );

  return (
    <div className="flex flex-col items-center px-4 py-8">
      {/* Animated checkmark */}
      <div className="mb-6">
        <svg
          className="w-20 h-20"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="40"
            cy="40"
            r="36"
            stroke="#10b981"
            strokeWidth="4"
            fill="#ecfdf5"
            style={{
              transformOrigin: 'center',
              animation: 'confirm-scale-in 0.4s ease-out forwards',
            }}
          />
          <path
            d="M24 42 L35 53 L56 28"
            stroke="#10b981"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            style={{
              strokeDasharray: 60,
              strokeDashoffset: 60,
              animation: 'confirm-draw-check 0.5s 0.3s ease-out forwards',
            }}
          />
        </svg>
      </div>

      {/* Success message */}
      <h2 className="text-xl font-heading font-bold text-denver-navy text-center">
        {t('registration.confirmed')}
      </h2>
      <p className="text-sm text-denver-gray-mid mt-1 text-center">
        {child.name} {t('registration.enrolledIn')}{' '}
        {lang === 'es' ? program.nameEs : program.name}
      </p>

      {/* Details card */}
      <Card className="mt-6 w-full">
        <div className="p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-denver-gray-mid">{t('registration.schedule')}</span>
            <span className="font-medium text-denver-navy">
              {program.schedule.days.join(', ')}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-denver-gray-mid">{t('registration.time')}</span>
            <span className="font-medium text-denver-navy">
              {program.schedule.startTime} - {program.schedule.endTime}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-denver-gray-mid">
              {t('registration.location')}
            </span>
            <span className="font-medium text-denver-navy text-right">
              {program.location.name}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-denver-gray-mid">
              {t('registration.startDate')}
            </span>
            <span className="font-medium text-denver-navy">
              {formatDate(program.schedule.startDate, lang)}
            </span>
          </div>
          <div className="flex justify-between text-sm border-t border-denver-gray-soft pt-2">
            <span className="text-denver-gray-mid">{t('registration.cost')}</span>
            <span
              className={`font-bold ${
                familyCost === 0 ? 'text-denver-teal' : 'text-denver-navy'
              }`}
            >
              {familyCost === 0 ? 'FREE' : formatCurrency(familyCost)}
            </span>
          </div>
        </div>
      </Card>

      {/* Action buttons */}
      <div className="mt-6 w-full space-y-3">
        <Button variant="outline" className="w-full" asChild>
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Calendar className="w-4 h-4 mr-2" />
            {t('registration.addToCalendar')}
          </a>
        </Button>

        <Button variant="ghost" className="w-full" asChild>
          <Link to="/calendar">
            {t('registration.viewCalendar')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>

        <Button variant="brand" className="w-full" asChild>
          <Link to="/explore">
            {t('registration.findMore')}
          </Link>
        </Button>
      </div>

      {/* Inline keyframe styles */}
      <style>{`
        @keyframes confirm-scale-in {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes confirm-draw-check {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
