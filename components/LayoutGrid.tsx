/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface LayoutGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  aside?: React.ReactNode;
  showAside?: boolean;
  className?: string;
}

export function LayoutGrid({
  children,
  aside,
  showAside = true,
  className,
  ...props
}: LayoutGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-12 items-start',
        className
      )}
      {...props}
    >
      {/* Main Content Pane */}
      <main
        className={cn(
          'w-full min-w-0 transition-all duration-300',
          aside && showAside ? 'lg:col-span-8 xl:col-span-8' : 'lg:col-span-12'
        )}
      >
        <div className="space-y-4">
          {children}
        </div>
      </main>

      {/* Optional Project Summary Sidebar Panel */}
      {aside && showAside && (
        <aside
          className="w-full lg:col-span-4 xl:col-span-4 lg:sticky lg:top-24 space-y-6 lg:border-l lg:border-border/40 lg:pl-8"
        >
          {aside}
        </aside>
      )}
    </div>
  );
}
