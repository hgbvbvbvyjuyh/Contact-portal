/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MOCK_PROPOSAL } from '@/mock/proposal';

export const PLACEHOLDER_PROPOSAL = MOCK_PROPOSAL;

export const brandDefaults = {
  name: MOCK_PROPOSAL.agreementInformation?.companyName ?? 'Agency Name',
  consultantEmail: MOCK_PROPOSAL.agreementInformation?.email ?? 'hello@agency.com',
  consultantPhone: MOCK_PROPOSAL.agreementInformation?.phoneNumber ?? '+1 (555) 234-5678',
  readingTime: '8 min read',
  logoText: MOCK_PROPOSAL.agreementInformation?.companyName ?? 'Agency',
  effectiveDate: MOCK_PROPOSAL.agreementInformation?.datePrepared ?? 'Today',
  valueProposition: 'We do not build generic static documents; we deliver premium, responsive interactive applications. By coupling advanced styling mechanics with modern React architectures, we provide Nafirofiqul LLC with a custom, trustworthy, and high-converting client portal.',
};

export const documentDefaults = {
  summary: MOCK_PROPOSAL.projectOverview?.currentSituation ?? 'Project Summary',
  goals: [],
};
