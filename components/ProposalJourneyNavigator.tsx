/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PORTAL_STEPS } from '@/constants';
import { Container } from '@/components/Container';
import { ProgressBar } from '@/components/Feedback';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { IconWrapper } from '@/components/Utilities';
import { Divider } from '@/components/Layout';
import { 
  Check, 
  Lock, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight,
  Eye,
  Info,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ProposalJourneyNavigatorProps {
  currentStepId?: string;
  onStepClick?: (stepId: string) => void;
  completedSteps?: string[];
  lockedSteps?: string[];
  errorSteps?: string[];
}

const STEP_READING_TIMES: Record<string, number> = {
  cover: 1,
  'agreement-info': 1,
  overview: 1,
  scope: 2,
  deliverables: 2,
  timeline: 1,
  collaboration: 1,
  partnership: 1,
  investment: 1,
  ownership: 1,
  legal: 2,
  acceptance: 1,
  invoice: 1,
  payment: 1,
  success: 0,
};

const getRemainingReadingTime = (currentIndex: number) => {
  let sum = 0;
  for (let i = currentIndex; i < PORTAL_STEPS.length; i++) {
    const stepId = PORTAL_STEPS[i].id;
    sum += STEP_READING_TIMES[stepId as keyof typeof STEP_READING_TIMES] || 1;
  }
  return sum;
};

export function ProposalJourneyNavigator({
  currentStepId = 'cover',
  onStepClick,
  completedSteps,
  lockedSteps = ['invoice', 'payment'], // default placeholders
  errorSteps = [],
}: ProposalJourneyNavigatorProps) {
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Find current step index
  const currentStepIndex = PORTAL_STEPS.findIndex((step) => step.id === currentStepId);
  const activeIndex = currentStepIndex !== -1 ? currentStepIndex : 0;

  // Determine actual completed steps (if not explicitly provided, auto-complete prior steps)
  const resolvedCompleted = completedSteps || PORTAL_STEPS.slice(0, activeIndex).map((s) => s.id);

  // Calculate generic progress percentage (placeholder behavior based on step index)
  const totalSteps = PORTAL_STEPS.length;
  const progressPercentage = Math.round(((activeIndex + 1) / totalSteps) * 100);

  // Auto-scroll the active step into view on desktop/tablet horizontal layout
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeElement = scrollContainerRef.current.querySelector('[data-active="true"]');
      if (activeElement) {
        const container = scrollContainerRef.current;
        const containerWidth = container.offsetWidth;
        const elementLeft = (activeElement as HTMLElement).offsetLeft;
        const elementWidth = (activeElement as HTMLElement).offsetWidth;

        // Centering the active element in the scroll area
        container.scrollTo({
          left: elementLeft - containerWidth / 2 + elementWidth / 2,
          behavior: 'smooth',
        });
      }
    }
  }, [currentStepId]);

  const handleStepSelect = (stepId: string) => {
    if (lockedSteps.includes(stepId)) return;
    onStepClick?.(stepId);
    setIsMobileExpanded(false);
  };

  const getStepState = (stepId: string, index: number) => {
    if (errorSteps.includes(stepId)) return 'error';
    if (lockedSteps.includes(stepId)) return 'locked';
    if (index === activeIndex) return 'active';
    if (index < activeIndex) return 'completed';
    return 'upcoming';
  };

  const renderStepIcon = (state: string, index: number) => {
    return (
      <span className="relative flex h-5 w-5 items-center justify-center rounded-full shrink-0">
        <AnimatePresence mode="popLayout" initial={false}>
          {state === 'completed' ? (
            <motion.span
              key="completed"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex items-center justify-center rounded-full bg-emerald-500 text-white font-bold"
            >
              <Check className="h-3 w-3" strokeWidth={3} />
            </motion.span>
          ) : state === 'error' ? (
            <motion.span
              key="error"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex items-center justify-center rounded-full bg-rose-500 text-white font-bold"
            >
              <AlertCircle className="h-3 w-3" strokeWidth={3} />
            </motion.span>
          ) : state === 'locked' ? (
            <motion.span
              key="locked"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex items-center justify-center rounded-full bg-muted text-muted-foreground/50 border border-border/40"
            >
              <Lock className="h-3 w-3" />
            </motion.span>
          ) : state === 'active' ? (
            <motion.span
              key="active"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-[10px] ring-2 ring-primary/30"
            >
              {index + 1}
            </motion.span>
          ) : (
            <motion.span
              key="upcoming"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex items-center justify-center rounded-full bg-muted text-muted-foreground border border-border/40 font-mono text-[10px]"
            >
              {index + 1}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    );
  };

  return (
    <nav className="sticky top-[69px] z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur-md transition-colors duration-200">
      <Container className="py-2.5">
        
        {/* ==========================================================================
           1. Desktop & Tablet Horizontal Stepper Layout
           ========================================================================== */}
        <div className="hidden md:flex flex-col space-y-3">
          
          {/* Progress Summary Header row */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-foreground tracking-tight">
                Proposal Progress
              </span>
              <Badge variant="brand" size="md">
                {progressPercentage}% Complete
              </Badge>
              <div className="h-4 w-px bg-border/40" />
              <span className="text-muted-foreground">
                Current Section: <strong className="text-foreground font-medium">{PORTAL_STEPS[activeIndex]?.label}</strong>
              </span>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground font-sans">
              <span className="flex items-center gap-1.5 font-mono text-[11px] bg-muted/40 px-2 py-0.5 rounded border border-border/25">
                <Clock className="h-3 w-3 text-primary" />
                Estimated {getRemainingReadingTime(activeIndex)}m remaining
              </span>
              <div className="flex items-center space-x-3 text-[10px] font-mono">
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Completed
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Active
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-muted border border-border/50" /> Upcoming
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <ProgressBar value={progressPercentage} size="sm" />

          {/* Stepper horizontal scrolling track */}
          <div className="relative">
            {/* Horizontal scroll fade indicators */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />

            <div
              ref={scrollContainerRef}
              className="flex items-center space-x-1.5 overflow-x-auto py-1 scrollbar-none select-none scroll-smooth pr-6 pl-2"
            >
              {PORTAL_STEPS.map((step, index) => {
                const state = getStepState(step.id, index);
                const isCurrent = state === 'active';
                const isLocked = state === 'locked';

                return (
                  <React.Fragment key={step.id}>
                    <button
                      type="button"
                      data-active={isCurrent}
                      onClick={() => handleStepSelect(step.id)}
                      disabled={isLocked}
                      className={cn(
                        'inline-flex items-center gap-2 px-3 py-1.5 rounded-button text-xs font-medium border transition-all duration-300 outline-none shrink-0',
                        isCurrent && 'bg-primary/5 border-primary/70 text-primary font-semibold shadow-[0_1px_3px_rgba(47,107,255,0.06)] ring-[0.5px] ring-primary/30',
                        state === 'completed' && 'bg-emerald-500/5 border-emerald-500/15 text-emerald-800 dark:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/25 shadow-sm cursor-pointer',
                        state === 'upcoming' && 'bg-background border-border/50 text-muted-foreground hover:bg-secondary/60 hover:text-foreground cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.01)]',
                        state === 'error' && 'bg-rose-500/5 border-rose-500/20 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10',
                        isLocked && 'bg-muted/30 border-border/20 text-muted-foreground/40 cursor-not-allowed opacity-50',
                        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1'
                      )}
                      title={`${index + 1}. ${step.label} (${state.toUpperCase()})`}
                      aria-label={`${index + 1}. ${step.label}, State: ${state}`}
                    >
                      {renderStepIcon(state, index)}
                      <span>{step.label}</span>
                    </button>

                    {index < totalSteps - 1 && (
                      <ChevronRight className="h-3 w-3 text-muted-foreground/30 shrink-0" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        {/* ==========================================================================
           2. Mobile Collapsible Accordion Layout
           ========================================================================== */}
        <div className="flex md:hidden flex-col space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col min-w-0">
              <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-1.5 flex-wrap">
                <span>Active ({activeIndex + 1}/{totalSteps})</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="h-2.5 w-2.5" /> {getRemainingReadingTime(activeIndex)}m left</span>
              </span>
              <span className="text-xs font-bold text-foreground truncate leading-snug">
                {PORTAL_STEPS[activeIndex]?.label}
              </span>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <Badge variant="brand" size="sm">
                {progressPercentage}%
              </Badge>
              <Button
                size="sm"
                variant="ghost"
                className="h-8.5 px-2 cursor-pointer active:scale-95"
                onClick={() => setIsMobileExpanded(!isMobileExpanded)}
                aria-expanded={isMobileExpanded}
                aria-label="Toggle full journey outline"
              >
                {isMobileExpanded ? (
                  <ChevronUp className="h-4.5 w-4.5" />
                ) : (
                  <ChevronDown className="h-4.5 w-4.5" />
                )}
              </Button>
            </div>
          </div>

          {/* Miniature mobile progress line */}
          <ProgressBar value={progressPercentage} size="sm" />

          {/* Expandable Mobile List */}
          <AnimatePresence>
            {isMobileExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="pt-2 pb-1 space-y-1 max-h-[300px] overflow-y-auto border-t border-border/30 mt-2">
                  {PORTAL_STEPS.map((step, index) => {
                    const state = getStepState(step.id, index);
                    const isCurrent = state === 'active';
                    const isLocked = state === 'locked';

                    return (
                      <button
                        key={step.id}
                        type="button"
                        onClick={() => handleStepSelect(step.id)}
                        disabled={isLocked}
                        className={cn(
                          'w-full flex items-center justify-between px-3 py-2 rounded-button text-xs transition-colors outline-none text-left',
                          isCurrent && 'bg-primary/10 text-primary font-semibold',
                          state === 'completed' && 'bg-emerald-500/5 text-emerald-700 dark:text-emerald-400',
                          state === 'upcoming' && 'hover:bg-muted text-muted-foreground hover:text-foreground',
                          isLocked && 'opacity-40 cursor-not-allowed'
                        )}
                      >
                        <div className="flex items-center space-x-2.5 min-w-0">
                          {renderStepIcon(state, index)}
                          <span className="truncate">{step.label}</span>
                        </div>
                        {isLocked && <Lock className="h-3.5 w-3.5 text-muted-foreground/40" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </Container>
    </nav>
  );
}
