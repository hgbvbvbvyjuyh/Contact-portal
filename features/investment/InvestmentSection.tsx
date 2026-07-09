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
import { H2, H3 } from '@/components/Typography';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Award, 
  Star, 
  Calendar,
  Clock,
  Receipt,
  RefreshCw
} from 'lucide-react';

interface InvestmentSectionProps {
  onNext: () => void;
  onBack: () => void;
}

export function InvestmentSection({ onNext, onBack }: InvestmentSectionProps) {
  const { proposal } = useTheme();

  if (!proposal) return null;

  const projectPrice = proposal.agreementInformation?.projectPrice || 'N/A';
  const paymentScheduleText = proposal.agreementInformation?.paymentSchedule || 'N/A';
  const serviceType = proposal.agreementInformation?.serviceType || 'Client Proposal';
  const clientName = proposal.agreementInformation?.clientName || 'N/A';

  const expectedOutcomesText = proposal.projectOverview?.expectedOutcomes || 'N/A';

  const testimonialRequests = [
    'An honest testimonial about your onboarding experience.',
    'Permission to feature your project as an active case study (only with your explicit approval).',
    'Participation in a short feedback session to help us optimize your workflow and system performance.'
  ];

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
    <div className="space-y-12 animate-in fade-in duration-300 font-sans max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-button bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/15 shrink-0">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <H2 className="text-foreground font-black tracking-tight text-2xl sm:text-3xl">Investment & Milestone Schedule</H2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
              Transparent, results-oriented pricing linked directly to concrete project progress.
            </p>
          </div>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {/* CARD 1: PROJECT INVESTMENT OVERVIEW */}
        <motion.div variants={itemVariants} className="transition-all duration-300">
          <Card className="rounded-card border border-border/40 bg-card/45 backdrop-blur-md p-6 md:p-8 shadow-medium space-y-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-2xl pointer-events-none -z-10" />
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-border/10">
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold tracking-widest font-mono uppercase px-2.5 py-0.5 rounded-full border bg-brand-blue/10 text-brand-blue border-brand-blue/20">
                    Project Scope
                  </span>
                </div>
                <H3 className="text-xl font-bold text-foreground">{serviceType}</H3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Tailored integration designed for <strong className="text-foreground/90 font-semibold">{clientName}</strong>.
                </p>
              </div>

              {/* Pricing Display */}
              <div className="bg-brand-blue/3 border border-brand-blue/15 rounded-button p-5 flex flex-col items-center justify-center text-center md:min-w-[200px] shrink-0">
                <span className="text-xs font-mono font-bold text-brand-blue uppercase tracking-widest">Total Investment</span>
                <span className="text-3xl font-black text-foreground mt-1 font-sans">{projectPrice}</span>
                <span className="text-[10px] text-muted-foreground mt-1">USD</span>
              </div>
            </div>

            {/* Expected Business Outcomes Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-foreground/80 uppercase tracking-wider font-mono">Expected Outcomes</h4>
                <div className="p-4 rounded-lg bg-muted/10 border border-border/5 text-xs sm:text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
                  {expectedOutcomesText}
                </div>
              </div>

              {/* Implementation Callout */}
              <div className="flex flex-col justify-center">
                <div className="bg-brand-blue/3 border border-brand-blue/10 rounded-button p-5 space-y-3">
                  <div className="flex items-center gap-2 text-brand-blue">
                    <Clock className="h-4 w-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Payment Schedule Details</span>
                  </div>
                  <p className="text-xs text-foreground/90 leading-relaxed font-sans whitespace-pre-wrap">
                    {paymentScheduleText}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Navigation Footer */}
      <Divider />
      <div className="flex justify-between items-center pt-2 font-sans">
        <Button 
          variant="outline" 
          onClick={onBack} 
          className="cursor-pointer h-10 px-5 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Partnership
        </Button>
        <Button 
          onClick={onNext} 
          className="cursor-pointer h-10 px-5 flex items-center gap-2 font-semibold"
        >
          Continue to Ownership
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
