/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Proposal } from '@/types/proposal';
import { Card } from '@/components/Card';
import { Divider } from '@/components/Layout';
import { H3, H4 } from '@/components/Typography';
import { PaymentStatusBadge, SimulationStatus } from './PaymentStatusBadge';
import { Calendar, CreditCard, Sparkles } from 'lucide-react';

interface PaymentSummaryProps {
  proposal: Proposal | null;
  isPaid: boolean;
  simulatedStatus?: SimulationStatus;
}

export function PaymentSummary({
  proposal,
  isPaid,
  simulatedStatus = 'Pending'
}: PaymentSummaryProps) {
  const projectName = proposal?.projectName || proposal?.project?.projectName || 'Founding Partner Program';

  // Format helper for USD currency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(val);
  };

  const totalInvestment = proposal?.pricing?.total || 7000.00;
  const dueToday = proposal?.pricing?.deposit || 3500.00;
  const remainingBalance = proposal?.pricing?.remainingBalance || 3500.00;

  // Resolve status based on isPaid state
  const currentStatus: SimulationStatus = isPaid ? 'Paid' : simulatedStatus;

  return (
    <div id="payment-summary-container" className="space-y-4">
      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold font-mono">
        Payment Summary
      </p>

      <Card id="payment-summary-card" className="p-6 md:p-8 border border-border/40 bg-card/40 backdrop-blur-md rounded-card shadow-medium space-y-6 relative overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/3 rounded-full blur-2xl pointer-events-none -z-10" />
        
        {/* Header branding */}
        <div className="space-y-1.5 pb-4 border-b border-border/10">
          <span className="text-[9px] font-mono font-bold text-brand-blue tracking-widest uppercase">
            Active Investment
          </span>
          <H3 className="text-base font-bold text-foreground">
            {projectName}
          </H3>
          <p className="text-xs text-muted-foreground">
            Onboarding & implementation kickoff
          </p>
        </div>

        {/* Financial Details */}
        <div className="space-y-3.5 text-xs sm:text-sm font-sans">
          <div className="flex justify-between items-center py-1">
            <span className="text-muted-foreground font-medium">Project Name</span>
            <span className="font-semibold text-foreground text-right">
              {projectName}
            </span>
          </div>
          
          <div className="flex justify-between items-center py-1">
            <span className="text-muted-foreground font-medium">Project Investment</span>
            <span className="font-mono font-bold text-foreground">
              {formatCurrency(totalInvestment)}
            </span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-muted-foreground font-medium">Amount Due Today (50%)</span>
            <span className="font-mono font-bold text-foreground">
              {formatCurrency(dueToday)}
            </span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-muted-foreground font-medium">Remaining Balance</span>
            <span className="font-mono font-medium text-muted-foreground">
              {formatCurrency(remainingBalance)}
            </span>
          </div>

          <Divider className="my-3 opacity-40" />

          {/* Payment Status Badge Row */}
          <div className="flex justify-between items-center py-1">
            <span className="text-muted-foreground font-medium">Payment Status</span>
            <PaymentStatusBadge status={currentStatus} className="font-semibold py-1 px-3 text-xs" />
          </div>
        </div>

        {/* Short confirmation message at bottom */}
        <div className="mt-6 pt-5 border-t border-border/10 flex items-start gap-3 text-xs bg-brand-blue/3 -mx-6 -mb-6 md:-mx-8 md:-mb-8 p-5 rounded-b-card border border-t-brand-blue/10">
          <Sparkles className="h-4 w-4 text-brand-blue shrink-0 mt-0.5" />
          <p className="text-foreground/90 leading-relaxed font-sans">
            Once your payment is confirmed, we'll begin your onboarding and implementation process.
          </p>
        </div>
      </Card>
    </div>
  );
}
