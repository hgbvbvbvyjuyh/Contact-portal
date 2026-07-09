/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '@/components/ThemeProvider';
import { InfoCard, CalloutBox } from '@/components/BusinessComponents';
import { Button } from '@/components/Button';
import { Grid, Divider } from '@/components/Layout';
import { H2 } from '@/components/Typography';
import { Building2, User, Mail, Calendar, FileCheck, HelpCircle } from 'lucide-react';

interface AgreementInfoSectionProps {
  onNext: () => void;
  onBack: () => void;
}

export function AgreementInfoSection({ onNext, onBack }: AgreementInfoSectionProps) {
  const { brandConfig, proposal } = useTheme();

  if (!proposal) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-300 font-sans">
      {/* Heading Container */}
      <div className="space-y-3">
        <H2 className="text-foreground font-bold tracking-tight">Agreement Information</H2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          This digital onboarding proposal outlines the service commitment, structural delivery parameters, and payment structures.
        </p>
      </div>

      {/* Main Grid: Party Cards */}
      <Grid cols={1} mdCols={2} gap={6}>
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <InfoCard
            title="Prepared For (The Client)"
            subtitle="Covenant Signee Partner"
            icon={<User className="h-5 w-5" />}
          >
            <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
              <div className="flex justify-between border-b border-border/10 pb-1.5">
                <span className="font-semibold text-foreground">Client Name</span>
                <span>{proposal.agreementInformation?.clientName || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b border-border/10 pb-1.5">
                <span className="font-semibold text-foreground">Company Name</span>
                <span>{proposal.agreementInformation?.companyName || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b border-border/10 pb-1.5">
                <span className="font-semibold text-foreground">Industry</span>
                <span>{proposal.agreementInformation?.industry || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b border-border/10 pb-1.5">
                <span className="font-semibold text-foreground">Service Type</span>
                <span>{proposal.agreementInformation?.serviceType || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b border-border/10 pb-1.5">
                <span className="font-semibold text-foreground">Primary Email</span>
                <span>{proposal.agreementInformation?.email || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b border-border/10 pb-1.5">
                <span className="font-semibold text-foreground">Phone Number</span>
                <span>{proposal.agreementInformation?.phoneNumber || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-foreground">Website</span>
                <span>{proposal.agreementInformation?.website || 'N/A'}</span>
              </div>
            </div>
          </InfoCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <InfoCard
            title="Investment & Timeline"
            subtitle="Commercial & Delivery Terms"
            icon={<Building2 className="h-5 w-5" />}
          >
            <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
              <div className="flex justify-between border-b border-border/10 pb-1.5">
                <span className="font-semibold text-foreground">Project Price</span>
                <span className="text-primary font-bold">{proposal.agreementInformation?.projectPrice || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b border-border/10 pb-1.5">
                <span className="font-semibold text-foreground">Payment Schedule</span>
                <span>{proposal.agreementInformation?.paymentSchedule || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b border-border/10 pb-1.5">
                <span className="font-semibold text-foreground">Timeline</span>
                <span>{proposal.agreementInformation?.timeline || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b border-border/10 pb-1.5">
                <span className="font-semibold text-foreground">Proposal ID</span>
                <span>{proposal.agreementInformation?.proposalId || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b border-border/10 pb-1.5">
                <span className="font-semibold text-foreground">Proposal Version</span>
                <span>{proposal.agreementInformation?.proposalVersion || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-foreground">Date Prepared</span>
                <span>{proposal.agreementInformation?.datePrepared || 'N/A'}</span>
              </div>
            </div>
          </InfoCard>
        </motion.div>
      </Grid>

      {/* Notice Callout Box */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <CalloutBox
          title="Important Notice"
          variant="info"
          icon={<FileCheck className="h-4.5 w-4.5 text-blue-500" />}
        >
          By proceeding through the sections of this client portal, you are reviewing a professional statement of work. This proposal remains active and valid for acceptance.
        </CalloutBox>
      </motion.div>

      {/* Navigation Buttons */}
      <Divider />
      <div className="flex justify-between items-center pt-2">
        <Button variant="outline" onClick={onBack} className="cursor-pointer h-10 px-5">
          Back to Cover
        </Button>
        <Button onClick={onNext} className="cursor-pointer h-10 px-5">
          Continue to Overview
        </Button>
      </div>
    </div>
  );
}
