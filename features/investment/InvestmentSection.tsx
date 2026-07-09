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

  const totalInvestment = proposal?.pricing?.total || 7000.00;
  const depositDue = proposal?.pricing?.deposit || 3500.00;
  const remainingBalance = proposal?.pricing?.remainingBalance || 3500.00;
  const projectName = proposal?.project?.projectName || 'Digital Onboarding Pipeline';
  const clientName = proposal.agreementInformation?.companyName || proposal?.client?.company || 'Nafirofiqul LLC';

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(val);
  };

  const expectedOutcomes = [
    'Automate client intake and document collation pipelines',
    'Significantly reduce average lead-to-onboarding time',
    'Dramatically improve onboarding data precision and reliability',
    'Enable structured API synchronization across internal databases'
  ];

  const paymentSchedule = proposal?.pricing?.paymentSchedule || [
    {
      id: 'ps_1',
      milestoneName: 'Initial Kickoff Deposit (50%)',
      amount: 3500.0,
      dueDate: 'July 5, 2026',
      status: 'PAID',
    },
    {
      id: 'ps_2',
      milestoneName: 'Milestone 2 Approval (E-Sign Completed)',
      amount: 1750.0,
      dueDate: 'July 24, 2026',
      status: 'PENDING',
    },
    {
      id: 'ps_3',
      milestoneName: 'Final Project Handoff Approval',
      amount: 1750.0,
      dueDate: 'August 7, 2026',
      status: 'PENDING',
    },
  ];

  const revisionsInfo = proposal?.revisions || {
    includedRevisions: 3,
    additionalRevisionPricing: '$150/hour flat-rate consulting fee',
    responseTime: 'Within 24 business hours',
  };

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
              Transparent, results-oriented pricing linked directly to concrete project progress. No confusing monthly subscriptions or hidden developer retainers.
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
                <H3 className="text-xl font-bold text-foreground">{projectName}</H3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Tailored integration designed for <strong className="text-foreground/90 font-semibold">{clientName}</strong>. Includes full delivery, e-sign validation models, workflow triggers, and production deployment.
                </p>
              </div>

              {/* Pricing Display */}
              <div className="bg-brand-blue/3 border border-brand-blue/15 rounded-button p-5 flex flex-col items-center justify-center text-center md:min-w-[200px] shrink-0">
                <span className="text-xs font-mono font-bold text-brand-blue uppercase tracking-widest">Total Investment</span>
                <span className="text-3xl font-black text-foreground mt-1 font-sans">{formatCurrency(totalInvestment)}</span>
                <span className="text-[10px] text-muted-foreground mt-1">50% due today to kickoff</span>
              </div>
            </div>

            {/* Expected Business Outcomes Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-foreground/80 uppercase tracking-wider font-mono">Expected Project Outcomes</h4>
                <div className="grid grid-cols-1 gap-3">
                  {expectedOutcomes.map((outcome, idx) => (
                    <div key={idx} className="flex gap-3 items-start p-3 rounded-lg border border-border/5 bg-muted/10 hover:border-brand-blue/15 transition-all duration-200">
                      <div className="h-5.5 w-5.5 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0 border border-brand-blue/15">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </div>
                      <span className="text-xs sm:text-sm text-foreground/90 leading-snug">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Implementation Callout */}
              <div className="flex flex-col justify-center">
                <div className="bg-brand-blue/3 border border-brand-blue/10 rounded-button p-5 space-y-3">
                  <div className="flex items-center gap-2 text-brand-blue">
                    <Clock className="h-4 w-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Kickoff Timeline</span>
                  </div>
                  <p className="text-xs text-foreground/90 leading-relaxed font-sans">
                    Implementation launches immediately upon deposit confirmation and completion of brief, automated workflow variables configuration.
                  </p>
                  <div className="p-3 bg-card/60 rounded border border-brand-blue/10 text-center">
                    <span className="text-[11px] text-muted-foreground block font-mono uppercase tracking-wider">Estimated launch window:</span>
                    <span className="text-base font-bold text-brand-blue block mt-0.5">Up to 7 business days</span>
                    <span className="text-[10px] text-muted-foreground italic block mt-0.5">Ready for review cycles sooner.</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* CARD 2: PAYMENT SCHEDULE & MILESTONES */}
        <motion.div variants={itemVariants} className="transition-all duration-300">
          <Card className="rounded-card border border-border/40 bg-card/45 backdrop-blur-md p-6 md:p-8 shadow-medium space-y-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/3 rounded-full blur-2xl pointer-events-none -z-10" />
            
            <div className="flex items-center gap-3 pb-4 border-b border-border/10">
              <div className="h-10 w-10 rounded-button bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/15 shrink-0">
                <Receipt className="h-5 w-5" />
              </div>
              <div>
                <H3 className="text-base font-bold text-foreground">Payment Milestone Schedule</H3>
                <p className="text-xs text-muted-foreground">Phased payments connected directly to concrete project results</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {paymentSchedule.map((milestone: any, idx: number) => {
                const isPaid = milestone.status?.toString().toUpperCase() === 'PAID';
                return (
                  <div 
                    key={milestone.id || idx} 
                    className={`p-5 rounded-lg border flex flex-col justify-between space-y-4 transition-all duration-200 ${
                      isPaid 
                        ? 'border-emerald-500/25 bg-emerald-500/3 hover:border-emerald-500/40' 
                        : 'border-border/10 bg-muted/10 hover:border-brand-blue/20'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[9px] font-bold tracking-wider font-mono uppercase">
                          Milestone {idx + 1}
                        </span>
                        <Badge variant={isPaid ? 'success' : 'warning'} className="font-semibold text-[9px] px-2 py-0.5">
                          {isPaid ? 'PAID / SECURED' : 'PENDING APPROVAL'}
                        </Badge>
                      </div>
                      <p className="text-sm font-bold text-foreground leading-snug">{milestone.milestoneName}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 font-sans">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        Due Date: {milestone.dueDate}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-border/5 flex items-baseline gap-1.5">
                      <span className="text-xl font-mono font-bold text-foreground">{formatCurrency(milestone.amount)}</span>
                      <span className="text-[10px] text-muted-foreground font-sans">USD</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* CARD 3: REVISIONS & SLA TERMS */}
        <motion.div variants={itemVariants} className="transition-all duration-300">
          <Card className="rounded-card border border-border/40 bg-card/45 backdrop-blur-md p-6 md:p-8 shadow-medium space-y-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/3 rounded-full blur-2xl pointer-events-none -z-10" />
            
            <div className="flex items-center gap-3 pb-4 border-b border-border/10">
              <div className="h-10 w-10 rounded-button bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/15 shrink-0">
                <RefreshCw className="h-5 w-5" />
              </div>
              <div>
                <H3 className="text-base font-bold text-foreground">Revision Policy & Response Guidelines</H3>
                <p className="text-xs text-muted-foreground">Clear feedback and revision guidelines</p>
              </div>
            </div>

            <Grid cols={1} mdCols={3} gap={6}>
              <div className="p-4 rounded-lg bg-muted/10 border border-border/5 space-y-1 font-sans">
                <span className="text-[10px] font-bold text-brand-blue font-mono uppercase tracking-wider block">Included Revisions</span>
                <span className="text-lg font-bold text-foreground block">{revisionsInfo.includedRevisions} Major Feedback Cycles</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Feedback rounds at each milestone to refine and optimize your solution.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-muted/10 border border-border/5 space-y-1 font-sans">
                <span className="text-[10px] font-bold text-brand-blue font-mono uppercase tracking-wider block">Additional Revisions</span>
                <span className="text-lg font-bold text-foreground block">{revisionsInfo.additionalRevisionPricing}</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Optional additions requested after launch are billed at a clear flat rate.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-muted/10 border border-border/5 space-y-1 font-sans">
                <span className="text-[10px] font-bold text-brand-blue font-mono uppercase tracking-wider block">Response Guarantee</span>
                <span className="text-lg font-bold text-foreground block">{revisionsInfo.responseTime}</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Timely support responses to keep our project timeline on schedule.
                </p>
              </div>
            </Grid>
          </Card>
        </motion.div>

        {/* CARD 4: TESTIMONIAL & CASE STUDY COLLABORATION */}
        <motion.div variants={itemVariants} className="transition-all duration-300">
          <Card className="rounded-card border border-border/40 bg-card/45 backdrop-blur-md p-6 md:p-8 shadow-medium space-y-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/3 rounded-full blur-2xl pointer-events-none -z-10" />
            
            <div className="flex items-center gap-3 pb-4 border-b border-border/10">
              <div className="h-10 w-10 rounded-button bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/15 shrink-0">
                <Star className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <H3 className="text-base font-bold text-foreground">Case Study Collaboration (Optional)</H3>
                <p className="text-xs text-muted-foreground">Sharing your success story to inspire others while highlighting your project</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 space-y-3.5">
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
                  We take great pride in our work. Once your systems are fully live and delivering results, we would love to feature your success in an optional case study.
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
                  This is completely optional and will only be published with your written approval.
                </p>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <p className="text-[11px] font-bold text-foreground/80 uppercase tracking-wider font-mono pl-1">
                  If you're thrilled with your results, we would love:
                </p>
                <div className="space-y-3">
                  {testimonialRequests.map((req, idx) => (
                    <div key={idx} className="flex gap-3 items-start p-3 rounded-lg border border-border/5 bg-muted/10 hover:border-brand-blue/15 transition-all duration-200">
                      <div className="h-5 w-5 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 border border-amber-500/15">
                        <Star className="h-3 w-3 fill-amber-500" />
                      </div>
                      <span className="text-xs sm:text-sm text-foreground/90 leading-snug">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/10 flex items-start gap-2.5 text-[10px] text-muted-foreground leading-relaxed font-sans">
              <span className="inline-flex h-2 w-2 rounded-full bg-brand-blue mt-1 shrink-0 animate-pulse" />
              <p>
                <strong>Important Note:</strong> All proprietary integrations and data structures remain strictly confidential. Your security is our priority.
              </p>
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
