import { Sparkles } from 'lucide-react';

interface AiRecommendButtonProps {
  onClick: () => void;
}

export function AiRecommendButton({ onClick }: AiRecommendButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-10 h-10 rounded-xl bg-gradient-to-br from-denver-teal to-denver-teal/80 flex items-center justify-center hover:shadow-md transition-all"
    >
      <Sparkles className="w-5 h-5 text-white" />
    </button>
  );
}
