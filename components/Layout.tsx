/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { cn } from '@/lib/utils';

// Re-exporting Container and Section for single-import convenience
export { Container } from './Container';
export { Section } from './Section';

/* ==========================================================================
   Stack Component
   ========================================================================== */

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  className?: string;
}

const gapMap = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  8: 'gap-8',
  10: 'gap-10',
  12: 'gap-12',
  16: 'gap-16',
};

const directionMap = {
  row: 'flex-row',
  col: 'flex-col',
  'row-reverse': 'flex-row-reverse',
  'col-reverse': 'flex-col-reverse',
};

const alignMap = {
  start: 'items-start',
  end: 'items-end',
  center: 'items-center',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
};

const justifyMap = {
  start: 'justify-start',
  end: 'justify-end',
  center: 'justify-center',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

export function Stack({
  children,
  direction = 'col',
  gap = 4,
  align,
  justify,
  wrap = false,
  className,
  ...props
}: StackProps) {
  return (
    <div
      className={cn(
        'flex',
        directionMap[direction],
        gapMap[gap],
        align && alignMap[align],
        justify && justifyMap[justify],
        wrap && 'flex-wrap',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ==========================================================================
   Grid Component
   ========================================================================== */

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  smCols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  mdCols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  lgCols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
  className?: string;
}

const gridColsMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  12: 'grid-cols-12',
};

const smGridColsMap = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
  5: 'sm:grid-cols-5',
  6: 'sm:grid-cols-6',
  12: 'sm:grid-cols-12',
};

const mdGridColsMap = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
  6: 'md:grid-cols-6',
  12: 'md:grid-cols-12',
};

const lgGridColsMap = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
  12: 'lg:grid-cols-12',
};

export function Grid({
  children,
  cols = 1,
  smCols,
  mdCols,
  lgCols,
  gap = 6,
  className,
  ...props
}: GridProps) {
  return (
    <div
      className={cn(
        'grid',
        gridColsMap[cols],
        smCols && smGridColsMap[smCols],
        mdCols && mdGridColsMap[mdCols],
        lgCols && lgGridColsMap[lgCols],
        gapMap[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ==========================================================================
   Divider Component
   ========================================================================== */

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  className?: string;
}

export function Divider({
  orientation = 'horizontal',
  variant = 'solid',
  className,
  ...props
}: DividerProps) {
  const lineStyle = 
    variant === 'dashed' ? 'border-dashed' :
    variant === 'dotted' ? 'border-dotted' :
    'border-solid';

  if (orientation === 'vertical') {
    return (
      <div
        className={cn(
          'self-stretch border-l border-border/40',
          lineStyle,
          className
        )}
        {...props}
      />
    );
  }

  return (
    <div
      className={cn(
        'w-full border-t border-border/40',
        lineStyle,
        className
      )}
      {...props}
    />
  );
}
