/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '@/components/ThemeProvider';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Divider, Stack, Grid } from '@/components/Layout';
import { H2, H3, H4 } from '@/components/Typography';
import { 
  Check, 
  Signature as SignatureIcon, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  User,
  Calendar,
  AlertCircle,
  FileText,
  Mail,
  Download,
  FileCheck
} from 'lucide-react';

interface AcceptanceSectionProps {
  signatureName: string;
  setSignatureName: (name: string) => void;
  isSigned: boolean;
  onSign: () => void;
  onBack: () => void;
}

export function AcceptanceSection({
  signatureName,
  setSignatureName,
  isSigned,
  onSign,
  onBack,
}: AcceptanceSectionProps) {
  const { proposal } = useTheme();

  if (!proposal) return null;

  const signatureData = proposal?.signature;

  // Track sub-step within Acceptance & E-Signature tab
  // 1: Acceptance Checkbox & Info
  // 2: Signature Placement
  const [subStep, setSubStep] = useState<1 | 2>(isSigned ? 2 : 1);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [typedName, setTypedName] = useState(signatureName || '');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleAcceptanceContinue = () => {
    if (isTermsAccepted) {
      setSubStep(2);
    }
  };

  const handleSignatureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedName.trim()) return;
    setSignatureName(typedName);
    onSign();
  };

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    // Simulate premium PDF creation and trigger browser print/save layout
    setTimeout(() => {
      setIsDownloading(false);
      window.print();
    }, 1200);
  };

  // Human-readable date formatting helper
  const getFormattedDate = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const agreementIncludedItems = [
    'Project Scope',
    'Deliverables',
    'Timeline',
    'Payment & Partnership Terms',
    'Ownership & Confidentiality',
    'Legal Terms'
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-300 font-sans">
      <AnimatePresence mode="wait">
        {subStep === 1 ? (
          <motion.div
            key="acceptance-step"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* 1. Page Header */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-button bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/15 shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <H2 className="text-foreground font-black tracking-tight text-2xl sm:text-3xl">Agreement Review & Acceptance</H2>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
                    Please review the proposal and confirm that you agree with the project details before signing.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Main Proposal Agreement Card */}
            <Card className="p-6 md:p-8 border border-border/50 bg-card rounded-card space-y-8 max-w-3xl mx-auto shadow-low hover:border-brand-blue/20 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-2xl pointer-events-none -z-10" />

              <div className="flex items-center gap-3 pb-4 border-b border-border/10">
                <div className="h-10 w-10 rounded-button bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/15 shrink-0">
                  <FileCheck className="h-5 w-5" />
                </div>
                <div>
                  <H3 className="text-base font-bold text-foreground">Proposal Agreement</H3>
                  <p className="text-xs text-muted-foreground">Ready to begin our partnership</p>
                </div>
              </div>

              {/* Intro Statement */}
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  By accepting this proposal, you confirm that you have reviewed the project details and agree to move forward under the terms outlined in this portal.
                </p>
                
                {/* Visual Checklist for Covered Areas */}
                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-foreground/85 uppercase tracking-wider font-mono">This includes:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {agreementIncludedItems.map((item, idx) => (
                      <div key={idx} className="flex gap-2.5 items-center p-2.5 rounded border border-border/10 bg-muted/10">
                        <div className="h-5 w-5 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0 border border-brand-blue/15">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </div>
                        <span className="text-xs font-semibold text-foreground/90">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Authorization Clause Callout */}
                <div className="p-4 rounded bg-brand-blue/3 border border-brand-blue/10 text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans">
                  You confirm that you are authorized to approve this proposal on behalf of <strong className="text-brand-blue font-semibold">{proposal?.client?.company || 'Nafirofiqul LLC'}</strong>.
                </div>
              </div>

              {/* Link / PDF Download Section */}
              <div className="p-5 rounded-button border border-border/50 bg-secondary/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-foreground font-mono uppercase tracking-wider">Need another copy?</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    You can download a PDF version of this proposal and agreement for your records.
                  </p>
                </div>
                <Button 
                  onClick={handleDownloadPDF} 
                  variant="outline"
                  className="h-10 px-5 shrink-0 flex items-center gap-2 cursor-pointer border-border hover:bg-muted/30 font-semibold"
                  disabled={isDownloading}
                >
                  <Download className="h-4 w-4" />
                  {isDownloading ? 'Generating PDF...' : 'Download Proposal PDF'}
                </Button>
              </div>

              {/* Acceptance Checkbox & Statement */}
              <label className="flex items-start gap-3.5 p-4 rounded bg-brand-blue/3 border border-brand-blue/10 cursor-pointer select-none hover:bg-brand-blue/5 transition-all duration-200">
                <input
                  type="checkbox"
                  checked={isTermsAccepted}
                  onChange={(e) => setIsTermsAccepted(e.target.checked)}
                  className="h-5 w-5 mt-0.5 rounded border-border text-brand-blue focus:ring-brand-blue cursor-pointer shrink-0"
                  id="acceptance-checkbox"
                />
                <span className="text-xs sm:text-sm text-foreground/95 leading-relaxed font-sans">
                  I have reviewed this proposal and agree to the project scope, timeline, pricing, and terms outlined in this portal. I confirm that I am authorized to approve this agreement on behalf of my business.
                </span>
              </label>

              {/* Button Action */}
              <div className="flex justify-end pt-2">
                <Button
                  onClick={handleAcceptanceContinue}
                  disabled={!isTermsAccepted}
                  className="h-10 px-6 font-semibold flex items-center gap-2 cursor-pointer transition-all"
                >
                  Continue to Signature
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>

            {/* Navigation Footer */}
            <Divider />
            <div className="flex justify-between items-center pt-2">
              <Button 
                variant="outline" 
                onClick={onBack} 
                className="cursor-pointer h-10 px-5"
              >
                Back to Legal Terms
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="signature-step"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* 1. Page Header */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-button bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/15 shrink-0">
                  <SignatureIcon className="h-5 w-5" />
                </div>
                <div>
                  <H2 className="text-foreground font-black tracking-tight text-2xl sm:text-3xl">Sign Your Proposal</H2>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
                    Please type your name below to sign the agreement and begin our partnership.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Interactive Sign Screens */}
            <Grid cols={1} mdCols={5} gap={6} className="max-w-4xl mx-auto items-stretch">
              {/* Left Column: Signer Metadata */}
              <div className="md:col-span-2 space-y-4 flex flex-col justify-between">
                <Card className="p-5 border border-border/50 bg-card rounded-card space-y-5 flex-1 hover:border-brand-blue/20 transition-colors duration-300 shadow-low">
                  <H4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider font-mono">
                    Authorized Signer
                  </H4>

                  <div className="space-y-4 font-sans text-xs text-foreground/90">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center border border-border/20 text-muted-foreground shrink-0">
                        <User className="h-4 w-4" />
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <div className="text-[9px] text-muted-foreground font-mono uppercase tracking-wider">Representative</div>
                        <div className="font-semibold truncate">{signatureData?.signerName || 'Nafirofiqul'}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center border border-border/20 text-muted-foreground shrink-0">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <div className="text-[9px] text-muted-foreground font-mono uppercase tracking-wider">Email Address</div>
                        <div className="font-semibold truncate text-brand-blue">{signatureData?.email || 'Nafirofiqul@gmail.com'}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center border border-border/20 text-muted-foreground shrink-0">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <div className="text-[9px] text-muted-foreground font-mono uppercase tracking-wider">Signing Date</div>
                        <div className="font-semibold truncate">
                          {isSigned ? getFormattedDate() : getFormattedDate()}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Divider />

                  <div className="flex items-center gap-2.5 text-[10px] text-muted-foreground font-mono uppercase bg-secondary/45 p-3 rounded-button border border-border/30">
                    <AlertCircle className="h-4.5 w-4.5 text-brand-blue shrink-0 animate-pulse" />
                    Secure Digital Seal Active
                  </div>
                </Card>
              </div>

              {/* Right Column: Signature Pad */}
              <div className="md:col-span-3">
                {isSigned ? (
                  <Card className="p-6 border border-emerald-500/25 bg-emerald-500/2 rounded-card h-full flex flex-col justify-between space-y-6">
                    <div className="space-y-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest font-mono uppercase bg-emerald-500/10 text-emerald-600 border border-emerald-500/15">
                        CONTRACT SIGNED
                      </span>
                      <H3 className="text-base font-bold text-foreground">Agreement Signed successfully</H3>
                      <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                        Your signature has been registered. You can now proceed to view your onboarding invoice.
                      </p>
                    </div>

                    <div className="p-6 border border-dashed border-emerald-500/30 rounded bg-card/60 flex flex-col items-center justify-center text-center py-8">
                      <span className="font-cursive text-3xl text-emerald-600 select-none italic tracking-wider">
                        {signatureName}
                      </span>
                      <div className="mt-2 text-[10px] font-mono text-emerald-600/70">
                        E-SIGNATURE VERIFIED
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={onSign} // This goes to the invoice step
                        className="h-10 px-6 font-semibold flex items-center gap-2 cursor-pointer"
                      >
                        Proceed to Invoice
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ) : (
                  <Card className="p-6 md:p-8 border border-border/50 bg-card rounded-card h-full flex flex-col justify-between space-y-6 shadow-sm hover:border-brand-blue/10 transition-colors">
                    <div className="space-y-2">
                      <H3 className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">
                        Type Your Signature
                      </H3>
                      <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                        To sign this agreement, please type your legal name or business authorization name in the field below.
                      </p>
                    </div>

                    <form onSubmit={handleSignatureSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold text-muted-foreground uppercase font-mono tracking-wider">
                          Type Legal Signature Name
                        </label>
                        <input
                          type="text"
                          value={typedName}
                          onChange={(e) => setTypedName(e.target.value)}
                          placeholder="Type 'Nafirofiqul' to authorize"
                          className="w-full h-11 px-4 rounded-input border border-border/50 bg-background text-sm focus:outline-none focus:border-primary/80 focus:ring-4 focus:ring-primary/10 text-foreground font-sans placeholder:text-muted-foreground/50 transition-all duration-200 ease-out"
                        />
                      </div>

                      {/* Live cursive preview */}
                      {typedName.trim() && (
                        <div className="p-5 border border-dashed border-border/60 rounded bg-muted/10 flex flex-col items-center justify-center text-center">
                          <span className="font-cursive text-2xl text-brand-blue select-none italic tracking-widest leading-none">
                            {typedName}
                          </span>
                          <span className="text-[9px] font-mono text-muted-foreground mt-2 uppercase tracking-widest">
                            Handwriting Preview
                          </span>
                        </div>
                      )}

                      <Button 
                        type="submit"
                        disabled={!typedName.trim()}
                        className="w-full h-11 cursor-pointer font-semibold flex items-center justify-center gap-2"
                      >
                        Sign Agreement & Commit
                        <SignatureIcon className="h-4 w-4" />
                      </Button>
                    </form>

                    <p className="text-[10px] text-muted-foreground leading-relaxed font-sans">
                      By submitting your electronic signature, you understand and agree that this digital signature holds full legal, binding equivalence with a physical signature.
                    </p>
                  </Card>
                )}
              </div>
            </Grid>

            {/* Navigation Footer */}
            <Divider />
            <div className="flex justify-between items-center pt-2">
              <Button 
                variant="outline" 
                onClick={() => setSubStep(1)} 
                className="cursor-pointer h-10 px-5 flex items-center gap-2"
              >
                Back to Acceptance
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
