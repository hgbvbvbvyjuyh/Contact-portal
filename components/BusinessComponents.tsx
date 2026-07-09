/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Card } from './Card';
import { Button } from './Button';
import { Badge } from './Badge';
import { H3, H4 } from './Typography';
import { ArrowRight, Calendar, Info, Clock, Shield, Check, Award, Compass } from 'lucide-react';

/* ==========================================================================
   1. Cover Hero Component
   ========================================================================== */

interface CoverHeroProps {
  serviceType?: string;
  companyName?: string;
  datePrepared?: string;
  proposalVersion?: string;
  onStartReview: () => void;
  className?: string;
}

export function CoverHero({
  serviceType,
  companyName,
  datePrepared,
  proposalVersion,
  onStartReview,
  className,
}: CoverHeroProps) {
  const dynamicProject = serviceType || 'N/A';
  const dynamicClient = companyName || 'N/A';

  return (
    <div className={cn('relative w-full pt-2 md:pt-4 pb-10 md:pb-16 overflow-hidden font-sans', className)}>
      {/* Decorative background shapes */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto space-y-10">
        {/* Top Header Row */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/30 pb-6"
        >
          <div className="space-y-1">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
              Proposal & Agreement Portal
            </p>
            <p className="text-xs font-bold text-primary uppercase tracking-widest">
              DIGITAL SERVICES AGREEMENT
            </p>
          </div>
          <div className="flex items-center gap-2 sm:self-end">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/5 text-primary border border-primary/10">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Version: {proposalVersion || 'V1.0.0'}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground border border-border/40">
              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
              8 MIN READ
            </span>
          </div>
        </motion.div>

        {/* Hero Headline & Sub-info */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight md:leading-[1.1]">
              PROJECT PROPOSAL
            </h1>

            <div className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed space-y-3 font-sans">
              <p className="font-semibold text-foreground">
                Thank you for considering our services.
              </p>
              <p>
                This proposal has been prepared specifically for your business based on the information provided during our discovery process.
              </p>
              <p>
                Inside this proposal you will find the project overview, scope of work, deliverables, timeline, pricing, and next steps.
              </p>
              <p className="font-medium text-foreground">
                We look forward to working with you.
              </p>
            </div>
          </motion.div>

          {/* Quick Context Chips */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap gap-3 pt-2"
          >
            <div className="bg-card/50 border border-border/40 rounded-button px-4 py-2 flex items-center gap-2 shadow-low">
              <span className="text-[10px] uppercase font-bold text-muted-foreground">PROJECT:</span>
              <span className="text-xs font-semibold text-foreground">{dynamicProject}</span>
            </div>
            <div className="bg-card/50 border border-border/40 rounded-button px-4 py-2 flex items-center gap-2 shadow-low">
              <span className="text-[10px] uppercase font-bold text-muted-foreground">PREPARED FOR:</span>
              <span className="text-xs font-semibold text-foreground">{dynamicClient}</span>
            </div>
            <div className="bg-card/50 border border-border/40 rounded-button px-4 py-2 flex items-center gap-2 shadow-low">
              <span className="text-[10px] uppercase font-bold text-muted-foreground">PREPARED BY:</span>
              <span className="text-xs font-semibold text-foreground">Bilvo AI</span>
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-4 flex flex-col sm:flex-row items-center gap-4"
        >
          <Button
            size="lg"
            onClick={onStartReview}
            className="w-full sm:w-auto h-12 px-8 flex items-center justify-center gap-2 text-sm font-semibold cursor-pointer select-none active:scale-95 transition-all shadow-medium"
          >
            Start Reviewing Proposal
            <ArrowRight className="h-4 w-4" />
          </Button>

          <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-sans">
            <Shield className="h-3.5 w-3.5 text-emerald-500" />
            Secure & SSL Protected Portal
          </span>
        </motion.div>
      </div>
    </div>
  );
}

/* ==========================================================================
   2. Info Card Component (Party profile / agreement detail card)
   ========================================================================== */

interface InfoCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function InfoCard({ title, subtitle, icon, children, className }: InfoCardProps) {
  return (
    <Card className={cn('p-6 border border-border/40 bg-card/60 backdrop-blur-sm shadow-low flex flex-col justify-between font-sans h-full transition-all duration-200 hover:border-border/60 hover:shadow-medium', className)}>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="h-9 w-9 rounded-button bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shrink-0">
              {icon}
            </div>
          )}
          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-foreground leading-snug truncate">{title}</h4>
            {subtitle && (
              <p className="text-[11px] text-muted-foreground truncate font-medium">{subtitle}</p>
            )}
          </div>
        </div>
        <div className="border-t border-border/20 pt-4 text-xs leading-relaxed text-card-foreground/90 space-y-2">
          {children}
        </div>
      </div>
    </Card>
  );
}

/* ==========================================================================
   3. Highlight Card Component
   ========================================================================== */

interface HighlightCardProps {
  title: string;
  description: string;
  badge?: string;
  icon?: React.ReactNode;
  accentColor?: 'primary' | 'emerald' | 'amber' | 'rose';
  className?: string;
}

export function HighlightCard({
  title,
  description,
  badge,
  icon,
  accentColor = 'primary',
  className,
}: HighlightCardProps) {
  const accentClasses = {
    primary: 'border-l-4 border-l-primary bg-primary/2 dark:bg-primary/1',
    emerald: 'border-l-4 border-l-emerald-500 bg-emerald-500/2',
    amber: 'border-l-4 border-l-amber-500 bg-amber-500/2',
    rose: 'border-l-4 border-l-rose-500 bg-rose-500/2',
  };

  return (
    <Card
      className={cn(
        'p-5 border border-border/30 shadow-low flex flex-col gap-3 font-sans transition-all duration-200 hover:shadow-medium',
        accentClasses[accentColor],
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1.5 min-w-0">
          {badge && (
            <Badge variant={accentColor === 'primary' ? 'brand' : accentColor === 'emerald' ? 'success' : 'neutral'} size="sm">
              {badge}
            </Badge>
          )}
          <H4 className="text-sm font-bold text-foreground leading-snug">{title}</H4>
          <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
        </div>
        {icon && (
          <div className="h-8.5 w-8.5 rounded-button bg-card border border-border/30 flex items-center justify-center text-foreground shrink-0 shadow-sm">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

/* ==========================================================================
   4. Callout Box Component
   ========================================================================== */

interface CalloutBoxProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  icon?: React.ReactNode;
  className?: string;
}

export function CalloutBox({
  title,
  children,
  variant = 'info',
  icon,
  className,
}: CalloutBoxProps) {
  const styles = {
    info: 'bg-blue-500/5 dark:bg-blue-500/2 border-blue-500/20 text-blue-800 dark:text-blue-300',
    success: 'bg-emerald-500/5 dark:bg-emerald-500/2 border-emerald-500/20 text-emerald-800 dark:text-emerald-300',
    warning: 'bg-amber-500/5 dark:bg-amber-500/2 border-amber-500/20 text-amber-800 dark:text-amber-300',
    error: 'bg-rose-500/5 dark:bg-rose-500/2 border-rose-500/20 text-rose-800 dark:text-rose-300',
  };

  const textStyles = {
    info: 'text-blue-900/90 dark:text-blue-200/90',
    success: 'text-emerald-900/90 dark:text-emerald-200/90',
    warning: 'text-amber-900/90 dark:text-amber-200/90',
    error: 'text-rose-900/90 dark:text-rose-200/90',
  };

  const defaultIcons = {
    info: <Info className="h-4.5 w-4.5 text-blue-500" />,
    success: <Check className="h-4.5 w-4.5 text-emerald-500" />,
    warning: <Award className="h-4.5 w-4.5 text-amber-500" />,
    error: <Info className="h-4.5 w-4.5 text-rose-500" />,
  };

  return (
    <div
      className={cn(
        'p-4 rounded-card border flex items-start gap-3 text-xs leading-relaxed font-sans shadow-sm transition-colors duration-200',
        styles[variant],
        className
      )}
    >
      <div className="shrink-0 mt-0.5">
        {icon || defaultIcons[variant]}
      </div>
      <div className="space-y-1">
        {title && (
          <p className="font-bold tracking-tight text-foreground">
            {title}
          </p>
        )}
        <div className={textStyles[variant]}>{children}</div>
      </div>
    </div>
  );
}

/* ==========================================================================
   5. Project Summary Card Component
   ========================================================================== */

interface GoalItem {
  text: string;
  description?: string;
}

interface ProjectSummaryCardProps {
  summaryText: string;
  goals: GoalItem[];
  outcomes: string[];
  valueProposition: string;
  className?: string;
}

export function ProjectSummaryCard({
  summaryText,
  goals,
  outcomes,
  valueProposition,
  className,
}: ProjectSummaryCardProps) {
  return (
    <Card className={cn('p-6 border border-border/40 bg-card/40 backdrop-blur-sm shadow-medium font-sans space-y-6 transition-all duration-200 hover:border-border/60', className)}>
      {/* Executive Summary */}
      <div className="space-y-2">
        <span className="text-[10px] font-bold text-primary uppercase tracking-widest font-mono">
          Executive Summary
        </span>
        <p className="text-xs md:text-sm text-foreground/90 leading-relaxed font-sans">
          {summaryText}
        </p>
      </div>

      {/* Grid of Goals & Expected Outcomes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border/20">
        {/* Strategic Goals */}
        <div className="space-y-3">
          <H4 className="text-xs font-bold text-foreground uppercase tracking-wider">
            Strategic Objectives
          </H4>
          <div className="space-y-3">
            {goals.map((goal, idx) => (
              <div key={idx} className="flex gap-2.5 items-start">
                <span className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-foreground">{goal.text}</p>
                  {goal.description && (
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {goal.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expected Outcomes */}
        <div className="space-y-3">
          <H4 className="text-xs font-bold text-foreground uppercase tracking-wider">
            Expected Outcomes
          </H4>
          <div className="space-y-2.5">
            {outcomes.map((outcome, idx) => (
              <div key={idx} className="flex gap-2.5 items-start text-xs">
                <div className="h-4.5 w-4.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3" strokeWidth={2.5} />
                </div>
                <span className="text-muted-foreground leading-relaxed">{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Value Proposition Statement */}
      <div className="pt-4 border-t border-border/20">
        <div className="bg-primary/5 rounded-button p-4 border border-primary/10">
          <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1 font-mono">
            Value Proposition
          </p>
          <p className="text-xs text-foreground/80 leading-relaxed italic">
            "{valueProposition}"
          </p>
        </div>
      </div>
    </Card>
  );
}
