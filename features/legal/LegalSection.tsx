/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '@/components/ThemeProvider';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Layout';
import { H2, H3 } from '@/components/Typography';
import { 
  FileText, 
  ShieldCheck, 
  CalendarX, 
  Scale, 
  Handshake, 
  ArrowRight, 
  ArrowLeft 
} from 'lucide-react';

interface LegalSectionProps {
  onNext: () => void;
  onBack: () => void;
}

export function LegalSection({ onNext, onBack }: LegalSectionProps) {
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

  const legalCards = [
    {
      title: 'Agreement Summary',
      badge: 'Overview',
      badgeColor: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
      icon: <FileText className="h-5 w-5" />,
      iconColor: 'bg-brand-blue/10 text-brand-blue border-brand-blue/15',
      content: 'This proposal outlines the agreed services, responsibilities, payment terms, and project expectations between both parties. By approving this proposal, both parties agree to work together according to these terms.'
    },
    {
      title: 'Service Quality & Warranty',
      badge: 'SLA Quality',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
      icon: <ShieldCheck className="h-5 w-5" />,
      iconColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/15',
      content: 'We are committed to delivering professional, high-quality work that aligns with the agreed project scope. If any issue arises due to our implementation during the agreed warranty period, we will correct it at no additional cost. The warranty does not cover new feature requests, project changes, third-party service issues, or modifications made by anyone other than our team after delivery.'
    },
    {
      title: 'Cancellation Policy',
      badge: 'Termination',
      badgeColor: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
      icon: <CalendarX className="h-5 w-5" />,
      iconColor: 'bg-rose-500/10 text-rose-600 border-rose-500/15',
      content: "Either party may terminate this agreement by providing 15 days' written notice. If the client cancels before completing the agreed minimum commitment period, the remaining balance for that committed term will become immediately payable. After the minimum commitment period has been fulfilled, either party may terminate the agreement with 15 days' written notice. Services will continue until the end of the current billing period, after which all managed services will end. Any outstanding invoices for completed work remain payable."
    },
    {
      title: 'Liability',
      badge: 'Responsibility',
      badgeColor: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
      icon: <Scale className="h-5 w-5" />,
      iconColor: 'bg-amber-500/10 text-amber-600 border-amber-500/15',
      content: 'Both parties agree to work together in good faith throughout the project. Neither party will be responsible for indirect or unexpected losses resulting from the project. If either party becomes legally responsible under this agreement, that responsibility will not exceed the total amount paid under this proposal, unless required by applicable law.'
    },
    {
      title: 'Dispute Resolution',
      badge: 'Mediation',
      badgeColor: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
      icon: <Handshake className="h-5 w-5" />,
      iconColor: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/15',
      content: proposal.legal?.disputeResolution || 'If a disagreement arises, both parties agree to first work together in good faith to find a fair solution through open discussion. If the issue cannot be resolved, both parties agree to settle the matter through arbitration in Wilmington, Delaware, unless another arrangement is agreed to in writing.'
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-300 font-sans">
      {/* 1. Page Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-button bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/15 shrink-0">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <H2 className="text-foreground font-black tracking-tight text-2xl sm:text-3xl">Legal Terms</H2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
              The key legal terms of our partnership, outlined in simple, straightforward, and business-friendly language.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Grid for the 5 Premium Cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
      >
        {legalCards.map((card, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className={`h-full transition-all duration-300 ${
              // On medium screens, make the 3rd card span full width for visual balance
              idx === 2 ? 'md:col-span-2 lg:col-span-1' : ''
            }`}
          >
            <Card className="h-full rounded-card border border-border/50 bg-card p-6 sm:p-7.5 shadow-low flex flex-col justify-between hover:shadow-medium hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              {/* Decorative accent blob */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/[0.02] rounded-full blur-2xl pointer-events-none group-hover:bg-brand-blue/[0.04] transition-colors duration-300" />

              <div className="space-y-5">
                {/* Badge Label & Icon */}
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-bold tracking-wider font-mono uppercase px-2.5 py-0.5 rounded-badge border ${card.badgeColor}`}>
                    {card.badge}
                  </span>
                  <div className={`h-9 w-9 rounded-button flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover:scale-105 ${card.iconColor}`}>
                    {card.icon}
                  </div>
                </div>

                {/* Card Title */}
                <div className="space-y-1">
                  <H3 className="text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                    {idx + 1}. {card.title}
                  </H3>
                </div>

                <Divider className="opacity-40" />

                {/* Content */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans font-normal">
                  {card.content}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
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
          Back to Ownership
        </Button>
        <Button 
          onClick={onNext} 
          className="cursor-pointer h-10 px-5 flex items-center gap-2 font-semibold"
        >
          Continue to Sign Contract
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
