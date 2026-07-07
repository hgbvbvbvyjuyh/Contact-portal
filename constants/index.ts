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
