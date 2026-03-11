import { Mic, MicOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AudioInputProps {
  isListening: boolean;
  onToggle: () => void;
  isSupported: boolean;
}

export function AudioInput({ isListening, onToggle, isSupported }: AudioInputProps) {
  if (!isSupported) return null;

  return (
    <button
      onClick={onToggle}
      className={cn(
        'w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0',
        isListening
          ? 'bg-denver-teal text-white animate-pulse-ring'
          : 'bg-denver-gray-soft text-denver-gray-mid hover:bg-denver-gray-soft/80'
      )}
    >
      {isListening ? (
        <MicOff className="w-5 h-5" />
      ) : (
        <Mic className="w-5 h-5" />
      )}
    </button>
  );
}
