import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Sheet = Dialog.Root;
const SheetTrigger = Dialog.Trigger;

interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof Dialog.Content> {
  children: React.ReactNode;
}

const SheetContent = React.forwardRef<
  React.ComponentRef<typeof Dialog.Content>,
  SheetContentProps
>(({ className, children, ...props }, ref) => (
  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 animate-backdrop-fade" />
    <Dialog.Content
      ref={ref}
      className={cn(
        'fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl bg-white rounded-t-[18px] shadow-[0_-4px_24px_rgba(0,0,0,0.08)] animate-modal-slide-up max-h-[85vh] overflow-y-auto',
        className
      )}
      {...props}
    >
      <div className="w-12 h-1.5 bg-denver-gray-soft rounded-full mx-auto mt-3" />
      <Dialog.Close className="absolute top-4 right-4 rounded-full p-1.5 text-denver-gray-mid hover:text-denver-navy hover:bg-denver-gray-soft transition-colors">
        <X className="w-5 h-5" />
      </Dialog.Close>
      {children}
    </Dialog.Content>
  </Dialog.Portal>
));
SheetContent.displayName = 'SheetContent';

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('px-6 pt-4 pb-2', className)} {...props} />
);
SheetHeader.displayName = 'SheetHeader';

const SheetTitle = React.forwardRef<
  React.ComponentRef<typeof Dialog.Title>,
  React.ComponentPropsWithoutRef<typeof Dialog.Title>
>(({ className, ...props }, ref) => (
  <Dialog.Title
    ref={ref}
    className={cn('text-lg font-heading text-denver-navy', className)}
    {...props}
  />
));
SheetTitle.displayName = 'SheetTitle';

const SheetDescription = React.forwardRef<
  React.ComponentRef<typeof Dialog.Description>,
  React.ComponentPropsWithoutRef<typeof Dialog.Description>
>(({ className, ...props }, ref) => (
  <Dialog.Description
    ref={ref}
    className={cn('text-sm text-denver-gray-mid', className)}
    {...props}
  />
));
SheetDescription.displayName = 'SheetDescription';

export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription };
