/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '@/components/ThemeProvider';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Divider, Grid } from '@/components/Layout';
import { H2, H3 } from '@/components/Typography';
import { 
  Users, 
  Check, 
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Zap,
  Handshake,
  UserCheck,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CollaborationSectionProps {
  onNext: () => void;
  onBack: () => void;
}

export function CollaborationSection({ onNext, onBack }: CollaborationSectionProps) {
  const { proposal } = useTheme();

  if (!proposal) return null;

  // content: Client Responsibilities
  const clientResponsibilities = {
    title: 'Client Responsibilities',
    intro: 'To ensure a smooth and efficient project, we ask that you complete the following responsibilities throughout the engagement.',
    items: proposal.collaboration?.clientResponsibilities || [
      'Attend the scheduled onboarding call (30–60 minutes) to review the project goals, scope, and timeline.',
      'Provide all required business information, brand guidelines, and project documentation before or within 48 hours after the onboarding call.',
      'Grant access to all required platforms, accounts, hosting, CMS, analytics, repositories, or third-party services needed to complete the project.',
      'Review deliverables and provide consolidated feedback within 48 business hours.',
      'Release payments according to the agreed payment schedule.'
    ]
  };

  // content: Our Responsibilities
  const ourResponsibilities = {
    title: 'Our Responsibilities',
    intro: 'We are committed to delivering a professional experience and maintaining clear communication throughout the project.',
    items: proposal.collaboration?.agencyResponsibilities || [
      'Assign a dedicated point of contact for the duration of the project.',
      'Maintain clear, professional, and timely communication.',
      'Keep you informed of project progress and important milestones.',
      'Deliver all work according to the approved project scope.',
      'Perform quality assurance before presenting deliverables.',
      'Address agreed issues identified during the review process.',
      'Respond to project-related communication within one business day whenever possible.',
      'Notify you promptly if any circumstances may affect the project timeline.',
      'Communicate any required approvals before progressing to the next project phase.',
      'Inform you of any requested work that falls outside the agreed scope before proceeding.',
      'Treat all business information and project data as confidential.',
      'Use your information solely for delivering the agreed services.',
      'Deliver the project according to the agreed scope, timeline, and quality standards, provided all required information, approvals, and access are received on time.'
    ]
  };

  // Container variants for clean entry animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300 font-sans">
      {/* 1. Header Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-button bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/15 shrink-0">
            <Handshake className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <H2 className="text-foreground font-black tracking-tight text-2xl sm:text-3xl">Collaboration & Shared Responsibilities</H2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
              A successful engagement is built on mutual partnership and clear alignment. Here is how we define our respective roles to ensure seamless project delivery.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Responsibilities Cards Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
      >
        {/* Client Responsibilities Card */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, borderColor: 'rgba(47, 107, 255, 0.25)' }}
          className="h-full transition-all duration-300"
        >
          <Card className="h-full rounded-card border border-border/40 bg-card/40 backdrop-blur-md p-6 md:p-8 shadow-medium flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div className="space-y-6">
              {/* Card Label & Icon */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider font-mono uppercase px-2.5 py-0.5 rounded-full border bg-brand-blue/10 text-brand-blue border-brand-blue/20">
                  Client Partner Roles
                </span>
                <div className="h-10 w-10 rounded-button bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/15 shrink-0">
                  <UserCheck className="h-5 w-5" />
                </div>
              </div>

              {/* Title & Intro */}
              <div className="space-y-2">
                <H3 className="text-lg font-bold text-foreground">
                  {clientResponsibilities.title}
                </H3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {clientResponsibilities.intro}
                </p>
              </div>

              <Divider className="opacity-40" />

              {/* Checklist Items */}
              <ul className="space-y-4">
                {clientResponsibilities.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3.5 group">
                    <div className="h-5.5 w-5.5 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0 mt-0.5 border border-brand-blue/15 group-hover:bg-brand-blue/20 transition-colors duration-200">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </div>
                    <span className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </motion.div>

        {/* Our Responsibilities Card */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, borderColor: 'rgba(16, 185, 129, 0.25)' }}
          className="h-full transition-all duration-300"
        >
          <Card className="h-full rounded-card border border-border/40 bg-card/40 backdrop-blur-md p-6 md:p-8 shadow-medium flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div className="space-y-6">
              {/* Card Label & Icon */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider font-mono uppercase px-2.5 py-0.5 rounded-full border bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                  Agency Delivery Standards
                </span>
                <div className="h-10 w-10 rounded-button bg-emerald-500/10 text-emerald-600 flex items-center justify-center border border-emerald-500/15 shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>

              {/* Title & Intro */}
              <div className="space-y-2">
                <H3 className="text-lg font-bold text-foreground">
                  {ourResponsibilities.title}
                </H3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {ourResponsibilities.intro}
                </p>
              </div>

              <Divider className="opacity-40" />

              {/* Checklist Items */}
              <ul className="space-y-4">
                {ourResponsibilities.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3.5 group">
                    <div className="h-5.5 w-5.5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/15 group-hover:bg-emerald-500/20 transition-colors duration-200">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </div>
                    <span className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
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
          Back to Timeline
        </Button>
        <Button 
          onClick={onNext} 
          className="cursor-pointer h-10 px-5 flex items-center gap-2 font-semibold"
        >
          Continue to Partnership
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
