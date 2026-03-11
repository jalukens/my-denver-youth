import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Calendar,
  MapPin,
  Clock,
  CreditCard,
  Bell,
  Timer,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { FundingSummaryStrip } from '@/components/home/FundingSummaryStrip';
import { QuickActions } from '@/components/home/QuickActions';
import { UpcomingActivityRow } from '@/components/home/UpcomingActivityRow';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/lib/i18n';
import {
  family,
  fundingAccounts,
  programs,
  upcomingActivities,
  checkinLocations,
} from '@/lib/mockData';
import { getCategoryIcon } from '@/lib/utils';

export default function HomePage() {
  const { t, language } = useI18n();

  return (
    <div className="flex flex-col">
      {/* Header - home mode, no title */}
      <Header />

      {/* Welcome strip */}
      <div className="px-4 -mt-3 relative z-10">
        <div className="flex items-center gap-3 bg-white rounded-xl shadow-sm p-3">
          {/* Overlapping child avatars */}
          <div className="flex -space-x-2 shrink-0">
            {family.children.map((child) => (
              <div
                key={child.id}
                className="w-10 h-10 rounded-full bg-denver-gold/20 border-2 border-white flex items-center justify-center text-lg"
              >
                {child.avatar}
              </div>
            ))}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-heading font-bold text-sm text-denver-navy truncate">
              The {family.name} Family
            </h2>
            <p className="text-xs font-medium text-[#5A5A52] truncate">
              {family.children.map((c) => `${c.name} (${c.age})`).join(' & ')}{' '}
              · {upcomingActivities.length} upcoming
            </p>
          </div>
        </div>
      </div>

      {/* Funding Summary Strip */}
      <div className="px-4 mt-3">
        <FundingSummaryStrip accounts={fundingAccounts} lang={language} />
      </div>

      {/* Quick Actions - 3-column grid */}
      <div className="px-4 mt-3">
        <QuickActions lang={language} />
      </div>

      {/* Proactive Opportunities Banner */}
      <div className="px-4 mt-3">
        <Link to="/opportunities">
          <div className="rounded-xl bg-gradient-to-r from-denver-navy to-denver-purple p-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-white truncate">
                    {language === 'es' ? '7 oportunidades para tu familia' : '7 opportunities for your family'}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-white bg-red-500/35 rounded-full px-2 py-0.5">
                    <Timer className="w-2.5 h-2.5" />
                    {language === 'es' ? '1 urgente' : '1 urgent'}
                  </span>
                  <span className="text-[10px] font-semibold text-white bg-amber-500/35 rounded-full px-2 py-0.5">
                    {language === 'es' ? '3 proximas' : '3 upcoming'}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-white/60 shrink-0" />
            </div>
          </div>
        </Link>
      </div>

      {/* Tabbed Content */}
      <div className="px-4 mt-4 pb-4">
        <Tabs defaultValue="activity">
          <TabsList className="w-full">
            <TabsTrigger value="activity" className="flex-1 text-xs">
              {t('home.tabActivity')}
            </TabsTrigger>
            <TabsTrigger value="mycard" className="flex-1 text-xs">
              {t('home.tabMyCard')}
            </TabsTrigger>
            <TabsTrigger value="nearme" className="flex-1 text-xs">
              {t('home.tabNearMe')}
            </TabsTrigger>
          </TabsList>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card>
              <div className="p-3">
                {upcomingActivities.length === 0 ? (
                  <div className="flex flex-col items-center py-8">
                    <svg
                      className="w-48 h-16 mb-3"
                      viewBox="0 0 240 60"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ opacity: 0.12 }}
                    >
                      <polygon
                        points="0,60 20,38 50,48 85,18 120,40 160,8 200,32 230,20 240,28 240,60"
                        fill="#0D1B35"
                      />
                    </svg>
                    <p className="text-sm text-denver-gray-mid text-center">
                      {t('home.noActivities')}
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-denver-gray-soft">
                    {upcomingActivities.slice(0, 3).map((activity) => {
                      const program = programs.find((p) => p.id === activity.programId);
                      const child = family.children.find((c) => c.id === activity.childId);
                      if (!program || !child) return null;

                      const dateStr = new Date(activity.date + 'T00:00:00').toLocaleDateString(
                        language === 'es' ? 'es-US' : 'en-US',
                        { month: 'short', day: 'numeric' }
                      );

                      return (
                        <Link key={activity.id} to={`/program/${program.id}`}>
                          <UpcomingActivityRow
                            programName={language === 'es' ? program.nameEs : program.name}
                            childAvatar={child.avatar}
                            childName={child.name}
                            date={dateStr}
                            time={activity.startTime}
                            categoryIcon={getCategoryIcon(program.category)}
                          />
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </Card>
            <Link
              to="/calendar"
              className="flex items-center justify-center gap-1 text-xs font-medium text-denver-sky py-3"
            >
              <Calendar className="w-3.5 h-3.5" />
              {language === 'es' ? 'Ver Calendario' : 'View Calendar'}
            </Link>
          </TabsContent>

          {/* My Card Tab */}
          <TabsContent value="mycard">
            <div className="space-y-3">
              {/* Denver Card - gold gradient with shimmer */}
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

              {/* Partner locations banner */}
              <Link to="/experiences">
                <Card className="bg-denver-purple/5 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-denver-purple truncate">
                        {language === 'es' ? 'Lugares Asociados' : 'Partner Locations'}
                      </p>
                      <p className="text-xs text-denver-gray-mid truncate">
                        {language === 'es'
                          ? 'Admision gratuita y con descuento'
                          : 'Free & discounted admission'}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-denver-purple shrink-0" />
                  </div>
                </Card>
              </Link>
            </div>
          </TabsContent>

          {/* Near Me Tab */}
          <TabsContent value="nearme">
            <div className="space-y-2">
              {checkinLocations
                .sort((a, b) => a.distance - b.distance)
                .slice(0, 3)
                .map((location) => (
                  <Link key={location.id} to={`/checkin/${location.id}`}>
                    <Card className="hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 p-3">
                        <div className="w-9 h-9 rounded-lg bg-denver-green/10 flex items-center justify-center shrink-0">
                          <MapPin className="w-4 h-4 text-denver-green" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-denver-navy line-clamp-1">
                            {language === 'es' ? location.nameEs : location.name}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-denver-gray-mid mt-0.5">
                            <Badge
                              variant={location.type as 'library' | 'rec-center'}
                              className="text-[10px] px-1.5 py-0"
                            >
                              {location.type === 'library'
                                ? (language === 'es' ? 'Biblioteca' : 'Library')
                                : (language === 'es' ? 'Centro Rec.' : 'Rec Center')}
                            </Badge>
                            <span>{location.distance} mi</span>
                          </div>
                        </div>
                        <Clock className="w-3.5 h-3.5 text-denver-gray-mid shrink-0" />
                      </div>
                    </Card>
                  </Link>
                ))}
              <Link
                to="/checkin"
                className="flex items-center justify-center gap-1 text-xs font-medium text-denver-sky py-3"
              >
                <MapPin className="w-3.5 h-3.5" />
                {t('common.seeAll')}
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
