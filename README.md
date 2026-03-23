# Procuro

AI-powered procurement automation platform. Procuro uses intelligent agents to streamline supplier discovery, quote comparison, and purchasing decisions.

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **Authentication & Database**: Supabase (Auth, PostgreSQL, RLS)
- **State Management**: Zustand
- **AI Agent** *(planned)*: LangGraph with multi-node procurement workflow
- **UI Components**: Custom component library with CVA + Tailwind

## Features

- User authentication (signup, login, password reset) via Supabase Auth
- Dashboard with procurement overview, stats, and activity feed
- Procurement request management (create, list, detail view with quotes)
- AI Agent chat interface with LangGraph graph visualization
- Supplier quote comparison with multi-criteria scoring
- Profile and settings management
- Row-level security for multi-tenant data isolation
- Responsive, modern UI with dark mode support

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Auth pages (login, signup, forgot-password)
│   ├── (dashboard)/        # Protected dashboard pages
│   │   ├── dashboard/      # Main dashboard
│   │   ├── procurements/   # Procurement CRUD
│   │   ├── agent/          # AI Agent chat interface
│   │   ├── profile/        # User profile
│   │   └── settings/       # App settings
│   └── api/                # API routes
│       ├── auth/callback/  # Supabase auth callback
│       └── agent/          # Agent API (LangGraph bridge)
├── components/
│   ├── ui/                 # Reusable UI components
│   └── layout/             # Layout components (sidebar, header)
├── lib/
│   ├── supabase/           # Supabase client (browser, server, middleware)
│   └── utils.ts            # Utility functions
├── stores/                 # Zustand state stores
├── types/                  # TypeScript type definitions
│   ├── database.ts         # Supabase database types
│   └── agent.ts            # LangGraph agent types
└── middleware.ts            # Auth middleware

backend/                    # Python LangGraph agent (planned)
├── agent/
│   ├── nodes.py            # Graph node implementations
│   ├── state.py            # Agent state schema
│   └── tools.py            # Agent tool definitions
├── graph/
│   └── procurement_graph.py # LangGraph graph definition
└── requirements.txt

supabase/
└── migrations/
    └── 001_initial_schema.sql  # Database schema & RLS policies
```

## LangGraph Architecture

The procurement agent follows a multi-node graph workflow:

```
START → Intake → Research → Sourcing → Comparison → Approval → END
                                                        ↑
                          Human Feedback ←───────────────┘
```

| Node | Purpose |
|------|---------|
| **Intake** | Parse natural language requirements into structured data |
| **Research** | Conduct market research and identify benchmarks |
| **Sourcing** | Find qualified suppliers and request quotes |
| **Comparison** | Build weighted comparison matrix with recommendations |
| **Approval** | Present recommendation for human review |
| **Human Feedback** | Process approval/rejection and route accordingly |

The agent implementation stubs are in `backend/` and TypeScript types in `src/types/agent.ts`. The frontend agent chat interface is fully built and ready to connect.

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project

### Setup

1. **Clone and install**
   ```bash
   git clone <repo-url>
   cd Procuro
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.local. .env.local
   ```
   Fill in your Supabase project URL and anon key.

3. **Set up database**

   Run the SQL from `supabase/migrations/001_initial_schema.sql` in your Supabase SQL Editor. This creates all tables, indexes, RLS policies, and triggers.

4. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## Database Schema

| Table | Description |
|-------|-------------|
| `profiles` | User profiles (extends Supabase auth) |
| `procurement_requests` | Procurement requests with status tracking |
| `supplier_quotes` | Quotes from suppliers linked to procurements |
| `agent_sessions` | LangGraph agent session state and messages |
| `activity_log` | Audit trail for all actions |

All tables have row-level security enabled. Users can only access their own data.

## License

ISC
