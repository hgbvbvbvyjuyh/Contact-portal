/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Agreement Information
 * Contains high-level contact, organization, and validation parameters.
 */
export interface AgreementInformation {
  clientName?: string;
  companyName?: string;
  email?: string;
  phoneNumber?: string;
  website?: string;
  industry?: string;
  serviceType?: string;
  projectPrice?: string;
  paymentSchedule?: string;
  timeline?: string;
  proposalId?: string;
  proposalVersion?: string;
  datePrepared?: string;
}

/**
 * Project Overview
 * Captures strategic project summaries and expected outcomes.
 */
export interface ProjectOverview {
  currentSituation?: string;
  businessObjectives?: string;
  projectRationale?: string;
  expectedOutcomes?: string;
}

/**
 * Top-level Proposal Domain Model exactly matching Supabase JSON schema
 */
export interface Proposal {
  agreementInformation?: AgreementInformation;
  projectOverview?: ProjectOverview;
  scopeOfWork?: string;
  outOfScope?: string;
  deliverables?: any[];
  projectTimeline?: any[];
}
