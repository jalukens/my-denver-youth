import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Ticket, Wallet, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', icon: Home, path: '/' },
  { label: 'Exp.', icon: Ticket, path: '/experiences' },
  { label: 'Explore', icon: Compass, path: '/explore', featured: true },
  { label: 'Funding', icon: Wallet, path: '/funding' },
  { label: 'Profile', icon: User, path: '/profile' },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed md:static bottom-0 left-0 right-0 z-50 bg-white border-t border-denver-gray-soft max-w-2xl mx-auto md:max-w-none md:shrink-0">
      <div className="grid grid-cols-5 pb-2 pt-1">
        {navItems.map((item) => {
          const isActive =
            item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path);

          if (item.featured) {
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-end gap-0.5 -mt-4"
              >
                <div
                  className={cn(
                    'w-11 h-11 rounded-full bg-denver-amber flex items-center justify-center',
                    isActive && 'ring-2 ring-denver-amber/30'
                  )}
                  style={{ boxShadow: '0 4px 16px rgba(245,166,35,0.4)' }}
                >
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <span
                  className={cn(
                    'text-[10px]',
                    isActive
                      ? 'text-denver-teal font-extrabold'
                      : 'text-[#8A8A82]'
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-end gap-0.5 pt-2"
            >
              <item.icon
                className={cn(
                  'w-5 h-5',
                  isActive ? 'text-denver-teal' : 'text-[#8A8A82]'
                )}
              />
              <span
                className={cn(
                  'text-[10px]',
                  isActive
                    ? 'text-denver-teal font-extrabold'
                    : 'text-[#8A8A82]'
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
