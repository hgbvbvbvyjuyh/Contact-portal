/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Layout';
import { H2, H3 } from '@/components/Typography';
import { 
  ArrowRight,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Check,
  Zap,
  Flame,
  LineChart
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PartnershipSectionProps {
  onNext: () => void;
  onBack: () => void;
}

export function PartnershipSection({ onNext, onBack }: PartnershipSectionProps) {
  // Static benefits of the partnership
  const partnershipBenefits = [
    {
      title: 'Continuously improve operational efficiency.',
      desc: 'Regularly refine your models and automated sequences to trim cycle times and maximize yield.'
    },
    {
      title: 'Adapt your systems as your business grows.',
      desc: 'Inject new endpoints and modify workflow gates dynamically to align with new service offerings.'
    },
    {
      title: 'Identify new automation opportunities.',
      desc: 'Run recurring business audits to spot bottlenecks ripe for software orchestration.'
    },
    {
      title: 'Maximize the long-term value of your investment.',
      desc: 'Keep dependencies updated, models fine-tuned, and APIs secured to protect your digital assets.'
    },
    {
      title: 'Build a scalable foundation for future growth.',
      desc: 'Standardize core architecture definitions to enable friction-free multi-department scaling.'
    }
  ];

  // Animation layout variants
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
    <div className="space-y-10 animate-in fade-in duration-300 font-sans">
      {/* 1. Page Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-button bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/15 shrink-0">
            <LineChart className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <H2 className="text-foreground font-black tracking-tight text-2xl sm:text-3xl">Our Partnership Approach</H2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
              Building AI systems is only the beginning. Our goal is to help your business improve, adapt, and grow over time through an ongoing partnership.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Premium Partnership Information Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -3, borderColor: 'rgba(47, 107, 255, 0.2)' }}
          className="p-6 md:p-8 rounded-card border border-border/40 bg-card/40 backdrop-blur-md space-y-8 shadow-medium transition-all duration-300 relative overflow-hidden"
        >
          {/* Subtle design accents */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Core continuous improvement explanation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Col: Explanatory Statement & Highlighting Quote Block */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <H3 className="text-lg font-bold text-foreground">
                  Continuous Improvement
                </H3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Our goal isn't to deliver a one-time project—it's to continuously improve your AI systems as your business evolves.
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Rather than treating implementation as the finish line, we work alongside you to identify opportunities for improvement, optimize performance, and ensure your systems continue delivering measurable business value.
                </p>
              </div>

              {/* Callout Quote Block */}
              <div className="border-l-4 border-brand-blue bg-brand-blue/3 p-4 rounded-r-lg space-y-1.5 border border-y-brand-blue/10 border-r-brand-blue/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-brand-blue animate-pulse" />
                  <p className="text-[10px] font-bold text-brand-blue uppercase tracking-widest font-mono">
                    Long-Term Operational Commitment
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-foreground/90 font-medium leading-relaxed font-sans italic">
                  "As your monthly partner, we proactively monitor, refine, and enhance your automation so it continues supporting your business goals as they change."
                </p>
              </div>
            </div>

            {/* Right Col: Interactive list of benefits */}
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs font-bold text-foreground/80 uppercase tracking-wide font-mono pl-1">
                This partnership approach helps you:
              </p>
              
              <div className="space-y-3.5">
                {partnershipBenefits.map((benefit, idx) => (
                  <div 
                    key={idx} 
                    className="flex gap-3.5 items-start p-3 rounded-lg border border-border/10 bg-muted/15 hover:border-brand-blue/20 transition-all duration-200"
                  >
                    <div className="h-6 w-6 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0 mt-0.5 border border-brand-blue/15">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-foreground leading-snug">
                        {benefit.title}
                      </p>
                      <p className="text-[11px] text-muted-foreground leading-normal">
                        {benefit.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </motion.div>

      {/* 3. Navigation Footer */}
      <Divider />
      <div className="flex justify-between items-center pt-2 font-sans">
        <Button 
          variant="outline" 
          onClick={onBack} 
          className="cursor-pointer h-10 px-5 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Collaboration
        </Button>
        <Button 
          onClick={onNext} 
          className="cursor-pointer h-10 px-5 flex items-center gap-2 font-semibold"
        >
          Continue to Investment
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
