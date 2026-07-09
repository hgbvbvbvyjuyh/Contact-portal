/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Agreement Information
 * Contains high-level contact, organization, and validation date parameters.
 */
export interface AgreementInformation {
  companyName?: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  clientAddress?: string;
  agencyName?: string;
  agencyEmail?: string;
  agencyPhone?: string;
  agencyAddress?: string;
  proposalDate?: string;
  validUntil?: string;
}

/**
 * Project Overview Goal Item
 */
export interface GoalItem {
  text: string;
  description?: string;
}

/**
 * Project Overview
 * Captures strategic project summaries, detailed overviews, and target goals.
 */
export interface ProjectOverview {
  projectName?: string;
  summary?: string;
  overview?: string;
  goals?: GoalItem[];
  estimatedDuration?: string;
  estimatedReadingTime?: string;
}

/**
 * Scope of Work Item
 * Granular components included within the project's delivery.
 */
export interface ScopeOfWorkItem {
  id: string;
  title: string;
  description: string;
  status: string; // In-scope, Active, etc.
}

/**
 * Out of Scope Item (Exclusion)
 * Granular boundaries omitted from the project's delivery to prevent scope creep.
 */
export interface OutOfScopeItem {
  id: string;
  title: string;
  description: string;
  reason?: string;
}

/**
 * Deliverable Item
 * Concrete artifacts and assets that will be compiled and delivered.
 */
export interface DeliverableItem {
  id: string;
  title: string;
  description: string;
  deliveryFormat: string;
  estimatedDelivery: string;
}

/**
 * Project Timeline Milestone
 * Sprints or milestone stages tracked along the project delivery.
 */
export interface ProjectTimelineMilestone {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  status: string; // UPCOMING, CURRENT, COMPLETED, LOCKED
}

/**
 * Top-level Proposal Domain Model exactly matching Supabase JSON schema
 */
export interface Proposal {
  // Metadata & Status (columns in the table or present in JSON payload)
  proposalId?: string;
  id?: string;
  version?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
  state?: string;
  date?: string;

  // The 6 canonical fields
  agreementInformation?: AgreementInformation;
  projectOverview?: ProjectOverview;
  scopeOfWork?: ScopeOfWorkItem[];
  outOfScope?: OutOfScopeItem[];
  deliverables?: DeliverableItem[];
  projectTimeline?: ProjectTimelineMilestone[];
}
