import * as React from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  color?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, max = 100, color, className, ...props }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div
        ref={ref}
        className={cn('h-2 w-full bg-denver-gray-soft rounded-full overflow-hidden', className)}
        {...props}
      >
        <div
          className={cn('h-full rounded-full transition-all duration-500', !color && 'bg-denver-teal')}
          style={{
            width: `${percentage}%`,
            ...(color ? { backgroundColor: color } : {}),
          }}
        />
      </div>
    );
  }
);
Progress.displayName = 'Progress';

export { Progress };
