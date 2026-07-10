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

export interface AgencyDetails {
  agencyName?: string;
  logo?: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface ClientDetails {
  id?: string;
  company?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
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

export interface ScopeItem {
  title: string;
  description: string;
}

export interface DeliverableItem {
  title: string;
  description: string;
  deliveryFormat?: string;
  estimatedDelivery?: string;
}

export interface TimelinePhase {
  phase: string;
  duration: string;
  activities: string;
}

/**
 * Top-level Proposal Domain Model exactly matching Supabase JSON schema
 */
export interface Proposal {
  agreementInformation?: AgreementInformation;
  projectOverview?: ProjectOverview;
  scopeOfWork?: ScopeItem[] | string;
  outOfScope?: ScopeItem[] | string;
  deliverables?: DeliverableItem[];
  projectTimeline?: TimelinePhase[];
  agency?: AgencyDetails;
  client?: ClientDetails;
}
