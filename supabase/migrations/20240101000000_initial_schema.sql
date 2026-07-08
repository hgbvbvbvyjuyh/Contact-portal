-- Supabase Production Schema: Client Proposal Portal
-- Generated for: Production SaaS Onboarding
-- Version: 1.0.0

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Agencies Table
-- Stores service provider branding and contact information
CREATE TABLE public.agencies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    logo_text TEXT,
    logo_url TEXT,
    website TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    brand_config JSONB DEFAULT '{}'::jsonb -- Stores colors, radius, etc.
);

-- 2. Clients Table
-- Stores customer profiles for CRM and legal execution
CREATE TABLE public.clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    company_name TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    address TEXT,
    metadata JSONB DEFAULT '{}'::jsonb -- Future-proof for n8n/external CRM data
);

-- 3. Proposals Table
-- Central entity storing agreement state and content
CREATE TABLE public.proposals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

    -- Foreign Keys
    agency_id UUID NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,

    -- Metadata
    project_name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'SENT', -- DRAFT, SENT, VIEWED, SIGNED, PAID, COMPLETED
    current_state TEXT NOT NULL DEFAULT 'PROPOSAL_REVIEW', -- PROPOSAL_REVIEW, READY_TO_SIGN, etc.
    version TEXT DEFAULT '1.0.0',

    -- Financials (Promoted for reporting/dashboarding)
    total_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    deposit_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    currency TEXT DEFAULT 'USD',

    -- Structured Content (JSONB)
    -- This stores section-specific data: project_summary, goals, scope, deliverables, timeline,
    -- collaboration, legal_terms, success_config
    content JSONB NOT NULL DEFAULT '{}'::jsonb,

    -- Integration Hooks
    documenso_document_id TEXT, -- E-signature ID
    stripe_payment_intent_id TEXT, -- Financial tracking
    n8n_metadata JSONB DEFAULT '{}'::jsonb, -- Store trigger results/logs

    -- Search/Friendly IDs
    friendly_id TEXT UNIQUE -- e.g. "PROP-001" (Optional)
);

-- 4. Audit Logs (Recommended for Production)
-- Tracks changes to proposals for transparency
CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    proposal_id UUID REFERENCES public.proposals(id) ON DELETE SET NULL,
    action TEXT NOT NULL, -- e.g., 'STATUS_CHANGE', 'SIGNATURE_RECEIVED'
    actor TEXT, -- n8n, system, or user_id
    payload JSONB
);

-- Indexes
CREATE INDEX idx_proposals_client_id ON public.proposals(client_id);
CREATE INDEX idx_proposals_agency_id ON public.proposals(agency_id);
CREATE INDEX idx_proposals_status ON public.proposals(status);
CREATE INDEX idx_clients_email ON public.clients(email);

-- Row Level Security (RLS)
ALTER TABLE public.agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;

-- 1. Read-only access for proposals by ID (Public for anonymous users viewing the portal)
CREATE POLICY "Public can view specific proposals by ID"
ON public.proposals FOR SELECT
USING (true);

-- 2. Read-only access for associated Agency (so branding loads in portal)
CREATE POLICY "Public can view agency info"
ON public.agencies FOR SELECT
USING (true);

-- 3. Read-only access for associated Client (so name loads in portal)
CREATE POLICY "Public can view client info"
ON public.clients FOR SELECT
USING (true);

-- 4. Full access for n8n/Admin (via Service Role)
-- Supabase service_role bypasses RLS, but we can explicitly define for clarity
-- or use authenticated roles if we add an internal dashboard.

-- Functions for auto-updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_proposals_updated_at BEFORE UPDATE ON public.proposals FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON public.clients FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_agencies_updated_at BEFORE UPDATE ON public.agencies FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
