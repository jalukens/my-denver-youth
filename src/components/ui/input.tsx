import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        'w-full rounded-[10px] border border-denver-gray-soft bg-white px-3 py-2 text-sm placeholder:text-denver-gray-mid focus:outline-none focus:ring-2 focus:ring-denver-teal/40 focus:border-denver-teal',
        className
      )}
      {...props}
    />
  )
);
Input.displayName = 'Input';

export { Input };
