/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '@/components/ThemeProvider';
import { CoverHero } from '@/components/BusinessComponents';
import { cn } from '@/lib/utils';
import { 
  Check, 
  Eye, 
  FileCheck2, 
  CreditCard, 
  Users, 
  Rocket, 
  Compass
} from 'lucide-react';

interface CoverSectionProps {
  onStartReview: () => void;
  isSigned?: boolean;
  isPaid?: boolean;
}

export function CoverSection({ onStartReview, isSigned = false, isPaid = false }: CoverSectionProps) {
  const { proposal } = useTheme();

  if (!proposal) return null;

  // Define steps dynamically based on isSigned and isPaid state
  const steps = [
    {
      id: 'review',
      title: 'Review Proposal',
      description: 'Read the proposal carefully.',
      icon: Eye,
      status: (isSigned || isPaid) ? 'completed' : 'current' as const,
      badge: (isSigned || isPaid) ? 'Completed' : 'Active'
    },
    {
      id: 'agreement',
      title: 'Accept Agreement',
      description: 'Review and accept the project agreement.',
      icon: FileCheck2,
      status: isPaid ? 'completed' : isSigned ? 'completed' : 'upcoming' as const,
      badge: (isSigned || isPaid) ? 'Completed' : 'Next Step'
    },
    {
      id: 'payment',
      title: 'Complete Payment',
      description: 'Pay the deposit invoice.',
      icon: CreditCard,
      status: isPaid ? 'completed' : isSigned ? 'current' : 'upcoming' as const,
      badge: isPaid ? 'Completed' : isSigned ? 'Awaiting Deposit' : 'Locked'
    },
    {
      id: 'onboarding',
      title: 'Client Onboarding',
      description: 'Receive onboarding details.',
      icon: Users,
      status: isPaid ? 'current' : 'upcoming' as const,
      badge: isPaid ? 'In Progress' : 'Awaiting Payment'
    },
    {
      id: 'development',
      title: 'Development Begins',
      description: 'Active design and development kickoff.',
      icon: Rocket,
      status: 'upcoming' as const,
      badge: isPaid ? 'Scheduled' : 'Awaiting Onboarding'
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {/* 1. Static and dynamically bound Cover Hero Component */}
      <CoverHero
        serviceType={proposal.agreementInformation?.serviceType}
        companyName={proposal.agreementInformation?.companyName}
        datePrepared={proposal.agreementInformation?.datePrepared}
        proposalVersion={proposal.agreementInformation?.proposalVersion}
        onStartReview={onStartReview}
      />

      {/* 2. Project Journey Section */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="p-6 md:p-8 rounded-card border border-border/40 bg-card/40 backdrop-blur-md space-y-6 shadow-medium transition-colors duration-200"
      >
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/20 pb-5">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-button bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0 border border-brand-blue/15">
              <Compass className="h-5 w-5" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-base font-bold text-foreground">
                Project Journey
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Follow the steps below to see where you are in the project lifecycle. Your progress will update automatically as each milestone is completed.
              </p>
            </div>
          </div>
        </div>

        {/* Steps List Layout */}
        <div className="relative pl-2 sm:pl-4 space-y-4">
          {steps.map((step, idx) => {
            const StepIcon = step.icon;
            const isCompleted = step.status === 'completed';
            const isCurrent = step.status === 'current';
            const isUpcoming = step.status === 'upcoming';

            return (
              <div 
                key={step.id} 
                className={cn(
                  "relative flex gap-4 md:gap-6 group transition-all duration-300 rounded-lg p-3 sm:p-4 -mx-2 sm:-mx-4",
                  isCurrent && "bg-brand-blue/3 border border-brand-blue/10 shadow-sm",
                  !isCurrent && "hover:bg-muted/30 border border-transparent"
                )}
              >
                {/* Vertical line connector */}
                {idx < steps.length - 1 && (
                  <div 
                    className={cn(
                      "absolute left-[24px] sm:left-[32px] top-14 bottom-[-16px] w-[2px] transition-colors duration-300",
                      isCompleted ? "bg-emerald-500" : "bg-border/30"
                    )} 
                  />
                )}

                {/* Left side circular indicator */}
                <div className="relative shrink-0">
                  <div 
                    className={cn(
                      "h-9 w-9 rounded-full flex items-center justify-center border transition-all duration-300",
                      isCompleted && "bg-emerald-500 border-emerald-500 text-white shadow-sm shadow-emerald-500/10",
                      isCurrent && "bg-brand-blue border-brand-blue text-white shadow-md shadow-brand-blue/15 ring-4 ring-brand-blue/10",
                      isUpcoming && "bg-muted border-border/30 text-muted-foreground/40"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-4.5 w-4.5" strokeWidth={3} />
                    ) : (
                      <StepIcon className={cn("h-4.5 w-4.5", isCurrent && "animate-pulse")} />
                    )}
                  </div>
                </div>

                {/* Text column */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                    <h4 
                      className={cn(
                        "text-sm font-bold leading-none transition-colors",
                        isCompleted && "text-foreground/80",
                        isCurrent && "text-brand-blue",
                        isUpcoming && "text-muted-foreground/60"
                      )}
                    >
                      {step.title}
                    </h4>

                    {/* Badge */}
                    <span 
                      className={cn(
                        "inline-flex items-center self-start text-[9px] font-bold px-2 py-0.5 rounded-full border tracking-wide uppercase transition-colors",
                        isCompleted && "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
                        isCurrent && "bg-brand-blue/10 text-brand-blue border-brand-blue/20",
                        isUpcoming && "bg-slate-500/10 text-slate-500 border-slate-500/20"
                      )}
                    >
                      {step.badge}
                    </span>
                  </div>

                  <p 
                    className={cn(
                      "text-xs leading-relaxed transition-colors",
                      isCompleted && "text-muted-foreground/90",
                      isCurrent && "text-foreground/80 font-medium",
                      isUpcoming && "text-muted-foreground/50"
                    )}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>
    </div>
  );
}
