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

  const clientCompany = proposal.client.company || 'your business';
  const projectName = proposal.projectName || proposal.project?.projectName || 'this project';

  // Section 1: Current Situation Copy
  const situationParagraphs = [
    `${clientCompany} is currently navigating a pivotal phase of operational scaling. As client demand and engagement velocity increase, the existing manual workflows governing intake, administrative setups, and agreement validation have become major friction points. Relying on fragmented tools, manual email threads, and static documentation introduces unnecessary delays and consumes valuable internal resources.`,
    `Without a secure, unified client-facing portal, key processes such as e-signature execution, visual brand selection, and deposit collection require hands-on management from multiple staff members. This manual overhead not only slows down time-to-kickoff but also limits the overall visibility of active contracts, which can occasionally impact the premium client onboarding experience.`,
    `To sustain high-growth momentum and ensure delivery precision, establishing a modern ${projectName} is a critical operational priority. Shifting to an automated, self-service digital experience will eliminate manual bottlenecks, provide full tracking visibility, and elevate your brand's onboarding experience to an elite, enterprise standard.`
  ];

  // Section 2: Business Objectives specific to the client
  const businessObjectives = [
    {
      title: 'Improve Operational Efficiency',
      desc: `Automate the manual stages of the ${projectName} to fast-track overall client onboarding timelines.`
    },
    {
      title: 'Save Time via Automation',
      desc: 'Eliminate manual document parsing and payment tracking by establishing unified digital workflows.'
    },
    {
      title: 'Elevate Customer Experience',
      desc: `Offer an elegant, self-serve onboarding environment that inspires client confidence from day one.`
    },
    {
      title: 'Establish Brand Consistency',
      desc: 'Provide clear, real-time whitelabel branding visuals dynamically synchronized across active views.'
    },
    {
      title: 'Reduce Administrative Overhead',
      desc: 'Free up internal teams from repetitive follow-up emails, enabling a focus on core service delivery.'
    },
    {
      title: 'Support Continuous Growth',
      desc: 'Build a highly scalable onboarding infrastructure prepared to support higher volume intake without complexity.'
    }
  ];

  // Section 3: Why This Project Copy
  const whyThisProjectText = `The ${projectName} was chosen because it delivers a single, cohesive interface that replaces fragmented legacy workflows. By unifying agreement execution, dynamic brand tokenization, and deposit collection in a secure portal, it addresses the exact friction points that delay project kickoffs.

This solution is designed to scale effortlessly. As your client list grows, the automated pipeline handles the extra volume without any added administrative strain. Implementing this framework now is a high-value strategic decision—speeding up contract-to-kickoff cycles directly improves cash flow, builds immediate client trust, and ensures your team can focus fully on high-impact project delivery rather than chasing documents.`;

  // Section 4: Expected Business Outcomes
  const expectedOutcomes = [
    {
      title: 'Faster Project Delivery',
      desc: 'Drastically shorten contract cycle times, accelerating delivery kickoff and sprint scheduling.'
    },
    {
      title: 'Improved Customer Experience',
      desc: 'Deliver a sleek, trustworthy, and modern client interface that aligns with your brand standards.'
    },
    {
      title: 'Optimized Operational Capacity',
      desc: 'Eliminate multi-channel coordination friction, boosting internal team efficiency.'
    },
    {
      title: 'Reduced Manual Administration',
      desc: 'Standardize incoming information profiles with structured, automated dashboard validation.'
    },
    {
      title: 'Increased Scalability',
      desc: 'Create repeatable, secure onboarding pipelines prepared to scale with client volume.'
    },
    {
      title: 'More Consistent Business Processes',
      desc: 'Secure legal and financial compliance under a standardized digital custody vault.'
    }
  ];

  // Container variants for staggered entrance animations
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
          <div className="space-y-4">
            {situationParagraphs.map((para, idx) => (
              <p key={idx} className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </motion.div>

        {/* 2. BUSINESS OBJECTIVES */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {businessObjectives.map((obj, idx) => (
              <div 
                key={idx} 
                className="flex gap-3 items-start p-3 rounded-lg border border-border/10 hover:border-brand-blue/20 bg-muted/20 transition-all duration-200"
              >
                <span className="h-6 w-6 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 border border-brand-blue/15">
                  {idx + 1}
                </span>
                <div className="space-y-1 min-w-0">
                  <p className="text-xs font-bold text-foreground leading-snug">{obj.title}</p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{obj.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 3. WHY THIS PROJECT */}
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
              <H3 className="text-base font-bold text-foreground">3. Why This Project</H3>
              <p className="text-xs text-muted-foreground">The value blueprint, scalability, and strategic timing of this solution</p>
            </div>
          </div>
          <div className="bg-brand-blue/3 rounded-button p-5 border border-brand-blue/10 space-y-3">
            <p className="text-[10px] font-bold text-brand-blue uppercase tracking-widest font-mono">
              Solution Value Proposition
            </p>
            <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed whitespace-pre-line font-sans italic">
              "{whyThisProjectText}"
            </p>
          </div>
        </motion.div>

        {/* 4. EXPECTED BUSINESS OUTCOMES */}
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
              <H3 className="text-base font-bold text-foreground">4. Expected Business Outcomes</H3>
              <p className="text-xs text-muted-foreground">Measurable organizational improvements post-implementation</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {expectedOutcomes.map((outcome, idx) => (
              <div 
                key={idx} 
                className="flex gap-3 items-start p-3.5 rounded-lg border border-border/10 hover:border-emerald-500/20 bg-muted/20 transition-all duration-200"
              >
                <div className="h-6 w-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/15">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </div>
                <div className="space-y-1 min-w-0">
                  <p className="text-xs font-bold text-foreground leading-snug">{outcome.title}</p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{outcome.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

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
