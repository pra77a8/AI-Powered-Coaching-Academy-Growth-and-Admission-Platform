'use client';

import React from 'react';
import {
  Sparkles,
  Layers,
  PieChart,
  Award,
  Users,
  Compass,
  PlayCircle,
  FileCode,
  CheckCircle2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AssetPlaceholderProps {
  id: string;
  label: string;
  assetNeeded: string;
  searchKeywords: string;
  format: 'Lottie JSON' | 'SVG' | 'Interactive SVG' | 'Vector Illustration';
  aspectRatio?: 'video' | 'square' | 'wide' | 'auto';
  className?: string;
  icon?: 'sparkles' | 'layers' | 'chart' | 'award' | 'users' | 'compass' | 'play' | 'workflow';
}

export function AssetPlaceholder({
  id,
  label,
  assetNeeded,
  searchKeywords,
  format,
  aspectRatio = 'video',
  className = '',
  icon = 'layers',
}: AssetPlaceholderProps) {
  const getIcon = () => {
    switch (icon) {
      case 'sparkles':
        return <Sparkles className="h-6 w-6 text-brand-700" />;
      case 'chart':
        return <PieChart className="h-6 w-6 text-brand-700" />;
      case 'award':
        return <Award className="h-6 w-6 text-brand-700" />;
      case 'users':
        return <Users className="h-6 w-6 text-brand-700" />;
      case 'compass':
        return <Compass className="h-6 w-6 text-brand-700" />;
      case 'play':
        return <PlayCircle className="h-6 w-6 text-brand-700" />;
      default:
        return <Layers className="h-6 w-6 text-brand-700" />;
    }
  };

  const aspectClass =
    aspectRatio === 'video'
      ? 'aspect-[16/10]'
      : aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === 'wide'
      ? 'aspect-[21/9]'
      : 'min-h-[220px]';

  return (
    <div
      id={id}
      className={`group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-300/80 bg-[#EFF7F4]/70 p-6 text-center transition-all duration-200 hover:border-brand-600 hover:bg-[#EFF7F4] hover:shadow-soft ${aspectClass} ${className}`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-soft transition-transform group-hover:scale-105">
        {getIcon()}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-800">
          Visual Placeholder
        </span>
        <Badge variant="outline" className="border-brand-300 bg-white/80 text-[10px] text-brand-800">
          {format}
        </Badge>
      </div>

      <h4 className="mt-1 font-heading text-sm font-bold text-text-primary">
        {label}
      </h4>

      <p className="mt-1 max-w-sm text-xs text-text-secondary leading-relaxed">
        {assetNeeded}
      </p>

      <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-brand-200/80 bg-white/90 px-2.5 py-1 text-[11px] text-text-muted">
        <span className="font-medium text-brand-900">Keywords:</span>
        <span className="italic text-text-secondary">{searchKeywords}</span>
      </div>
    </div>
  );
}

