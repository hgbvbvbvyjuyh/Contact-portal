/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const ANIMATION_DURATION = {
  FAST: 0.15,
  NORMAL: 0.25,
  SLOW: 0.35,
} as const;

export const ANIMATION_EASING = [0.16, 1, 0.3, 1] as [number, number, number, number]; // Standard ease-out-expo

export const LAYOUT_CONSTANTS = {
  MAX_WIDTH: 'max-w-7xl', // 1200px equivalent
} as const;

export const PORTAL_STEPS = [
  { id: 'cover', label: 'Cover' },
  { id: 'agreement-info', label: 'Agreement Information' },
  { id: 'overview', label: 'Project Overview' },
  { id: 'scope', label: 'Scope of Work & Exclusions' },
  { id: 'deliverables', label: 'Deliverables' },
  { id: 'timeline', label: 'Project Timeline' },
  { id: 'collaboration', label: 'Collaboration & Responsibilities' },
  { id: 'partnership', label: 'Our Partnership Approach' },
  { id: 'investment', label: 'Investment & Payment Terms' },
  { id: 'ownership', label: 'Ownership & Confidentiality' },
  { id: 'legal', label: 'Legal Terms' },
  { id: 'acceptance', label: 'Acceptance & E-Signature' },
  { id: 'invoice', label: 'Invoice' },
  { id: 'payment', label: 'Payment' },
  { id: 'success', label: 'Success' },
] as const;

export interface FoundingPartnerProgramConfig {
  bestFor: string;
  outcome: string;
  includes: string[];
  ourGuarantee: string;
  terms: string[];
  bonuses: {
    title: string;
    description: string;
  }[];
  testimonialRequests: string[];
}

export const INVESTMENT_CONFIG: FoundingPartnerProgramConfig = {
  bestFor: "Startups, local businesses, and modern agencies looking to deploy a seamless, highly optimized client onboarding flow.",
  outcome: "A polished, custom-branded onboarding workflow that maximizes sign-ups, minimizes manual friction, and ensures client success.",
  includes: [
    "Fully tokenized brand styling container with CSS theme variables.",
    "Interactive stepper progress and multi-step validation engine.",
    "Mock payment gateway simulation with validation hooks.",
    "Robust offline local storage state persistence to prevent data loss."
  ],
  ourGuarantee: "If we recommend a solution, we stand behind it. If the system isn't implemented as agreed or isn't working as designed, we'll fix it at no additional cost until it is.",
  terms: [
    "Limited to the first 3 clients only.",
    "Minimum 3-month commitment.",
    "Monthly investment: {monthlyInvestment}.",
    "50% of the first month's subscription is due upfront.",
    "Remaining 50% is due once implementation is complete and ready to go live.",
    "After the first month, billing occurs monthly in advance.",
    "The Founding Partner rate remains locked in while the client remains active.",
    "Once all 3 positions are filled, this offer is permanently closed."
  ],
  bonuses: [
    {
      title: "Pay first 3 months upfront",
      description: "50% off Month 4."
    },
    {
      title: "Pay first 6 months upfront",
      description: "Month 7 free."
    }
  ],
  testimonialRequests: [
    "An honest testimonial about your onboarding experience.",
    "Permission to feature your project as an active case study (only with your explicit approval).",
    "Participation in a short feedback session to help us optimize your workflow and system performance."
  ]
};

