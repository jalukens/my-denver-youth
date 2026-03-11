import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { useI18n } from '@/lib/i18n';
import { upcomingActivities, programs, family } from '@/lib/mockData';
import { getCategoryIcon } from '@/lib/utils';

const DAY_HEADERS_EN = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const DAY_HEADERS_ES = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export default function CalendarPage() {
  const { t, language } = useI18n();
  // Use Feb 2025 as static demo date
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 0, 1)); // Jan 2025

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const dayHeaders = language === 'es' ? DAY_HEADERS_ES : DAY_HEADERS_EN;

  // Map activities to dates
  const activityDates = useMemo(() => {
    const map = new Map<string, typeof upcomingActivities>();
    for (const activity of upcomingActivities) {
      const key = activity.date;
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)!.push(activity);
    }
    return map;
  }, []);

  // Activities for the current month
  const monthActivities = useMemo(() => {
    return upcomingActivities.filter((a) => {
      const d = new Date(a.date + 'T00:00:00');
      return d.getFullYear() === year && d.getMonth() === month;
    });
  }, [year, month]);

  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const monthLabel = currentMonth.toLocaleDateString(
    language === 'es' ? 'es-US' : 'en-US',
    { month: 'long', year: 'numeric' }
  );

  // Build calendar grid
  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }

  const hasActivityOnDay = (day: number): boolean => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return activityDates.has(dateStr);
  };

  const getCategoryForDay = (day: number): string | null => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const acts = activityDates.get(dateStr);
    if (!acts || acts.length === 0) return null;
    const prog = programs.find((p) => p.id === acts[0].programId);
    return prog?.category || null;
  };

  const categoryColorMap: Record<string, string> = {
    sports: 'bg-blue-500',
    stem: 'bg-purple-500',
    arts: 'bg-pink-500',
    outdoor: 'bg-green-500',
    academic: 'bg-yellow-500',
    music: 'bg-indigo-500',
    dance: 'bg-rose-500',
    'life-skills': 'bg-orange-500',
  };

  return (
    <div className="flex flex-col">
      <Header title={t('calendar.title')} />

      <div className="px-4 py-3">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevMonth}
            className="p-2 rounded-lg hover:bg-denver-gray-soft transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-denver-gray-mid" />
          </button>
          <h2 className="text-base font-heading font-semibold text-denver-navy capitalize">
            {monthLabel}
          </h2>
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-denver-gray-soft transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-denver-gray-mid" />
          </button>
        </div>

        {/* Calendar grid */}
        <Card>
          <div className="p-3">
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayHeaders.map((dh) => (
                <div
                  key={dh}
                  className="text-center text-[10px] font-semibold text-denver-gray-mid uppercase"
                >
                  {dh}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, idx) => {
                if (day === null) {
                  return <div key={`empty-${idx}`} className="h-10" />;
                }

                const hasAct = hasActivityOnDay(day);
                const cat = getCategoryForDay(day);
                const isToday = false; // Demo mode, no "today"

                return (
                  <div
                    key={day}
                    className={`h-10 flex flex-col items-center justify-center rounded-lg relative ${
                      isToday
                        ? 'bg-denver-navy text-white'
                        : hasAct
                        ? 'bg-denver-sky/10'
                        : 'hover:bg-denver-gray-soft/50'
                    }`}
                  >
                    <span className="text-xs font-medium">{day}</span>
                    {hasAct && cat && (
                      <div
                        className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                          categoryColorMap[cat] || 'bg-denver-gray-mid'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Activity list below calendar */}
        <div className="mt-4">
          <h3 className="text-sm font-heading font-semibold text-denver-navy mb-3">
            {language === 'es' ? 'Actividades del Mes' : 'Month Activities'}
          </h3>

          {monthActivities.length === 0 ? (
            <p className="text-sm text-denver-gray-mid text-center py-4">
              {t('calendar.noEvents')}
            </p>
          ) : (
            <div className="space-y-2">
              {monthActivities.map((activity) => {
                const program = programs.find((p) => p.id === activity.programId);
                const child = family.children.find((c) => c.id === activity.childId);
                if (!program || !child) return null;

                const dateStr = new Date(activity.date + 'T00:00:00').toLocaleDateString(
                  language === 'es' ? 'es-US' : 'en-US',
                  { weekday: 'short', month: 'short', day: 'numeric' }
                );

                return (
                  <Link key={activity.id} to={`/program/${program.id}`}>
                    <Card className="hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 p-3">
                        <div className="w-9 h-9 rounded-lg bg-denver-gray-soft/50 flex items-center justify-center text-lg shrink-0">
                          {getCategoryIcon(program.category)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-denver-navy line-clamp-1">
                            {language === 'es' ? program.nameEs : program.name}
                          </p>
                          <div className="flex items-center gap-1.5 text-xs text-denver-gray-mid mt-0.5">
                            <span>{child.avatar} {child.name}</span>
                            <span className="text-denver-gray-soft">|</span>
                            <span>{dateStr}</span>
                          </div>
                        </div>
                        <div className="text-xs font-semibold text-denver-navy shrink-0">
                          {activity.startTime}
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
