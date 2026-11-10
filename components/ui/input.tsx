import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-text-primary"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          className={cn(
            'flex w-full rounded-btn border border-border-subtle bg-white px-3.5 py-2.5 text-base md:text-sm text-text-primary shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:border-brand-700 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px] md:min-h-[40px]',
            error && 'border-semantic-danger focus-visible:ring-semantic-danger',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-xs text-semantic-danger mt-1">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-xs text-text-secondary mt-1">{helperText}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
