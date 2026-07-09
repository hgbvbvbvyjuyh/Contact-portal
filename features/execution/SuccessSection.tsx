import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '@/components/ThemeProvider';
import { Card } from '@/components/Card';
import { Toast } from '@/components/Feedback';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { Divider, Stack, Grid } from '@/components/Layout';
import { H1, H3, H4, Body } from '@/components/Typography';
import { 
  Check, 
  Sparkles, 
  ArrowRight, 
  Download, 
  Calendar, 
  Mail, 
  Phone, 
  User,
  ExternalLink,
  RefreshCw,
  PartyPopper,
  ShieldCheck,
  CreditCard,
  Clock,
  Activity,
  CheckCircle2
} from 'lucide-react';

interface SuccessSectionProps {
  onReset: () => void;
  signatureName: string;
}

export function SuccessSection({
  onReset,
  signatureName,
}: SuccessSectionProps) {
  const { proposal } = useTheme();

  if (!proposal) return null;

  const successData = proposal?.success;

  const [toast, setToast] = useState<{ message: string; description: string; variant?: 'success' | 'info' | 'error' } | null>(null);

  const triggerToast = (message: string, description: string, variant: 'success' | 'info' = 'success') => {
    setToast({ message, description, variant });
  };

  const getTodayFormatted = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getKickoffDateFormatted = () => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 2);
    return nextWeek.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Modern Timeline Milestones Data
  const onboardingTimeline = [
    {
      title: 'Proposal Completed',
      timeframe: 'Today',
      description: 'Your signed agreement and initial payment are confirmed and recorded.',
      status: 'completed',
    },
    {
      title: 'Project Setup & Coordination',
      timeframe: 'Within 24 Hours',
      description: 'We prepare your project portal, organize files, and set up our internal workspace.',
      status: 'current',
    },
    {
      title: 'Kickoff & Strategy Session',
      timeframe: 'Day 2',
      description: 'We meet to align on details, clarify goals, and finalize your kickoff schedule.',
      status: 'upcoming',
    },
    {
      title: 'Implementation Begins',
      timeframe: 'Day 3+',
      description: 'Our team begins build work and initial system configuration.',
      status: 'upcoming',
    },
    {
      title: 'Regular Progress Reviews',
      timeframe: 'Weekly',
      description: 'You will receive weekly updates to review progress and upcoming tasks.',
      status: 'upcoming',
    },
    {
      title: 'Final Delivery & Handoff',
      timeframe: 'Launch Day',
      description: 'We review everything together, hand over access, and officially launch.',
      status: 'upcoming',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in zoom-in-95 duration-500 font-sans py-4">
      
      {/* Celebration Illustration & Header Block */}
      <Card className="relative overflow-hidden p-8 border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 via-card to-background rounded-card shadow-large">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <PartyPopper className="h-64 w-64 text-emerald-500" />
        </div>

        <div className="flex flex-col items-center text-center space-y-6">
          <div className="relative">
            {/* Ambient visual glowing ring */}
            <div className="absolute inset-0 bg-emerald-500/25 rounded-full blur-xl scale-125 animate-pulse" />
            <div className="relative h-16 w-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-large">
              <Check className="h-9 w-9" strokeWidth={3} />
            </div>
            <div className="absolute -right-1 -bottom-1 h-6 w-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center border-2 border-background animate-bounce shadow-md">
              <Sparkles className="h-3 w-3" />
            </div>
          </div>

          <div className="space-y-2 max-w-2xl">
            <Badge variant="success" size="md" className="uppercase tracking-widest font-mono text-[9px] px-3.5 py-1">
              PARTNERSHIP LAUNCH ACTIVE
            </Badge>
            <H1 className="text-foreground font-black text-2xl md:text-3xl tracking-tight leading-tight">
              Welcome Aboard, {proposal?.agreementInformation?.companyName || proposal?.client?.company || 'Nafirofiqul LLC'}!
            </H1>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-lg mx-auto font-sans">
              Thank you for partnering with us. Your signed agreement and initial payment have been successfully verified, and we are preparing the next steps for our upcoming project kickoff.
            </p>
          </div>
        </div>
      </Card>

      {/* Verification Status Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 border border-border/30 bg-card/40 rounded-card space-y-2 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase font-mono tracking-wider">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            Signed Agreement
          </div>
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-foreground truncate">{signatureName || 'Nafirofiqul'}</div>
            <div className="text-[10px] text-muted-foreground font-mono font-medium">Agreement fully executed</div>
          </div>
        </Card>

        <Card className="p-4 border border-border/30 bg-card/40 rounded-card space-y-2 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase font-mono tracking-wider">
            <CreditCard className="h-4 w-4 text-emerald-500" />
            Initial Deposit Paid
          </div>
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-foreground">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(proposal?.commercial?.invoice?.total || 7000)}
            </div>
            <div className="text-[10px] text-muted-foreground font-mono font-medium">Receipt & Payment Confirmed</div>
          </div>
        </Card>

        <Card className="p-4 border border-border/30 bg-card/40 rounded-card space-y-2 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase font-mono tracking-wider">
            <Clock className="h-4 w-4 text-emerald-500" />
            Project Onboarding
          </div>
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-foreground">Onboarding Active</div>
            <div className="text-[10px] text-muted-foreground font-mono font-medium">Kickoff Scheduled: {getKickoffDateFormatted()}</div>
          </div>
        </Card>
      </div>

      {/* Main Grid Content: Bento Style */}
      <Grid cols={1} mdCols={5} gap={6} className="items-stretch">
        
        {/* Modern Next Steps Timeline */}
        <Card className="p-6 md:p-8 border border-border/40 bg-card md:col-span-3 rounded-card space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Activity className="h-4.5 w-4.5 text-primary" />
              <H3 className="text-sm font-bold text-foreground uppercase tracking-wider font-mono">
                Project Launch Roadmap
              </H3>
            </div>
            <p className="text-xs text-muted-foreground">
              Track our next steps as we transition from agreement signing to your official kickoff.
            </p>
          </div>

          <Divider />

          {/* Timeline Nodes */}
          <div className="relative border-l border-border/60 pl-6 ml-3 space-y-8 py-2">
            {onboardingTimeline.map((step, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline Icon Node */}
                <div className="absolute -left-[35px] top-0 flex items-center justify-center">
                  {step.status === 'completed' ? (
                    <div className="h-6 w-6 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-4 ring-background border border-emerald-600/20">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </div>
                  ) : step.status === 'current' ? (
                    <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center ring-4 ring-background border border-primary/20 animate-pulse">
                      <Clock className="h-3.5 w-3.5" />
                    </div>
                  ) : (
                    <div className="h-6 w-6 rounded-full bg-muted text-muted-foreground/60 flex items-center justify-center ring-4 ring-background border border-border/40 font-mono text-[10px]">
                      {idx + 1}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                      {step.title}
                    </span>
                    <Badge variant={step.status === 'completed' ? 'success' : step.status === 'current' ? 'brand' : 'neutral'} size="sm">
                      {step.timeframe}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-md font-sans">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Agency Contacts & Verification Info Card */}
        <div className="md:col-span-2 space-y-6 flex flex-col justify-between">
          <Card className="p-6 border border-border/40 bg-card/40 rounded-card flex-1 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <H4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider font-mono">
                Your Dedicated Project Team
              </H4>

              <div className="space-y-4 text-xs font-sans text-foreground/90">
                <div className="flex items-center gap-3">
                  <div className="h-8.5 w-8.5 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
                    <User className="h-4.5 w-4.5" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-[9px] text-muted-foreground font-mono">DEDICATED COORDINATOR</div>
                    <div className="font-semibold truncate">{successData?.contactDetails?.name || 'Dedicated Success Lead'}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-8.5 w-8.5 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-[9px] text-muted-foreground font-mono">PARTNERSHIP SUPPORT</div>
                    <div className="font-semibold truncate text-primary">{successData?.contactDetails?.email || 'support@agency.design'}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-8.5 w-8.5 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
                    <Calendar className="h-4.5 w-4.5" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-[9px] text-muted-foreground font-mono">STRATEGY SESSION</div>
                    <a 
                      href="#schedule-kickoff" 
                      onClick={(e) => {
                        e.preventDefault();
                        triggerToast('Strategy Session Scheduled', 'An interactive calendar invite has been sent to your registered email.', 'info');
                      }} 
                      className="font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      Book Kickoff Call
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <Divider />

            {/* Verification Credentials */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-button bg-muted/30 border border-border/15 space-y-1.5">
                <div className="text-[9px] font-bold text-foreground font-mono uppercase tracking-wider">
                  PROJECT CONFIRMATION
                </div>
                <div className="text-[9px] text-muted-foreground font-mono space-y-0.5">
                  <div>SIGNER: {signatureName || 'Nafirofiqul'}</div>
                  <div>STATUS: SIGNED & PAID</div>
                  <div className="truncate">TRANSACTION ID: TXN-SUCCESS</div>
                </div>
              </div>

              {/* Action Buttons for downloading */}
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => triggerToast('Compiling Document', 'Compiling executed Standard Services Agreement into a secure PDF. Download will begin shortly.', 'success')}
                  className="w-full h-10 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download Signed Agreement
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => triggerToast('Compiling Ledger Receipt', 'Generating secure paid invoice receipt and ledger record. Download will begin shortly.', 'success')}
                  className="w-full h-10 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download Paid Invoice
                </Button>
              </div>
            </div>
          </Card>
        </div>

      </Grid>

      {/* Return Option */}
      <div className="flex justify-center pt-4">
        <Button 
          variant="outline" 
          onClick={onReset}
          className="cursor-pointer text-xs font-semibold flex items-center gap-2 h-10 px-5"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Reset & Review Proposal From Cover
        </Button>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          description={toast.description}
          variant={toast.variant}
          onClose={() => setToast(null)}
        />
      )}

    </div>
  );
}
