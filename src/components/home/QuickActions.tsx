import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface QuickActionsProps {
  lang: 'en' | 'es';
}

const actions = [
  {
    labelEn: 'Find Programs',
    labelEs: 'Buscar Programas',
    icon: Search,
    iconBg: 'bg-denver-purple/10',
    iconColor: 'text-denver-purple',
    path: '/explore',
  },
  {
    labelEn: 'Check In',
    labelEs: 'Registrarse',
    icon: MapPin,
    iconBg: 'bg-denver-gold/15',
    iconColor: 'text-denver-gold',
    path: '/checkin',
  },
  {
    labelEn: 'Calendar',
    labelEs: 'Calendario',
    icon: Calendar,
    iconBg: 'bg-denver-green/10',
    iconColor: 'text-denver-green',
    path: '/calendar',
  },
];

export function QuickActions({ lang }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {actions.map((action) => (
        <Link key={action.path} to={action.path}>
          <Card className="hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center py-3">
              <div
                className={`w-10 h-10 rounded-xl ${action.iconBg} flex items-center justify-center mb-1.5`}
              >
                <action.icon className={`w-5 h-5 ${action.iconColor}`} />
              </div>
              <span className="text-xs font-bold text-[#0D1B35]">
                {lang === 'es' ? action.labelEs : action.labelEn}
              </span>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
