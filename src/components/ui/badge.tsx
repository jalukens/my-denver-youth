import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
  {
    variants: {
      variant: {
        default: 'bg-denver-gray-soft text-denver-navy',
        success: 'bg-denver-teal/15 text-denver-teal',
        warning: 'bg-denver-amber/15 text-denver-amber',
        error: 'bg-denver-red/10 text-denver-red',
        info: 'bg-denver-teal/10 text-denver-teal',
        library: 'bg-denver-teal/15 text-denver-teal',
        'rec-center': 'bg-denver-navy/10 text-denver-navy',
        free: 'bg-denver-teal/15 text-denver-teal',
        discounted: 'bg-denver-amber/15 text-denver-amber',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  )
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
