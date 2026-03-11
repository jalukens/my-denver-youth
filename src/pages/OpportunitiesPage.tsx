import { Link } from 'react-router-dom';
import {
  Bell,
  Calendar,
  ChevronRight,
  Clock,
  DollarSign,
  Gift,
  RefreshCw,
  Sparkles,
  Star,
  Timer,
  TrendingUp,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/lib/i18n';

interface Opportunity {
  id: string;
  urgency: 'urgent' | 'soon' | 'info';
  icon: React.ReactNode;
  titleEn: string;
  titleEs: string;
  descriptionEn: string;
  descriptionEs: string;
  reasonEn: string;
  reasonEs: string;
  deadlineEn?: string;
  deadlineEs?: string;
  childName?: string;
  childAvatar?: string;
  ctaLabelEn: string;
  ctaLabelEs: string;
  ctaLink: string;
}

const opportunities: Opportunity[] = [
  {
    id: 'opp-001',
    urgency: 'urgent',
    icon: <Timer className="w-5 h-5 text-red-500" />,
    titleEn: 'CCCAP funding expires June 30',
    titleEs: 'Fondos CCCAP expiran el 30 de junio',
    descriptionEn: 'You have $1,200 remaining in CCCAP funds. Enroll in eligible programs before the deadline to avoid losing this benefit.',
    descriptionEs: 'Tienes $1,200 restantes en fondos CCCAP. Inscribete en programas elegibles antes de la fecha limite para no perder este beneficio.',
    reasonEn: 'Based on your funding account balance',
    reasonEs: 'Basado en el saldo de tu cuenta de fondos',
    deadlineEn: '45 days left',
    deadlineEs: '45 dias restantes',
    ctaLabelEn: 'Find eligible programs',
    ctaLabelEs: 'Buscar programas elegibles',
    ctaLink: '/explore',
  },
  {
    id: 'opp-002',
    urgency: 'soon',
    icon: <RefreshCw className="w-5 h-5 text-denver-purple" />,
    titleEn: 'Summer Soccer Stars registration opens March 25',
    titleEs: 'Inscripcion de Estrellas del Futbol de verano abre el 25 de marzo',
    descriptionEn: 'Diego played Soccer Stars last season and loved it. Summer session spots fill fast — register early to guarantee a spot.',
    descriptionEs: 'Diego jugo Estrellas del Futbol la temporada pasada y le encanto. Los lugares de la sesion de verano se llenan rapido — registrate temprano para garantizar un lugar.',
    reasonEn: 'Diego was enrolled in Soccer Stars (Fall 2024)',
    reasonEs: 'Diego estuvo inscrito en Estrellas del Futbol (Otono 2024)',
    deadlineEn: 'Opens in 2 weeks',
    deadlineEs: 'Abre en 2 semanas',
    childName: 'Diego',
    childAvatar: '👦',
    ctaLabelEn: 'View program',
    ctaLabelEs: 'Ver programa',
    ctaLink: '/program/prog-001',
  },
  {
    id: 'opp-003',
    urgency: 'soon',
    icon: <TrendingUp className="w-5 h-5 text-denver-sky" />,
    titleEn: 'Sofia qualifies for paid summer internships',
    titleEs: 'Sofia califica para pasantias pagadas de verano',
    descriptionEn: 'Based on her Youth Workforce Readiness progress, Sofia is eligible for 3 paid summer internship placements with Denver employers. Application deadline is April 15.',
    descriptionEs: 'Basado en su progreso en Preparacion Laboral Juvenil, Sofia es elegible para 3 colocaciones de pasantias pagadas de verano con empleadores de Denver. La fecha limite de solicitud es el 15 de abril.',
    reasonEn: 'Matched from Youth Workforce Readiness enrollment + DPS academic data',
    reasonEs: 'Emparejado desde inscripcion en Preparacion Laboral Juvenil + datos academicos de DPS',
    deadlineEn: 'Apply by April 15',
    deadlineEs: 'Aplica antes del 15 de abril',
    childName: 'Sofia',
    childAvatar: '👧',
    ctaLabelEn: 'View details',
    ctaLabelEs: 'Ver detalles',
    ctaLink: '/program/prog-009',
  },
  {
    id: 'opp-004',
    urgency: 'info',
    icon: <Sparkles className="w-5 h-5 text-denver-gold" />,
    titleEn: '3 new STEM programs match Diego\'s interests',
    titleEs: '3 nuevos programas STEM coinciden con los intereses de Diego',
    descriptionEn: 'New spring coding and robotics programs just opened in your area. Diego\'s age and past Nature Explorers enrollment make him a great fit.',
    descriptionEs: 'Nuevos programas de codificacion y robotica de primavera acaban de abrir en tu zona. La edad de Diego y su inscripcion pasada en Exploradores de la Naturaleza lo hacen un gran candidato.',
    reasonEn: 'Matched from Diego\'s age, neighborhood, and activity history',
    reasonEs: 'Emparejado por la edad de Diego, vecindario e historial de actividades',
    childName: 'Diego',
    childAvatar: '👦',
    ctaLabelEn: 'Explore programs',
    ctaLabelEs: 'Explorar programas',
    ctaLink: '/explore',
  },
  {
    id: 'opp-005',
    urgency: 'info',
    icon: <Star className="w-5 h-5 text-amber-500" />,
    titleEn: 'Sofia can earn volunteer hours this weekend',
    titleEs: 'Sofia puede ganar horas de voluntariado este fin de semana',
    descriptionEn: 'Five Points Community Clean-Up on Saturday 9am–12pm. Counts toward Teen Leadership Academy volunteer requirements and looks great on college applications.',
    descriptionEs: 'Limpieza Comunitaria de Five Points el sabado 9am–12pm. Cuenta para los requisitos de voluntariado de la Academia de Liderazgo y se ve genial en solicitudes universitarias.',
    reasonEn: 'Near your neighborhood + aligned with Leadership Academy goals',
    reasonEs: 'Cerca de tu vecindario + alineado con metas de la Academia de Liderazgo',
    childName: 'Sofia',
    childAvatar: '👧',
    ctaLabelEn: 'Learn more',
    ctaLabelEs: 'Mas informacion',
    ctaLink: '/passport',
  },
  {
    id: 'opp-006',
    urgency: 'info',
    icon: <Gift className="w-5 h-5 text-denver-green" />,
    titleEn: 'Free Denver Zoo weekend — March 15–16',
    titleEs: 'Fin de semana gratis en el Zoologico de Denver — 15–16 de marzo',
    descriptionEn: 'Your My Denver Card gets the whole family free admission this weekend. Special spring animal exhibit opening.',
    descriptionEs: 'Tu Tarjeta Mi Denver le da a toda la familia admision gratuita este fin de semana. Apertura especial de exhibicion de animales de primavera.',
    reasonEn: 'Your My Denver Card benefit',
    reasonEs: 'Beneficio de tu Tarjeta Mi Denver',
    ctaLabelEn: 'View experiences',
    ctaLabelEs: 'Ver experiencias',
    ctaLink: '/experiences',
  },
  {
    id: 'opp-007',
    urgency: 'soon',
    icon: <DollarSign className="w-5 h-5 text-denver-green" />,
    titleEn: 'DPS Activity Grant — $300 remaining',
    titleEs: 'Beca de Actividades DPS — $300 restantes',
    descriptionEn: 'Your DPS Activity Grant expires August 31. This covers STEM, arts, academic, and music programs. Sofia\'s Robotics Club and Diego\'s Music Makers are both eligible.',
    descriptionEs: 'Tu Beca de Actividades DPS expira el 31 de agosto. Esto cubre programas de STEM, artes, academicos y musica. El Club de Robotica de Sofia y los Creadores de Musica de Diego son elegibles.',
    reasonEn: 'Based on your DPS grant balance and enrolled programs',
    reasonEs: 'Basado en tu saldo de beca DPS y programas inscritos',
    deadlineEn: 'Expires Aug 31',
    deadlineEs: 'Expira 31 de agosto',
    ctaLabelEn: 'View funding',
    ctaLabelEs: 'Ver fondos',
    ctaLink: '/funding',
  },
];

const urgencyConfig = {
  urgent: {
    border: 'border-l-denver-red',
    bg: 'bg-denver-red/5',
    badgeBg: 'bg-denver-red/10 text-denver-red',
    labelEn: 'Action needed',
    labelEs: 'Accion necesaria',
  },
  soon: {
    border: 'border-l-denver-amber',
    bg: 'bg-denver-amber/5',
    badgeBg: 'bg-denver-amber/10 text-denver-amber',
    labelEn: 'Coming soon',
    labelEs: 'Proximamente',
  },
  info: {
    border: 'border-l-denver-sky',
    bg: 'bg-denver-sky/5',
    badgeBg: 'bg-denver-sky/10 text-denver-sky',
    labelEn: 'For you',
    labelEs: 'Para ti',
  },
};

export default function OpportunitiesPage() {
  const { language } = useI18n();

  const urgentCount = opportunities.filter((o) => o.urgency === 'urgent').length;
  const soonCount = opportunities.filter((o) => o.urgency === 'soon').length;

  return (
    <div className="flex flex-col">
      <Header title={language === 'es' ? 'Para Tu Familia' : 'For Your Family'} showBack />

      <div className="px-4 py-3 space-y-4">
        {/* Summary banner */}
        <div className="rounded-xl bg-gradient-to-r from-denver-navy to-denver-purple p-4 text-white">
          <div className="flex items-center gap-2 mb-1">
            <Bell className="w-4 h-4 text-white/80" />
            <p className="text-xs text-white/70 uppercase tracking-wider">
              {language === 'es' ? 'Concierge Familiar' : 'Family Concierge'}
            </p>
          </div>
          <p className="text-sm text-white/90 leading-relaxed">
            {language === 'es'
              ? `Tienes ${urgentCount} alerta${urgentCount !== 1 ? 's' : ''} urgente${urgentCount !== 1 ? 's' : ''} y ${soonCount} oportunidad${soonCount !== 1 ? 'es' : ''} proxima${soonCount !== 1 ? 's' : ''} basadas en el historial y necesidades de tu familia.`
              : `You have ${urgentCount} urgent alert${urgentCount !== 1 ? 's' : ''} and ${soonCount} upcoming opportunit${soonCount !== 1 ? 'ies' : 'y'} based on your family's history and needs.`}
          </p>
          <p className="text-[10px] text-white/50 mt-2">
            {language === 'es'
              ? 'Combinando datos de DPS, historial de programas y fondos disponibles'
              : 'Combining DPS data, program history, and available funding'}
          </p>
        </div>

        {/* Opportunity cards */}
        <div className="space-y-3">
          {opportunities.map((opp) => {
            const config = urgencyConfig[opp.urgency];
            return (
              <Card key={opp.id} className={`border-l-4 ${config.border} overflow-hidden`}>
                <div className="p-4">
                  {/* Header row */}
                  <div className="flex items-start gap-3 mb-2">
                    <div className={`w-9 h-9 rounded-full ${config.bg} flex items-center justify-center shrink-0`}>
                      {opp.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="default" className={`text-[10px] px-1.5 py-0 ${config.badgeBg}`}>
                          {language === 'es' ? config.labelEs : config.labelEn}
                        </Badge>
                        {opp.deadlineEn && (
                          <span className="flex items-center gap-0.5 text-[10px] text-denver-gray-mid">
                            <Clock className="w-2.5 h-2.5" />
                            {language === 'es' ? opp.deadlineEs : opp.deadlineEn}
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-semibold text-denver-navy leading-snug">
                        {language === 'es' ? opp.titleEs : opp.titleEn}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-denver-gray-mid leading-relaxed mb-2 pl-12">
                    {language === 'es' ? opp.descriptionEs : opp.descriptionEn}
                  </p>

                  {/* Why surfaced */}
                  <div className="flex items-center gap-2 pl-12 mb-3">
                    {opp.childAvatar && (
                      <span className="text-sm">{opp.childAvatar}</span>
                    )}
                    <p className="text-[10px] text-denver-gray-mid italic">
                      {language === 'es' ? opp.reasonEs : opp.reasonEn}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="pl-12">
                    <Link
                      to={opp.ctaLink}
                      className="inline-flex items-center gap-1 text-xs font-medium text-denver-sky hover:text-denver-sky/80 transition-colors"
                    >
                      {language === 'es' ? opp.ctaLabelEs : opp.ctaLabelEn}
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="text-[10px] text-denver-gray-mid text-center px-4 pb-2">
          {language === 'es'
            ? 'Las oportunidades se actualizan diariamente usando datos de DPS, historial de inscripcion y cuentas de fondos.'
            : 'Opportunities update daily using DPS data, enrollment history, and funding accounts.'}
        </p>
      </div>
    </div>
  );
}
