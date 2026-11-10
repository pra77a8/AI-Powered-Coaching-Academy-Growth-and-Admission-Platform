import React from 'react';
import { Badge } from '@/components/ui/badge';

interface SectionHeadingProps {
  badge?: string;
  title: string | React.ReactNode;
  description?: string;
  align?: 'center' | 'left';
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  description,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <div
      className={`flex flex-col ${
        isCenter ? 'items-center text-center' : 'items-start text-left'
      } max-w-3xl ${isCenter ? 'mx-auto' : ''} ${className}`}
    >
      {badge && (
        <Badge
          variant="outline"
          className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-brand-300 bg-brand-50/90 px-3.5 py-1.5 text-[13px] sm:text-[14px] font-semibold tracking-wide text-brand-900 shadow-soft"
        >
          {badge}
        </Badge>
      )}

      <h2 className="font-heading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl leading-tight">
        {title}
      </h2>

      {description && (
        <p className="mt-3.5 text-base text-text-secondary sm:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
