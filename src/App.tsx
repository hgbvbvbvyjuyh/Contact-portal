/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, useParams, Navigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from '@/components/ThemeProvider';
import { AppShell } from '@/components/AppShell';
import { Card, InteractiveCard, InformationCard } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Alert } from '@/components/Feedback';
import { Stack, Grid, Divider } from '@/components/Layout';
import { Display, H1, H2, H3, H4, Body, Small, Caption } from '@/components/Typography';
import { Avatar, StatusIndicator, ThemeToggle, IconWrapper } from '@/components/Utilities';
import { CoverSection } from '@/features/cover';
import { AgreementInfoSection } from '@/features/agreement';
import { ProjectOverviewSection } from '@/features/overview';
import { ScopeSection } from '@/features/scope/ScopeSection';
import { DeliverablesSection } from '@/features/deliverables/DeliverablesSection';
import { TimelineSection } from '@/features/execution/TimelineSection';
import { CollaborationSection } from '@/features/execution/CollaborationSection';
import { PartnershipSection } from '@/features/execution/PartnershipSection';
import { InvestmentSection } from '@/features/investment/InvestmentSection';
import { OwnershipSection } from '@/features/ownership/OwnershipSection';
import { LegalSection } from '@/features/legal/LegalSection';
import { AcceptanceSection } from '@/features/execution/AcceptanceSection';
import { InvoiceSection } from '@/features/execution/InvoiceSection';
import { PaymentSection } from '@/features/execution/PaymentSection';
import { SuccessSection } from '@/features/execution/SuccessSection';
import { 
  CheckCircle, 
  Terminal, 
  Palette, 
  RefreshCw, 
  ArrowRight, 
  Briefcase, 
  User, 
  Clock, 
  Lock, 
  Check, 
  FileText, 
  CreditCard, 
  Award,
  ChevronRight,
  ShieldCheck,
  Zap,
  Info,
  DollarSign,
  Users,
  Settings,
  HelpCircle,
  FileCheck2,
  LockKeyhole
} from 'lucide-react';

function SetupDashboard() {
  const { proposalId } = useParams<{ proposalId: string }>();
  const {
    resolvedTheme,
    brandConfig,
    updateBrandConfig,
    resetBrandConfig,
    proposal,
    loading,
    error,
    fetchProposal
  } = useTheme();
  const [activeStepId, setActiveStepId] = useState<string>('cover');
  const [signatureName, setSignatureName] = useState<string>('');
  const [isSigned, setIsSigned] = useState<boolean>(false);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [paymentLoading, setPaymentLoading] = useState<boolean>(false);

  // Stepper state configurations
  const completedSteps = isSigned 
    ? ['cover', 'agreement-info', 'overview', 'scope', 'deliverables', 'timeline', 'collaboration', 'partnership', 'investment', 'ownership', 'legal', 'acceptance']
    : isPaid
      ? ['cover', 'agreement-info', 'overview', 'scope', 'deliverables', 'timeline', 'collaboration', 'partnership', 'investment', 'ownership', 'legal', 'acceptance', 'invoice', 'payment']
      : ['cover', 'agreement-info', 'overview', 'scope', 'deliverables', 'timeline', 'collaboration', 'partnership', 'investment', 'ownership', 'legal'];

  const lockedSteps = !isSigned 
    ? ['invoice', 'payment', 'success']
    : !isPaid 
      ? ['success']
      : [];

  const handleNextStep = (nextId: string) => {
    setActiveStepId(nextId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSign = () => {
    if (!signatureName.trim()) return;
    setIsSigned(true);
    handleNextStep('invoice');
  };

  const handlePay = () => {
    setPaymentLoading(true);
    setTimeout(() => {
      setPaymentLoading(false);
      setIsPaid(true);
      handleNextStep('success');
    }, 1500);
  };

  useEffect(() => {
    if (proposalId) {
      fetchProposal(proposalId);
    }
  }, [proposalId, fetchProposal]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <p className="text-sm font-medium text-muted-foreground animate-pulse font-sans">
            Loading your premium proposal...
          </p>
        </div>
      </div>
    );
  }

  if (error || !proposal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="max-w-md w-full space-y-6 text-center animate-in fade-in zoom-in duration-500">
          <div className="h-20 w-20 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center border border-rose-500/20 mx-auto">
            <HelpCircle className="h-10 w-10" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Proposal Not Found
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans">
              The proposal you're looking for doesn't exist or may have been removed.
              Please contact us if you believe this is an error.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => window.location.href = '/'}
            className="w-full h-11"
          >
            Return to Homepage
          </Button>
        </div>
      </div>
    );
  }

  // Render Step Content
  const renderStepContent = () => {
    switch (activeStepId) {
      case 'cover':
        return (
          <CoverSection 
            onStartReview={() => handleNextStep('agreement-info')} 
            isSigned={isSigned}
            isPaid={isPaid}
          />
        );

      case 'agreement-info':
        return (
          <AgreementInfoSection
            onNext={() => handleNextStep('overview')}
            onBack={() => handleNextStep('cover')}
          />
        );

      case 'overview':
        return (
          <ProjectOverviewSection
            onNext={() => handleNextStep('scope')}
            onBack={() => handleNextStep('agreement-info')}
          />
        );

      case 'scope':
        return (
          <ScopeSection 
            onNext={() => handleNextStep('deliverables')} 
            onBack={() => handleNextStep('overview')} 
          />
        );

      case 'deliverables':
        return (
          <DeliverablesSection 
            onNext={() => handleNextStep('timeline')} 
            onBack={() => handleNextStep('scope')} 
          />
        );

      case 'timeline':
        return (
          <TimelineSection 
            onNext={() => handleNextStep('collaboration')} 
            onBack={() => handleNextStep('deliverables')} 
          />
        );

      case 'collaboration':
        return (
          <CollaborationSection 
            onNext={() => handleNextStep('partnership')} 
            onBack={() => handleNextStep('timeline')} 
          />
        );

      case 'partnership':
        return (
          <PartnershipSection 
            onNext={() => handleNextStep('investment')} 
            onBack={() => handleNextStep('collaboration')} 
          />
        );

      case 'investment':
        return (
          <InvestmentSection
            onNext={() => handleNextStep('ownership')}
            onBack={() => handleNextStep('partnership')}
          />
        );

      case 'ownership':
        return (
          <OwnershipSection
            onNext={() => handleNextStep('legal')}
            onBack={() => handleNextStep('investment')}
          />
        );

      case 'legal':
        return (
          <LegalSection
            onNext={() => handleNextStep('acceptance')}
            onBack={() => handleNextStep('ownership')}
          />
        );

      case 'acceptance':
        return (
          <AcceptanceSection
            signatureName={signatureName}
            setSignatureName={setSignatureName}
            isSigned={isSigned}
            onSign={handleSign}
            onBack={() => handleNextStep('legal')}
          />
        );

      case 'invoice':
        return (
          <InvoiceSection
            onNext={() => handleNextStep('payment')}
            onBack={() => handleNextStep('acceptance')}
            isPaid={isPaid}
          />
        );

      case 'payment':
        return (
          <PaymentSection
            onPay={handlePay}
            onBack={() => handleNextStep('invoice')}
            isPaid={isPaid}
            paymentLoading={paymentLoading}
          />
        );

      case 'success':
        return (
          <SuccessSection
            signatureName={signatureName}
            onReset={() => {
              setIsSigned(false);
              setIsPaid(false);
              setSignatureName('');
              handleNextStep('cover');
            }}
          />
        );

      default:
        return (
          <div className="p-6 text-center text-muted-foreground font-sans text-xs">
            Section content under development. Choose a different step from the stepper.
          </div>
        );
    }
  };

  return (
    <AppShell 
      currentStepId={activeStepId} 
      onStepChange={setActiveStepId}
      status={isPaid ? 'accepted' : isSigned ? 'signed' : 'viewed'}
      completedSteps={completedSteps}
      lockedSteps={lockedSteps}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStepId}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>
    </AppShell>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/proposal/:proposalId" element={<SetupDashboard />} />
        {/* Redirect root to a default proposal or show error - for now, we'll keep it simple */}
        <Route path="/" element={<Navigate to="/proposal/prop_001" replace />} />
        <Route path="*" element={<div className="p-20 text-center">Page Not Found</div>} />
      </Routes>
    </ThemeProvider>
  );
}
