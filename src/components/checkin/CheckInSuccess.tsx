import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import type { CheckInLocation } from '@/lib/types';

interface CheckInSuccessProps {
  location: CheckInLocation;
  childNames: string[];
  onDone: () => void;
}

export function CheckInSuccess({
  location,
  childNames,
  onDone,
}: CheckInSuccessProps) {
  const navigate = useNavigate();
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 py-8">
      {/* Animated checkmark */}
      <div className="mb-6">
        <svg
          className="w-24 h-24"
          viewBox="0 0 96 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circle */}
          <circle
            cx="48"
            cy="48"
            r="44"
            stroke="#10b981"
            strokeWidth="4"
            fill="#ecfdf5"
            className="animate-scale-in"
            style={{
              transformOrigin: 'center',
              animation: 'scale-in 0.4s ease-out forwards',
            }}
          />
          {/* Checkmark */}
          <path
            d="M28 50 L42 64 L68 34"
            stroke="#10b981"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            style={{
              strokeDasharray: 80,
              strokeDashoffset: 80,
              animation: 'draw-check 0.5s 0.3s ease-out forwards',
            }}
          />
        </svg>
      </div>

      {/* Success text */}
      <h2 className="text-xl font-heading font-bold text-denver-navy text-center">
        Checked In!
      </h2>
      <p className="text-sm text-denver-gray-mid mt-1 text-center">
        {childNames.join(' & ')} checked in successfully
      </p>

      {/* Details */}
      <div className="mt-6 bg-white rounded-xl border border-denver-gray-soft p-4 w-full max-w-sm space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-denver-gray-mid">Location</span>
          <span className="font-medium text-denver-navy">{location.name}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-denver-gray-mid">Date</span>
          <span className="font-medium text-denver-navy">{dateStr}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-denver-gray-mid">Time</span>
          <span className="font-medium text-denver-navy">{timeStr}</span>
        </div>
      </div>

      {/* Done button */}
      <Button
        className="mt-8 w-full max-w-sm"
        onClick={() => {
          onDone();
          navigate('/');
        }}
      >
        Done
      </Button>

      {/* Inline keyframe styles */}
      <style>{`
        @keyframes scale-in {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes draw-check {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
