/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '@/components/ThemeProvider';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { Divider, Grid, Stack } from '@/components/Layout';
import { H2, H3, H4, Body } from '@/components/Typography';
import { 
  CheckCircle2, 
  Ban, 
  HelpCircle, 
  FolderMinus, 
  ChevronRight, 
  Layers, 
  ShieldAlert,
  ArrowRight,
  Sparkles
} from 'lucide-react';

/* ==========================================================================
   Section Header Component
   ========================================================================== */
interface SectionHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
  icon?: React.ReactNode;
}

export function SectionHeader({ title, subtitle, badge, icon }: SectionHeaderProps) {
  return (
    <div className="space-y-3 font-sans">
      <div className="flex items-center gap-2">
        {badge && (
          <Badge variant="brand" size="sm" className="font-mono tracking-wider">
            {badge}
          </Badge>
        )}
      </div>
      <div className="flex items-start gap-3">
        {icon && (
          <div className="h-10 w-10 rounded-button bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shrink-0">
            {icon}
          </div>
        )}
        <div className="space-y-1.5 min-w-0">
          <H2 className="text-foreground font-bold tracking-tight">{title}</H2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Empty State Component
   ========================================================================== */
interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <Card className="p-10 border border-dashed border-border/60 bg-muted/5 flex flex-col items-center justify-center text-center space-y-4 font-sans rounded-card">
      <div className="h-12 w-12 rounded-full bg-muted/30 text-muted-foreground flex items-center justify-center border border-border/10">
        {icon || <HelpCircle className="h-6 w-6" />}
      </div>
      <div className="space-y-1 max-w-sm">
        <H4 className="text-sm font-semibold text-foreground">{title}</H4>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </Card>
  );
}

/* ==========================================================================
   Main Scope Section Wrapper Component
   ========================================================================== */
interface ScopeSectionProps {
  onNext: () => void;
  onBack: () => void;
}

export function ScopeSection({ onNext, onBack }: ScopeSectionProps) {
  const { proposal } = useTheme();
  
  if (!proposal) return null;

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {/* 1. Scope of Work Core Section */}
      <div className="space-y-6">
        <SectionHeader
          title="Scope of Work"
          subtitle="A granular breakdown of the specific project boundaries and product architecture standards included in our service agreement."
          badge="PROJECT SCOPE"
          icon={<Layers className="h-5 w-5 text-primary" />}
        />

        {!proposal.scopeOfWork ? (
          <EmptyState
            title="No active scope items defined"
            description="The current proposal dataset does not contain active, in-scope development elements."
            icon={<FolderMinus className="h-6 w-6" />}
          />
        ) : (
          <Card className="p-6 md:p-8 border border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-200 rounded-card font-sans">
            <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap font-sans">
              {proposal.scopeOfWork}
            </p>
          </Card>
        )}
      </div>

      {/* 2. Exclusions Section (Out of Scope) */}
      {proposal.outOfScope && (
        <div className="space-y-6 pt-4 border-t border-border/10">
          <SectionHeader
            title="Exclusions & Boundaries"
            subtitle="To safeguard engineering timelines and budget compliance, the following items are explicitly omitted from this current agreement scope."
            badge="EXCLUSIONS"
            icon={<Ban className="h-5 w-5 text-amber-500" />}
          />

          <Card className="p-6 md:p-8 border border-amber-500/10 bg-amber-500/2 transition-all duration-200 rounded-card font-sans">
            <p className="text-sm text-foreground/95 leading-relaxed whitespace-pre-wrap font-sans">
              {proposal.outOfScope}
            </p>
          </Card>
        </div>
      )}

      {/* Bottom Navigation Controls */}
      <Divider />
      <div className="flex justify-between items-center pt-2 font-sans">
        <Button 
          variant="outline" 
          onClick={onBack} 
          className="cursor-pointer h-10 px-5 flex items-center gap-2"
        >
          Back to Overview
        </Button>
        <Button 
          onClick={onNext} 
          className="cursor-pointer h-10 px-5 flex items-center gap-2 font-semibold"
        >
          Continue to Deliverables
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
