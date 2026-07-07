/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '@/components/ThemeProvider';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { Divider, Grid } from '@/components/Layout';
import { H2, H3, H4 } from '@/components/Typography';
import { 
  FileText, 
  ArrowRight, 
  Download, 
  CreditCard,
  Check,
  ShieldCheck,
  Calendar,
  Info,
  Clock,
  ArrowLeft
} from 'lucide-react';

interface InvoiceSectionProps {
  onNext: () => void;
  onBack: () => void;
  isPaid: boolean;
}

export function InvoiceSection({
  onNext,
  onBack,
  isPaid,
}: InvoiceSectionProps) {
  const { placeholderProposal } = useTheme();
  const proposal = placeholderProposal;
  const invoiceData = proposal?.commercial?.invoice || proposal?.invoice;
  const [isDownloading, setIsDownloading] = useState(false);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(val);
  };

  const getTodayFormatted = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      window.print();
    }, 1200);
  };

  const totalInvestment = proposal?.pricing?.total || 7000.00;
  const depositDue = proposal?.pricing?.deposit || 3500.00;
  const remainingBalance = proposal?.pricing?.remainingBalance || 3500.00;
  const projectName = proposal?.project?.projectName || 'Digital Onboarding Pipeline';

  const includedItems = proposal?.scope?.deliverables?.map((d: any) => d.title) || [
    'Digital Onboarding Infrastructure',
    'Custom Portal Integration',
    'Automated Webhooks & Workflows',
    'Comprehensive System Testing',
    'Secure Client Dashboard deployment',
    'Dedicated Launch Support & SLA'
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-300 font-sans">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-button bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/15 shrink-0">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <H2 className="text-foreground font-black tracking-tight text-2xl sm:text-3xl">Invoice Review</H2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
              Review your invoice and project summary below before continuing to our secure checkout.
            </p>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Billing Summary & Payment Information */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* 1. Billing Summary Card */}
          <Card className="rounded-card border border-border/50 bg-card p-6 md:p-8 shadow-low space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/3 rounded-full blur-2xl pointer-events-none -z-10" />
            
            <div className="flex items-center gap-3 pb-4 border-b border-border/10">
              <div className="h-10 w-10 rounded-button bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/15 shrink-0">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <H3 className="text-base font-bold text-foreground">Billing Summary</H3>
                <p className="text-xs text-muted-foreground">Pricing breakdown and milestone distribution</p>
              </div>
            </div>

            {/* Price Line Items */}
            <div className="space-y-4 font-sans text-sm">
              <div className="flex justify-between items-center py-2.5 border-b border-border/5">
                <span className="text-muted-foreground font-medium">Project / Service</span>
                <span className="text-foreground font-bold">{projectName}</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-border/5">
                <span className="text-muted-foreground font-medium">Project Investment</span>
                <span className="text-foreground font-mono font-semibold">{formatCurrency(totalInvestment)}</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-border/5">
                <span className="text-muted-foreground font-medium">Due Today (50%)</span>
                <span className="text-foreground font-mono font-semibold">{formatCurrency(depositDue)}</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-border/5">
                <span className="text-muted-foreground font-medium">Remaining Balance</span>
                <span className="text-foreground font-mono font-semibold">{formatCurrency(remainingBalance)}</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-border/5">
                <span className="text-muted-foreground font-medium">Tax</span>
                <span className="text-foreground font-mono font-semibold">{formatCurrency(0.00)}</span>
              </div>

              {/* Total Due Today - Strongest visual emphasis */}
              <div className="mt-4 p-5 rounded-button bg-brand-blue/5 border border-brand-blue/20 flex justify-between items-center">
                <div className="space-y-0.5">
                  <span className="text-xs font-mono font-bold text-brand-blue uppercase tracking-wider block">Total Due Today</span>
                  <span className="text-[10px] text-muted-foreground block">50% initial implementation deposit</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-black text-foreground font-sans block leading-none">
                    {formatCurrency(depositDue)}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* 2. Payment Information Card */}
          <Card className="rounded-card border border-border/50 bg-card p-6 md:p-8 shadow-low space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/2 rounded-full blur-2xl pointer-events-none -z-10" />
            
            <div className="flex items-center gap-2 text-brand-blue pb-1">
              <ShieldCheck className="h-5 w-5" />
              <H3 className="text-sm font-bold uppercase tracking-wider font-mono">PAYMENT INFORMATION</H3>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
              <p>
                Your payment secures your project and allows implementation to begin.
              </p>
              <p>
                Choose your preferred payment method below. Card payments, cryptocurrency, and international bank transfers are all supported.
              </p>
              <p className="font-medium text-foreground/90">
                Once your payment is confirmed, we'll begin your onboarding and implementation process.
              </p>
            </div>
          </Card>

        </div>

        {/* RIGHT COLUMN: Invoice Summary & Included in this Payment */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* 3. Invoice Summary Card */}
          <Card className="rounded-card border border-border/50 bg-card p-6 shadow-low space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/3 rounded-full blur-2xl pointer-events-none -z-10" />
            
            <div className="space-y-3.5">
              <div className="flex justify-between items-center border-b border-border/10 pb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">Invoice Number</span>
                <span className="text-xs font-mono font-bold text-foreground">{invoiceData?.invoiceNumber || 'INV-2026-0049'}</span>
              </div>
              <div className="flex justify-between items-center border-b border-border/10 pb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">Payment Status</span>
                <Badge variant={isPaid ? 'success' : 'warning'} className="font-semibold">
                  {isPaid ? 'PAID' : 'AWAITING PAYMENT'}
                </Badge>
              </div>
              <div className="flex justify-between items-center border-b border-border/10 pb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">Issue Date</span>
                <span className="text-xs text-foreground font-sans font-medium">{getTodayFormatted()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">Due Date</span>
                <span className="text-xs text-brand-blue font-sans font-bold">Upon Signature</span>
              </div>
            </div>
          </Card>

          {/* 4. Included in this Payment Card */}
          <Card className="rounded-card border border-border/50 bg-card p-6 md:p-8 shadow-low space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/3 rounded-full blur-2xl pointer-events-none -z-10" />
            
            <div className="space-y-1">
              <H3 className="text-sm font-bold text-foreground">Included in this Payment</H3>
              <p className="text-xs text-muted-foreground">Directly assigned capabilities and integrations</p>
            </div>

            <Divider className="opacity-40" />

            {/* Checklist */}
            <div className="space-y-3">
              {includedItems.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-center">
                  <div className="h-5.5 w-5.5 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0 border border-brand-blue/15">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </div>
                  <span className="text-xs font-medium text-foreground/90">{item}</span>
                </div>
              ))}
            </div>
          </Card>

        </div>

      </div>

      {/* Actions / Navigation Footer */}
      <Divider />
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-2 font-sans">
        <Button 
          variant="outline" 
          onClick={onBack} 
          className="cursor-pointer h-10 px-5 flex items-center gap-2 self-start sm:self-auto"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Signature
        </Button>
        
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <Button
            variant="outline"
            onClick={handleDownloadPDF}
            className="h-10 px-5 flex items-center justify-center gap-2 cursor-pointer border-border hover:bg-muted/30 font-semibold"
            disabled={isDownloading}
          >
            <Download className="h-4 w-4" />
            {isDownloading ? 'Generating PDF...' : 'Download Invoice PDF'}
          </Button>

          <Button 
            onClick={onNext} 
            className="cursor-pointer h-10 px-6 flex items-center justify-center gap-2 font-semibold"
          >
            Continue to Secure Payment
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
