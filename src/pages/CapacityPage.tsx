import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ChevronRight,
  Clock,
  Filter,
  MapPin,
  RefreshCw,
  Users,
  Zap,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/lib/i18n';
import { programs } from '@/lib/mockData';
import { getCategoryIcon, getCategoryAccentColor, formatCurrency } from '@/lib/utils';

type SortMode = 'urgency' | 'available' | 'category';

// Simulated real-time capacity data (extends base program data)
const liveCapacity: Record<string, {
  liveSpots: number;
  trend: 'filling' | 'stable' | 'opening';
  lastUpdated: string;
  recentChange?: { type: 'drop' | 'open'; count: number; minutesAgo: number };
}> = {
  'prog-001': { liveSpots: 8, trend: 'stable', lastUpdated: '2 min ago' },
  'prog-002': { liveSpots: 3, trend: 'filling', lastUpdated: '1 min ago', recentChange: { type: 'drop', count: 1, minutesAgo: 12 } },
  'prog-003': { liveSpots: 12, trend: 'stable', lastUpdated: '5 min ago' },
  'prog-004': { liveSpots: 6, trend: 'opening', lastUpdated: '3 min ago', recentChange: { type: 'open', count: 2, minutesAgo: 30 } },
  'prog-005': { liveSpots: 0, trend: 'stable', lastUpdated: '1 min ago' },
  'prog-006': { liveSpots: 2, trend: 'filling', lastUpdated: '1 min ago', recentChange: { type: 'drop', count: 1, minutesAgo: 5 } },
  'prog-007': { liveSpots: 5, trend: 'stable', lastUpdated: '4 min ago' },
  'prog-008': { liveSpots: 10, trend: 'stable', lastUpdated: '3 min ago' },
  'prog-009': { liveSpots: 7, trend: 'opening', lastUpdated: '2 min ago', recentChange: { type: 'open', count: 3, minutesAgo: 45 } },
  'prog-010': { liveSpots: 4, trend: 'filling', lastUpdated: '1 min ago' },
};

export default function CapacityPage() {
  const { language } = useI18n();
  const [sortMode, setSortMode] = useState<SortMode>('urgency');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const sortedPrograms = [...programs].sort((a, b) => {
    const capA = liveCapacity[a.id];
    const capB = liveCapacity[b.id];
    if (!capA || !capB) return 0;

    switch (sortMode) {
      case 'urgency': {
        // Almost full first, then filling, then others
        const urgencyScore = (spots: number, trend: string) => {
          if (spots === 0) return 5; // full
          if (spots <= 3 && trend === 'filling') return 1; // critical
          if (spots <= 3) return 2; // low
          if (trend === 'filling') return 3; // filling
          return 4; // plenty
        };
        return urgencyScore(capA.liveSpots, capA.trend) - urgencyScore(capB.liveSpots, capB.trend);
      }
      case 'available':
        return capB.liveSpots - capA.liveSpots;
      case 'category':
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });

  const totalSpots = Object.values(liveCapacity).reduce((sum, c) => sum + c.liveSpots, 0);
  const fillingCount = Object.values(liveCapacity).filter((c) => c.trend === 'filling').length;
  const justOpenedCount = Object.values(liveCapacity).filter((c) => c.recentChange?.type === 'open').length;

  return (
    <div className="flex flex-col">
      <Header title={language === 'es' ? 'Disponibilidad en Vivo' : 'Live Availability'} showBack />

      <div className="px-4 py-3 space-y-4">
        {/* Live status banner */}
        <div className="rounded-xl bg-gradient-to-r from-denver-sky to-denver-sky/80 p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Activity className="w-4 h-4 text-white/80" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>
              <p className="text-xs text-white/70 uppercase tracking-wider">
                {language === 'es' ? 'En Vivo' : 'Live'}
              </p>
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-1 text-xs text-white/70 hover:text-white transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              {language === 'es' ? 'Actualizar' : 'Refresh'}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-xl font-bold">{totalSpots}</p>
              <p className="text-[10px] text-white/60 uppercase">
                {language === 'es' ? 'Lugares Abiertos' : 'Open Spots'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{fillingCount}</p>
              <p className="text-[10px] text-white/60 uppercase">
                {language === 'es' ? 'Llenandose' : 'Filling Fast'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{justOpenedCount}</p>
              <p className="text-[10px] text-white/60 uppercase">
                {language === 'es' ? 'Recien Abiertos' : 'Just Opened'}
              </p>
            </div>
          </div>
        </div>

        {/* Sort controls */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-denver-gray-mid" />
          <div className="flex gap-1 bg-denver-gray-soft p-1 rounded-lg">
            {([
              { value: 'urgency' as SortMode, labelEn: 'Urgency', labelEs: 'Urgencia' },
              { value: 'available' as SortMode, labelEn: 'Most Open', labelEs: 'Mas Abiertos' },
              { value: 'category' as SortMode, labelEn: 'Category', labelEs: 'Categoria' },
            ]).map((option) => (
              <button
                key={option.value}
                onClick={() => setSortMode(option.value)}
                className={`px-2.5 py-1 text-[10px] font-medium rounded-md transition-all ${
                  sortMode === option.value
                    ? 'bg-white text-denver-navy shadow-sm'
                    : 'text-denver-gray-mid'
                }`}
              >
                {language === 'es' ? option.labelEs : option.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Program capacity cards */}
        <div className="space-y-2">
          {sortedPrograms.map((program) => {
            const cap = liveCapacity[program.id];
            if (!cap) return null;

            const percentFull = ((program.spotsTotal - cap.liveSpots) / program.spotsTotal) * 100;
            const isFull = cap.liveSpots === 0;
            const isCritical = cap.liveSpots <= 3 && cap.liveSpots > 0;
            const accentColor = getCategoryAccentColor(program.category);

            return (
              <Link key={program.id} to={`/program/${program.id}`}>
                <Card className="hover:shadow-md transition-shadow overflow-hidden">
                  <div className="p-3">
                    <div className="flex items-start gap-3">
                      {/* Category icon */}
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0"
                        style={{ background: `${accentColor}15` }}
                      >
                        {getCategoryIcon(program.category)}
                      </div>

                      {/* Program info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-denver-navy truncate">
                              {language === 'es' ? program.nameEs : program.name}
                            </p>
                            <p className="text-[10px] text-denver-gray-mid truncate">
                              {language === 'es' ? (program.providerEs || program.provider) : program.provider}
                            </p>
                          </div>

                          {/* Live spots badge */}
                          <div className="shrink-0">
                            {isFull ? (
                              <Badge variant="default" className="bg-red-100 text-red-700 text-[10px]">
                                {language === 'es' ? 'Lleno' : 'Full'}
                              </Badge>
                            ) : isCritical ? (
                              <Badge variant="default" className="bg-amber-100 text-amber-700 text-[10px] animate-pulse">
                                {cap.liveSpots} {language === 'es' ? 'quedan' : 'left'}
                              </Badge>
                            ) : (
                              <Badge variant="default" className="bg-denver-green/10 text-denver-green text-[10px]">
                                {cap.liveSpots} {language === 'es' ? 'abiertos' : 'open'}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Capacity bar */}
                        <div className="mt-2">
                          <div className="w-full h-1.5 bg-denver-gray-soft rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                isFull ? 'bg-red-400' :
                                isCritical ? 'bg-amber-400' :
                                'bg-denver-green'
                              }`}
                              style={{ width: `${percentFull}%` }}
                            />
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[10px] text-denver-gray-mid">
                              {program.spotsTotal - cap.liveSpots}/{program.spotsTotal} {language === 'es' ? 'inscritos' : 'enrolled'}
                            </span>
                            <span className="text-[10px] text-denver-gray-mid flex items-center gap-0.5">
                              <Clock className="w-2.5 h-2.5" />
                              {cap.lastUpdated}
                            </span>
                          </div>
                        </div>

                        {/* Recent change alert */}
                        {cap.recentChange && (
                          <div className={`flex items-center gap-1 mt-1.5 text-[10px] ${
                            cap.recentChange.type === 'open' ? 'text-denver-green' : 'text-amber-600'
                          }`}>
                            <Zap className="w-2.5 h-2.5" />
                            {cap.recentChange.type === 'open'
                              ? (language === 'es'
                                  ? `${cap.recentChange.count} lugar${cap.recentChange.count > 1 ? 'es' : ''} se abri${cap.recentChange.count > 1 ? 'eron' : 'o'} hace ${cap.recentChange.minutesAgo}min`
                                  : `${cap.recentChange.count} spot${cap.recentChange.count > 1 ? 's' : ''} opened ${cap.recentChange.minutesAgo}min ago`)
                              : (language === 'es'
                                  ? `${cap.recentChange.count} lugar${cap.recentChange.count > 1 ? 'es tomados' : ' tomado'} hace ${cap.recentChange.minutesAgo}min`
                                  : `${cap.recentChange.count} spot${cap.recentChange.count > 1 ? 's' : ''} taken ${cap.recentChange.minutesAgo}min ago`)
                            }
                          </div>
                        )}

                        {/* Bottom row */}
                        <div className="flex items-center gap-3 mt-1.5 text-[10px] text-denver-gray-mid">
                          <span>{formatCurrency(program.cost)}</span>
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-2.5 h-2.5" />
                            {program.location.neighborhood}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <Users className="w-2.5 h-2.5" />
                            {program.ageRange.min}-{program.ageRange.max}y
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <p className="text-[10px] text-denver-gray-mid text-center px-4 pb-2">
          {language === 'es'
            ? 'La disponibilidad se actualiza en tiempo real cuando los programas reportan cambios de inscripcion.'
            : 'Availability updates in real-time as programs report enrollment changes.'}
        </p>
      </div>
    </div>
  );
}
