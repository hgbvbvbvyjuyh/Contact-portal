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
} from './index';

/**
 * Agency Information
 * Captures all contact and corporate details for the service provider.
 */
export interface Agency {
  agencyName: string;
  logo: string; // Logo text or URL
  website: string;
  email: string;
  phone: string;
  address: string;
}

/**
 * Client Information
 * Fully structured for CRM and legal execution syncing.
 */
export interface Client {
  id: string; // Keeps compatibility with old client tracking
  clientName: string; // Primary contact person
  name: string; // Alias for backward-compatibility with old client.name
  company: string; // Entity/Legal name
  email: string;
  phone: string;
  address: string;
}

/**
 * Strategic Project Overview & Goals
 */
export interface GoalItem {
  text: string; // Goal summary (e.g., "Dynamic Whitelabeling")
  description: string; // Comprehensive technical detail
}

export interface Project {
  projectName: string;
  summary: string;
  goals: GoalItem[];
  overview: string;
  estimatedDuration: string;
  estimatedReadingTime: string;
}

/**
 * Detailed Scope of Work Items
 */
export interface ScopeItem {
  id: string;
  title: string;
  description: string;
  status: 'In-scope' | 'Out-of-scope' | string;
}

/**
 * Project Exclusions to avoid scope creep
 */
export interface ExclusionItem {
  id: string;
  title: string;
  description: string;
  reason?: string; // Optional reasoning or rationale
}

/**
 * Concrete Deliverable Items
 */
export interface DeliverableItem {
  id: string;
  title: string;
  description: string;
  deliveryFormat: string; // e.g. "React Codebase / Git Repository"
  estimatedDelivery: string; // Week or Milestone bound
}

/**
 * Timeline Milestones
 */
export interface MilestoneItem {
  id: string; // For tracker selection reference
  title: string;
  description: string;
  dueDate: string; // ISO or human-readable
  estimatedDate: string; // Legacy alias for backward-compatibility
  status: TimelineStatus;
}

/**
 * Mutual Service Responsibilities
 */
export interface Collaboration {
  agencyResponsibilities: string[];
  clientResponsibilities: string[];
}

/**
 * Revision Terms & SLA parameters
 */
export interface Revisions {
  includedRevisions: number;
  additionalRevisionPricing: string; // e.g., "$150/hr"
  responseTime: string; // SLA response time (e.g. "24-48 business hours")
}

/**
 * Milestone-based payment schedule items
 */
export interface PaymentScheduleItem {
  id: string;
  milestoneName: string;
  amount: number;
  dueDate: string;
  status: PaymentStatus;
}

/**
 * Overall Project Pricing & Financial Breakdown
 */
export interface Pricing {
  currency: string; // e.g. "USD"
  total: number;
  deposit: number;
  remainingBalance: number;
  taxes: number;
  discounts: number;
  paymentSchedule: PaymentScheduleItem[];
}

/**
 * Legal Boilerplate covenants ready for execution
 */
export interface Legal {
  ownership: string;
  confidentiality: string;
  liability: string;
  termination: string;
  governingLaw: string;
  forceMajeure: string;
  disputeResolution: string;
}

/**
 * Digital Signature Metadata (Documenso/Docusign ready)
 */
export interface Signature {
  signerName: string;
  email: string;
  signedDate: string | null; // Nullable until execution
  signatureStatus: SignatureStatus;
}

/**
 * Individual Invoice Billing Item
 */
export interface InvoiceItem {
  id: string;
  title: string;
  description: string;
  price: number;
}

/**
 * Complete Project Invoice
 */
export interface Invoice {
  invoiceNumber: string;
  status: InvoiceStatus;
  items: InvoiceItem[];
  subtotal: number; // Legacy total baseline
  tax: number; // Legacy tax metric
  discount: number; // Legacy discount metric
  taxes: number; // Modern tax structure
  discounts: number; // Modern discount structure
  total: number;
  dueDate: string;
}

export interface CryptoWallet {
  network: string;
  address: string;
  currency: string;
}

export interface CryptoPaymentDetails {
  enabled: boolean;
  wallets: CryptoWallet[];
  reference: string;
}

export interface BankPaymentDetails {
  accountName: string;
  companyName: string;
  bankName: string;
  accountNumber: string;
  iban: string;
  swift: string;
  bankAddress: string;
  reference: string;
}

export interface CryptoWalletsMap {
  usdt_trc20?: string;
  usdt_erc20?: string;
  usdc?: string;
  btc?: string;
  eth?: string;
}

export interface PaymentMethod {
  id: string; // e.g. "card", "crypto", "swift"
  enabled: boolean;
  title: string;
  provider: string; // e.g. "Payoneer", "Crypto", "SWIFT"
  recommended: boolean;
  description: string;
  invoiceUrl?: string; // e.g. for card payoneer invoice
  wallets?: CryptoWalletsMap; // support prompt's flat object structure
  cryptoWalletsList?: CryptoWallet[]; // support list structure
  bank?: BankPaymentDetails; // support bank details
  reference?: string; // transaction reference memo ID
}

/**
 * Active Checkout & Gateway State
 */
export interface Payment {
  status: PaymentStatus;
  gateway: string; // e.g., "Stripe Sandbox"
  paymentUrl: string; // Documenso / Stripe checkout URL
  paidAmount: number;
  remainingAmount: number;
  cardInvoiceUrl?: string;
  crypto?: CryptoPaymentDetails;
  bank?: BankPaymentDetails;
  methods?: PaymentMethod[];
}

/**
 * Success Screen & Next Steps Configuration
 */
export interface Success {
  confirmationMessage: string;
  nextSteps: string[];
  contactDetails: {
    name: string;
    email: string;
    phone?: string;
  };
}

/**
 * Top-level Proposal Domain Model
 * Serves as the single, authoritative data structure consumed by all steps.
 */
/**
 * Wrapper for commercial metadata (invoice & payment)
 */
export interface Commercial {
  invoice: Invoice;
  payment: Payment;
}

export interface Proposal {
  proposalId: string;
  id: string; // Legacy alias for backward-compatibility with prop_001
  version: string;
  createdAt: string;
  updatedAt: string;
  status: ProposalStatus;
  state: ProposalState; // Step indicator tracker binding
  date: string; // Legacy alias for backward-compatibility with preparational date

  agreementInformation?: {
    companyName?: string;
  };
  agency: Agency;
  client: Client;
  project: Project;
  scope: ScopeItem[];
  exclusions?: ExclusionItem[];
  deliverables: DeliverableItem[];
  timeline: MilestoneItem[];
  collaboration: Collaboration;
  revisions: Revisions;
  pricing: Pricing;
  legal: Legal;
  signature: Signature;
  invoice: Invoice;
  payment: Payment;
  commercial?: Commercial;
  success: Success;

  // Root-level backward compatibility fields
  projectName: string;
}
