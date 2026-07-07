/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface PlaceholderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  title: string;
  badge?: string;
  badgeVariant?: 'default' | 'success' | 'warning' | 'info';
  className?: string;
}

export function PlaceholderCard({
  children,
  title,
  badge,
  badgeVariant = 'default',
  className,
  ...props
}: PlaceholderCardProps) {
  const getBadgeClass = () => {
    switch (badgeVariant) {
      case 'success':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'warning':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'info':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      default:
        return 'bg-muted text-muted-foreground border-border/40';
    }
  };

  return (
    <div
      className={cn(
        'rounded-card border border-border/40 bg-card p-5 shadow-low space-y-4 hover:shadow-medium transition-all duration-200',
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between border-b border-border/30 pb-3">
        <h4 className="text-small font-semibold tracking-tight text-foreground">
          {title}
        </h4>
        {badge && (
          <span
            className={cn(
              'px-2.5 py-0.5 rounded-badge text-[10px] font-bold tracking-wider uppercase border',
              getBadgeClass()
            )}
          >
            {badge}
          </span>
        )}
      </div>
      <div className="text-xs text-muted-foreground leading-relaxed space-y-3">
        {children || (
          <div className="space-y-2 py-1">
            <div className="h-3 bg-muted rounded-full w-3/4 animate-pulse" />
            <div className="h-3 bg-muted rounded-full w-1/2 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}
