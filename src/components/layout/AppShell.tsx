import type { ReactNode } from 'react';
import { BottomNav } from './BottomNav';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="bg-denver-cream min-h-screen mountain-page-bg">
      <div className="mx-auto max-w-2xl relative min-h-screen pb-20">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
