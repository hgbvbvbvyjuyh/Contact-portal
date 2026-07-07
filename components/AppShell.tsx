/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { Container } from '@/components/Container';
import { LayoutGrid } from '@/components/LayoutGrid';
import { Footer } from '@/components/Footer';
import { PlaceholderCard } from '@/components/PlaceholderCard';
import { TopNavigation } from '@/components/TopNavigation';
import { ProposalJourneyNavigator } from '@/components/ProposalJourneyNavigator';
import { PORTAL_STEPS } from '@/constants';
import { 
  Briefcase, 
  User, 
  Clock, 
  LifeBuoy, 
  Eye,
  CalendarDays,
  Check,
  FileCheck2,
  LockKeyhole
} from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
  showSummaryPanel?: boolean;
  status?: string;
  currentStepId?: string;
  onStepChange?: (stepId: string) => void;
  completedSteps?: string[];
  lockedSteps?: string[];
}

export function AppShell({ 
  children, 
  showSummaryPanel = true, 
  status = 'viewed',
  currentStepId: externalStepId,
  onStepChange,
  completedSteps,
  lockedSteps,
}: AppShellProps) {
  const { theme, brandConfig, proposal } = useTheme();
  
  const [internalStepId, setInternalStepId] = useState('cover');
  const activeStepId = externalStepId !== undefined ? externalStepId : internalStepId;

  const handleStepClick = (stepId: string) => {
    if (externalStepId === undefined) {
      setInternalStepId(stepId);
    }
    onStepChange?.(stepId);
  };

  // 3. Placeholder Sidebar Panels
  const renderSidebarContent = () => (
    <div className="space-y-6">
      {/* Card 1: Project Summary */}
      <PlaceholderCard title="Project Summary" badge="Proposal" badgeVariant="info">
        <div className="space-y-2.5">
          <div className="flex items-start gap-2.5">
            <Briefcase className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground">{proposal?.projectName || proposal?.project?.projectName || 'Project Proposal'}</p>
              <p className="text-[11px] text-muted-foreground">Digital Product Architecture</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground pt-1">
            <CalendarDays className="h-3.5 w-3.5" />
            <span>Target Launch: {proposal?.timeline?.[proposal.timeline.length - 1]?.dueDate || 'Oct 2026'}</span>
          </div>
        </div>
      </PlaceholderCard>

      {/* Card 2: Client Information */}
      <PlaceholderCard title="Client Information">
        <div className="space-y-2">
          <div className="flex items-start gap-2.5">
            <User className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground">{proposal?.client?.company || 'The Client'}</p>
              <p className="text-[11px] text-muted-foreground">{proposal?.client?.email || 'N/A'}</p>
            </div>
          </div>
        </div>
      </PlaceholderCard>

      {/* Card 3: Proposal Status */}
      <PlaceholderCard 
        title="Proposal Status" 
        badge={status === 'accepted' ? 'Completed' : status === 'signed' ? 'Signed' : 'Under Review'} 
        badgeVariant={status === 'accepted' ? 'success' : status === 'signed' ? 'info' : 'warning'}
      >
        <div className="space-y-3 font-sans">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Eye className="h-3.5 w-3.5 text-blue-500" /> Opened & Viewed
            </span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <Check className="h-3 w-3" strokeWidth={3} /> Yes
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <FileCheck2 className="h-3.5 w-3.5 text-amber-500" /> Signed Agreement
            </span>
            {status !== 'viewed' ? (
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="h-3 w-3" strokeWidth={3} /> Signed
              </span>
            ) : (
              <span className="font-mono text-amber-500 font-semibold animate-pulse">Awaiting Sign</span>
            )}
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <LockKeyhole className="h-3.5 w-3.5 text-primary" /> Deposit Escrow
            </span>
            {status === 'accepted' ? (
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="h-3 w-3" strokeWidth={3} /> Confirmed
              </span>
            ) : status === 'signed' ? (
              <span className="font-mono text-amber-500 font-semibold animate-pulse">Checkout Open</span>
            ) : (
              <span className="font-mono text-muted-foreground/60">Locked</span>
            )}
          </div>
        </div>
      </PlaceholderCard>

      {/* Card 4: Support Contact */}
      <PlaceholderCard title="Support Contact">
        <div className="space-y-2.5">
          <div className="flex items-start gap-2.5">
            <LifeBuoy className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground">Premium Client Desk</p>
              <p className="text-[11px] text-muted-foreground">{proposal?.agency?.email || 'support@agency.design'}</p>
            </div>
          </div>
        </div>
      </PlaceholderCard>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col justify-between font-sans selection:bg-primary selection:text-primary-foreground">
      {/* 1. Header (Navigation) */}
      <TopNavigation status={status} />

      {/* 2. Journey Stepper */}
      <ProposalJourneyNavigator
        currentStepId={activeStepId}
        onStepClick={handleStepClick}
        completedSteps={completedSteps}
        lockedSteps={lockedSteps}
      />

      {/* 3. Main Body Structure */}
      <div className="flex-1 pt-6 sm:pt-8 pb-12 sm:pb-16 transition-colors duration-200">
        <Container>
          <LayoutGrid aside={renderSidebarContent()} showAside={showSummaryPanel}>
            {children}
          </LayoutGrid>
        </Container>
      </div>

      {/* 4. Footer */}
      <Footer />
    </div>
  );
}
