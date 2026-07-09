/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '@/components/ThemeProvider';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Toast } from '@/components/Feedback';
import { H3, H4 } from '@/components/Typography';
import { SimulationStatus } from './PaymentStatusBadge';
import { 
  CreditCard, 
  ArrowRight, 
  Check, 
  Copy, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle, 
  Info,
  Building2,
  Coins
} from 'lucide-react';

interface PaymentMethodCardProps {
  methodId: 'card' | 'crypto' | 'swift';
  paymentLoading: boolean;
  onPay: () => void;
  onStatusChange: (status: SimulationStatus) => void;
}

export function PaymentMethodCard({
  methodId,
  paymentLoading,
  onPay,
  onStatusChange
}: PaymentMethodCardProps) {
  const { proposal } = useTheme();

  if (!proposal) return null;

  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; description: string; variant?: 'success' | 'info' | 'error' } | null>(null);

  // Copy helper
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(val);
  };

  const depositDue = 3500.00;

  // Render Card content based on methodId
  if (methodId === 'card') {
    return (
      <Card 
        id="payment-method-card"
        className="p-6 md:p-8 border-2 border-brand-blue/30 hover:border-brand-blue bg-card shadow-medium rounded-card relative overflow-hidden transition-all duration-300"
      >
        {/* Recommended Badge */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-8">
          <span className="inline-flex items-center gap-1 text-[9px] font-bold text-brand-blue bg-brand-blue/10 border border-brand-blue/20 px-2.5 py-1 rounded-full tracking-wider uppercase font-mono">
            Recommended
          </span>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-button bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/15 shrink-0">
              <CreditCard className="h-6 w-6" />
            </div>
            <div className="space-y-1 pr-16">
              <H3 className="text-base font-bold text-foreground leading-snug">
                Pay by Card
              </H3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
                Securely pay using your Visa, Mastercard, American Express, or other major credit or debit card.
              </p>
            </div>
          </div>

          {/* Card Features List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              'Secure encrypted payment layer',
              'Major credit & debit cards accepted',
              'No account creation required',
              'Instant digital receipt & activation'
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs text-muted-foreground">
                <div className="h-4.5 w-4.5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-500/15">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Action */}
          <div className="pt-2 flex justify-end">
            <Button
              id="btn-pay-card"
              onClick={() => {
                onStatusChange('Paid');
                onPay();
              }}
              disabled={paymentLoading}
              className="w-full sm:w-auto h-11 px-7 font-semibold flex items-center justify-center gap-2 cursor-pointer text-white bg-brand-blue hover:bg-brand-blue/90 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {paymentLoading ? (
                <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Continue to Secure Payment
                  <ArrowRight className="h-4.5 w-4.5" />
                </>
              )}
            </Button>
          </div>
        </div>
        {toast && (
          <Toast
            message={toast.message}
            description={toast.description}
            variant={toast.variant}
            onClose={() => setToast(null)}
          />
        )}
      </Card>
    );
  }

  if (methodId === 'crypto') {
    const cryptoAddress = '0x2F6BFF37XN49m9R1B2B7bLV1007496361124S';
    const cryptoRef = 'REF-FOUNDING-PARTNER';
    return (
      <Card 
        id="payment-method-crypto"
        className="p-6 md:p-8 border border-border/50 hover:border-brand-blue/25 bg-card rounded-card shadow-low transition-all duration-300 relative overflow-hidden"
      >
        <div className="space-y-5">
          <div className="flex items-start gap-4">
            <div className="h-11 w-11 rounded-button bg-brand-blue/5 text-brand-blue flex items-center justify-center border border-brand-blue/10 shrink-0">
              <Coins className="h-5.5 w-5.5" />
            </div>
            <div className="space-y-1 flex-1">
              <H3 className="text-base font-bold text-foreground">
                Cryptocurrency
              </H3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
                Pay using supported cryptocurrencies if you prefer digital assets.
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-border/10">
            <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">Stablecoins Accepted (USDT / USDC)</span>
            <Button
              id="btn-toggle-crypto"
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-9 px-4 text-xs font-semibold flex items-center gap-1.5 cursor-pointer hover:bg-muted/30 border-border"
            >
              {isExpanded ? 'Hide Crypto Details' : 'View Crypto Payment Details'}
              {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </Button>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-dashed border-border/10 space-y-4 text-xs sm:text-sm">
                  {/* Warning Notice */}
                  <div className="flex items-start gap-2.5 p-3.5 bg-amber-500/5 border border-amber-500/10 rounded-button text-amber-600 font-sans">
                    <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
                    <p className="text-xs leading-relaxed">
                      <strong>Transfer Notice:</strong> Only send stablecoins (USDT or USDC) on the Ethereum (ERC-20) or Tron (TRC-20) network. Transfers on unsupported chains cannot be recovered.
                    </p>
                  </div>

                  {/* Payment Details Form */}
                  <div className="space-y-3.5">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold text-muted-foreground uppercase font-mono tracking-wider">
                        Wallet Address (USDT/USDC ERC-20)
                      </label>
                      <div className="flex h-10 bg-muted/20 rounded-input border border-border/30 overflow-hidden items-center justify-between pr-1">
                        <input
                          type="text"
                          readOnly
                          value={cryptoAddress}
                          className="flex-1 bg-transparent border-none outline-none px-3 font-mono text-xs text-foreground select-all"
                        />
                        <button
                          type="button"
                          onClick={() => handleCopy(cryptoAddress, 'crypto')}
                          className="h-8 w-8 rounded-button hover:bg-muted/50 flex items-center justify-center transition-colors cursor-pointer text-muted-foreground hover:text-foreground"
                          title="Copy Address"
                        >
                          {copiedKey === 'crypto' ? (
                            <Check className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2.5} />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold text-muted-foreground uppercase font-mono tracking-wider">
                        Reference Memo
                      </label>
                      <div className="flex h-10 bg-muted/20 rounded-input border border-border/30 overflow-hidden items-center justify-between pr-1">
                        <input
                          type="text"
                          readOnly
                          value={cryptoRef}
                          className="flex-1 bg-transparent border-none outline-none px-3 font-mono text-xs text-foreground select-all"
                        />
                        <button
                          type="button"
                          onClick={() => handleCopy(cryptoRef, 'crypto-ref')}
                          className="h-8 w-8 rounded-button hover:bg-muted/50 flex items-center justify-center transition-colors cursor-pointer text-muted-foreground hover:text-foreground"
                          title="Copy Reference"
                        >
                          {copiedKey === 'crypto-ref' ? (
                            <Check className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2.5} />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-brand-blue/3 border border-brand-blue/10 rounded-button space-y-2 text-xs font-sans leading-relaxed text-muted-foreground">
                    <div className="flex items-center gap-1.5 font-bold text-foreground">
                      <Info className="h-4 w-4 text-brand-blue" />
                      <span>How to complete your crypto transaction:</span>
                    </div>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Send equivalent value of <strong>{formatCurrency(depositDue)}</strong>.</li>
                      <li>Include the reference memo <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono">{cryptoRef}</code> where possible.</li>
                      <li>Once the transaction is confirmed, click "Confirm / Notify Sent" to update our team.</li>
                    </ul>
                  </div>

                  <div className="flex justify-end pt-1">
                    <Button
                      onClick={() => {
                        onStatusChange('Awaiting Confirmation');
                        setToast({
                          message: 'Crypto Notification Logged',
                          description: 'Your cryptocurrency payment notification has been recorded. Awaiting block confirmation.',
                          variant: 'info'
                        });
                      }}
                      className="h-9 text-xs font-semibold px-4 cursor-pointer text-white bg-foreground hover:bg-foreground/90 transition-all duration-200"
                    >
                      Confirm / Notify Sent
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {toast && (
          <Toast
            message={toast.message}
            description={toast.description}
            variant={toast.variant}
            onClose={() => setToast(null)}
          />
        )}
      </Card>
    );
  }

  if (methodId === 'swift') {
    const bankDetails = {
      bankName: 'CHASE BANK N.A.',
      accountName: proposal?.agreementInformation?.agencyName || 'AGENCY PARTNER PORTAL LLC',
      swift: 'CHASUS33XXX',
      iban: 'US89CHAS3000297496361124S',
      reference: 'REF-FOUNDING-PARTNER'
    };

    return (
      <Card 
        id="payment-method-swift"
        className="p-6 md:p-8 border border-border/50 hover:border-brand-blue/25 bg-card rounded-card shadow-low transition-all duration-300 relative overflow-hidden"
      >
        <div className="space-y-5">
          <div className="flex items-start gap-4">
            <div className="h-11 w-11 rounded-button bg-brand-blue/5 text-brand-blue flex items-center justify-center border border-brand-blue/10 shrink-0">
              <Building2 className="h-5.5 w-5.5" />
            </div>
            <div className="space-y-1 flex-1">
              <H3 className="text-base font-bold text-foreground">
                International Bank Transfer
              </H3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
                Transfer funds directly from your bank using an international wire transfer (SWIFT).
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-border/10">
            <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">Direct SWIFT Bank Wire</span>
            <Button
              id="btn-toggle-swift"
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-9 px-4 text-xs font-semibold flex items-center gap-1.5 cursor-pointer hover:bg-muted/30 border-border"
            >
              {isExpanded ? 'Hide Bank Details' : 'View Bank Transfer Details'}
              {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </Button>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-dashed border-border/10 space-y-4 text-xs">
                  
                  {/* Bank detail fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase font-mono tracking-wider">Bank Name</span>
                      <div className="flex h-9.5 bg-muted/20 rounded-input border border-border/30 items-center justify-between pr-1">
                        <input type="text" readOnly value={bankDetails.bankName} className="flex-1 bg-transparent border-none outline-none px-3 font-mono text-xs text-foreground select-all" />
                        <button type="button" onClick={() => handleCopy(bankDetails.bankName, 'bankName')} className="h-7.5 w-7.5 rounded-button hover:bg-muted/50 flex items-center justify-center cursor-pointer text-muted-foreground hover:text-foreground">
                          {copiedKey === 'bankName' ? <Check className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2.5} /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase font-mono tracking-wider">Account Name</span>
                      <div className="flex h-9.5 bg-muted/20 rounded-input border border-border/30 items-center justify-between pr-1">
                        <input type="text" readOnly value={bankDetails.accountName} className="flex-1 bg-transparent border-none outline-none px-3 font-mono text-xs text-foreground select-all" />
                        <button type="button" onClick={() => handleCopy(bankDetails.accountName, 'accountName')} className="h-7.5 w-7.5 rounded-button hover:bg-muted/50 flex items-center justify-center cursor-pointer text-muted-foreground hover:text-foreground">
                          {copiedKey === 'accountName' ? <Check className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2.5} /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase font-mono tracking-wider">SWIFT Code</span>
                      <div className="flex h-9.5 bg-muted/20 rounded-input border border-border/30 items-center justify-between pr-1">
                        <input type="text" readOnly value={bankDetails.swift} className="flex-1 bg-transparent border-none outline-none px-3 font-mono text-xs text-foreground select-all" />
                        <button type="button" onClick={() => handleCopy(bankDetails.swift, 'swift')} className="h-7.5 w-7.5 rounded-button hover:bg-muted/50 flex items-center justify-center cursor-pointer text-muted-foreground hover:text-foreground">
                          {copiedKey === 'swift' ? <Check className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2.5} /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase font-mono tracking-wider">Reference Memo</span>
                      <div className="flex h-9.5 bg-muted/20 rounded-input border border-border/30 items-center justify-between pr-1">
                        <input type="text" readOnly value={bankDetails.reference} className="flex-1 bg-transparent border-none outline-none px-3 font-mono text-xs text-foreground font-bold select-all text-brand-blue" />
                        <button type="button" onClick={() => handleCopy(bankDetails.reference, 'ref')} className="h-7.5 w-7.5 rounded-button hover:bg-muted/50 flex items-center justify-center cursor-pointer text-muted-foreground hover:text-foreground">
                          {copiedKey === 'ref' ? <Check className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2.5} /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase font-mono tracking-wider">IBAN</span>
                      <div className="flex h-9.5 bg-muted/20 rounded-input border border-border/30 items-center justify-between pr-1">
                        <input type="text" readOnly value={bankDetails.iban} className="flex-1 bg-transparent border-none outline-none px-3 font-mono text-xs text-foreground select-all" />
                        <button type="button" onClick={() => handleCopy(bankDetails.iban, 'iban')} className="h-7.5 w-7.5 rounded-button hover:bg-muted/50 flex items-center justify-center cursor-pointer text-muted-foreground hover:text-foreground">
                          {copiedKey === 'iban' ? <Check className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2.5} /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Wire transfer notice instructions */}
                  <div className="p-4 bg-brand-blue/3 border border-brand-blue/10 rounded-button space-y-2 text-xs font-sans leading-relaxed text-muted-foreground">
                    <div className="flex items-center gap-1.5 font-bold text-foreground">
                      <Info className="h-4 w-4 text-brand-blue" />
                      <span>Bank Wire Instructions:</span>
                    </div>
                    <p>
                      Transfer <strong>{formatCurrency(depositDue)}</strong>. Include the Reference Memo <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono">{bankDetails.reference}</code> in your transfer's memo or description field so we can credit your account quickly. SWIFT processing usually completes within 2–3 business days.
                    </p>
                  </div>

                  <div className="flex justify-end pt-1">
                    <Button
                      onClick={() => {
                        onStatusChange('Awaiting Transfer');
                        setToast({
                          message: 'Bank Transfer Registered',
                          description: 'Your bank wire notice has been logged. The portal is awaiting SWIFT wire clearance.',
                          variant: 'info'
                        });
                      }}
                      className="h-9 text-xs font-semibold px-4 cursor-pointer text-white bg-foreground hover:bg-foreground/90 transition-all duration-200"
                    >
                      Confirm / Notify Wire Initiated
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {toast && (
          <Toast
            message={toast.message}
            description={toast.description}
            variant={toast.variant}
            onClose={() => setToast(null)}
          />
        )}
      </Card>
    );
  }

  return null;
}
