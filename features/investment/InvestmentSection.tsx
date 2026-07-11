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
import { Divider } from '@/components/Layout';
import { H2, H3, H4 } from '@/components/Typography';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Award, 
  Star, 
  Calendar,
  Clock,
  Receipt,
  ShieldCheck,
  Gift,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  Info
} from 'lucide-react';
import { INVESTMENT_CONFIG } from '@/constants';

interface InvestmentSectionProps {
  onNext: () => void;
  onBack: () => void;
}

export function InvestmentSection({ onNext, onBack }: InvestmentSectionProps) {
  const { proposal } = useTheme();

  if (!proposal) return null;

  // Dynamic values extracted from proposal data
  const clientName = proposal.agreementInformation?.clientName || proposal.client?.name || 'Client';
  const companyName = proposal.agreementInformation?.companyName || proposal.client?.company || 'Company';
  const selectedPackage = proposal.agreementInformation?.serviceType || 'Founding Partner Program';
  const monthlyInvestment = proposal.agreementInformation?.projectPrice || '$297/month';
  const paymentSchedule = proposal.agreementInformation?.paymentSchedule || '50% upfront, 50% upon deployment';
  const implementationTimeline = proposal.agreementInformation?.timeline || '3-4 Weeks';

  // Replace placeholder in terms with dynamic monthly investment value
  const formattedTerms = INVESTMENT_CONFIG.terms.map(t => 
    t.replace('{monthlyInvestment}', monthlyInvestment)
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  return (
    <div className="space-y-14 animate-in fade-in duration-300 font-sans max-w-6xl mx-auto px-4 sm:px-6">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="h-11 w-11 rounded-button bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/15 shrink-0 shadow-sm">
            <Award className="h-5.5 w-5.5" />
          </div>
          <div className="space-y-1">
            <div className="text-[10px] font-bold tracking-widest uppercase font-mono text-brand-blue/90">
              Pricing Structure
            </div>
            <H2 className="text-foreground font-extrabold tracking-tight text-2xl sm:text-3xl">
              Investment &amp; Payment Terms
            </H2>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl pl-1 sm:pl-15">
          Sleek, transparent, executive-level commitment structures with clear terms, a locked-in rate, and a solid guarantee.
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-10 sm:space-y-12"
      >
        {/* SECTION 1: FOUNDING PARTNER PROGRAM */}
        <motion.div variants={itemVariants}>
          <Card className="rounded-card border border-border/40 bg-card/45 backdrop-blur-md p-6 sm:p-8 md:p-10 shadow-medium space-y-8 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-2xl pointer-events-none -z-10" />
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-border/10">
              <div className="space-y-3 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold tracking-widest font-mono uppercase px-2.5 py-0.5 rounded-full border bg-brand-blue/10 text-brand-blue border-brand-blue/20">
                    Founding Partner Program
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-tight">
                  {selectedPackage}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Tailored high-performance execution built exclusively for <span className="text-foreground font-medium">{clientName}</span> at <span className="text-foreground font-medium">{companyName}</span>.
                </p>
              </div>

              {/* Dynamic Pricing Display */}
              <div className="bg-brand-blue/5 border border-brand-blue/10 rounded-card p-6 flex flex-col items-center justify-center text-center md:min-w-[220px] shrink-0 shadow-sm">
                <span className="text-[10px] font-mono font-bold text-brand-blue uppercase tracking-widest">Monthly Investment</span>
                <span className="text-3xl sm:text-4xl font-extrabold text-foreground mt-2 font-sans tracking-tight">{monthlyInvestment}</span>
                <span className="text-[10px] text-muted-foreground/85 mt-1 uppercase tracking-wider font-mono">USD / Month</span>
              </div>
            </div>

            {/* Program Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pt-2">
              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-mono mb-2">Best For</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground/90 leading-relaxed font-sans font-normal">
                    {INVESTMENT_CONFIG.bestFor}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-mono mb-2">Outcome</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground/90 leading-relaxed font-sans font-normal">
                    {INVESTMENT_CONFIG.outcome}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-mono mb-3">Includes</h4>
                <div className="grid grid-cols-1 gap-3">
                  {INVESTMENT_CONFIG.includes.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground/90 leading-relaxed font-sans">{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Estimated Implementation Footer within Card */}
            <div className="pt-6 border-t border-border/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2.5 text-muted-foreground/80">
                <Calendar className="h-4 w-4 text-brand-blue/70 shrink-0" />
                <span>Estimated Implementation: <span className="text-foreground/90 font-normal">{implementationTimeline}</span></span>
              </div>
              <div className="flex items-center gap-2.5 text-muted-foreground/80">
                <Receipt className="h-4 w-4 text-brand-blue/70 shrink-0" />
                <span>Payment Schedule: <span className="text-foreground/90 font-normal">{paymentSchedule}</span></span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* SECTION 2 & 3: TERMS & OUR GUARANTEE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* SECTION 3: Founding Partner Terms */}
          <motion.div variants={itemVariants} className="space-y-4 flex flex-col">
            <div className="flex items-center gap-2 pb-1">
              <Receipt className="h-4.5 w-4.5 text-brand-blue" />
              <h3 className="text-xs font-bold text-foreground uppercase tracking-widest font-mono">Founding Partner Terms</h3>
            </div>
            <Card className="rounded-card border border-border/40 bg-card/30 p-6 sm:p-8 flex flex-col justify-between flex-1 shadow-sm">
              <div className="flex flex-col divide-y divide-border/10">
                {formattedTerms.map((term, idx) => (
                  <div key={idx} className="flex items-start gap-4 py-3 first:pt-0 last:pb-0">
                    <span className="h-6 w-6 rounded-full bg-brand-blue/5 border border-brand-blue/15 text-brand-blue flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground/90 leading-relaxed font-sans">{term}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* SECTION 2: Our Guarantee */}
          <motion.div variants={itemVariants} className="space-y-4 flex flex-col">
            <div className="flex items-center gap-2 pb-1">
              <ShieldCheck className="h-4.5 w-4.5 text-emerald-500" />
              <h3 className="text-xs font-bold text-foreground uppercase tracking-widest font-mono">Our Guarantee</h3>
            </div>
            <Card className="rounded-card border border-emerald-500/15 bg-emerald-500/2 dark:bg-emerald-500/1 p-6 sm:p-8 shadow-sm flex flex-col justify-between flex-1 relative overflow-hidden">
              <div className="space-y-5">
                <div className="h-10 w-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/10">
                  <ShieldCheck className="h-5.5 w-5.5" />
                </div>
                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-foreground tracking-tight">Zero-Risk Implementation Promise</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground/95 leading-relaxed font-sans italic">
                    &quot;{INVESTMENT_CONFIG.ourGuarantee}&quot;
                  </p>
                </div>
              </div>
              
              <div className="pt-6 border-t border-emerald-500/10 text-[10px] text-muted-foreground/60 flex items-center gap-1.5 mt-8 font-mono tracking-widest uppercase">
                <Sparkles className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                <span>Committed to Uncompromising Precision</span>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* SECTION 4 & 5: LONG-TERM COMMITMENT BONUS & TESTIMONIALS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* SECTION 4: Long-Term Commitment Bonus */}
          <motion.div variants={itemVariants} className="space-y-4 flex flex-col h-full">
            <div className="flex items-center gap-2 pb-1 shrink-0">
              <Gift className="h-4.5 w-4.5 text-brand-blue" />
              <h3 className="text-xs font-bold text-foreground uppercase tracking-widest font-mono">Long-Term Commitment Bonus</h3>
            </div>
            <div className="flex flex-col gap-5 flex-1 justify-center">
              {INVESTMENT_CONFIG.bonuses.map((bonus, i) => {
                const formatTitle = (title: string) => {
                  return title.charAt(0).toUpperCase() + title.slice(1);
                };

                const cleanDesc = bonus.description.trim().replace(/\.$/, '');
                const isFiftyOff = cleanDesc.toLowerCase().includes('50% off');
                const isMonthSeven = cleanDesc.toLowerCase().includes('month 7 free');

                return (
                  <Card key={i} className="rounded-card border border-border/40 bg-card/25 p-6 sm:p-8 flex items-start gap-5 hover:border-brand-blue/35 hover:shadow-md transition-all duration-300 w-full">
                    <div className="h-12 w-12 rounded-full bg-brand-blue/5 text-brand-blue flex items-center justify-center border border-brand-blue/10 shrink-0 shadow-sm mt-0.5">
                      <Gift className="h-6 w-6" />
                    </div>
                    <div className="space-y-1.5 min-w-0 flex-1">
                      <h4 className="text-base sm:text-lg md:text-xl font-bold text-foreground tracking-tight leading-snug">
                        {formatTitle(bonus.title)}
                      </h4>
                      <div className="text-sm sm:text-base text-muted-foreground/80 font-normal leading-normal flex items-center gap-1.5 mt-1">
                        <Sparkles className="h-4 w-4 text-amber-500/80 shrink-0" />
                        {isFiftyOff ? (
                          <span>
                            Receive <span className="font-semibold text-emerald-600 dark:text-emerald-400">50% Off</span> Month 4
                          </span>
                        ) : isMonthSeven ? (
                          <span>
                            Receive <span className="font-semibold text-emerald-600 dark:text-emerald-400">Month 7 Free</span>
                          </span>
                        ) : (
                          <span>
                            Receive <span className="font-semibold text-emerald-600 dark:text-emerald-400">{cleanDesc}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </motion.div>

          {/* SECTION 5: Testimonial & Case Study Policy */}
          <motion.div variants={itemVariants} className="space-y-4 flex flex-col">
            <div className="flex items-center gap-2 pb-1">
              <MessageSquare className="h-4.5 w-4.5 text-brand-blue" />
              <h3 className="text-xs font-bold text-foreground uppercase tracking-widest font-mono">Testimonial &amp; Case Study</h3>
            </div>
            <Card className="rounded-card border border-border/40 bg-card/20 p-6 sm:p-8 flex flex-col justify-between gap-6 flex-1 shadow-sm">
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-muted-foreground/70 uppercase tracking-widest font-mono">Policy Overview</span>
                  <p className="text-xs sm:text-sm text-muted-foreground/90 leading-relaxed font-sans">
                    To maintain this locked-in Founding Partner rate, we ask our partners to share their operational journey with our prospective clients:
                  </p>
                </div>
                
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-start gap-3 py-0.5">
                    <div className="h-4 w-4 text-amber-500 shrink-0 mt-0.5 flex items-center justify-center">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                    </div>
                    <span className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed font-sans">
                      Provide an honest testimonial about your experience.
                    </span>
                  </div>
                  <div className="flex items-start gap-3 py-0.5">
                    <div className="h-4 w-4 text-amber-500 shrink-0 mt-0.5 flex items-center justify-center">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                    </div>
                    <span className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed font-sans">
                      Allow us to use your results as a case study (only with your approval).
                    </span>
                  </div>
                  <div className="flex items-start gap-3 py-0.5">
                    <div className="h-4 w-4 text-amber-500 shrink-0 mt-0.5 flex items-center justify-center">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                    </div>
                    <span className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed font-sans">
                      Participate in a short feedback session to help us improve our systems and client experience.
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-brand-blue/5 border border-brand-blue/10 rounded-button p-4">
                <Info className="h-4.5 w-4.5 text-brand-blue shrink-0 mt-0.5" />
                <p className="text-[11px] text-muted-foreground leading-relaxed font-sans">
                  Providing a positive review is never required. We only ask for honest feedback based on your experience.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
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
