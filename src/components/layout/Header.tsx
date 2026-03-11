import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Bell, User } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showNotification?: boolean;
  transparent?: boolean;
}

export function Header({
  title,
  showBack = false,
  showNotification = false,
  transparent = false,
}: HeaderProps) {
  const navigate = useNavigate();
  const _location = useLocation();

  // Home mode: no title provided — dawn gradient with inline mountain SVGs
  if (!title) {
    return (
      <div className="sticky top-0 z-40">
        <header className="denver-dawn-gradient pt-6 pb-5 px-4 relative overflow-hidden">
          {/* Inline mountain watermark SVG — 3-4 jagged peaks, white, opacity 0.08 */}
          <svg
            className="absolute bottom-0 left-0 w-full pointer-events-none"
            style={{ height: '40%', opacity: 0.08 }}
            viewBox="0 0 400 80"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points="0,80 30,55 65,68 110,30 155,52 200,14 250,46 295,18 340,42 380,28 400,40 400,80"
              fill="white"
            />
          </svg>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-baseline gap-1.5 whitespace-nowrap">
              <span className="text-xl font-heading text-white leading-none">
                MY
              </span>
              <span className="text-lg text-denver-amber font-heading leading-none">
                Denver Youth
              </span>
            </div>

            <div className="flex items-center gap-2">
              <LanguageToggle variant="light" />
              <button className="relative w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <Bell className="w-4 h-4 text-white/80" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-denver-red rounded-full" />
              </button>
              <Link to="/profile" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <User className="w-4 h-4 text-white/80" />
              </Link>
            </div>
          </div>
        </header>

        {/* Mountain ridge section divider — cream peaks cutting into navy */}
        <svg
          className="w-full block"
          viewBox="0 0 400 28"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ height: '28px', marginTop: '-1px', background: '#153540' }}
        >
          <polygon
            points="0,28 0,20 45,24 85,8 125,18 165,3 210,16 255,5 295,14 335,7 370,18 400,12 400,28"
            fill="#F5F4F0"
          />
        </svg>
      </div>
    );
  }

  // Page mode: title provided — white header
  return (
    <header className="sticky top-0 z-40 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="w-10">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="p-1 -ml-1 text-denver-gray-mid hover:text-denver-navy"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
        </div>

        <h1 className="text-base font-heading text-denver-navy text-center flex-1">
          {title}
        </h1>

        <div className="w-10 flex justify-end">
          <LanguageToggle variant="dark" />
        </div>
      </div>
    </header>
  );
}
