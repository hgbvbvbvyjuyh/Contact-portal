/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum ProposalState {
  PROPOSAL_REVIEW = 'PROPOSAL_REVIEW',
  READY_TO_SIGN = 'READY_TO_SIGN',
  SIGNED = 'SIGNED',
  WAITING_PAYMENT = 'WAITING_PAYMENT',
  PAID = 'PAID',
}

export enum ProposalStatus {
  DRAFT = 'DRAFT',
  SENT = 'SENT',
  VIEWED = 'VIEWED',
  SIGNED = 'SIGNED',
  PAID = 'PAID',
  COMPLETED = 'COMPLETED',
}

export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  UNPAID = 'UNPAID',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
}

export enum SignatureStatus {
  UNSIGNED = 'UNSIGNED',
  SIGNED = 'SIGNED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
}

export enum TimelineStatus {
  UPCOMING = 'UPCOMING',
  CURRENT = 'CURRENT',
  COMPLETED = 'COMPLETED',
  LOCKED = 'LOCKED',
}

// Export the entire modular domain data models
export * from './proposal';
