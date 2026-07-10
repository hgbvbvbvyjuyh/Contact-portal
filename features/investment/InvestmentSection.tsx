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
  Sparkles
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
    <div className="space-y-12 animate-in fade-in duration-300 font-sans max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-button bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/15 shrink-0">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <H2 className="text-foreground font-black tracking-tight text-2xl sm:text-3xl">Investment &amp; Payment Terms</H2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
              Sleek, transparent, executive-level commitment structures with clear terms, a locked-in rate, and a solid guarantee.
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
        {/* SECTION 1: FOUNDING PARTNER PROGRAM */}
        <motion.div variants={itemVariants}>
          <Card className="rounded-card border border-border/40 bg-card/45 backdrop-blur-md p-6 md:p-8 shadow-medium space-y-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-2xl pointer-events-none -z-10" />
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-border/10">
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold tracking-widest font-mono uppercase px-2.5 py-0.5 rounded-full border bg-brand-blue/10 text-brand-blue border-brand-blue/20">
                    Founding Partner Program
                  </span>
                </div>
                <H3 className="text-xl font-bold text-foreground">{selectedPackage}</H3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Tailored high-performance execution built exclusively for <strong className="text-foreground/90 font-semibold">{clientName}</strong> of <strong className="text-foreground/90 font-semibold">{companyName}</strong>.
                </p>
              </div>

              {/* Dynamic Pricing Display */}
              <div className="bg-brand-blue/3 border border-brand-blue/15 rounded-button p-5 flex flex-col items-center justify-center text-center md:min-w-[200px] shrink-0">
                <span className="text-xs font-mono font-bold text-brand-blue uppercase tracking-widest">Monthly Investment</span>
                <span className="text-2xl font-black text-foreground mt-1 font-sans">{monthlyInvestment}</span>
                <span className="text-[10px] text-muted-foreground mt-1">USD / Month</span>
              </div>
            </div>

            {/* Program Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
              <div className="space-y-5">
                <div>
                  <h4 className="text-xs font-bold text-foreground/80 uppercase tracking-wider font-mono mb-2">Best For</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {INVESTMENT_CONFIG.bestFor}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xs font-bold text-foreground/80 uppercase tracking-wider font-mono mb-2">Outcome</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
                    {INVESTMENT_CONFIG.outcome}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold text-foreground/80 uppercase tracking-wider font-mono">Includes</h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {INVESTMENT_CONFIG.includes.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground leading-relaxed">{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Estimated Implementation Footer within Card */}
            <div className="pt-6 border-t border-border/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4 text-brand-blue" />
                <span>Estimated Implementation: <strong className="text-foreground">{implementationTimeline}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Receipt className="h-4 w-4 text-brand-blue" />
                <span>Payment Schedule: <strong className="text-foreground">{paymentSchedule}</strong></span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* SECTION 2 & 3: TERMS & OUR GUARANTEE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SECTION 3: Founding Partner Terms */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-2">
              <Receipt className="h-4.5 w-4.5 text-brand-blue" />
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider font-mono">Founding Partner Terms</h3>
            </div>
            <Card className="rounded-card border border-border/40 bg-card/30 p-6 md:p-8 space-y-4 shadow-sm">
              <div className="grid grid-cols-1 gap-3.5">
                {formattedTerms.map((term, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 text-xs sm:text-sm">
                    <span className="h-5 w-5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-muted-foreground leading-relaxed">{term}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* SECTION 2: Our Guarantee */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4.5 w-4.5 text-emerald-500" />
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider font-mono">Our Guarantee</h3>
            </div>
            <Card className="rounded-card border border-emerald-500/15 bg-emerald-500/2 p-6 md:p-8 shadow-sm flex flex-col justify-between h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
              
              <div className="space-y-4 relative">
                <div className="h-10 w-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-foreground">Zero-Risk Implementation Promise</h4>
                  <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans italic">
                    &quot;{INVESTMENT_CONFIG.ourGuarantee}&quot;
                  </p>
                </div>
              </div>
              
              <div className="pt-6 border-t border-emerald-500/10 text-[11px] text-muted-foreground flex items-center gap-1.5 mt-6 font-mono">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>COMMITTED TO UNCOMPROMISING PRECISION</span>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* SECTION 4 & 5: LONG-TERM COMMITMENT BONUS & TESTIMONIALS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SECTION 4: Long-Term Commitment Bonus */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-2">
              <Gift className="h-4.5 w-4.5 text-brand-blue" />
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider font-mono">Long-Term Commitment Bonus</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {INVESTMENT_CONFIG.bonuses.map((bonus, i) => (
                <Card key={i} className="rounded-card border border-border/40 bg-card/25 p-5 flex flex-col justify-between hover:border-brand-blue/30 hover:shadow-sm transition-all duration-200">
                  <div className="space-y-2">
                    <div className="h-7 w-7 rounded-full bg-brand-blue/5 text-brand-blue flex items-center justify-center">
                      <Gift className="h-4 w-4" />
                    </div>
                    <h4 className="text-xs font-bold text-foreground">{bonus.title}</h4>
                    <p className="text-[11px] text-muted-foreground leading-relaxed font-sans">
                      Enjoy a dedicated upgrade: <strong className="text-foreground">{bonus.description}</strong>
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* SECTION 5: Testimonial & Case Study Policy */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4.5 w-4.5 text-brand-blue" />
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider font-mono">Testimonial &amp; Case Study</h3>
            </div>
            <Card className="rounded-card border border-border/40 bg-card/20 p-6 md:p-8 space-y-4 shadow-sm">
              <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                To keep this rate locked permanently, we ask our Founding Partners to participate in sharing their experience to help us improve:
              </p>
              <div className="grid grid-cols-1 gap-3">
                {INVESTMENT_CONFIG.testimonialRequests.map((req, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs sm:text-sm">
                    <Star className="h-4 w-4 text-amber-500 shrink-0 mt-0.5 fill-amber-500/20" />
                    <span className="text-muted-foreground leading-relaxed">{req}</span>
                  </div>
                ))}
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
