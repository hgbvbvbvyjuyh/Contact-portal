/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/Button';
import { Divider, Grid } from '@/components/Layout';
import { SectionHeader } from '@/features/scope/ScopeSection';
import { 
  Lock, 
  ArrowLeft,
  HelpCircle,
  Sparkles,
  ShieldCheck,
  Coins,
  Building2,
  CheckCircle
} from 'lucide-react';
import { Card } from '@/components/Card';
import { H3, H4 } from '@/components/Typography';
import { PaymentSummary } from './components/PaymentSummary';
import { PaymentMethodCard } from './components/PaymentMethodCard';
import { SimulationStatus } from './components/PaymentStatusBadge';

interface PaymentSectionProps {
  onPay: () => void;
  onBack: () => void;
  isPaid: boolean;
  paymentLoading: boolean;
}

export function PaymentSection({
  onPay,
  onBack,
  isPaid,
  paymentLoading,
}: PaymentSectionProps) {
  const { proposal } = useTheme();

  if (!proposal) return null;

  const depositDue = proposal?.pricing?.deposit || 3500.00;
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(val);
  };

  // Selected payment status simulation
  const [simulatedStatus, setSimulatedStatus] = useState<SimulationStatus>(
    isPaid ? 'Paid' : 'Pending'
  );

  return (
    <div id="payment-section-viewport" className="space-y-10 animate-in fade-in duration-300 font-sans max-w-6xl mx-auto">
      {/* 1. Page Header */}
      <SectionHeader
        title="Secure Deposit Payment"
        subtitle="Select your preferred payment method below to complete the deposit and secure your project schedule."
        badge="SECURE CHECKOUT"
        icon={<Lock className="h-5 w-5 text-brand-blue" />}
      />

      {/* 2. Three Column FAQs Quick Q&A Answers (Answers the three core questions) */}
      <Grid cols={1} mdCols={3} gap={4} className="bg-brand-blue/3 p-5 rounded-card border border-brand-blue/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-foreground font-semibold text-xs sm:text-sm">
            <div className="h-5.5 w-5.5 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/15">
              <span className="text-[10px] font-bold font-mono">1</span>
            </div>
            <span>How can I pay?</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed pl-7 font-sans">
            Choose between credit/debit card, cryptocurrency, or an international SWIFT wire transfer below.
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-foreground font-semibold text-xs sm:text-sm">
            <div className="h-5.5 w-5.5 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/15">
              <span className="text-[10px] font-bold font-mono">2</span>
            </div>
            <span>How much do I owe today?</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed pl-7 font-sans">
            Exactly 50% ({formatCurrency(depositDue)}) is due today to secure your project schedule. The remaining balance is payable upon delivery.
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-foreground font-semibold text-xs sm:text-sm">
            <div className="h-5.5 w-5.5 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/15">
              <span className="text-[10px] font-bold font-mono">3</span>
            </div>
            <span>What happens after I pay?</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed pl-7 font-sans">
            We will immediately begin our personalized onboarding and kickoff your project work.
          </p>
        </div>
      </Grid>

      {/* 3. Main Grid */}
      <Grid cols={1} lgCols={12} gap={8} className="items-stretch">
        
        {/* Left Column: 3 Payment Options */}
        <div className="lg:col-span-7 space-y-5">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono font-bold">
            Select Payment Method
          </p>

          <div className="space-y-6">
            <PaymentMethodCard
              methodId="card"
              paymentLoading={paymentLoading}
              onPay={onPay}
              onStatusChange={setSimulatedStatus}
            />

            <PaymentMethodCard
              methodId="crypto"
              paymentLoading={paymentLoading}
              onPay={onPay}
              onStatusChange={setSimulatedStatus}
            />

            <PaymentMethodCard
              methodId="swift"
              paymentLoading={paymentLoading}
              onPay={onPay}
              onStatusChange={setSimulatedStatus}
            />
          </div>
        </div>

        {/* Right Column: Payment Summary */}
        <div className="lg:col-span-5">
          <PaymentSummary
            proposal={proposal}
            isPaid={isPaid}
            simulatedStatus={simulatedStatus}
          />
        </div>

      </Grid>

      {/* Navigation Footer */}
      <Divider />
      <div className="flex justify-between items-center pt-2 font-sans">
        <Button 
          id="btn-back-to-invoice"
          variant="outline" 
          onClick={onBack} 
          className="cursor-pointer h-10 px-5 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Invoice
        </Button>
      </div>
    </div>
  );
}
