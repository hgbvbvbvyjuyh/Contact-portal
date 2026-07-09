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
  ArrowRight, 
  ArrowLeft, 
  Database, 
  Lock, 
  Award,
  ShieldCheck,
  Check,
  EyeOff
} from 'lucide-react';

interface OwnershipSectionProps {
  onNext: () => void;
  onBack: () => void;
}

export function OwnershipSection({ onNext, onBack }: OwnershipSectionProps) {
  const { brandConfig, proposal } = useTheme();

  if (!proposal) return null;

  const agencyName = proposal.agreementInformation?.companyName || 'N/A';

  // Container variants for clean staggering animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300 font-sans">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-button bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/15 shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <H2 className="text-foreground font-black tracking-tight text-2xl sm:text-3xl">Ownership & Confidentiality</H2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
              Transparent terms protecting intellectual property, proprietary technology, and sensitive business data throughout our engagement.
            </p>
          </div>
        </div>
      </div>

      {/* Cards Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
      >
        {/* CARD 1: SYSTEM OWNERSHIP */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, borderColor: 'rgba(47, 107, 255, 0.25)' }}
          className="h-full transition-all duration-300"
        >
          <Card className="h-full rounded-card border border-border/40 bg-card/40 backdrop-blur-md p-6 md:p-8 shadow-medium flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/3 rounded-full blur-2xl pointer-events-none -z-10" />
            <div className="space-y-6">
              {/* Header Label & Icon */}
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold tracking-wider font-mono uppercase px-2.5 py-0.5 rounded-full border bg-brand-blue/10 text-brand-blue border-brand-blue/20">
                  Intellectual Property
                </span>
                <div className="h-10 w-10 rounded-button bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/15 shrink-0">
                  <Database className="h-5 w-5" />
                </div>
              </div>

              {/* Title & Introduction */}
              <div className="space-y-2">
                <H3 className="text-base font-bold text-foreground">System Ownership</H3>
                <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed italic border-l-2 border-brand-blue/30 pl-3">
                  To ensure transparency, this section explains which assets remain the property of each party throughout the engagement.
                </p>
              </div>

              <Divider className="opacity-40" />

              {/* Content Paragraphs */}
              <div className="space-y-4 text-xs text-muted-foreground leading-relaxed font-sans">
                <p>
                  The AI systems, automation workflows, templates, methodologies, internal processes, and proprietary technology developed remain the intellectual property of our agency, unless otherwise agreed in writing.
                </p>
                <p>
                  During an active subscription, the client receives a non-exclusive right to use the agreed services as part of their ongoing partnership.
                </p>
                <p>
                  If the subscription is cancelled or terminated, access to our managed systems, ongoing support, monitoring, maintenance, and optimization services will end unless a separate written ownership or transfer agreement has been executed.
                </p>
              </div>
            </div>

            {/* Bottom Highlight Callout */}
            <div className="mt-6 pt-4 border-t border-border/10 bg-brand-blue/3 -mx-6 -mb-6 p-4 rounded-b-card border border-t-brand-blue/10 flex items-start gap-2.5">
              <Check className="h-4 w-4 text-brand-blue shrink-0 mt-0.5" strokeWidth={3} />
              <p className="text-[10px] sm:text-xs text-foreground/90 leading-relaxed">
                All client-provided content, branding, logos, documents, customer data, and business information remain the exclusive property of the client.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* CARD 2: CONFIDENTIALITY */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, borderColor: 'rgba(16, 185, 129, 0.25)' }}
          className="h-full transition-all duration-300"
        >
          <Card className="h-full rounded-card border border-border/40 bg-card/40 backdrop-blur-md p-6 md:p-8 shadow-medium flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/3 rounded-full blur-2xl pointer-events-none -z-10" />
            <div className="space-y-6">
              {/* Header Label & Icon */}
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold tracking-wider font-mono uppercase px-2.5 py-0.5 rounded-full border bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                  Data Security
                </span>
                <div className="h-10 w-10 rounded-button bg-emerald-500/10 text-emerald-600 flex items-center justify-center border border-emerald-500/15 shrink-0">
                  <Lock className="h-5 w-5" />
                </div>
              </div>

              {/* Title & Introduction */}
              <div className="space-y-2">
                <H3 className="text-base font-bold text-foreground">Confidentiality</H3>
                <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed italic border-l-2 border-emerald-500/30 pl-3">
                  Protecting sensitive business information is a shared responsibility throughout our partnership.
                </p>
              </div>

              <Divider className="opacity-40" />

              {/* Content Paragraphs */}
              <div className="space-y-4 text-xs text-muted-foreground leading-relaxed font-sans">
                <p>
                  Both parties agree to treat all non-public business information shared during the engagement as confidential.
                </p>
                <p>
                  We will use your information solely for delivering, maintaining, and supporting the agreed services and will not disclose confidential information to third parties except where necessary to provide the services or where required by law.
                </p>
                <p>
                  Likewise, the client agrees not to disclose our proprietary systems, workflows, methodologies, documentation, pricing, or confidential business processes without prior written permission.
                </p>
              </div>
            </div>

            {/* Bottom Highlight Callout */}
            <div className="mt-6 pt-4 border-t border-border/10 bg-emerald-500/3 -mx-6 -mb-6 p-4 rounded-b-card border border-t-emerald-500/10 flex items-start gap-2.5">
              <EyeOff className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-[10px] sm:text-xs text-foreground/90 leading-relaxed">
                Confidentiality obligations survive indefinitely to protect both parties' assets and brand reputation.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* CARD 3: PORTFOLIO & MARKETING RIGHTS */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, borderColor: 'rgba(47, 107, 255, 0.25)' }}
          className="h-full transition-all duration-300"
        >
          <Card className="h-full rounded-card border border-border/40 bg-card/40 backdrop-blur-md p-6 md:p-8 shadow-medium flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/3 rounded-full blur-2xl pointer-events-none -z-10" />
            <div className="space-y-6">
              {/* Header Label & Icon */}
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold tracking-wider font-mono uppercase px-2.5 py-0.5 rounded-full border bg-brand-blue/10 text-brand-blue border-brand-blue/20">
                  Portfolio Rights
                </span>
                <div className="h-10 w-10 rounded-button bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/15 shrink-0">
                  <Award className="h-5 w-5" />
                </div>
              </div>

              {/* Title & Introduction */}
              <div className="space-y-2">
                <H3 className="text-base font-bold text-foreground">Portfolio & Marketing Rights</H3>
                <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed italic border-l-2 border-brand-blue/30 pl-3">
                  We take pride in the work we create while respecting the confidentiality of every client.
                </p>
              </div>

              <Divider className="opacity-40" />

              {/* Content Paragraphs */}
              <div className="space-y-4 text-xs text-muted-foreground leading-relaxed font-sans">
                <p>
                  Unless otherwise agreed in writing, <strong className="text-foreground font-medium">{agencyName}</strong> reserves the right to showcase completed work, project outcomes, and approved non-confidential materials in its portfolio, website, case studies, presentations, and marketing materials.
                </p>
                <p>
                  We will never disclose confidential business information, sensitive data, trade secrets, or proprietary client information without prior written consent.
                </p>
              </div>
            </div>

            {/* Bottom Highlight Callout */}
            <div className="mt-6 pt-4 border-t border-border/10 bg-brand-blue/3 -mx-6 -mb-6 p-4 rounded-b-card border border-t-brand-blue/10 flex items-start gap-2.5">
              <ShieldCheck className="h-4 w-4 text-brand-blue shrink-0 mt-0.5" />
              <p className="text-[10px] sm:text-xs text-foreground/90 leading-relaxed">
                Your brand's strategic privacy remains fully secure. No raw data, metrics, or credentials are ever published.
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
          Back to Investment
        </Button>
        <Button 
          onClick={onNext} 
          className="cursor-pointer h-10 px-5 flex items-center gap-2 font-semibold"
        >
          Continue to Legal Terms
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
