/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/ThemeProvider';
import { Sun, Moon, Laptop } from 'lucide-react';

/* ==========================================================================
   Avatar Component
   ========================================================================== */

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Avatar({ src, name, size = 'md', className, ...props }: AvatarProps) {
  const [hasError, setHasError] = React.useState(false);

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-14 w-14 text-base',
  };

  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center rounded-full bg-primary/10 text-primary font-semibold select-none overflow-hidden shrink-0 border border-primary/20',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={`${name} Avatar`}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
}

/* ==========================================================================
   Status Indicator Component
   ========================================================================== */

interface StatusIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: 'online' | 'offline' | 'away' | 'busy' | 'active' | 'inactive';
  className?: string;
}

export function StatusIndicator({ status, className, ...props }: StatusIndicatorProps) {
  const colors = {
    online: 'bg-emerald-500 ring-emerald-500/20',
    active: 'bg-emerald-500 ring-emerald-500/20',
    offline: 'bg-muted-foreground/40 ring-muted-foreground/10',
    inactive: 'bg-muted-foreground/40 ring-muted-foreground/10',
    away: 'bg-amber-500 ring-amber-500/20',
    busy: 'bg-rose-500 ring-rose-500/20',
  };

  return (
    <span className={cn('relative flex h-2 w-2 font-sans', className)} {...props}>
      <span className={cn('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', colors[status].split(' ')[0])} />
      <span className={cn('relative inline-flex rounded-full h-2 w-2 ring-2', colors[status])} />
    </span>
  );
}

/* ==========================================================================
   Theme Toggle Component
   ========================================================================== */

export function ThemeToggle({ className, ...props }: React.HTMLAttributes<HTMLButtonElement>) {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <button
      onClick={cycleTheme}
      className={cn(
        'h-9 w-9 rounded-button hover:bg-muted border border-border/40 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring shrink-0 cursor-pointer active:scale-95',
        className
      )}
      aria-label="Cycle visual theme modes"
      title={`Theme setting: ${theme}. Click to change.`}
      {...props}
    >
      {theme === 'system' ? (
        <Laptop className="h-4 w-4 text-slate-500" />
      ) : resolvedTheme === 'dark' ? (
        <Sun className="h-4 w-4 text-amber-500 animate-in spin-in-12 duration-300" />
      ) : (
        <Moon className="h-4 w-4 text-slate-700 animate-in spin-in-12 duration-300" />
      )}
    </button>
  );
}

/* ==========================================================================
   Icon Wrapper Component
   ========================================================================== */

interface IconWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'muted' | 'success' | 'warning' | 'error';
  className?: string;
}

export function IconWrapper({ children, variant = 'primary', className, ...props }: IconWrapperProps) {
  const variantClasses = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    muted: 'bg-muted text-muted-foreground border-border/30',
    success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    error: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  };

  return (
    <div
      className={cn(
        'h-9 w-9 rounded-button flex items-center justify-center border transition-all duration-200 shrink-0',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
