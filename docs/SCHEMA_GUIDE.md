# Proposal Content: JSON Schema Guide

This document explains how to use the machine-readable JSON Schema for generating proposals via n8n or other automation tools.

## The Single Source of Truth
The file `docs/proposal-content-schema.json` defines the exact structure expected by the portal. Any data inserted into the Supabase `proposals.content` column must validate against this schema.

## Key Section Rules

### 1. Root-Level Identifiers
*   `proposalId`: **Required**. Used for tracking and internal references.
*   `status` & `state`: Control the visual stepper and UI badges.
    *   Start new proposals with `status: "SENT"` and `state: "PROPOSAL_REVIEW"`.

### 2. Agency & Client
*   Both objects require names and emails at a minimum.
*   The `agency.logo` field can be either a text-based logo or a URL to an image.

### 3. Project Summary & Goals
*   The `project.goals` array drives the "Strategic Objectives" section. Each goal needs a short `text` title and a detailed `description`.

### 4. Scope & Exclusions
*   `scope`: Items with `status: "In-scope"` appear in the main grid.
*   `exclusions`: These appear in the "Out of Scope" section with an optional `reason`.

### 5. Timeline
*   The `status` of each milestone (`UPCOMING`, `CURRENT`, `COMPLETED`, `LOCKED`) determines the visual icon and color in the roadmap section.

### 6. Pricing & Payments
*   `total` and `deposit` should be numbers.
*   `paymentSchedule` items must map to milestones. Use `status: "PENDING"` for future payments.

### 7. Legal
*   All four primary clauses (`ownership`, `confidentiality`, `liability`, `termination`) are **required**. Ensure n8n inserts the correct legal boilerplate for each proposal.

## Validating payload with n8n
We recommend using a **Code Node** in n8n with an AJV (Another JSON Schema Validator) integration or similar to validate the generated JSON before performing the Supabase insert. This prevents "broken" proposals from reaching clients.
