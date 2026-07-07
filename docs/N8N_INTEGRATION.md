# n8n to Supabase: Proposal Data Contract

This document defines the data structure that n8n workflows must use when inserting or updating proposals in the Supabase `proposals` table.

## Database Mapping

The `proposals` table uses a hybrid schema. n8n should populate top-level columns for metadata and the `content` JSONB column for section-specific data.

### Top-Level Columns
| Column | Type | Description |
| :--- | :--- | :--- |
| `agency_id` | UUID | Foreign key to the `agencies` table. |
| `client_id` | UUID | Foreign key to the `clients` table. |
| `project_name` | TEXT | Display name of the project. |
| `total_amount` | NUMERIC | Total project investment. |
| `deposit_amount` | NUMERIC | Initial deposit due. |
| `content` | JSONB | Nested section data (see below). |

### The `content` JSONB Payload
The `content` object must adhere to the `Proposal` interface defined in the frontend. When the portal loads, it merges this `content` object with the top-level database columns.

```json
{
  "version": "1.0.0",
  "status": "SENT",
  "state": "PROPOSAL_REVIEW",
  "date": "July 3, 2026",
  "agency": {
    "agencyName": "...",
    "logo": "...",
    "website": "...",
    "email": "...",
    "phone": "...",
    "address": "..."
  },
  "client": {
    "company": "...",
    "name": "...",
    "email": "...",
    "phone": "...",
    "address": "..."
  },
  "project": {
    "projectName": "...",
    "summary": "...",
    "goals": [
      { "text": "...", "description": "..." }
    ],
    "overview": "...",
    "estimatedDuration": "...",
    "estimatedReadingTime": "..."
  },
  "scope": [
    { "id": "...", "title": "...", "description": "...", "status": "In-scope" }
  ],
  "exclusions": [
    { "id": "...", "title": "...", "description": "...", "reason": "..." }
  ],
  "deliverables": [
    { "id": "...", "title": "...", "description": "...", "deliveryFormat": "...", "estimatedDelivery": "..." }
  ],
  "timeline": [
    { "id": "...", "title": "...", "description": "...", "dueDate": "...", "status": "UPCOMING" }
  ],
  "collaboration": {
    "agencyResponsibilities": ["..."],
    "clientResponsibilities": ["..."]
  },
  "revisions": {
    "includedRevisions": 3,
    "additionalRevisionPricing": "$150/hr",
    "responseTime": "24-48h"
  },
  "pricing": {
    "currency": "USD",
    "total": 7000,
    "deposit": 3500,
    "remainingBalance": 3500,
    "paymentSchedule": [
      { "id": "...", "milestoneName": "...", "amount": 3500, "dueDate": "...", "status": "PENDING" }
    ]
  },
  "legal": {
    "ownership": "...",
    "confidentiality": "...",
    "liability": "...",
    "termination": "...",
    "governingLaw": "...",
    "disputeResolution": "..."
  },
  "success": {
    "confirmationMessage": "...",
    "nextSteps": ["..."],
    "contactDetails": {
      "name": "...",
      "email": "..."
    }
  }
}
```

## Integration Workflow for n8n

1.  **Client/Agency Lookup**: n8n should first ensure the `agency_id` and `client_id` exist in their respective tables.
2.  **JSON Construction**: Build the JSON object for the `content` column based on the contract above.
3.  **Supabase Insert**: Insert a new row into the `proposals` table.
4.  **URL Generation**: Construct the portal URL using the returned UUID: `https://portal.example.com/proposal/{{$json.id}}`.
5.  **Email Automation**: Send the generated URL to the client.
