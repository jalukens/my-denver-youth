import { Link } from 'react-router-dom';
import {
  QrCode,
  MapPin,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n';
import {
  checkinLocations,
  recentCheckIns,
  family,
  programs,
} from '@/lib/mockData';

export default function CheckInPage() {
  const { t, language } = useI18n();

  const sortedLocations = [...checkinLocations].sort((a, b) => a.distance - b.distance);

  return (
    <div className="flex flex-col">
      <Header title={t('checkin.title')} />

      <div className="px-4 py-3 space-y-4">
        {/* Scan QR Code card */}
        <Card className="bg-gradient-to-r from-denver-navy to-denver-purple overflow-hidden">
          <button className="w-full p-5 text-left">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                <QrCode className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-base font-heading font-bold text-white">
                  {t('checkin.scan')}
                </h2>
                <p className="text-xs text-white/70 mt-0.5">
                  {language === 'es'
                    ? 'Escanea el codigo en la ubicacion'
                    : 'Scan the code at the location'}
                </p>
              </div>
            </div>
          </button>
        </Card>

        {/* Nearby Locations */}
        <div>
          <h2 className="text-sm font-heading font-semibold text-denver-navy mb-3">
            {t('checkin.nearbyLocations')}
          </h2>
          <div className="space-y-2">
            {sortedLocations.map((location) => {
              const locationPrograms = location.programs
                .map((pid) => programs.find((p) => p.id === pid))
                .filter(Boolean);

              return (
                <Link key={location.id} to={`/checkin/${location.id}`}>
                  <Card className="hover:shadow-md transition-shadow">
                    <div className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-denver-green/10 flex items-center justify-center shrink-0">
                          <MapPin className="w-5 h-5 text-denver-green" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-denver-navy line-clamp-1">
                            {language === 'es' ? location.nameEs : location.name}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-denver-gray-mid mt-0.5">
                            <Badge
                              variant={location.type as 'library' | 'rec-center'}
                              className="text-[10px] px-1.5 py-0"
                            >
                              {location.type === 'library'
                                ? (language === 'es' ? 'Biblioteca' : 'Library')
                                : (language === 'es' ? 'Centro Rec.' : 'Rec Center')}
                            </Badge>
                            <span>
                              {location.distance} {t('common.milesAway')}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-denver-gray-mid mt-1">
                            <Clock className="w-3 h-3" />
                            <span>{language === 'es' ? location.hoursEs : location.hours}</span>
                          </div>
                          {locationPrograms.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {locationPrograms.map((prog) => (
                                <Badge key={prog!.id} variant="info" className="text-[10px] px-1.5 py-0">
                                  {language === 'es' ? prog!.nameEs : prog!.name}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <ChevronRight className="w-4 h-4 text-denver-gray-mid shrink-0" />
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Visits */}
        <div>
          <h2 className="text-sm font-heading font-semibold text-denver-navy mb-3">
            {t('checkin.recent')}
          </h2>
          {recentCheckIns.length === 0 ? (
            <p className="text-sm text-denver-gray-mid text-center py-4">
              {t('checkin.noRecent')}
            </p>
          ) : (
            <Card>
              <div className="divide-y divide-denver-gray-soft">
                {recentCheckIns.map((checkin) => {
                  const location = checkinLocations.find((l) => l.id === checkin.locationId);
                  const child = family.children.find((c) => c.id === checkin.childId);
                  const timestamp = new Date(checkin.timestamp);

                  return (
                    <div key={checkin.id} className="flex items-center gap-3 p-3">
                      <div className="w-8 h-8 rounded-lg bg-denver-green/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-denver-green" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-denver-navy line-clamp-1">
                          {location
                            ? (language === 'es' ? location.nameEs : location.name)
                            : 'Unknown'}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-denver-gray-mid mt-0.5">
                          <span>{child?.avatar} {child?.name}</span>
                          <span className="text-denver-gray-soft">|</span>
                          <span>
                            {timestamp.toLocaleDateString(
                              language === 'es' ? 'es-US' : 'en-US',
                              { month: 'short', day: 'numeric' }
                            )}
                          </span>
                          <span className="text-denver-gray-soft">|</span>
                          <Badge variant="default" className="text-[10px] px-1.5 py-0">
                            {checkin.type === 'program-session'
                              ? (language === 'es' ? 'Sesion' : 'Session')
                              : (language === 'es' ? 'Uso Libre' : 'Open Use')}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
