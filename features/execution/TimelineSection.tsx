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
import { Divider, Stack } from '@/components/Layout';
import { H3, H4 } from '@/components/Typography';
import { SectionHeader, EmptyState } from '@/features/scope/ScopeSection';
import { TIMELINE_STATUS_BADGES } from '@/constants/proposal-status';
import { TimelineStatus } from '@/types';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  Sparkles,
  ArrowRight,
  Route
} from 'lucide-react';

/* ==========================================================================
   Timeline Item Component
   ========================================================================== */
interface TimelineItemProps {
  key?: React.Key;
  phase: string;
  duration: string;
  activities: string;
  index: number;
  total: number;
}

export function TimelineItem({
  phase,
  duration,
  activities,
  index,
  total,
}: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative pl-10 md:pl-12 pb-10 last:pb-2 font-sans group"
    >
      {/* Connector Line */}
      {index < total - 1 && (
        <div className="absolute left-[17px] top-8 bottom-0 w-[2px] bg-border/40 group-hover:bg-primary/20 transition-colors" />
      )}

      {/* Decorative Dot Icon */}
      <div className="absolute left-0 top-1 h-9 w-9 rounded-full border-2 border-primary/20 bg-card text-primary flex items-center justify-center transition-all duration-200 shadow-sm">
        <Clock className="h-4.5 w-4.5" />
      </div>

      {/* Card Wrapper for Timeline Metadata */}
      <Card className="p-5 md:p-6 border border-border/40 bg-card/40 hover:bg-card/75 hover:border-border/60 hover:shadow-sm transition-all duration-200 rounded-card">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
          <div className="space-y-1">
            <H4 className="text-sm font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
              {phase}
            </H4>
          </div>

          {/* Schedule pills */}
          <div className="flex flex-col sm:items-end gap-1 font-mono text-[11px] shrink-0 text-muted-foreground">
            <span className="flex items-center gap-1 text-primary font-semibold">
              <Calendar className="h-3 w-3" />
              {duration}
            </span>
          </div>
        </div>

        {activities && (
          <p className="text-xs text-muted-foreground leading-relaxed max-w-3xl font-sans">
            {activities}
          </p>
        )}
      </Card>
    </motion.div>
  );
}

/* ==========================================================================
   Main Timeline Section Component
   ========================================================================== */
interface TimelineSectionProps {
  onNext: () => void;
  onBack: () => void;
}

export function TimelineSection({ onNext, onBack }: TimelineSectionProps) {
  const { proposal } = useTheme();

  if (!proposal) return null;

  const executionTimeline = proposal?.projectTimeline || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <SectionHeader
        title="Project Timeline & Milestones"
        subtitle="A sequential roadmap tracking development phases, agile sprints, staging integrations, and our core launch schedule."
        badge="ROADMAP"
        icon={<Route className="h-5 w-5 text-primary" />}
      />

      {executionTimeline.length === 0 ? (
        <EmptyState
          title="No milestones currently scheduled"
          description="The active project file has no designated execution milestones."
        />
      ) : (
        <div className="pt-4 max-w-4xl mx-auto">
          {executionTimeline.map((item: any, idx: number) => (
            <TimelineItem
              key={idx}
              phase={item.phase || ''}
              duration={item.duration || ''}
              activities={item.activities || ''}
              index={idx}
              total={executionTimeline.length}
            />
          ))}
        </div>
      )}

      {/* Navigation Footer */}
      <Divider />
      <div className="flex justify-between items-center pt-2 font-sans">
        <Button 
          variant="outline" 
          onClick={onBack} 
          className="cursor-pointer h-10 px-5 flex items-center gap-2"
        >
          Back to Deliverables
        </Button>
        <Button 
          onClick={onNext} 
          className="cursor-pointer h-10 px-5 flex items-center gap-2 font-semibold"
        >
          Continue to Collaboration
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
