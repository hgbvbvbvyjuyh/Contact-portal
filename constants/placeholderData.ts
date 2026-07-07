/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MOCK_PROPOSAL } from '@/mock/proposal';

export const PLACEHOLDER_PROPOSAL = MOCK_PROPOSAL;

export const AGENCY_INFO = {
  name: MOCK_PROPOSAL.agency.agencyName,
  consultantEmail: MOCK_PROPOSAL.agency.email,
  version: MOCK_PROPOSAL.version,
  readingTime: MOCK_PROPOSAL.project.estimatedReadingTime,
  logoText: MOCK_PROPOSAL.agency.logo,
  effectiveDate: MOCK_PROPOSAL.date,
};

export const PROJECT_OVERVIEW_DATA = {
  summary: MOCK_PROPOSAL.project.summary,
  goals: MOCK_PROPOSAL.project.goals,
  outcomes: [
    'An elite, high-performance web app optimized across responsive desktop, tablet, and mobile screens.',
    'Reduced contract execution cycles from multiple days to under ten minutes via integrated digital signatures.',
    'A fully synchronized visual environment reflecting real-time color styling choices directly on standard foundation UI blocks.',
    'Enterprise-grade accessibility compliant with semantic headings, high-contrast labels, and complete keyboard navigation support.',
  ],
  valueProposition: 'We do not build generic static documents; we deliver premium, responsive interactive applications. By coupling advanced styling mechanics with modern React architectures, we provide Nafirofiqul LLC with a custom, trustworthy, and high-converting client portal.',
};
