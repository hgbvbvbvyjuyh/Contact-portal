/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Proposal } from '../types';

export const MOCK_PROPOSAL: Proposal = {
  proposalId: 'prop_001_onboarding_2026',
  id: 'prop_001', // Backward compatibility alias
  version: '1.0.4',
  createdAt: '2026-07-03T18:00:00Z',
  updatedAt: '2026-07-03T18:25:25Z',
  status: 'SENT',
  state: 'PROPOSAL_REVIEW',
  date: 'July 3, 2026', // Backward compatibility alias

  agreementInformation: {
    companyName: 'Nafirofiqul LLC',
    clientName: 'Nafirofiqul',
    clientEmail: 'Nafirofiqul@gmail.com',
    clientPhone: '+1 (555) 876-5432',
    clientAddress: '789 Enterprise Blvd, Suite 120, Wilmington, DE 19801',
    agencyName: 'Apex Digital Product Agency',
    agencyEmail: 'lead-architecture@agency.design',
    agencyPhone: '+1 (555) 234-5678',
    agencyAddress: '100 Design District Way, Suite 400, San Francisco, CA 94107',
    proposalDate: 'July 3, 2026',
    validUntil: 'August 2, 2026'
  },

  projectOverview: {
    projectName: 'Digital Onboarding Pipeline',
    summary: 'Apex Digital Product Agency has designed a comprehensive strategy to deliver Nafirofiqul LLC’s digital onboarding pipeline. This framework enables seamless integration of brand identity, high-performance web components, and dynamic user transitions, resulting in an elite Client Portal experience.',
    overview: 'An elite, high-performance web app optimized across responsive desktop, tablet, and mobile screens. It reduces contract execution cycles from multiple days to under ten minutes via integrated digital signatures.',
    estimatedDuration: '5 Weeks',
    estimatedReadingTime: '8 min read',
    goals: [
      {
        text: 'Dynamic Whitelabeling',
        description: 'Synchronize themes instantly on client action. Bind accent palettes and border radius custom styles directly on the global document root.'
      },
      {
        text: 'Framer Motion Enhancements',
        description: 'Incorporate delicate, fluid layout movements. Slide, fade, and zoom page increments to maximize structural elegance and user focus.'
      },
      {
        text: 'Decoupled Client Persistence',
        description: 'Formulate safe offline fallback defaults to ensure the UI operates perfectly across any client state without dependency crashes.'
      }
    ]
  },

  scopeOfWork: [
    {
      id: 'scope_1',
      title: 'Dynamic Whitelabel Container',
      description: 'Establish CSS custom variable context variables for real-time accent color bindings, border radius, and typography modifications directly inside document root classes.',
      status: 'In-scope'
    },
    {
      id: 'scope_2',
      title: '15-Step Progress & Stepper Engine',
      description: 'Construct robust interactive step-by-step navigation workflows featuring smooth sliding animations and validation state indicators.',
      status: 'In-scope'
    },
    {
      id: 'scope_3',
      title: 'Stripe Gateway & Checkout Simulation',
      description: 'Implement transactional checkout frames complete with mock credit card validations and billing address synchronizations.',
      status: 'In-scope'
    },
    {
      id: 'scope_4',
      title: 'Offline Client State Engine',
      description: 'Decouple view layers from external network requirements utilizing local state fallbacks and local storage checkpoints.',
      status: 'In-scope'
    }
  ],

  outOfScope: [
    {
      id: 'out_1',
      title: 'Custom Multi-tenant Domain Hosting',
      description: 'Provision custom domain routing and server-side configurations for sub-tenant whitelabel domains.',
      reason: 'Requires separate server-side architecture and hosting plan.'
    }
  ],

  deliverables: [
    {
      id: 'del_1',
      title: 'Dynamic Whitelabel Codebase',
      description: 'Fully integrated CSS variables and theme selection provider compiled as a React 19 component library.',
      deliveryFormat: 'GitHub Repository & npm package',
      estimatedDelivery: 'Week 2'
    },
    {
      id: 'del_2',
      title: 'Progress Stepper Interface',
      description: 'Smooth, multi-step stepper UI with responsive viewport adaptation and comprehensive accessibility support.',
      deliveryFormat: 'GitHub Repository & Storybook Docs',
      estimatedDelivery: 'Week 3'
    },
    {
      id: 'del_3',
      title: 'Stripe Sandbox Engine',
      description: 'Encrypted checkout layout and token validation hooks connected with the sandbox payment API.',
      deliveryFormat: 'React Hooks & Interactive Sandbox View',
      estimatedDelivery: 'Week 4'
    },
    {
      id: 'del_4',
      title: 'Resilient Local Storage Manager',
      description: 'State preservation utility that checkpoints incomplete multi-step inputs to prevent form data loss.',
      deliveryFormat: 'Modular TypeScript Utility',
      estimatedDelivery: 'Week 5'
    }
  ],

  projectTimeline: [
    {
      id: 'time_1',
      title: 'Sprint 1 Kickoff & Branding Tokenization',
      description: 'Set up design system foundations, design CSS variables, and prepare theme configuration hooks.',
      dueDate: 'July 10, 2026',
      status: 'COMPLETED'
    },
    {
      id: 'time_2',
      title: 'Sprint 2 Progress Engine Implementation',
      description: 'Develop interactive stepper steps, test slide transitions, and implement input field components.',
      dueDate: 'July 17, 2026',
      status: 'CURRENT'
    },
    {
      id: 'time_3',
      title: 'Sprint 3 Checkout Integration',
      description: 'Establish secure sandbox environments, deploy mock gateways, and validate payment state machines.',
      dueDate: 'July 24, 2026',
      status: 'UPCOMING'
    },
    {
      id: 'time_4',
      title: 'Sprint 4 Offline Persistence & Polish',
      description: 'Implement localStorage storage mechanisms, debug blank page exceptions, and optimize build bundles.',
      dueDate: 'July 31, 2026',
      status: 'UPCOMING'
    },
    {
      id: 'time_5',
      title: 'Production Deploy & Sign-off',
      description: 'Launch production onboarding, perform functional walkthrough, and secure end-to-end e-signatures.',
      dueDate: 'August 7, 2026',
      status: 'LOCKED'
    }
  ]
};
