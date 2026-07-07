/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  divider?: boolean;
  className?: string;
}

export function Section({
  children,
  title,
  description,
  divider = false,
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        'py-8 sm:py-12 first:pt-4 last:pb-4',
        divider && 'border-b border-border/40',
        className
      )}
      {...props}
    >
      {(title || description) && (
        <div className="space-y-1.5 mb-6 sm:mb-8">
          {title && (
            <h3 className="text-h3 text-foreground tracking-tight">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-small text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="text-body text-foreground/90">
        {children}
      </div>
    </section>
  );
}
