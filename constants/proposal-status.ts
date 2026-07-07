/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  ProposalStatus, 
  ProposalState, 
  InvoiceStatus, 
  SignatureStatus, 
  PaymentStatus, 
  TimelineStatus 
} from '@/types';

/**
 * Friendly titles for each Proposal Status
 */
export const PROPOSAL_STATUS_LABELS: Record<ProposalStatus, string> = {
  [ProposalStatus.DRAFT]: 'Draft Proposal',
  [ProposalStatus.SENT]: 'Sent to Client',
  [ProposalStatus.VIEWED]: 'Active & Viewed',
  [ProposalStatus.SIGNED]: 'Executed Agreement',
  [ProposalStatus.PAID]: 'Deposit Invoice Paid',
  [ProposalStatus.COMPLETED]: 'Fully Project Completed',
};

/**
 * Tailwind CSS Badge configurations for Proposal Status
 */
export const PROPOSAL_STATUS_BADGES: Record<ProposalStatus, { label: string; className: string }> = {
  [ProposalStatus.DRAFT]: {
    label: 'Draft',
    className: 'bg-muted/10 text-muted-foreground border-muted/20',
  },
  [ProposalStatus.SENT]: {
    label: 'Sent',
    className: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  },
  [ProposalStatus.VIEWED]: {
    label: 'Active & Viewed',
    className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  },
  [ProposalStatus.SIGNED]: {
    label: 'Executed',
    className: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
  },
  [ProposalStatus.PAID]: {
    label: 'Deposit Paid',
    className: 'bg-teal-500/10 text-teal-500 border-teal-500/20',
  },
  [ProposalStatus.COMPLETED]: {
    label: 'Completed',
    className: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  },
};

/**
 * Friendly descriptions for the current onboarding active step
 */
export const PROPOSAL_STATE_DESCRIPTIONS: Record<ProposalState, string> = {
  [ProposalState.PROPOSAL_REVIEW]: 'The proposal is under active client review.',
  [ProposalState.READY_TO_SIGN]: 'The client has completed the review and is ready to sign.',
  [ProposalState.SIGNED]: 'E-signature has been securely collected and verified.',
  [ProposalState.WAITING_PAYMENT]: 'Awaiting payment verification for the required deposit.',
  [ProposalState.PAID]: 'Payment verified. Portal has successfully onboarded the project.',
};

/**
 * Visual styles for Invoice Statuses
 */
export const INVOICE_STATUS_BADGES: Record<InvoiceStatus, { label: string; className: string }> = {
  [InvoiceStatus.DRAFT]: {
    label: 'Draft Invoice',
    className: 'bg-muted/10 text-muted-foreground border-muted/20',
  },
  [InvoiceStatus.UNPAID]: {
    label: 'Unpaid Deposit',
    className: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  },
  [InvoiceStatus.PAID]: {
    label: 'Fully Paid',
    className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  },
  [InvoiceStatus.OVERDUE]: {
    label: 'Overdue',
    className: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
  },
};

/**
 * Visual styles for Signature status
 */
export const SIGNATURE_STATUS_BADGES: Record<SignatureStatus, { label: string; className: string }> = {
  [SignatureStatus.UNSIGNED]: {
    label: 'Awaiting E-Sign',
    className: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  },
  [SignatureStatus.SIGNED]: {
    label: 'E-Signed',
    className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  },
};

/**
 * Visual styles for Milestone Timeline status
 */
export const TIMELINE_STATUS_BADGES: Record<TimelineStatus, { label: string; className: string }> = {
  [TimelineStatus.COMPLETED]: {
    label: 'Completed',
    className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  },
  [TimelineStatus.CURRENT]: {
    label: 'In Progress',
    className: 'bg-blue-500/10 text-blue-500 border-blue-500/20 animate-pulse',
  },
  [TimelineStatus.UPCOMING]: {
    label: 'Upcoming Phase',
    className: 'bg-muted/10 text-muted-foreground border-muted/20',
  },
  [TimelineStatus.LOCKED]: {
    label: 'Locked',
    className: 'bg-muted/5 text-muted-foreground/50 border-muted/10 opacity-70',
  },
};

/**
 * Visual styles for Payment status
 */
export const PAYMENT_STATUS_BADGES: Record<PaymentStatus, { label: string; className: string }> = {
  [PaymentStatus.PENDING]: {
    label: 'Pending Transaction',
    className: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  },
  [PaymentStatus.PAID]: {
    label: 'Paid Securely',
    className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  },
  [PaymentStatus.FAILED]: {
    label: 'Transaction Failed',
    className: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
  },
};
