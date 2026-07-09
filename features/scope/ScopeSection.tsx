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
   Scope Card Component
   ========================================================================== */
interface ScopeCardProps {
  key?: React.Key;
  title: string;
  description: string;
  status: string;
  index: number;
}

export function ScopeCard({ title, description, status, index }: ScopeCardProps) {
  const isInScope = status.toLowerCase() === 'in-scope' || status.toLowerCase() === 'active';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="h-full"
    >
      <Card className="p-5 md:p-6 border border-border/40 bg-card/50 hover:bg-card/80 hover:border-border/60 hover:shadow-medium backdrop-blur-sm transition-all duration-200 rounded-card h-full flex flex-col justify-between font-sans group">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-bold text-primary bg-primary/10 h-5 w-5 rounded-button flex items-center justify-center font-mono">
                {String(index + 1).padStart(2, '0')}
              </span>
              <Badge 
                variant={isInScope ? 'success' : 'neutral'} 
                size="sm"
                className="font-semibold tracking-wide"
              >
                {status.toUpperCase()}
              </Badge>
            </div>
            
            <div className="text-emerald-500 opacity-60 group-hover:opacity-100 transition-opacity">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <H4 className="text-sm font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
              {title}
            </H4>
            <p className="text-xs text-muted-foreground leading-relaxed font-sans">
              {description}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

/* ==========================================================================
   Exclusion Card Component (Out-of-Scope Card)
   ========================================================================== */
interface ExclusionCardProps {
  key?: React.Key;
  title: string;
  description: string;
  reason?: string;
  index: number;
}

export function ExclusionCard({ title, description, reason, index }: ExclusionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Card className="p-5 md:p-6 border border-amber-500/10 bg-amber-500/2 hover:bg-amber-500/3 hover:border-amber-500/25 transition-all duration-200 rounded-card font-sans space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-button bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20 shrink-0">
              <Ban className="h-4 w-4" />
            </div>
            <H4 className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider font-mono">
              EXCLUSION {index + 1}
            </H4>
          </div>
          <Badge variant="neutral" size="sm" className="bg-amber-500/10 text-amber-800 dark:text-amber-400 border-amber-500/15">
            OUT OF SCOPE
          </Badge>
        </div>

        <div className="space-y-2">
          <H4 className="text-sm font-bold text-foreground leading-snug">
            {title}
          </H4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {reason && (
          <div className="p-3.5 rounded-button bg-amber-500/5 dark:bg-amber-500/1 border border-amber-500/10 text-[11px] text-amber-900/90 dark:text-amber-300/80 leading-relaxed font-sans flex items-start gap-2">
            <ShieldAlert className="h-3.5 w-3.5 shrink-0 text-amber-500 mt-0.5" />
            <div>
              <span className="font-semibold text-amber-800 dark:text-amber-400">Exclusion Rationale: </span>
              {reason}
            </div>
          </div>
        )}
      </Card>
    </motion.div>
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
  // Pull from our static Proposal context using ThemeProvider's placement or importing placeholder MOCK_PROPOSAL directly
  const { proposal } = useTheme();
  
  if (!proposal) return null;

  const scopeItems = proposal?.scopeOfWork || [];
  const exclusionsItems = proposal?.outOfScope || [];

  // Split scope items into 'In-scope' and others if required, but the Scope Card automatically formats based on state.
  const inScopeList = scopeItems.filter(item => item.status.toLowerCase() === 'in-scope' || item.status.toLowerCase() === 'active');

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

        {inScopeList.length === 0 ? (
          <EmptyState
            title="No active scope items defined"
            description="The current proposal dataset does not contain active, in-scope development elements. Please check the CRM synchronization feed."
            icon={<FolderMinus className="h-6 w-6" />}
          />
        ) : (
          <Grid cols={1} mdCols={2} gap={5}>
            {inScopeList.map((item, idx) => (
              <ScopeCard
                key={item.id}
                title={item.title}
                description={item.description}
                status={item.status}
                index={idx}
              />
            ))}
          </Grid>
        )}
      </div>

      {/* 2. Exclusions Section (Out of Scope) */}
      {exclusionsItems.length > 0 && (
        <div className="space-y-6 pt-4 border-t border-border/10">
          <SectionHeader
            title="Exclusions & Boundaries"
            subtitle="To safeguard engineering timelines and budget compliance, the following items are explicitly omitted from this current agreement scope."
            badge="EXCLUSIONS"
            icon={<Ban className="h-5 w-5 text-amber-500" />}
          />

          <div className="grid grid-cols-1 gap-5">
            {exclusionsItems.map((item, idx) => (
              <ExclusionCard
                key={item.id}
                title={item.title}
                description={item.description}
                reason={item.reason}
                index={idx}
              />
            ))}
          </div>
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
