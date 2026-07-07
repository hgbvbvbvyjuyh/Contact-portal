/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  agencyName?: string;
  version?: string;
  className?: string;
}

export function Footer({ agencyName, version = 'v1.0.0', className, ...props }: FooterProps) {
  const { brandConfig } = useTheme();
  const activeAgencyName = agencyName || brandConfig.agencyName || 'Client Proposal & Onboarding Portal';
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        'border-t border-border/40 py-8 px-6 bg-muted/10 mt-auto',
        className
      )}
      {...props}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-sans">
        <div className="space-y-1 text-center sm:text-left">
          <p className="font-semibold text-foreground/80">{activeAgencyName}</p>
          <p>© {currentYear} {activeAgencyName}. All rights reserved.</p>
        </div>
        <div className="flex items-center space-x-6 font-mono text-[10px] tracking-wider uppercase">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Active Version: {version}
          </span>
          <span>Inter Font System</span>
        </div>
      </div>
    </footer>
  );
}
