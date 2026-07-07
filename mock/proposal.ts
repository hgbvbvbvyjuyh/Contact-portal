/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Proposal, 
  ProposalStatus, 
  ProposalState, 
  InvoiceStatus, 
  SignatureStatus, 
  PaymentStatus, 
  TimelineStatus 
} from '../types';

export const MOCK_PROPOSAL: Proposal = {
  proposalId: 'prop_001_onboarding_2026',
  id: 'prop_001', // Backward compatibility alias
  version: '1.0.4',
  createdAt: '2026-07-03T18:00:00Z',
  updatedAt: '2026-07-03T18:25:25Z',
  status: ProposalStatus.SENT,
  state: ProposalState.PROPOSAL_REVIEW,
  date: 'July 3, 2026', // Backward compatibility alias

  agency: {
    agencyName: 'Apex Digital Product Agency',
    logo: 'Apex Digital',
    website: 'https://agency.design',
    email: 'lead-architecture@agency.design',
    phone: '+1 (555) 234-5678',
    address: '100 Design District Way, Suite 400, San Francisco, CA 94107',
  },

  client: {
    id: 'client_001', // Backward compatibility alias
    clientName: 'Nafirofiqul',
    name: 'Nafirofiqul', // Backward compatibility alias
    company: 'Nafirofiqul LLC',
    email: 'Nafirofiqul@gmail.com',
    phone: '+1 (555) 876-5432',
    address: '789 Enterprise Blvd, Suite 120, Wilmington, DE 19801',
  },

  project: {
    projectName: 'Digital Onboarding Pipeline',
    summary: 'Apex Digital Product Agency has designed a comprehensive strategy to deliver Nafirofiqul LLC’s digital onboarding pipeline. This framework enables seamless integration of brand identity, high-performance web components, and dynamic user transitions, resulting in an elite Client Portal experience.',
    goals: [
      {
        text: 'Dynamic Whitelabeling',
        description: 'Synchronize themes instantly on client action. Bind accent palettes and border radius custom styles directly on the global document root.',
      },
      {
        text: 'Framer Motion Enhancements',
        description: 'Incorporate delicate, fluid layout movements. Slide, fade, and zoom page increments to maximize structural elegance and user focus.',
      },
      {
        text: 'Decoupled Client Persistence',
        description: 'Formulate safe offline fallback defaults to ensure the UI operates perfectly across any client state without dependency crashes.',
      },
    ],
    overview: 'An elite, high-performance web app optimized across responsive desktop, tablet, and mobile screens. It reduces contract execution cycles from multiple days to under ten minutes via integrated digital signatures.',
    estimatedDuration: '5 Weeks',
    estimatedReadingTime: '8 min read',
  },

  projectName: 'Digital Onboarding Pipeline', // Backward compatibility alias

  scope: [
    {
      id: 'scope_1',
      title: 'Dynamic Whitelabel Container',
      description: 'Establish CSS custom variable context variables for real-time accent color bindings, border radius, and typography modifications directly inside document root classes.',
      status: 'In-scope',
    },
    {
      id: 'scope_2',
      title: '15-Step Progress & Stepper Engine',
      description: 'Construct robust interactive step-by-step navigation workflows featuring smooth sliding animations and validation state indicators.',
      status: 'In-scope',
    },
    {
      id: 'scope_3',
      title: 'Stripe Gateway & Checkout Simulation',
      description: 'Implement transactional checkout frames complete with mock credit card validations and billing address synchronizations.',
      status: 'In-scope',
    },
    {
      id: 'scope_4',
      title: 'Offline Client State Engine',
      description: 'Decouple view layers from external network requirements utilizing local state fallbacks and local storage checkpoints.',
      status: 'In-scope',
    },
    {
      id: 'scope_5',
      title: 'Custom Multi-tenant Domain Hosting',
      description: 'Provision custom domain routing and server-side configurations for sub-tenant whitelabel domains.',
      status: 'Out-of-scope',
    },
  ],

  exclusions: [
    {
      id: 'excl_1',
      title: 'Active Payment Gateway & Bank Account Verification',
      description: 'Production-level binding to live bank accounts, active merchant accounts, or production Stripe client credentials.',
      reason: 'Live gateway deployment requires legal KYC documentation and direct banking authority that must be handled privately by the client.',
    },
    {
      id: 'excl_2',
      title: 'Custom Multi-Tenant Domain Reverse Proxy Setup',
      description: 'Configuring custom NGINX, Cloudflare, or other edge routing mechanics for sub-tenant whitelabel domains.',
      reason: 'This requires proprietary hosting infrastructure permissions and active DNS nameserver control outside of the frontend delivery scope.',
    },
    {
      id: 'excl_3',
      title: 'Legacy Data Migrations',
      description: 'Surgical extraction or batch migrations of old client records from legacy databases, spreadsheets, or third-party CRM records.',
      reason: 'Data migrations require custom script engineering and schema mapping, which is handled under a separate data services agreement.',
    }
  ],

  deliverables: [
    {
      id: 'del_1',
      title: 'Responsive Client Web App',
      description: 'Fully compiled production-ready React codebase with responsive styling wrappers.',
      deliveryFormat: 'GitHub Repository / Production Build',
      estimatedDelivery: 'Week 3',
    },
    {
      id: 'del_2',
      title: 'Interactive Design Sandbox',
      description: 'Figma prototype links and live interactive styling component playground.',
      deliveryFormat: 'Figma File & Web URL',
      estimatedDelivery: 'Week 1',
    },
    {
      id: 'del_3',
      title: 'Payment Gateway Integrations',
      description: 'Stripe API handler templates and e-sign signature execution models.',
      deliveryFormat: 'API Route Endpoints & Handlers',
      estimatedDelivery: 'Week 4',
    },
  ],

  timeline: [
    {
      id: 'm1',
      title: 'Sprint 1: Architecture Blueprint & Branding Tokens',
      description: 'Configure layout tokens, setup variables, design baseline foundation modules.',
      dueDate: 'July 17, 2026',
      estimatedDate: 'Weeks 1-2', // Backward compatibility alias
      status: TimelineStatus.COMPLETED,
    },
    {
      id: 'm2',
      title: 'Sprint 2: Premium Proposal & Journey Engine',
      description: 'Deliver responsive navigation elements, visual playground sandbox, and e-signatures.',
      dueDate: 'July 24, 2026',
      estimatedDate: 'Week 3', // Backward compatibility alias
      status: TimelineStatus.CURRENT,
    },
    {
      id: 'm3',
      title: 'Sprint 3: Payment Gateways & Portal Hardening',
      description: 'Stripe transaction API sandbox and release verification review cycles.',
      dueDate: 'August 7, 2026',
      estimatedDate: 'Weeks 4-5', // Backward compatibility alias
      status: TimelineStatus.UPCOMING,
    },
  ],

  collaboration: {
    agencyResponsibilities: [
      'Deliver pristine, high-fidelity responsive UI components according to specification.',
      'Maintain an active staging environment for milestone review and feedback collection.',
      'Provide rapid bug resolution cycles during SOW verification stages.',
      'Document all APIs, environmental hooks, and deployment configurations clearly.',
    ],
    clientResponsibilities: [
      'Provide timely constructive feedback on active sprint reviews within 48 business hours.',
      'Deliver final corporate assets, logo marks, and copywriting files by the end of Sprint 1.',
      'Authorize milestone payments and sign off on completed phase deliverables.',
    ],
  },

  revisions: {
    includedRevisions: 3,
    additionalRevisionPricing: '$150/hour flat-rate consulting fee',
    responseTime: 'Within 24 business hours',
  },

  pricing: {
    currency: 'USD',
    total: 7000.0,
    deposit: 3500.0,
    remainingBalance: 3500.0,
    taxes: 0.0,
    discounts: 0.0,
    paymentSchedule: [
      {
        id: 'ps_1',
        milestoneName: 'Initial Kickoff Deposit (50%)',
        amount: 3500.0,
        dueDate: 'July 5, 2026',
        status: PaymentStatus.PAID,
      },
      {
        id: 'ps_2',
        milestoneName: 'Milestone 2 Approval (E-Sign Completed)',
        amount: 1750.0,
        dueDate: 'July 24, 2026',
        status: PaymentStatus.PENDING,
      },
      {
        id: 'ps_3',
        milestoneName: 'Final Project Handoff Approval',
        amount: 1750.0,
        dueDate: 'August 7, 2026',
        status: PaymentStatus.PENDING,
      },
    ],
  },

  legal: {
    ownership: 'Upon full receipt of the overall project investment, the agency releases and assigns all copyright, intellectual property rights, and source code ownership directly to Nafirofiqul LLC.',
    confidentiality: 'Both parties agree to treat all product specifications, client identities, and internal communication details as strictly confidential indefinitely. This obligation survives contract termination.',
    liability: 'Under no circumstances will either party be liable to the other for indirect, special, punitive, or consequential damages arising out of the deployment of this web app portal.',
    termination: 'Either party may terminate this agreement with 15 days written notice. In the event of termination, the client will compensate the agency proportionally for all completed deliverables and milestone items up to the termination timestamp.',
    governingLaw: 'This agreement shall be governed and construed in accordance with the laws of the State of Delaware, without regard to conflict of law principles.',
    forceMajeure: 'Neither party shall be liable for any delay or failure in performance due to causes beyond their reasonable control, including acts of God, war, natural disasters, or network outages.',
    disputeResolution: 'Any disputes arising out of this contract shall first be attempted to be resolved via good-faith mediation. Unresolved disputes shall be submitted to binding arbitration in Wilmington, DE.',
  },

  signature: {
    signerName: 'Nafirofiqul',
    email: 'Nafirofiqul@gmail.com',
    signedDate: null,
    signatureStatus: SignatureStatus.UNSIGNED,
  },

  invoice: {
    invoiceNumber: 'INV-2026-0049',
    status: InvoiceStatus.UNPAID,
    items: [
      {
        id: 'item_1',
        title: 'Dynamic Web Portal Core & Whitelabel Container',
        description: 'Responsive desktop/mobile viewport grid and brand context bindings.',
        price: 3500.0,
      },
      {
        id: 'item_2',
        title: '15-Step Stepper Navigation UI Integration',
        description: 'Visual journey step indicator components and custom transition animations.',
        price: 2200.0,
      },
      {
        id: 'item_3',
        title: 'Checkout & E-Sign Simulation Systems',
        description: 'Safe mock authentication, contract signature capture, and Stripe payment console.',
        price: 1300.0,
      },
    ],
    subtotal: 7000.0, // Backward compatibility alias
    tax: 0.0, // Backward compatibility alias
    discount: 0.0, // Backward compatibility alias
    taxes: 0.0,
    discounts: 0.0,
    total: 7000.0,
    dueDate: 'July 24, 2026',
  },

  payment: {
    status: PaymentStatus.PENDING,
    gateway: 'Stripe Sandbox Integration',
    paymentUrl: 'https://checkout.stripe.com/pay/prop_001_sandbox_onboarding',
    paidAmount: 3500.0,
    remainingAmount: 3500.0,
    cardInvoiceUrl: 'https://payoneer.com/checkout/invoice/prop_001_onboarding',
    crypto: {
      enabled: true,
      wallets: [
        { currency: 'USDT', network: 'TRC20', address: 'TY37XN49m9R1B2B7bLV1007496361124S' },
        { currency: 'USDT', network: 'ERC20', address: '0x45ny45eu3zhz3ldnbr7blv1007496361124' },
        { currency: 'USDC', network: 'ERC20', address: '0x7bLV100749636112445ny45eu3zhz3ldnbr' },
        { currency: 'BTC', network: 'Bitcoin', address: 'bc1q45ny45eu3zhz3ldnbr7blv1007496361124' },
        { currency: 'ETH', network: 'ERC20', address: '0x100749636112445ny45eu3zhz3ldnbr7blv' }
      ],
      reference: 'PROP-001-Nafirofiqul'
    },
    bank: {
      accountName: 'APEX DIGITAL PRODUCT AGENCY LLC',
      companyName: 'Apex Digital Product Agency',
      bankName: 'CHASE BANK N.A.',
      accountNumber: '9876543210',
      iban: 'US12CHAS30009876543210',
      swift: 'CHASUS33XXX',
      bankAddress: '270 Park Ave, New York, NY 10017, United States',
      reference: 'PROP-001-Nafirofiqul'
    },
    methods: [
      {
        id: "card",
        enabled: true,
        title: "Pay with Card",
        provider: "Payoneer",
        recommended: true,
        invoiceUrl: "https://payoneer.com/checkout/invoice/prop_001_onboarding",
        description: "Securely pay your invoice online using Visa, Mastercard, American Express, or other supported cards through your personalized Payoneer Invoice."
      },
      {
        id: "crypto",
        enabled: true,
        title: "Pay with Cryptocurrency",
        provider: "Crypto",
        recommended: false,
        description: "Pay using your preferred cryptocurrency through our secure wallet addresses. Please include your Proposal Reference ID with your payment.",
        wallets: {
          usdt_trc20: "TY37XN49m9R1B2B7bLV1007496361124S",
          usdt_erc20: "0x45ny45eu3zhz3ldnbr7blv1007496361124",
          usdc: "0x7bLV100749636112445ny45eu3zhz3ldnbr",
          btc: "bc1q45ny45eu3zhz3ldnbr7blv1007496361124",
          eth: "0x100749636112445ny45eu3zhz3ldnbr7blv"
        },
        cryptoWalletsList: [
          { currency: 'USDT', network: 'TRC20', address: 'TY37XN49m9R1B2B7bLV1007496361124S' },
          { currency: 'USDT', network: 'ERC20', address: '0x45ny45eu3zhz3ldnbr7blv1007496361124' },
          { currency: 'USDC', network: 'ERC20', address: '0x7bLV100749636112445ny45eu3zhz3ldnbr' },
          { currency: 'BTC', network: 'Bitcoin', address: 'bc1q45ny45eu3zhz3ldnbr7blv1007496361124' },
          { currency: 'ETH', network: 'ERC20', address: '0x100749636112445ny45eu3zhz3ldnbr7blv' }
        ],
        reference: "PROP-001-Nafirofiqul"
      },
      {
        id: "swift",
        enabled: true,
        title: "International Bank Transfer",
        provider: "SWIFT",
        recommended: false,
        description: "Transfer funds directly from your bank using the international SWIFT network.",
        bank: {
          accountName: 'APEX DIGITAL PRODUCT AGENCY LLC',
          companyName: 'Apex Digital Product Agency',
          bankName: 'CHASE BANK N.A.',
          accountNumber: '9876543210',
          iban: 'US12CHAS30009876543210',
          swift: 'CHASUS33XXX',
          bankAddress: '270 Park Ave, New York, NY 10017, United States',
          reference: 'PROP-001-Nafirofiqul'
        },
        reference: "PROP-001-Nafirofiqul"
      }
    ]
  },

  commercial: {
    invoice: {
      invoiceNumber: 'INV-2026-0049',
      status: InvoiceStatus.UNPAID,
      items: [
        {
          id: 'item_1',
          title: 'Dynamic Web Portal Core & Whitelabel Container',
          description: 'Responsive desktop/mobile viewport grid and brand context bindings.',
          price: 3500.0,
        },
        {
          id: 'item_2',
          title: '15-Step Stepper Navigation UI Integration',
          description: 'Visual journey step indicator components and custom transition animations.',
          price: 2200.0,
        },
        {
          id: 'item_3',
          title: 'Checkout & E-Sign Simulation Systems',
          description: 'Safe mock authentication, contract signature capture, and Stripe payment console.',
          price: 1300.0,
        },
      ],
      subtotal: 7000.0,
      tax: 0.0,
      discount: 0.0,
      taxes: 0.0,
      discounts: 0.0,
      total: 7000.0,
      dueDate: 'July 24, 2026',
    },
    payment: {
      status: PaymentStatus.PENDING,
      gateway: 'Stripe Sandbox Integration',
      paymentUrl: 'https://checkout.stripe.com/pay/prop_001_sandbox_onboarding',
      paidAmount: 3500.0,
      remainingAmount: 3500.0,
      cardInvoiceUrl: 'https://payoneer.com/checkout/invoice/prop_001_onboarding',
      crypto: {
        enabled: true,
        wallets: [
          { currency: 'USDT', network: 'TRC20', address: 'TY37XN49m9R1B2B7bLV1007496361124S' },
          { currency: 'USDT', network: 'ERC20', address: '0x45ny45eu3zhz3ldnbr7blv1007496361124' },
          { currency: 'USDC', network: 'ERC20', address: '0x7bLV100749636112445ny45eu3zhz3ldnbr' },
          { currency: 'BTC', network: 'Bitcoin', address: 'bc1q45ny45eu3zhz3ldnbr7blv1007496361124' },
          { currency: 'ETH', network: 'ERC20', address: '0x100749636112445ny45eu3zhz3ldnbr7blv' }
        ],
        reference: 'PROP-001-Nafirofiqul'
      },
      bank: {
        accountName: 'APEX DIGITAL PRODUCT AGENCY LLC',
        companyName: 'Apex Digital Product Agency',
        bankName: 'CHASE BANK N.A.',
        accountNumber: '9876543210',
        iban: 'US12CHAS30009876543210',
        swift: 'CHASUS33XXX',
        bankAddress: '270 Park Ave, New York, NY 10017, United States',
        reference: 'PROP-001-Nafirofiqul'
      },
      methods: [
        {
          id: "card",
          enabled: true,
          title: "Pay with Card",
          provider: "Payoneer",
          recommended: true,
          invoiceUrl: "https://payoneer.com/checkout/invoice/prop_001_onboarding",
          description: "Securely pay your invoice online using Visa, Mastercard, American Express, or other supported cards through your personalized Payoneer Invoice."
        },
        {
          id: "crypto",
          enabled: true,
          title: "Pay with Cryptocurrency",
          provider: "Crypto",
          recommended: false,
          description: "Pay using your preferred cryptocurrency through our secure wallet addresses. Please include your Proposal Reference ID with your payment.",
          wallets: {
            usdt_trc20: "TY37XN49m9R1B2B7bLV1007496361124S",
            usdt_erc20: "0x45ny45eu3zhz3ldnbr7blv1007496361124",
            usdc: "0x7bLV100749636112445ny45eu3zhz3ldnbr",
            btc: "bc1q45ny45eu3zhz3ldnbr7blv1007496361124",
            eth: "0x100749636112445ny45eu3zhz3ldnbr7blv"
          },
          cryptoWalletsList: [
            { currency: 'USDT', network: 'TRC20', address: 'TY37XN49m9R1B2B7bLV1007496361124S' },
            { currency: 'USDT', network: 'ERC20', address: '0x45ny45eu3zhz3ldnbr7blv1007496361124' },
            { currency: 'USDC', network: 'ERC20', address: '0x7bLV100749636112445ny45eu3zhz3ldnbr' },
            { currency: 'BTC', network: 'Bitcoin', address: 'bc1q45ny45eu3zhz3ldnbr7blv1007496361124' },
            { currency: 'ETH', network: 'ERC20', address: '0x100749636112445ny45eu3zhz3ldnbr7blv' }
          ],
          reference: "PROP-001-Nafirofiqul"
        },
        {
          id: "swift",
          enabled: true,
          title: "International Bank Transfer",
          provider: "SWIFT",
          recommended: false,
          description: "Transfer funds directly from your bank using the international SWIFT network.",
          bank: {
            accountName: 'APEX DIGITAL PRODUCT AGENCY LLC',
            companyName: 'Apex Digital Product Agency',
            bankName: 'CHASE BANK N.A.',
            accountNumber: '9876543210',
            iban: 'US12CHAS30009876543210',
            swift: 'CHASUS33XXX',
            bankAddress: '270 Park Ave, New York, NY 10017, United States',
            reference: 'PROP-001-Nafirofiqul'
          },
          reference: "PROP-001-Nafirofiqul"
        }
      ]
    }
  },

  success: {
    confirmationMessage: 'Congratulations! Your agreement is officially executed. We have successfully locked your project slot and are ready to commence the active sprint handoffs.',
    nextSteps: [
      'Access your fully compiled GitHub repository link via the secure developer handoff tab.',
      'Schedule our Sprint 1 review call using our integrated calendar booking tool.',
      'Review your active project Slack channel workspace for real-time collaboration with the design and engineering team.',
    ],
    contactDetails: {
      name: 'Apex Digital Product Team',
      email: 'onboarding@agency.design',
      phone: '+1 (555) 234-5678',
    },
  },
};
