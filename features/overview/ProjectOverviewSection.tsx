/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Layout';
import { H2, H3 } from '@/components/Typography';
import { 
  Briefcase, 
  Target, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Check, 
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectOverviewSectionProps {
  onNext: () => void;
  onBack: () => void;
}

export function ProjectOverviewSection({ onNext, onBack }: ProjectOverviewSectionProps) {
  const { proposal } = useTheme();

  if (!proposal) return null;

  // Stagger animation definitions
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300 font-sans">
      {/* Page Header */}
      <div className="space-y-3">
        <H2 className="text-foreground font-black tracking-tight text-2xl sm:text-3xl">Project Overview</H2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Follow the sections below to see how this strategic initiative addresses your operational needs, defines key success goals, and delivers long-term business value.
        </p>
      </div>

      {/* Main Sections Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-10"
      >
        {/* 1. CURRENT SITUATION */}
        {proposal.projectOverview?.currentSituation && (
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -3, borderColor: 'rgba(47, 107, 255, 0.2)' }}
            className="p-6 md:p-8 rounded-card border border-border/40 bg-card/40 backdrop-blur-md space-y-6 shadow-medium transition-all duration-300"
          >
            <div className="flex items-center gap-3 border-b border-border/10 pb-4">
              <div className="h-10 w-10 rounded-button bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/15 shrink-0">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <H3 className="text-base font-bold text-foreground">1. Current Situation</H3>
                <p className="text-xs text-muted-foreground">The context and core operational challenges driving this project</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {proposal.projectOverview.currentSituation}
            </p>
          </motion.div>
        )}

        {/* 2. BUSINESS OBJECTIVES */}
        {proposal.projectOverview?.businessObjectives && (
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -3, borderColor: 'rgba(47, 107, 255, 0.2)' }}
            className="p-6 md:p-8 rounded-card border border-border/40 bg-card/40 backdrop-blur-md space-y-6 shadow-medium transition-all duration-300"
          >
            <div className="flex items-center gap-3 border-b border-border/10 pb-4">
              <div className="h-10 w-10 rounded-button bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/15 shrink-0">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <H3 className="text-base font-bold text-foreground">2. Business Objectives</H3>
                <p className="text-xs text-muted-foreground">Strategic milestones we seek to accomplish together</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {proposal.projectOverview.businessObjectives}
            </p>
          </motion.div>
        )}

        {/* 3. WHY THIS PROJECT / RATIONALE */}
        {proposal.projectOverview?.projectRationale && (
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -3, borderColor: 'rgba(47, 107, 255, 0.2)' }}
            className="p-6 md:p-8 rounded-card border border-border/40 bg-card/40 backdrop-blur-md space-y-6 shadow-medium transition-all duration-300"
          >
            <div className="flex items-center gap-3 border-b border-border/10 pb-4">
              <div className="h-10 w-10 rounded-button bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/15 shrink-0">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <H3 className="text-base font-bold text-foreground">3. Project Rationale</H3>
                <p className="text-xs text-muted-foreground">The value blueprint, scalability, and strategic timing of this solution</p>
              </div>
            </div>
            <div className="bg-brand-blue/3 rounded-button p-5 border border-brand-blue/10 space-y-3">
              <p className="text-[10px] font-bold text-brand-blue uppercase tracking-widest font-mono">
                Solution Value Proposition
              </p>
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap italic">
                {proposal.projectOverview.projectRationale}
              </p>
            </div>
          </motion.div>
        )}

        {/* 4. EXPECTED BUSINESS OUTCOMES */}
        {proposal.projectOverview?.expectedOutcomes && (
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -3, borderColor: 'rgba(47, 107, 255, 0.2)' }}
            className="p-6 md:p-8 rounded-card border border-border/40 bg-card/40 backdrop-blur-md space-y-6 shadow-medium transition-all duration-300"
          >
            <div className="flex items-center gap-3 border-b border-border/10 pb-4">
              <div className="h-10 w-10 rounded-button bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/15 shrink-0">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <H3 className="text-base font-bold text-foreground">4. Expected Outcomes</H3>
                <p className="text-xs text-muted-foreground">Measurable organizational improvements post-implementation</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {proposal.projectOverview.expectedOutcomes}
            </p>
          </motion.div>
        )}

        {/* 5. STATIC SECTION - WHY WORK WITH US */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -3, borderColor: 'rgba(16, 185, 129, 0.2)' }}
          className="p-6 md:p-8 rounded-card border border-border/40 bg-card/40 backdrop-blur-md space-y-6 shadow-medium transition-all duration-300 relative overflow-hidden"
        >
          {/* Subtle accent blur */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none -z-10" />
          
          <div className="flex items-center gap-3 border-b border-border/10 pb-4">
            <div className="h-10 w-10 rounded-button bg-emerald-500/10 text-emerald-600 flex items-center justify-center border border-emerald-500/15 shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <H3 className="text-base font-bold text-foreground">Why Work With Us</H3>
              <p className="text-xs text-muted-foreground">Our client-centric delivery standards, consultative values, and promise</p>
            </div>
          </div>
          
          <div className="space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed border-l-2 border-emerald-500/50 pl-4 py-1 italic">
            <p>
              We believe every business deserves systems that support growth—not create more work.
            </p>
            <p>
              Our approach focuses on helping you save time, improve efficiency, and create a smoother experience for both your team and your customers. Every solution is designed around your business goals, ensuring that technology becomes a practical tool for growth rather than another process to manage.
            </p>
            <p>
              From planning to delivery, we prioritize clear communication, reliable execution, and long-term value so you can focus on growing your business with confidence.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom navigation bar */}
      <Divider />
      <div className="flex justify-between items-center pt-2">
        <Button variant="outline" onClick={onBack} className="cursor-pointer h-10 px-5 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Agreement Info
        </Button>
        <Button onClick={onNext} className="cursor-pointer h-10 px-5 flex items-center gap-2">
          Continue to SOW
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
