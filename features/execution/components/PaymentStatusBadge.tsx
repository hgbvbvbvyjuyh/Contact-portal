/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Clock, 
  CheckCircle, 
  Coins, 
  Building2, 
  Sparkles, 
  AlertCircle, 
  Info 
} from 'lucide-react';

export type SimulationStatus = 
  | 'Pending' 
  | 'Paid' 
  | 'Partially Paid' 
  | 'Awaiting Transfer' 
  | 'Awaiting Confirmation' 
  | 'Cancelled' 
  | 'Expired';

export interface StatusDetail {
  label: string;
  colorClass: string;
  icon: React.ReactNode;
  description: string;
}

export const STATUS_DETAILS: Record<SimulationStatus, StatusDetail> = {
  Pending: {
    label: 'Pending',
    colorClass: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    icon: <Clock className="h-4 w-4" />,
    description: 'Awaiting initial kickoff deposit milestone payment to activate sprint staging slots.'
  },
  Paid: {
    label: 'Paid',
    colorClass: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    icon: <CheckCircle className="h-4 w-4" />,
    description: 'Payment fully processed and verified. Initial project phase slot locked successfully.'
  },
  'Partially Paid': {
    label: 'Partially Paid',
    colorClass: 'bg-blue-500/10 text-brand-blue border-blue-500/20',
    icon: <Coins className="h-4 w-4" />,
    description: 'Initial deposit payment has cleared. Rest of payment scheduled after key milestones.'
  },
  'Awaiting Transfer': {
    label: 'Awaiting Transfer',
    colorClass: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
    icon: <Building2 className="h-4 w-4" />,
    description: 'International wire transfer initiated. Standard SWIFT processing takes 2-4 business days.'
  },
  'Awaiting Confirmation': {
    label: 'Awaiting Confirmation',
    colorClass: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    icon: <Sparkles className="h-4 w-4" />,
    description: 'Cryptocurrency transaction submitted. Waiting for blockchain validators network confirmation.'
  },
  Cancelled: {
    label: 'Cancelled',
    colorClass: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
    icon: <AlertCircle className="h-4 w-4" />,
    description: 'This invoice transaction was cancelled. Please request a fresh payment token link.'
  },
  Expired: {
    label: 'Expired',
    colorClass: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
    icon: <Info className="h-4 w-4" />,
    description: 'Payment window duration expired. Contact our accounts team to renew slot allocations.'
  }
};

interface PaymentStatusBadgeProps {
  status: SimulationStatus;
  className?: string;
}

export function PaymentStatusBadge({ status, className = '' }: PaymentStatusBadgeProps) {
  const config = STATUS_DETAILS[status] || STATUS_DETAILS.Pending;
  
  return (
    <span 
      id={`payment-status-${status.toLowerCase().replace(/\s+/g, '-')}`}
      className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full border transition-colors duration-200 ${config.colorClass} ${className}`}
    >
      {config.icon}
      {config.label}
    </span>
  );
}
