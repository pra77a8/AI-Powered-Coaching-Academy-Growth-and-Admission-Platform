import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-brand-50 text-brand-900 border border-brand-100',
        primary:
          'bg-brand-900 text-white',
        secondary:
          'bg-surface-muted text-text-secondary border border-border-subtle',
        success:
          'bg-[#E6F4EA] text-semantic-success border border-[#CEEAD6]',
        warning:
          'bg-[#FEF7E0] text-semantic-warning border border-[#FEEFC3]',
        danger:
          'bg-[#FCE8E6] text-semantic-danger border border-[#FAD2CF]',
        info:
          'bg-[#E8F0FE] text-semantic-info border border-[#D2E3FC]',
        outline:
          'text-text-primary border border-border-subtle',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
