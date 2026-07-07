/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { cn } from '@/lib/utils';

export type StatusType =
  | 'draft'
  | 'sent'
  | 'viewed'
  | 'ready_to_sign'
  | 'signed'
  | 'awaiting_payment'
  | 'paid'
  | 'completed';

interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: StatusType | string;
  className?: string;
}

export function StatusBadge({ status, className, ...props }: StatusBadgeProps) {
  const getStatusStyles = (normalized: string) => {
    switch (normalized) {
      case 'draft':
        return {
          bg: 'bg-muted/60 text-muted-foreground border-border/40',
          label: 'Draft',
          dot: 'bg-muted-foreground/50',
        };
      case 'sent':
        return {
          bg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
          label: 'Sent',
          dot: 'bg-blue-500',
        };
      case 'viewed':
        return {
          bg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
          label: 'Viewed',
          dot: 'bg-indigo-500 animate-pulse',
        };
      case 'ready_to_sign':
        return {
          bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
          label: 'Ready to Sign',
          dot: 'bg-amber-500',
        };
      case 'signed':
        return {
          bg: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
          label: 'Signed',
          dot: 'bg-teal-500',
        };
      case 'awaiting_payment':
        return {
          bg: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
          label: 'Awaiting Payment',
          dot: 'bg-orange-500',
        };
      case 'paid':
        return {
          bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
          label: 'Paid',
          dot: 'bg-emerald-500',
        };
      case 'completed':
        return {
          bg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
          label: 'Completed',
          dot: 'bg-purple-500',
        };
      default:
        return {
          bg: 'bg-muted text-muted-foreground border-border/30',
          label: status,
          dot: 'bg-muted-foreground/40',
        };
    }
  };

  // Normalize input status key
  const normalized = status.toLowerCase().replace(/[\s-]/g, '_');
  const styles = getStatusStyles(normalized);

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-badge text-[10px] font-bold tracking-wider uppercase border font-sans select-none',
        styles.bg,
        className
      )}
      {...props}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full shrink-0', styles.dot)} />
      {styles.label}
    </span>
  );
}
