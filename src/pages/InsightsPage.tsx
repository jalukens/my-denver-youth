import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  BookOpen,
  Target,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useI18n } from '@/lib/i18n';
import { family, programs, fundingAccounts } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';

// Mock DPS academic data
const academicData: Record<string, {
  school: string;
  grade: string;
  attendance: { current: number; trend: 'up' | 'down' | 'stable'; lastMonth: number };
  engagement: { score: number; trend: 'up' | 'down' | 'stable' };
  gpa: { current: number; trend: 'up' | 'down' | 'stable' };
  alerts: { type: 'warning' | 'success' | 'info'; messageEn: string; messageEs: string }[];
  recommendedPrograms: { programId: string; reason: string; reasonEs: string; fundedAmount: number }[];
}> = {
  'child-001': {
    school: 'Denver East High School',
    grade: '10th Grade',
    attendance: { current: 94, trend: 'up', lastMonth: 92 },
    engagement: { score: 88, trend: 'up' },
    gpa: { current: 3.6, trend: 'up' },
    alerts: [
      { type: 'success', messageEn: 'Sofia\'s GPA improved since enrolling in Teen Leadership Academy — strong college prep trajectory', messageEs: 'El GPA de Sofia mejoro desde que se inscribio en la Academia de Liderazgo — fuerte trayectoria de preparacion universitaria' },
      { type: 'info', messageEn: 'Sofia is eligible for paid summer internships through Youth Workforce Readiness', messageEs: 'Sofia es elegible para pasantias pagadas de verano a traves de Preparacion Laboral Juvenil' },
    ],
    recommendedPrograms: [
      { programId: 'prog-010', reason: 'Builds leadership skills and earns volunteer hours for college applications', reasonEs: 'Desarrolla habilidades de liderazgo y gana horas de voluntariado para solicitudes universitarias', fundedAmount: 100 },
      { programId: 'prog-009', reason: 'Paid internship placement — workforce readiness aligned with career interests', reasonEs: 'Colocacion de pasantia pagada — preparacion laboral alineada con intereses profesionales', fundedAmount: 0 },
    ],
  },
  'child-002': {
    school: 'Whittier ECE-8',
    grade: '2nd Grade',
    attendance: { current: 78, trend: 'down', lastMonth: 85 },
    engagement: { score: 62, trend: 'down' },
    gpa: { current: 2.8, trend: 'down' },
    alerts: [
      { type: 'warning', messageEn: 'Diego\'s attendance dropped 7% this month — re-engagement recommended', messageEs: 'La asistencia de Diego bajo 7% este mes — se recomienda re-participacion' },
      { type: 'warning', messageEn: 'Engagement score below threshold — activity intervention suggested', messageEs: 'Puntuacion de participacion por debajo del umbral — se sugiere intervencion con actividades' },
    ],
    recommendedPrograms: [
      { programId: 'prog-001', reason: 'Team sports proven to improve attendance by 15% for similar profiles', reasonEs: 'Los deportes de equipo han demostrado mejorar la asistencia en un 15% para perfiles similares', fundedAmount: 150 },
      { programId: 'prog-004', reason: 'Outdoor programs linked to improved engagement in early elementary', reasonEs: 'Los programas al aire libre estan vinculados a mejor participacion en primaria temprana', fundedAmount: 120 },
      { programId: 'prog-008', reason: 'Creative movement supports social-emotional development', reasonEs: 'El movimiento creativo apoya el desarrollo socioemocional', fundedAmount: 160 },
    ],
  },
};

export default function InsightsPage() {
  const { t, language } = useI18n();
  const [selectedChild, setSelectedChild] = useState(family.children[0].id);
  const data = academicData[selectedChild];
  const child = family.children.find((c) => c.id === selectedChild)!;

  const trendIcon = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return <TrendingUp className="w-3.5 h-3.5 text-denver-green" />;
    if (trend === 'down') return <TrendingDown className="w-3.5 h-3.5 text-red-500" />;
    return <span className="w-3.5 h-3.5 text-denver-gray-mid">—</span>;
  };

  return (
    <div className="flex flex-col">
      <Header title={language === 'es' ? 'Inteligencia Academica' : 'Academic Insights'} showBack />

      <div className="px-4 py-3 space-y-4">
        {/* Child selector */}
        <div className="flex gap-2">
          {family.children.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedChild(c.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedChild === c.id
                  ? 'bg-denver-navy text-white shadow-sm'
                  : 'bg-denver-gray-soft text-denver-gray-mid hover:bg-denver-gray-soft'
              }`}
            >
              <span>{c.avatar}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>

        {/* School info */}
        <div className="flex items-center gap-2 text-sm text-denver-gray-mid">
          <BookOpen className="w-4 h-4 text-denver-gray-mid" />
          <span>{data.school} · {data.grade}</span>
        </div>

        {/* DPS Data disclaimer */}
        <p className="text-[10px] text-denver-gray-mid bg-denver-gray-soft/50 rounded-lg px-3 py-2">
          {language === 'es'
            ? 'Datos compartidos a traves de la asociacion con DPS. Controlado por la familia.'
            : 'Data shared through DPS partnership. Family-controlled.'}
        </p>

        {/* Metrics cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <div className="p-3 text-center">
              <p className="text-[10px] text-denver-gray-mid uppercase tracking-wide mb-1">
                {language === 'es' ? 'Asistencia' : 'Attendance'}
              </p>
              <div className="flex items-center justify-center gap-1">
                <span className={`text-xl font-bold ${data.attendance.current < 85 ? 'text-red-500' : 'text-denver-navy'}`}>
                  {data.attendance.current}%
                </span>
                {trendIcon(data.attendance.trend)}
              </div>
            </div>
          </Card>
          <Card>
            <div className="p-3 text-center">
              <p className="text-[10px] text-denver-gray-mid uppercase tracking-wide mb-1">
                {language === 'es' ? 'Participacion' : 'Engagement'}
              </p>
              <div className="flex items-center justify-center gap-1">
                <span className={`text-xl font-bold ${data.engagement.score < 70 ? 'text-amber-500' : 'text-denver-navy'}`}>
                  {data.engagement.score}
                </span>
                {trendIcon(data.engagement.trend)}
              </div>
            </div>
          </Card>
          <Card>
            <div className="p-3 text-center">
              <p className="text-[10px] text-denver-gray-mid uppercase tracking-wide mb-1">GPA</p>
              <div className="flex items-center justify-center gap-1">
                <span className="text-xl font-bold text-denver-navy">{data.gpa.current}</span>
                {trendIcon(data.gpa.trend)}
              </div>
            </div>
          </Card>
        </div>

        {/* Alerts */}
        {data.alerts.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-denver-navy uppercase tracking-wide">
              {language === 'es' ? 'Alertas y Novedades' : 'Alerts & Updates'}
            </h3>
            {data.alerts.map((alert, i) => (
              <Card key={i} className={`border-l-4 ${
                alert.type === 'warning' ? 'border-l-amber-400' :
                alert.type === 'success' ? 'border-l-denver-green' :
                'border-l-denver-sky'
              }`}>
                <div className="flex items-start gap-2.5 p-3">
                  {alert.type === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  ) : alert.type === 'success' ? (
                    <CheckCircle className="w-4 h-4 text-denver-green shrink-0 mt-0.5" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-denver-sky shrink-0 mt-0.5" />
                  )}
                  <p className="text-xs text-denver-navy leading-relaxed">
                    {language === 'es' ? alert.messageEs : alert.messageEn}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Recommended re-engagement programs */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-denver-navy uppercase tracking-wide">
            {language === 'es'
              ? `Programas Recomendados para ${child.name}`
              : `Recommended Programs for ${child.name}`}
          </h3>
          <p className="text-[10px] text-denver-gray-mid">
            {language === 'es'
              ? 'Seleccionados por IA basado en datos academicos, intereses y fondos disponibles'
              : 'AI-selected based on academic data, interests, and available funding'}
          </p>
          {data.recommendedPrograms.map((rec) => {
            const program = programs.find((p) => p.id === rec.programId);
            if (!program) return null;
            const outOfPocket = Math.max(0, program.cost - rec.fundedAmount);

            return (
              <Link key={rec.programId} to={`/program/${program.id}`}>
                <Card className="hover:shadow-md transition-shadow">
                  <div className="p-3">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-denver-navy truncate">
                          {language === 'es' ? program.nameEs : program.name}
                        </p>
                        <p className="text-[10px] text-denver-gray-mid truncate">
                          {language === 'es' ? (program.providerEs || program.provider) : program.provider}
                        </p>
                      </div>
                      <Badge variant="default" className={`shrink-0 text-[10px] ${outOfPocket === 0 ? 'bg-denver-green/10 text-denver-green' : 'bg-denver-gray-soft text-denver-gray-mid'}`}>
                        {outOfPocket === 0
                          ? (language === 'es' ? 'Gratis' : 'FREE')
                          : `$${outOfPocket}`}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      <Target className="w-3 h-3 text-denver-purple shrink-0" />
                      <p className="text-[10px] text-denver-purple leading-snug">
                        {language === 'es' ? rec.reasonEs : rec.reason}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-denver-gray-mid">
                      <span>{program.schedule.days.join(', ')} · {program.schedule.startTime}</span>
                      <span className="flex items-center gap-0.5">
                        {language === 'es' ? 'Ver programa' : 'View program'}
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
