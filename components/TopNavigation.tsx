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
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface TopNavigationProps {
  status?: string;
  onHelpClick?: () => void;
}

const FAQS = [
  {
    question: "What happens after I sign the proposal?",
    answer: "Once you sign the agreement, we'll begin your onboarding process, confirm any remaining project details, and prepare your implementation. You'll receive updates throughout the project."
  },
  {
    question: "When do I make the payment?",
    answer: "Payment is requested only after you sign the proposal. Your payment schedule is shown inside the Investment & Payment Terms section of this proposal."
  },
  {
    question: "When will the project begin?",
    answer: "Implementation begins after we receive your signed agreement, required business information, and any necessary account access. Our team starts onboarding within 24 hours."
  },
  {
    question: "Will I receive project updates?",
    answer: "Yes. We'll keep you informed throughout the implementation process and provide regular progress updates until your systems are fully operational."
  },
  {
    question: "Can I request changes before signing?",
    answer: "Absolutely. If anything needs clarification or adjustment, let us know before signing. We'll review your request together to ensure the proposal matches your requirements."
  },
  {
    question: "What happens after the systems are launched?",
    answer: "Bilvo AI continues managing, monitoring, optimizing, and supporting your AI systems as part of our ongoing partnership. We don't simply deliver a project—we help you operate and improve it over time."
  },
  {
    question: "Who do I contact if I have a question?",
    answer: "Simply reply to any of our emails or contact the Bilvo AI team. We'll be happy to assist you throughout your partnership."
  }
];

export function TopNavigation({ status = 'viewed', onHelpClick }: TopNavigationProps) {
  const { brandConfig } = useTheme();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

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
                Ready For Review
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
            className="relative w-full max-w-xl rounded-card border border-border bg-card p-6 shadow-high space-y-4 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-border/40">
              <div className="space-y-1">
                <h2 id="help-dialog-title" className="text-base font-bold text-foreground">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs text-muted-foreground leading-normal">
                  Answers to the most common questions about your proposal and partnership with Bilvo AI.
                </p>
              </div>
              <button 
                onClick={() => setIsHelpOpen(false)}
                className="h-8 w-8 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer transition-all duration-150 shrink-0 ml-4"
                aria-label="Close help dialog"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Content Q&A Accordion */}
            <div className="space-y-2 overflow-y-auto pr-1 flex-1 py-1">
              {FAQS.map((faq, index) => {
                const isExpanded = expandedIndex === index;
                return (
                  <div 
                    key={index} 
                    className="border border-border/50 rounded-lg overflow-hidden bg-muted/20 hover:bg-muted/30 transition-all duration-200"
                  >
                    <button
                      onClick={() => setExpandedIndex(isExpanded ? null : index)}
                      className="w-full flex items-center justify-between p-3.5 text-left font-semibold text-xs text-foreground hover:text-primary transition-colors focus:outline-none"
                      aria-expanded={isExpanded}
                    >
                      <span className="pr-4 leading-snug">{faq.question}</span>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="px-3.5 pb-4 pt-1 border-t border-border/30 bg-card animate-in fade-in slide-in-from-top-1 duration-200">
                        <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
