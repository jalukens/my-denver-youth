import type { ReactNode } from 'react';
import { BottomNav } from './BottomNav';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="md:h-screen md:flex md:items-center md:justify-center md:relative md:overflow-hidden">
      {/* Desktop decorative background — teal radial glow */}
      <div
        className="hidden md:block absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(26,122,110,0.15) 0%, transparent 70%)',
        }}
      />

      {/* Desktop mountain silhouette along bottom */}
      <svg
        className="hidden md:block absolute bottom-0 left-0 w-full pointer-events-none"
        style={{ height: '20%', opacity: 0.05 }}
        viewBox="0 0 1600 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="0,120 80,70 180,95 300,30 420,75 540,15 680,55 800,25 920,65 1040,20 1160,50 1280,35 1400,70 1500,45 1600,60 1600,120"
          fill="white"
        />
      </svg>

      {/* Desktop repeating small mountain motif */}
      <div
        className="hidden md:block absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='0,40 25,18 50,30 80,8 110,25 140,12 170,28 200,16 200,40' fill='white' fill-opacity='0.02'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 40px',
          backgroundPosition: 'bottom',
        }}
      />

      {/* Phone frame */}
      <div className="phone-frame md:w-[390px] md:rounded-[2.5rem] md:overflow-hidden md:flex md:flex-col">
        <div className="bg-denver-cream min-h-screen md:min-h-0 md:flex-1 md:overflow-y-auto mountain-page-bg scrollbar-hide">
          <div className="mx-auto max-w-2xl relative pb-20 md:pb-0 md:max-w-none">
            {children}
          </div>
        </div>
        <BottomNav />
      </div>
    </div>
  );
}
