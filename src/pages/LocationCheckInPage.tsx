import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Clock,
  CheckCircle2,
  Users,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n';
import { checkinLocations, programs, family } from '@/lib/mockData';
import { cn } from '@/lib/utils';

export default function LocationCheckInPage() {
  const { locationId } = useParams<{ locationId: string }>();
  const navigate = useNavigate();
  const { t, language } = useI18n();

  const [selectedChildren, setSelectedChildren] = useState<string[]>([]);
  const [checkedIn, setCheckedIn] = useState(false);

  const location = checkinLocations.find((l) => l.id === locationId);

  if (!location) {
    return (
      <div className="flex flex-col">
        <Header title={t('checkin.title')} showBack />
        <div className="px-4 py-8 text-center">
          <p className="text-sm text-denver-gray-mid">
            {language === 'es' ? 'Ubicacion no encontrada' : 'Location not found'}
          </p>
        </div>
      </div>
    );
  }

  const locationPrograms = location.programs
    .map((pid) => programs.find((p) => p.id === pid))
    .filter(Boolean);

  const locationName = language === 'es' ? location.nameEs : location.name;

  const toggleChild = (childId: string) => {
    setSelectedChildren((prev) =>
      prev.includes(childId) ? prev.filter((id) => id !== childId) : [...prev, childId]
    );
  };

  const handleConfirm = () => {
    setCheckedIn(true);
  };

  // Check-in success overlay
  if (checkedIn) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header title={locationName} showBack />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center animate-check-in-success">
            <div className="w-20 h-20 rounded-full bg-denver-teal-light flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-denver-green" />
            </div>
            <h2 className="text-xl font-heading font-bold text-denver-navy mb-2">
              {t('checkin.success')}
            </h2>
            <p className="text-sm text-denver-gray-mid mb-1">{locationName}</p>
            <div className="flex items-center justify-center gap-2 mb-6">
              {selectedChildren.map((childId) => {
                const child = family.children.find((c) => c.id === childId);
                return child ? (
                  <span key={childId} className="text-lg">
                    {child.avatar}
                  </span>
                ) : null;
              })}
            </div>
            <p className="text-xs text-denver-gray-mid mb-6">
              {new Date().toLocaleString(language === 'es' ? 'es-US' : 'en-US', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </p>
            <div className="space-y-2">
              <Button
                className="w-full"
                onClick={() => navigate('/checkin')}
              >
                {language === 'es' ? 'Regresar' : 'Back to Check-In'}
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => navigate('/')}
              >
                {language === 'es' ? 'Ir al Inicio' : 'Go Home'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header title={locationName} showBack />

      <div className="px-4 py-3 space-y-4">
        {/* Location Details */}
        <Card>
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant={location.type as 'library' | 'rec-center'}>
                {location.type === 'library'
                  ? (language === 'es' ? 'Biblioteca' : 'Library')
                  : (language === 'es' ? 'Centro de Recreacion' : 'Recreation Center')}
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-sm text-denver-gray-mid">
              <MapPin className="w-4 h-4 text-denver-gray-mid shrink-0" />
              <span>{location.address}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-denver-gray-mid">
              <Clock className="w-4 h-4 text-denver-gray-mid shrink-0" />
              <span>{language === 'es' ? location.hoursEs : location.hours}</span>
            </div>

            {locationPrograms.length > 0 && (
              <div>
                <p className="text-xs text-denver-gray-mid mb-1.5">
                  {language === 'es' ? 'Programas Activos' : 'Active Programs'}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {locationPrograms.map((prog) => (
                    <Badge key={prog!.id} variant="info" className="text-[10px]">
                      {language === 'es' ? prog!.nameEs : prog!.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Who is checking in? */}
        <div>
          <h2 className="text-sm font-heading font-semibold text-denver-navy mb-3 flex items-center gap-2">
            <Users className="w-4 h-4" />
            {language === 'es' ? 'Quien se registra?' : 'Who is checking in?'}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {family.children.map((child) => {
              const isSelected = selectedChildren.includes(child.id);
              return (
                <button
                  key={child.id}
                  onClick={() => toggleChild(child.id)}
                  className="w-full"
                >
                  <Card
                    className={cn(
                      'transition-all',
                      isSelected
                        ? 'ring-2 ring-denver-green shadow-md'
                        : 'hover:shadow-md'
                    )}
                  >
                    <div className="p-4 text-center">
                      <div
                        className={cn(
                          'w-14 h-14 rounded-full flex items-center justify-center text-2xl mx-auto mb-2 transition-colors',
                          isSelected ? 'bg-denver-green/20' : 'bg-denver-gold/20'
                        )}
                      >
                        {child.avatar}
                      </div>
                      <p className="text-sm font-semibold text-denver-navy">{child.name}</p>
                      <p className="text-xs text-denver-gray-mid">
                        {language === 'es' ? `${child.age} anos` : `Age ${child.age}`}
                      </p>
                      {isSelected && (
                        <div className="mt-2">
                          <CheckCircle2 className="w-5 h-5 text-denver-green mx-auto" />
                        </div>
                      )}
                    </div>
                  </Card>
                </button>
              );
            })}
          </div>
        </div>

        {/* Confirm button */}
        <Button
          size="lg"
          className="w-full"
          disabled={selectedChildren.length === 0}
          onClick={handleConfirm}
        >
          {t('checkin.confirm')}
          {selectedChildren.length > 0 && (
            <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
              {selectedChildren.length}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
