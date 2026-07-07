/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { Button } from './Button';

/* ==========================================================================
   Dialog / Modal Component
   ========================================================================== */

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export function Dialog({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = 'md',
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const widthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/60 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />

      {/* Content Panel */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        className={cn(
          'relative w-full rounded-modal border border-border/40 bg-card p-6 shadow-high transition-all duration-300 animate-in zoom-in-95 font-sans flex flex-col max-h-[90vh]',
          widthClasses[maxWidth]
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border/30 mb-4 shrink-0">
          <h3 className="text-h3 font-semibold tracking-tight text-foreground leading-none">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close modal dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto text-body text-card-foreground/90 leading-relaxed py-1 min-w-0 pr-1 select-text">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border/30 mt-4 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

/* ==========================================================================
   Drawer Component
   ========================================================================== */

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Drawer({ isOpen, onClose, title, children, footer }: DrawerProps) {
  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-110 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/60 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />

      {/* Drawer Content Panel */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'relative w-full max-w-md h-full bg-card p-6 border-l border-border/40 shadow-high flex flex-col z-120 font-sans transition-transform duration-300',
          'animate-in slide-in-from-right'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border/30 mb-4 shrink-0">
          <h3 className="text-h3 font-semibold tracking-tight text-foreground leading-none">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close sliding panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto text-body text-card-foreground/90 leading-relaxed py-1 min-w-0 pr-1">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex flex-col space-y-2 pt-4 border-t border-border/30 mt-4 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

/* ==========================================================================
   Tooltip Component
   ========================================================================== */

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ children, content, position = 'top' }: TooltipProps) {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-card border-x-transparent border-b-transparent -mt-[1px]',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-card border-x-transparent border-t-transparent -mb-[1px]',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-card border-y-transparent border-r-transparent -mr-[1px]',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-card border-y-transparent border-l-transparent -ml-[1px]',
  };

  return (
    <div className="relative group inline-flex font-sans">
      {children}
      <div
        className={cn(
          'absolute z-100 hidden group-hover:inline-block bg-card text-foreground text-[10px] font-medium px-2 py-1.5 rounded-md border border-border/40 shadow-medium whitespace-nowrap select-none pointer-events-none animate-in fade-in duration-200',
          positionClasses[position]
        )}
      >
        {content}
        {/* Simple visual caret arrow */}
        <div className={cn('absolute border-4 w-0 h-0', arrowClasses[position])} />
      </div>
    </div>
  );
}

/* ==========================================================================
   Popover Component
   ========================================================================== */

interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
}

export function Popover({ trigger, children, position = 'bottom-right' }: PopoverProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const positionClasses = {
    'bottom-left': 'top-full left-0 mt-2',
    'bottom-right': 'top-full right-0 mt-2',
    'top-left': 'bottom-full left-0 mb-2',
    'top-right': 'bottom-full right-0 mb-2',
  };

  return (
    <div ref={popoverRef} className="relative inline-block font-sans">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer inline-flex">
        {trigger}
      </div>
      {isOpen && (
        <div
          className={cn(
            'absolute z-100 w-64 bg-card text-card-foreground border border-border/40 rounded-card p-4 shadow-high animate-in fade-in slide-in-from-top-1 duration-200',
            positionClasses[position]
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
