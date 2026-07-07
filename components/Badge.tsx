/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant = 'neutral' | 'success' | 'warning' | 'error' | 'brand' | 'info';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  className,
  ...props
}: BadgeProps) {
  const variantStyles = {
    neutral: 'bg-muted text-muted-foreground border-border/40',
    success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    error: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    brand: 'bg-primary/10 text-primary border-primary/20',
    info: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  };

  const sizeStyles = {
    sm: 'px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase',
    md: 'px-2.5 py-0.5 rounded-badge text-[10px] font-bold tracking-wider uppercase border',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center font-sans select-none rounded-badge border',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
