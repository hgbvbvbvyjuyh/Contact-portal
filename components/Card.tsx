/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { cn } from '@/lib/utils';

/* ==========================================================================
   Base Card
   ========================================================================== */

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  key?: React.Key;
  id?: string;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-card border border-border/50 bg-card p-6 shadow-low text-card-foreground transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ==========================================================================
   Interactive Card
   ========================================================================== */

interface InteractiveCardProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  selected?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function InteractiveCard({
  children,
  selected = false,
  className,
  type = 'button',
  ...props
}: InteractiveCardProps) {
  return (
    <button
      type={type}
      className={cn(
        'w-full text-left rounded-card border border-border/50 bg-card p-6 shadow-low transition-all duration-300 cursor-pointer text-card-foreground outline-none',
        'hover:shadow-medium hover:border-primary/30 hover:bg-secondary/10 hover:-translate-y-[2px]',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        selected && 'border-primary/80 bg-primary/3 ring-[0.5px] ring-primary/40 shadow-medium -translate-y-[2px]',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/* ==========================================================================
   Information Card
   ========================================================================== */

interface InformationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error' | 'brand';
  className?: string;
}

export function InformationCard({
  children,
  variant = 'info',
  className,
  ...props
}: InformationCardProps) {
  const borderColors = {
    info: 'border-l-blue-500 bg-blue-500/[0.03] border-y-blue-500/10 border-r-blue-500/10',
    success: 'border-l-emerald-500 bg-emerald-500/[0.03] border-y-emerald-500/10 border-r-emerald-500/10',
    warning: 'border-l-amber-500 bg-amber-500/[0.03] border-y-amber-500/10 border-r-amber-500/10',
    error: 'border-l-rose-500 bg-rose-500/[0.03] border-y-rose-500/10 border-r-rose-500/10',
    brand: 'border-l-primary bg-primary/[0.02] border-y-primary/10 border-r-primary/10',
  };

  return (
    <div
      className={cn(
        'rounded-card border-y border-r border-l-3 p-6 shadow-low text-card-foreground transition-all duration-300',
        borderColors[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ==========================================================================
   Card Sub-components for semantic structure
   ========================================================================== */

export function CardHeader({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex flex-col space-y-1.5 pb-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-h3 font-semibold tracking-tight text-foreground', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-small text-muted-foreground', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('text-body text-card-foreground/90 leading-relaxed', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex items-center pt-4 border-t border-border/40 mt-4', className)} {...props}>
      {children}
    </div>
  );
}
