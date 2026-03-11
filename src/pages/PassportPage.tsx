import { useState } from 'react';
import {
  Award,
  BookOpen,
  Clock,
  Download,
  GraduationCap,
  Heart,
  Shield,
  Star,
  ChevronRight,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useI18n } from '@/lib/i18n';
import { family } from '@/lib/mockData';

// Mock passport data per child
const passportData: Record<string, {
  totalPrograms: number;
  totalHours: number;
  volunteerHours: number;
  credentials: { name: string; nameEs: string; issuer: string; date: string; icon: string }[];
  skills: { name: string; nameEs: string; level: number; maxLevel: number }[];
  milestones: { year: string; items: { label: string; labelEs: string; type: 'program' | 'credential' | 'volunteer' | 'milestone' }[] }[];
  domains: { name: string; nameEs: string; percent: number; color: string }[];
}> = {
  'child-001': {
    totalPrograms: 14,
    totalHours: 380,
    volunteerHours: 45,
    credentials: [
      { name: 'Python Programming Certificate', nameEs: 'Certificado de Programacion Python', issuer: 'Denver STEM Alliance', date: '2024-12', icon: '💻' },
      { name: 'Youth Leadership Award', nameEs: 'Premio de Liderazgo Juvenil', issuer: 'Mile High United Way', date: '2024-08', icon: '🏆' },
      { name: 'CPR & First Aid Certified', nameEs: 'Certificacion RCP y Primeros Auxilios', issuer: 'Red Cross Denver', date: '2024-06', icon: '🏥' },
      { name: 'Creative Arts Portfolio', nameEs: 'Portafolio de Artes Creativas', issuer: 'Denver Arts Council', date: '2023-12', icon: '🎨' },
      { name: 'Junior Naturalist Badge', nameEs: 'Insignia de Naturalista Junior', issuer: 'Denver Audubon', date: '2022-06', icon: '🌿' },
      { name: 'Scratch Coding Certificate', nameEs: 'Certificado de Codificacion Scratch', issuer: 'Denver STEM Alliance', date: '2021-05', icon: '🖥️' },
    ],
    skills: [
      { name: 'Coding & Technology', nameEs: 'Codificacion y Tecnologia', level: 4, maxLevel: 5 },
      { name: 'Leadership & Public Speaking', nameEs: 'Liderazgo y Oratoria', level: 4, maxLevel: 5 },
      { name: 'Visual Arts', nameEs: 'Artes Visuales', level: 4, maxLevel: 5 },
      { name: 'Teamwork & Collaboration', nameEs: 'Trabajo en Equipo y Colaboracion', level: 4, maxLevel: 5 },
      { name: 'Financial Literacy', nameEs: 'Educacion Financiera', level: 3, maxLevel: 5 },
      { name: 'Environmental Science', nameEs: 'Ciencias Ambientales', level: 3, maxLevel: 5 },
    ],
    milestones: [
      { year: '2025', items: [
        { label: 'Enrolled in Youth Workforce Readiness — internship track', labelEs: 'Inscrita en Preparacion Laboral Juvenil — pista de pasantias', type: 'program' },
        { label: 'Robotics Club — preparing for regional competition', labelEs: 'Club de Robotica — preparandose para competencia regional', type: 'program' },
        { label: 'Code Explorers — advanced Python projects', labelEs: 'Exploradores de Codigo — proyectos avanzados de Python', type: 'program' },
      ]},
      { year: '2024', items: [
        { label: 'Python Programming Certificate earned', labelEs: 'Certificado de Programacion Python obtenido', type: 'credential' },
        { label: 'Youth Leadership Award — community project lead', labelEs: 'Premio de Liderazgo Juvenil — lider de proyecto comunitario', type: 'credential' },
        { label: 'CPR & First Aid Certification', labelEs: 'Certificacion RCP y Primeros Auxilios', type: 'credential' },
        { label: '25 volunteer hours at Five Points community events', labelEs: '25 horas de voluntariado en eventos comunitarios de Five Points', type: 'volunteer' },
        { label: 'Basketball Academy — varsity prep', labelEs: 'Academia de Basquetbol — preparacion varsity', type: 'program' },
      ]},
      { year: '2023', items: [
        { label: 'Creative Arts Portfolio earned', labelEs: 'Portafolio de Artes Creativas obtenido', type: 'credential' },
        { label: 'Youth Art Studio — advanced mixed media', labelEs: 'Estudio de Arte Juvenil — medios mixtos avanzados', type: 'program' },
        { label: 'Soccer Stars — team captain', labelEs: 'Estrellas del Futbol — capitana del equipo', type: 'program' },
        { label: '12 volunteer hours at Denver Zoo', labelEs: '12 horas de voluntariado en el Zoologico de Denver', type: 'volunteer' },
      ]},
      { year: '2022', items: [
        { label: 'Nature Explorers — Junior Naturalist Badge', labelEs: 'Exploradores de la Naturaleza — Insignia Naturalista Junior', type: 'credential' },
        { label: 'Music Makers — violin intermediate level', labelEs: 'Creadores de Musica — nivel intermedio de violin', type: 'program' },
        { label: 'Creative Dance — hip-hop showcase performance', labelEs: 'Danza Creativa — presentacion de hip-hop', type: 'program' },
        { label: '8 volunteer hours at community garden', labelEs: '8 horas de voluntariado en jardin comunitario', type: 'volunteer' },
      ]},
      { year: '2021', items: [
        { label: 'Scratch Coding Certificate earned', labelEs: 'Certificado de Codificacion Scratch obtenido', type: 'credential' },
        { label: 'Code Explorers — first coding program', labelEs: 'Exploradores de Codigo — primer programa de codificacion', type: 'program' },
        { label: 'Soccer Stars — first season', labelEs: 'Estrellas del Futbol — primera temporada', type: 'program' },
      ]},
    ],
    domains: [
      { name: 'STEM & Technology', nameEs: 'STEM y Tecnologia', percent: 30, color: 'bg-blue-400' },
      { name: 'Leadership & Workforce', nameEs: 'Liderazgo y Empleo', percent: 25, color: 'bg-purple-400' },
      { name: 'Arts & Creativity', nameEs: 'Artes y Creatividad', percent: 20, color: 'bg-pink-400' },
      { name: 'Sports & Fitness', nameEs: 'Deportes y Fitness', percent: 15, color: 'bg-green-400' },
      { name: 'Community Service', nameEs: 'Servicio Comunitario', percent: 10, color: 'bg-amber-400' },
    ],
  },
  'child-002': {
    totalPrograms: 3,
    totalHours: 68,
    volunteerHours: 0,
    credentials: [
      { name: 'Soccer Fundamentals Certificate', nameEs: 'Certificado de Fundamentos de Futbol', issuer: 'Denver Parks & Rec', date: '2024-11', icon: '\u26BD' },
    ],
    skills: [
      { name: 'Soccer & Team Sports', nameEs: 'Futbol y Deportes de Equipo', level: 3, maxLevel: 5 },
      { name: 'Outdoor Exploration', nameEs: 'Exploracion al Aire Libre', level: 2, maxLevel: 5 },
      { name: 'Music Basics', nameEs: 'Bases de Musica', level: 1, maxLevel: 5 },
      { name: 'Teamwork', nameEs: 'Trabajo en Equipo', level: 2, maxLevel: 5 },
    ],
    milestones: [
      { year: '2025', items: [
        { label: 'Enrolled in Soccer Stars (Spring session)', labelEs: 'Inscrito en Estrellas del Futbol (sesion de primavera)', type: 'program' },
      ]},
      { year: '2024', items: [
        { label: 'Soccer Fundamentals Certificate earned', labelEs: 'Certificado de Fundamentos de Futbol obtenido', type: 'credential' },
        { label: 'Nature Explorers \u2014 completed 9 weeks', labelEs: 'Exploradores de la Naturaleza \u2014 completo 9 semanas', type: 'program' },
        { label: 'Music Makers \u2014 guitar introduction', labelEs: 'Creadores de Musica \u2014 introduccion a guitarra', type: 'program' },
      ]},
    ],
    domains: [
      { name: 'Sports & Fitness', nameEs: 'Deportes y Fitness', percent: 50, color: 'bg-green-400' },
      { name: 'Nature & Environment', nameEs: 'Naturaleza y Medio Ambiente', percent: 30, color: 'bg-emerald-400' },
      { name: 'Music & Performing Arts', nameEs: 'Musica y Artes Escenicas', percent: 20, color: 'bg-amber-400' },
    ],
  },
};

export default function PassportPage() {
  const { language } = useI18n();
  const [selectedChild, setSelectedChild] = useState(family.children[0].id);
  const data = passportData[selectedChild];
  const child = family.children.find((c) => c.id === selectedChild)!;

  const milestoneIcon = (type: string) => {
    switch (type) {
      case 'credential': return '\u{1F3C5}';
      case 'volunteer': return '\u{1F49B}';
      case 'milestone': return '\u2B50';
      default: return '\u{1F4CB}';
    }
  };

  return (
    <div className="flex flex-col">
      <Header title={language === 'es' ? 'Pasaporte Juvenil' : 'Youth Passport'} showBack />

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

        {/* Passport header card */}
        <div className="rounded-xl bg-gradient-to-r from-denver-navy to-denver-sky p-4 text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-white/80" />
              <span className="text-xs text-white/70 uppercase tracking-wider">
                {language === 'es' ? 'Registro Verificado' : 'Verified Record'}
              </span>
            </div>
            <button className="flex items-center gap-1 text-xs text-white/70 hover:text-white transition-colors">
              <Download className="w-3.5 h-3.5" />
              {language === 'es' ? 'Exportar' : 'Export'}
            </button>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl">
              {child.avatar}
            </div>
            <div>
              <p className="text-lg font-heading font-bold">{child.name} {family.name}</p>
              <p className="text-xs text-white/70">
                {language === 'es' ? `Edad ${child.age}` : `Age ${child.age}`} · {language === 'es' ? 'Denver, CO' : 'Denver, CO'}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-xl font-bold">{data.totalPrograms}</p>
              <p className="text-[10px] text-white/60 uppercase">{language === 'es' ? 'Programas' : 'Programs'}</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{data.totalHours}</p>
              <p className="text-[10px] text-white/60 uppercase">{language === 'es' ? 'Horas' : 'Hours'}</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{data.credentials.length}</p>
              <p className="text-[10px] text-white/60 uppercase">{language === 'es' ? 'Credenciales' : 'Credentials'}</p>
            </div>
          </div>
        </div>

        {/* Family-controlled notice */}
        <div className="flex items-center gap-2 bg-denver-amber/10 rounded-lg px-3 py-2">
          <Shield className="w-4 h-4 text-denver-gold shrink-0" />
          <p className="text-[10px] text-denver-gray-mid">
            {language === 'es'
              ? 'Controlado por la familia. Tu decides quien ve este registro.'
              : 'Family-controlled. You decide who sees this record.'}
          </p>
        </div>

        {/* Credentials */}
        <div>
          <h3 className="text-xs font-semibold text-denver-navy uppercase tracking-wide mb-2">
            {language === 'es' ? 'Credenciales y Certificados' : 'Credentials & Certificates'}
          </h3>
          <div className="space-y-2">
            {data.credentials.map((cred, i) => (
              <Card key={i}>
                <div className="flex items-center gap-3 p-3">
                  <div className="w-10 h-10 rounded-lg bg-denver-amber/10 flex items-center justify-center text-lg shrink-0">
                    {cred.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-denver-navy truncate">
                      {language === 'es' ? cred.nameEs : cred.name}
                    </p>
                    <p className="text-[10px] text-denver-gray-mid truncate">{cred.issuer} · {cred.date}</p>
                  </div>
                  <Award className="w-4 h-4 text-denver-gold shrink-0" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-xs font-semibold text-denver-navy uppercase tracking-wide mb-2">
            {language === 'es' ? 'Habilidades' : 'Skills'}
          </h3>
          <Card>
            <div className="p-4 space-y-3">
              {data.skills.map((skill, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-denver-navy font-medium">
                      {language === 'es' ? skill.nameEs : skill.name}
                    </span>
                    <span className="text-denver-gray-mid">
                      {skill.level}/{skill.maxLevel}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: skill.maxLevel }).map((_, j) => (
                      <div
                        key={j}
                        className={`h-2 flex-1 rounded-full ${
                          j < skill.level ? 'bg-denver-sky' : 'bg-denver-gray-soft'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Domain breakdown */}
        <div>
          <h3 className="text-xs font-semibold text-denver-navy uppercase tracking-wide mb-2">
            {language === 'es' ? 'Dominios Explorados' : 'Domains Explored'}
          </h3>
          <Card>
            <div className="p-4 space-y-2.5">
              {data.domains.map((domain) => (
                <div key={domain.name}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-denver-navy font-medium">
                      {language === 'es' ? domain.nameEs : domain.name}
                    </span>
                    <span className="text-denver-gray-mid">{domain.percent}%</span>
                  </div>
                  <div className="w-full h-2 bg-denver-gray-soft rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${domain.color}`}
                      style={{ width: `${domain.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Timeline */}
        <div>
          <h3 className="text-xs font-semibold text-denver-navy uppercase tracking-wide mb-2">
            {language === 'es' ? 'Cronologia' : 'Timeline'}
          </h3>
          {data.milestones.map((yearGroup) => (
            <div key={yearGroup.year} className="mb-4">
              <p className="text-xs font-bold text-denver-navy mb-2">{yearGroup.year}</p>
              <div className="space-y-1.5 pl-3 border-l-2 border-denver-sky/20">
                {yearGroup.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 relative">
                    <div className="absolute -left-[17px] top-1 w-2 h-2 rounded-full bg-denver-sky" />
                    <span className="text-sm shrink-0">{milestoneIcon(item.type)}</span>
                    <p className="text-xs text-denver-navy leading-relaxed">
                      {language === 'es' ? item.labelEs : item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
