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
import { Divider, Grid } from '@/components/Layout';
import { H2, H3, H4 } from '@/components/Typography';
import { SectionHeader, EmptyState } from '../scope/ScopeSection';
import { 
  Box, 
  Calendar, 
  Layers, 
  FileCheck, 
  Code2, 
  Workflow,
  ArrowRight
} from 'lucide-react';

/* ==========================================================================
   Deliverable Card Component
   ========================================================================== */
interface DeliverableCardProps {
  key?: React.Key;
  title: string;
  description: string;
  deliveryFormat: string;
  estimatedDelivery: string;
  index: number;
}

export function DeliverableCard({
  title,
  description,
  deliveryFormat,
  estimatedDelivery,
  index,
}: DeliverableCardProps) {
  // Select a decorative icon based on title or index
  const getIcon = () => {
    if (title.toLowerCase().includes('web') || title.toLowerCase().includes('code')) {
      return <Code2 className="h-5 w-5 text-primary" />;
    }
    if (title.toLowerCase().includes('design') || title.toLowerCase().includes('figma') || title.toLowerCase().includes('prototype')) {
      return <Layers className="h-5 w-5 text-emerald-500" />;
    }
    return <Workflow className="h-5 w-5 text-indigo-500" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="h-full"
    >
      <Card className="p-6 border border-border/50 bg-card hover:border-primary/25 hover:shadow-medium hover:-translate-y-[2px] transition-all duration-300 ease-out rounded-card h-full flex flex-col justify-between font-sans group">
        <div className="space-y-4">
          {/* Card Top Indicator */}
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold tracking-wider text-muted-foreground font-mono uppercase">
              DELIVERABLE {String(index + 1).padStart(2, '0')}
            </span>
            <div className="h-8 w-8 rounded-button bg-primary/10 flex items-center justify-center border border-primary/15 shrink-0 transition-colors group-hover:bg-primary/15">
              {getIcon()}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <H4 className="text-sm font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
              {title}
            </H4>
            <p className="text-xs text-muted-foreground leading-relaxed font-sans">
              {description}
            </p>
          </div>
        </div>

        {/* Deliverable Metadata Bottom details */}
        <div className="mt-5 pt-4 border-t border-border/20 space-y-2.5">
          {/* Format */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[10px] uppercase font-bold text-muted-foreground w-16 shrink-0">Format:</span>
            <span className="text-foreground/90 font-medium truncate flex-1 font-sans text-xs">
              {deliveryFormat}
            </span>
          </div>

          {/* Estimated Schedule */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[10px] uppercase font-bold text-muted-foreground w-16 shrink-0">Schedule:</span>
            <span className="text-primary font-semibold flex items-center gap-1 font-mono text-[11px]">
              <Calendar className="h-3 w-3 text-primary/70" />
              {estimatedDelivery}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

/* ==========================================================================
   Main Deliverables Section Wrapper Component
   ========================================================================== */
interface DeliverablesSectionProps {
  onNext: () => void;
  onBack: () => void;
}

export function DeliverablesSection({ onNext, onBack }: DeliverablesSectionProps) {
  // Fetch dynamic proposal values from ThemeProvider context
  const { proposal } = useTheme();

  if (!proposal) return null;

  const deliverablesList = proposal?.deliverables || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <SectionHeader
        title="Key Deliverables"
        subtitle="The project is divided into tangible, verifiable engineering components. Each milestone release represents functional progress you can test in real-time."
        badge="DELIVERABLES GRID"
        icon={<Box className="h-5 w-5 text-primary" />}
      />

      {deliverablesList.length === 0 ? (
        <EmptyState
          title="No deliverables specified"
          description="The active agreement contains no delivery schedules. Please synchronize the proposal with the contract administrator."
          icon={<FileCheck className="h-6 w-6" />}
        />
      ) : (
        <Grid cols={1} smCols={2} mdCols={3} gap={5}>
          {deliverablesList.map((item, idx) => (
            <DeliverableCard
              key={item.id}
              title={item.title}
              description={item.description}
              deliveryFormat={item.deliveryFormat}
              estimatedDelivery={item.estimatedDelivery}
              index={idx}
            />
          ))}
        </Grid>
      )}

      {/* Bottom Navigation */}
      <Divider />
      <div className="flex justify-between items-center pt-2 font-sans">
        <Button 
          variant="outline" 
          onClick={onBack} 
          className="cursor-pointer h-10 px-5 flex items-center gap-2"
        >
          Back to Scope
        </Button>
        <Button 
          onClick={onNext} 
          className="cursor-pointer h-10 px-5 flex items-center gap-2 font-semibold"
        >
          Continue to Timeline
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
