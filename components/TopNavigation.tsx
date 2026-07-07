/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { Container } from '@/components/Container';
import { StatusBadge } from '@/components/StatusBadge';
import { 
  ShieldCheck, 
  HelpCircle,
  Sparkles,
  X,
  Mail,
  FileCheck2,
  Lock,
  MessageSquare
} from 'lucide-react';

interface TopNavigationProps {
  status?: string;
  onHelpClick?: () => void;
}

export function TopNavigation({ status = 'viewed', onHelpClick }: TopNavigationProps) {
  const { brandConfig } = useTheme();
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Close dialog on Escape press
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsHelpOpen(false);
      }
    };
    if (isHelpOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHelpOpen]);

  const toggleHelp = () => {
    if (onHelpClick) {
      onHelpClick();
    } else {
      setIsHelpOpen(!isHelpOpen);
    }
  };

  return (
    <header className="border-b border-border/50 backdrop-blur-md sticky top-0 z-50 bg-background/90 transition-all duration-300 shadow-[0_1px_2px_rgba(21,24,41,0.01),0_2px_8px_rgba(21,24,41,0.02)]">
      <Container className="py-3.5 sm:py-4 flex items-center justify-between">
        {/* Left Section: Branding & Identity */}
        <a 
          href="#"
          onClick={handleLogoClick}
          className="flex items-center space-x-3 group outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
          aria-label="Scroll to top of the proposal page"
        >
          <div className="h-9 w-9 rounded-button bg-primary/5 flex items-center justify-center border border-primary/15 transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/10 group-hover:border-primary/20 shadow-sm">
            {brandConfig.logoUrl ? (
              <img 
                src={brandConfig.logoUrl} 
                alt={`${brandConfig.agencyName || 'Agency'} Logo`}
                className="h-5 w-5 object-contain"
                referrerPolicy="no-referrer"
              />
            ) : (
              <ShieldCheck className="h-5 w-5 text-primary transition-colors group-hover:text-primary/80" />
            )}
          </div>
          <div className="space-y-1">
            <h1 className="text-sm font-semibold tracking-tight text-foreground flex items-center gap-2 leading-none">
              {brandConfig.agencyName === 'Client Proposal & Onboarding Portal' ? 'Project Proposal & Agreement' : (brandConfig.agencyName || 'Project Proposal & Agreement')}
              <span className="hidden lg:inline-flex items-center gap-1 text-[9px] font-bold text-primary bg-primary/5 border border-primary/15 px-2 py-0.5 rounded-badge tracking-wider uppercase">
                <Sparkles className="h-2 w-2" />
                White-Labeled
              </span>
            </h1>
            <p className="text-[10px] text-muted-foreground font-sans leading-normal max-w-sm sm:max-w-md md:max-w-xl">
              Carefully review the project details, sign the agreement, and complete payment to begin.
            </p>
          </div>
        </a>

        {/* Center Section: Reserved Space (Empty) */}
        <div className="hidden md:flex flex-1" />

        {/* Right Section: Actions & Metrics */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          {/* Status Badge */}
          <StatusBadge status={status} />

          {/* Help Button */}
          <button
            onClick={toggleHelp}
            className="h-9 w-9 rounded-button hover:bg-muted border border-border/40 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring shrink-0 cursor-pointer active:scale-95 text-muted-foreground hover:text-foreground"
            aria-label="Get portal assistance"
            title="Help & FAQ"
          >
            <HelpCircle className="h-4.5 w-4.5" />
          </button>
        </div>
      </Container>

      {/* Portal Assistance Drawer/Modal */}
      {isHelpOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsHelpOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="help-dialog-title"
        >
          <div 
            className="relative w-full max-w-lg rounded-card border border-border bg-card p-6 shadow-high space-y-6 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border/40">
              <div className="flex items-center gap-2 text-primary">
                <HelpCircle className="h-5 w-5" />
                <h2 id="help-dialog-title" className="text-base font-bold text-foreground">
                  Portal Support & FAQ
                </h2>
              </div>
              <button 
                onClick={() => setIsHelpOpen(false)}
                className="h-8 w-8 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer transition-all duration-150"
                aria-label="Close help dialog"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Content Q&A */}
            <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <FileCheck2 className="h-3.5 w-3.5 text-brand-blue" />
                  How do I sign the agreement?
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed pl-5 font-sans">
                  Review the proposal sections. Once you reach the <strong className="text-foreground font-medium">Acceptance & E-Signature</strong> step, enter your full name in the signature field to digitally sign.
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-brand-blue" />
                  Is my payment secure?
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed pl-5 font-sans">
                  Yes, absolutely. We support verified bank wires and encrypted wallet transfers with clear transaction reference matching to protect your payment.
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <MessageSquare className="h-3.5 w-3.5 text-brand-blue" />
                  What happens after I submit the deposit?
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed pl-5 font-sans">
                  Our system instantly locks in your kickoff schedule and prepares your project resources. You will receive onboarding materials within 24 hours.
                </p>
              </div>
            </div>

            {/* Direct Contact */}
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary shrink-0" />
              <div className="space-y-0.5">
                <div className="text-[10px] font-bold text-primary font-mono uppercase tracking-wider">Direct Client Desk</div>
                <div className="text-xs text-foreground font-semibold">support@agency.design</div>
                <div className="text-[10px] text-muted-foreground font-sans">Typical response time: Under 2 hours</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
