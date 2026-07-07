/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  TriangleAlert, 
  Loader2,
  FolderOpen
} from 'lucide-react';
import { Button } from './Button';

/* ==========================================================================
   Alert Component
   ========================================================================== */

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  className?: string;
}

export function Alert({
  children,
  variant = 'info',
  title,
  className,
  ...props
}: AlertProps) {
  const styles = {
    info: {
      bg: 'bg-blue-500/5 border-blue-500/20 text-blue-800 dark:text-blue-300',
      icon: <Info className="h-5 w-5 text-blue-500 shrink-0" />,
    },
    success: {
      bg: 'bg-emerald-500/5 border-emerald-500/20 text-emerald-800 dark:text-emerald-300',
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />,
    },
    warning: {
      bg: 'bg-amber-500/5 border-amber-500/20 text-amber-800 dark:text-amber-300',
      icon: <TriangleAlert className="h-5 w-5 text-amber-500 shrink-0" />,
    },
    error: {
      bg: 'bg-rose-500/5 border-rose-500/20 text-rose-800 dark:text-rose-300',
      icon: <AlertCircle className="h-5 w-5 text-rose-500 shrink-0" />,
    },
  };

  return (
    <div
      role="alert"
      className={cn(
        'flex gap-3.5 p-4 rounded-card border font-sans text-small leading-relaxed shadow-low',
        styles[variant].bg,
        className
      )}
      {...props}
    >
      {styles[variant].icon}
      <div className="space-y-1 w-full min-w-0">
        {title && (
          <h5 className="font-semibold text-foreground text-small tracking-tight leading-none">
            {title}
          </h5>
        )}
        <div className="text-foreground/80 text-xs">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Toast Component
   ========================================================================== */

interface ToastProps {
  message: string;
  description?: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  onClose?: () => void;
  visible?: boolean;
}

export function Toast({
  message,
  description,
  variant = 'success',
  onClose,
  visible = true,
}: ToastProps) {
  if (!visible) return null;

  const icons = {
    info: <Info className="h-4.5 w-4.5 text-blue-500" />,
    success: <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" />,
    warning: <TriangleAlert className="h-4.5 w-4.5 text-amber-500" />,
    error: <AlertCircle className="h-4.5 w-4.5 text-rose-500" />,
  };

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-100 flex max-w-sm w-full gap-3 p-4 rounded-card border bg-card text-card-foreground shadow-high animate-in fade-in slide-in-from-bottom-5 duration-300 border-border/40'
      )}
    >
      <div className="shrink-0 pt-0.5">{icons[variant]}</div>
      <div className="space-y-0.5 w-full min-w-0">
        <p className="text-xs font-semibold text-foreground leading-none">{message}</p>
        {description && <p className="text-[11px] text-muted-foreground leading-normal">{description}</p>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted shrink-0 text-xs cursor-pointer focus:outline-none"
          aria-label="Dismiss feedback message"
        >
          ✕
        </button>
      )}
    </div>
  );
}

/* ==========================================================================
   Skeleton Component
   ========================================================================== */

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rect' | 'circle';
  className?: string;
}

export function Skeleton({
  variant = 'rect',
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-muted animate-pulse',
        variant === 'text' && 'h-3 rounded-md w-full my-1.5',
        variant === 'circle' && 'rounded-full h-10 w-10 shrink-0',
        variant === 'rect' && 'rounded-card w-full',
        className
      )}
      {...props}
    />
  );
}

/* ==========================================================================
   Loading Spinner Component
   ========================================================================== */

interface LoadingSpinnerProps extends React.HTMLAttributes<SVGElement> {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({
  size = 'md',
  className,
  ...props
}: LoadingSpinnerProps) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <Loader2
      className={cn('animate-spin text-primary', sizes[size], className)}
      {...props}
    />
  );
}

/* ==========================================================================
   Empty State Component
   ========================================================================== */

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionText?: string;
  onActionClick?: () => void;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon = <FolderOpen className="h-10 w-10 text-muted-foreground/60" />,
  actionText,
  onActionClick,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 border border-dashed border-border/40 rounded-card bg-muted/5 min-h-[250px] font-sans',
        className
      )}
    >
      <div className="mb-4 flex items-center justify-center p-3 rounded-full bg-muted/40 shrink-0">
        {icon}
      </div>
      <h4 className="text-small font-semibold tracking-tight text-foreground mb-1 leading-none">
        {title}
      </h4>
      <p className="text-xs text-muted-foreground max-w-sm mb-5 leading-relaxed">
        {description}
      </p>
      {actionText && onActionClick && (
        <Button size="sm" onClick={onActionClick}>
          {actionText}
        </Button>
      )}
    </div>
  );
}

/* ==========================================================================
   Progress Bar Component
   ========================================================================== */

interface ProgressBarProps {
  value: number; // 0 to 100
  showLabel?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export function ProgressBar({
  value,
  showLabel = false,
  size = 'md',
  className,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={cn('w-full space-y-1.5 font-sans', className)}>
      {showLabel && (
        <div className="flex items-center justify-between text-[11px] font-medium text-muted-foreground">
          <span>In Progress</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div
        className={cn(
          'w-full bg-muted rounded-full overflow-hidden border border-border/10',
          size === 'sm' ? 'h-1.5' : 'h-2.5'
        )}
      >
        <div
          className="h-full bg-primary rounded-full transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
