/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Proposal } from '../types';

export const MOCK_PROPOSAL: Proposal = {
  agreementInformation: {
    clientName: 'Nafirofiqul',
    companyName: 'Nafirofiqul LLC',
    email: 'Nafirofiqul@gmail.com',
    phoneNumber: '+1 (555) 876-5432',
    website: 'https://nafirofiqul.example.com',
    industry: 'Technology & E-commerce',
    serviceType: 'Client Portal Development',
    projectPrice: '$25,000',
    paymentSchedule: '50% Deposit, 50% on Completion',
    timeline: '5 Weeks',
    proposalId: 'PROP-2026-000007',
    proposalVersion: '1.0.4',
    datePrepared: 'July 3, 2026'
  },
  projectOverview: {
    currentSituation: 'Apex Digital Product Agency has designed a comprehensive strategy to deliver Nafirofiqul LLC’s digital onboarding pipeline. This framework enables seamless integration of brand identity, high-performance web components, and dynamic user transitions, resulting in an elite Client Portal experience.',
    businessObjectives: 'An elite, high-performance web app optimized across responsive desktop, tablet, and mobile screens. It reduces contract execution cycles from multiple days to under ten minutes via integrated digital signatures.',
    projectRationale: 'To sustain high-growth momentum and ensure delivery precision, establishing a modern digital onboarding pipeline is a critical operational priority.',
    expectedOutcomes: 'Dynamically updated styles, framer-motion micro-animations, fast e-signatures, and persistent state management fallbacks.'
  },
  scopeOfWork: 'Dynamic Whitelabel Container, 15-Step Progress & Stepper Engine, Stripe Gateway & Checkout Simulation, Offline Client State Engine',
  outOfScope: 'Custom Multi-tenant Domain Hosting and server-side configurations.',
  deliverables: [
    {
      title: 'Dynamic Whitelabel Codebase',
      description: 'Fully integrated CSS variables and theme selection provider compiled as a React 19 component library.',
      deliveryFormat: 'GitHub Repository & npm package',
      estimatedDelivery: 'Week 2'
    },
    {
      title: 'Progress Stepper Interface',
      description: 'Smooth, multi-step stepper UI with responsive viewport adaptation and comprehensive accessibility support.',
      deliveryFormat: 'GitHub Repository & Storybook Docs',
      estimatedDelivery: 'Week 3'
    },
    {
      title: 'Stripe Sandbox Engine',
      description: 'Encrypted checkout layout and token validation hooks connected with the sandbox payment API.',
      deliveryFormat: 'React Hooks & Interactive Sandbox View',
      estimatedDelivery: 'Week 4'
    },
    {
      title: 'Resilient Local Storage Manager',
      description: 'State preservation utility that checkpoints incomplete multi-step inputs to prevent form data loss.',
      deliveryFormat: 'Modular TypeScript Utility',
      estimatedDelivery: 'Week 5'
    }
  ],
  projectTimeline: [
    {
      title: 'Sprint 1 Kickoff & Branding Tokenization',
      description: 'Set up design system foundations, design CSS variables, and prepare theme configuration hooks.',
      dueDate: 'July 10, 2026',
      status: 'COMPLETED'
    },
    {
      title: 'Sprint 2 Progress Engine Implementation',
      description: 'Develop interactive stepper steps, test slide transitions, and implement input field components.',
      dueDate: 'July 17, 2026',
      status: 'CURRENT'
    },
    {
      title: 'Sprint 3 Checkout Integration',
      description: 'Establish secure sandbox environments, deploy mock gateways, and validate payment state machines.',
      dueDate: 'July 24, 2026',
      status: 'UPCOMING'
    },
    {
      title: 'Sprint 4 Offline Persistence & Polish',
      description: 'Implement localStorage storage mechanisms, debug blank page exceptions, and optimize build bundles.',
      dueDate: 'July 31, 2026',
      status: 'UPCOMING'
    },
    {
      title: 'Production Deploy & Sign-off',
      description: 'Launch production onboarding, perform functional walkthrough, and secure end-to-end e-signatures.',
      dueDate: 'August 7, 2026',
      status: 'LOCKED'
    }
  ]
};
