import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.99] touch-manipulation',
  {
    variants: {
      variant: {
        default:
          'bg-brand-900 text-white hover:bg-brand-800 shadow-soft',
        primary:
          'bg-brand-700 text-white hover:bg-brand-800 shadow-soft',
        secondary:
          'bg-brand-50 text-brand-900 hover:bg-brand-100 border border-brand-100',
        outline:
          'border border-border-subtle bg-white hover:bg-surface-muted text-text-primary',
        ghost:
          'hover:bg-surface-muted text-text-primary hover:text-brand-900',
        destructive:
          'bg-semantic-danger text-white hover:bg-red-700 shadow-soft',
        link:
          'text-brand-700 underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        default: 'h-10 px-4 py-2 rounded-btn text-sm min-h-[44px] md:min-h-[40px]',
        sm: 'h-9 px-3 rounded-btn text-xs min-h-[44px] md:min-h-[36px]',
        lg: 'h-12 px-6 rounded-btn text-base min-h-[48px]',
        icon: 'h-10 w-10 rounded-btn min-h-[44px] min-width-[44px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };

