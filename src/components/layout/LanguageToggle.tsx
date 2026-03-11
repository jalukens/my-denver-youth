import { Globe } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface LanguageToggleProps {
  variant?: 'light' | 'dark';
}

export function LanguageToggle({ variant = 'dark' }: LanguageToggleProps) {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      className={cn(
        'inline-flex items-center gap-1 transition-colors',
        variant === 'light'
          ? 'text-white/80 hover:text-white'
          : 'text-denver-gray-mid hover:text-denver-navy'
      )}
    >
      <Globe className="w-4 h-4" />
      <span className="text-xs font-semibold">
        {lang === 'en' ? 'EN' : 'ES'}
      </span>
    </button>
  );
}
