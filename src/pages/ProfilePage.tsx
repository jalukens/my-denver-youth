import { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Bell,
  Globe,
  HelpCircle,
  LogOut,
  TrendingUp,
  Award,
  ChevronRight,
  MessageCircle,
  Activity,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n';
import { family, recentCheckIns, checkinLocations } from '@/lib/mockData';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const { t, language, setLanguage } = useI18n();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="flex flex-col">
      <Header title={t('profile.title')} />

      <div className="px-4 py-3 space-y-4">
        {/* Family Info Card */}
        <Card>
          <div className="p-4">
            <h2 className="text-sm font-heading font-semibold text-denver-navy mb-3">
              {t('profile.familyInfo')}
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-denver-navy to-denver-purple flex items-center justify-center text-white font-heading font-bold text-lg shrink-0">
                  {family.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-denver-navy truncate">
                    The {family.name} Family
                  </p>
                  <p className="text-xs text-denver-gray-mid">
                    {family.children.length}{' '}
                    {language === 'es' ? 'hijos' : 'children'}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-denver-gray-mid">
                  <Mail className="w-4 h-4 text-denver-gray-mid shrink-0" />
                  <span className="truncate">{family.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-denver-gray-mid">
                  <Phone className="w-4 h-4 text-denver-gray-mid shrink-0" />
                  <span className="truncate">{family.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-denver-gray-mid">
                  <MapPin className="w-4 h-4 text-denver-gray-mid shrink-0" />
                  <span className="truncate">
                    {family.address.street}, {family.address.city},{' '}
                    {family.address.state} {family.address.zip}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Children Section */}
        <div>
          <h2 className="text-sm font-heading font-semibold text-denver-navy mb-3">
            {t('profile.children')}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {family.children.map((child) => (
              <Card key={child.id}>
                <div className="p-4 text-center">
                  <div className="w-14 h-14 rounded-full bg-denver-gold/20 flex items-center justify-center text-2xl mx-auto mb-2">
                    {child.avatar}
                  </div>
                  <p className="text-sm font-semibold text-denver-navy">{child.name}</p>
                  <p className="text-xs text-denver-gray-mid">
                    {language === 'es' ? `${child.age} anos` : `Age ${child.age}`}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-sm font-heading font-semibold text-denver-navy mb-3">
            {language === 'es' ? 'Herramientas' : 'Tools'}
          </h2>
          <div className="space-y-2">
            <Link to="/insights">
              <Card className="hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 p-4">
                  <div className="w-10 h-10 rounded-lg bg-denver-purple/10 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5 text-denver-purple" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-denver-navy">
                      {language === 'es' ? 'Inteligencia Academica' : 'Academic Insights'}
                    </p>
                    <p className="text-xs text-denver-gray-mid truncate">
                      {language === 'es'
                        ? 'Datos de DPS y recomendaciones personalizadas'
                        : 'DPS data & personalized recommendations'}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-denver-gray-mid shrink-0" />
                </div>
              </Card>
            </Link>
            <Link to="/passport">
              <Card className="hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 p-4">
                  <div className="w-10 h-10 rounded-lg bg-denver-sky/10 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-denver-sky" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-denver-navy">
                      {language === 'es' ? 'Pasaporte Juvenil' : 'Youth Passport'}
                    </p>
                    <p className="text-xs text-denver-gray-mid truncate">
                      {language === 'es'
                        ? 'Registro verificado de programas, credenciales y habilidades'
                        : 'Verified record of programs, credentials & skills'}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-denver-gray-mid shrink-0" />
                </div>
              </Card>
            </Link>
            <Link to="/voice">
              <Card className="hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 p-4">
                  <div className="w-10 h-10 rounded-lg bg-denver-gold/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-denver-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-denver-navy">
                      {language === 'es' ? 'Voz Juvenil' : 'Youth Voice'}
                    </p>
                    <p className="text-xs text-denver-gray-mid truncate">
                      {language === 'es'
                        ? 'Comparte tu opinion despues de cada sesion'
                        : 'Share feedback after each session'}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-denver-gray-mid shrink-0" />
                </div>
              </Card>
            </Link>
            <Link to="/capacity">
              <Card className="hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 p-4">
                  <div className="w-10 h-10 rounded-lg bg-denver-green/10 flex items-center justify-center shrink-0">
                    <Activity className="w-5 h-5 text-denver-green" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-denver-navy">
                      {language === 'es' ? 'Disponibilidad en Vivo' : 'Live Availability'}
                    </p>
                    <p className="text-xs text-denver-gray-mid truncate">
                      {language === 'es'
                        ? 'Lugares abiertos en tiempo real en todos los programas'
                        : 'Real-time open spots across all programs'}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-denver-gray-mid shrink-0" />
                </div>
              </Card>
            </Link>
          </div>
        </div>

        {/* My Denver Card */}
        <div>
          <h2 className="text-sm font-heading font-semibold text-denver-navy mb-3">
            {t('profile.denverCard')}
          </h2>
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-denver-gold via-amber-500 to-denver-gold p-4 shadow-lg shimmer-overlay">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-white" />
                  <span className="text-white font-heading font-bold text-sm">
                    My Denver Card
                  </span>
                </div>
                <span className="text-white/80 text-[10px] uppercase tracking-wider">
                  Youth
                </span>
              </div>
              <p className="text-white font-mono text-base tracking-widest mb-3">
                {family.denverCardNumber}
              </p>
              <div className="flex items-center justify-between gap-2">
                <p className="text-white/80 text-xs flex-1 min-w-0 truncate">
                  The {family.name} Family
                </p>
                <p className="text-white/80 text-xs flex-1 min-w-0 truncate text-right">
                  {family.children.map((c) => c.name).join(' & ')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Visits */}
        <div>
          <h2 className="text-sm font-heading font-semibold text-denver-navy mb-3">
            {language === 'es' ? 'Visitas Recientes' : 'Recent Visits'}
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
                            {new Date(checkin.timestamp).toLocaleDateString(
                              language === 'es' ? 'es-US' : 'en-US',
                              { month: 'short', day: 'numeric' }
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
        </div>

        {/* Settings */}
        <div>
          <h2 className="text-sm font-heading font-semibold text-denver-navy mb-3">
            {t('profile.settings')}
          </h2>
          <Card>
            <div className="divide-y divide-denver-gray-soft">
              {/* Notifications */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-denver-gray-mid" />
                  <span className="text-sm text-denver-navy">
                    {t('profile.notifications')}
                  </span>
                </div>
                <Switch
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>

              {/* Language Selector */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-denver-gray-mid" />
                  <span className="text-sm text-denver-navy">
                    {t('profile.language')}
                  </span>
                </div>
                <div className="flex gap-1 bg-denver-gray-soft p-1 rounded-lg">
                  <button
                    onClick={() => setLanguage('en')}
                    className={cn(
                      'px-3 py-1 text-xs font-medium rounded-md transition-all',
                      language === 'en'
                        ? 'bg-denver-navy text-white'
                        : 'text-denver-gray-mid hover:bg-denver-gray-soft'
                    )}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage('es')}
                    className={cn(
                      'px-3 py-1 text-xs font-medium rounded-md transition-all',
                      language === 'es'
                        ? 'bg-denver-navy text-white'
                        : 'text-denver-gray-mid hover:bg-denver-gray-soft'
                    )}
                  >
                    ES
                  </button>
                </div>
              </div>

              {/* Help & Support */}
              <button className="flex items-center gap-3 w-full p-4 text-left hover:bg-denver-gray-soft/50 transition-colors">
                <HelpCircle className="w-4 h-4 text-denver-gray-mid" />
                <span className="text-sm text-denver-navy">
                  {t('profile.help')}
                </span>
              </button>

              {/* Sign Out */}
              <button className="flex items-center gap-3 w-full p-4 text-left hover:bg-denver-gray-soft/50 transition-colors">
                <LogOut className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-600">
                  {t('profile.logout')}
                </span>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
