/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
}

export function Display({ children, as: Component = 'h1', className, ...props }: TypographyProps) {
  return (
    <Component
      className={cn('text-display font-bold tracking-tight text-foreground selection:bg-primary/20', className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export function H1({ children, as: Component = 'h1', className, ...props }: TypographyProps) {
  return (
    <Component
      className={cn('text-h1 font-bold tracking-tight text-foreground selection:bg-primary/20', className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export function H2({ children, as: Component = 'h2', className, ...props }: TypographyProps) {
  return (
    <Component
      className={cn('text-h2 font-semibold tracking-tight text-foreground selection:bg-primary/20', className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export function H3({ children, as: Component = 'h3', className, ...props }: TypographyProps) {
  return (
    <Component
      className={cn('text-h3 font-semibold tracking-tight text-foreground selection:bg-primary/20', className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export function H4({ children, as: Component = 'h4', className, ...props }: TypographyProps) {
  return (
    <Component
      className={cn('text-h4 font-semibold tracking-tight text-foreground selection:bg-primary/20', className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export function Body({ children, as: Component = 'p', className, ...props }: TypographyProps) {
  return (
    <Component
      className={cn('text-body text-foreground/90 leading-relaxed selection:bg-primary/20', className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export function Small({ children, as: Component = 'p', className, ...props }: TypographyProps) {
  return (
    <Component
      className={cn('text-small text-muted-foreground leading-relaxed selection:bg-primary/20', className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export function Caption({ children, as: Component = 'span', className, ...props }: TypographyProps) {
  return (
    <Component
      className={cn('text-caption text-muted-foreground tracking-widest font-mono selection:bg-primary/20', className)}
      {...props}
    >
      {children}
    </Component>
  );
}
