-- ============================================================================
-- Procuro Database Schema
-- Run this migration in your Supabase SQL Editor to set up the database
-- ============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================================
-- ENUMS
-- ============================================================================

create type procurement_status as enum (
  'draft',
  'pending_review',
  'agent_processing',
  'quotes_received',
  'approved',
  'ordered',
  'delivered',
  'cancelled'
);

create type procurement_priority as enum (
  'low',
  'medium',
  'high',
  'urgent'
);

create type quote_status as enum (
  'pending',
  'accepted',
  'rejected',
  'expired'
);

create type agent_session_status as enum (
  'idle',
  'researching',
  'sourcing',
  'comparing',
  'awaiting_approval',
  'completed',
  'error'
);

-- ============================================================================
-- TABLES
-- ============================================================================

-- User profiles (extends Supabase auth.users)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  company text,
  role text,
  avatar_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Procurement requests
create table procurement_requests (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  description text,
  category text not null,
  status procurement_status default 'draft' not null,
  priority procurement_priority default 'medium' not null,
  budget_min numeric(12, 2),
  budget_max numeric(12, 2),
  currency text default 'USD' not null,
  quantity integer default 1 not null,
  unit text,
  delivery_deadline date,
  requirements jsonb,
  agent_session_id uuid,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Supplier quotes
create table supplier_quotes (
  id uuid primary key default uuid_generate_v4(),
  procurement_id uuid not null references procurement_requests(id) on delete cascade,
  supplier_name text not null,
  supplier_email text,
  unit_price numeric(12, 2) not null,
  total_price numeric(12, 2) not null,
  currency text default 'USD' not null,
  lead_time_days integer,
  notes text,
  status quote_status default 'pending' not null,
  sourced_by text default 'manual' not null check (sourced_by in ('agent', 'manual')),
  created_at timestamptz default now() not null
);

-- Agent sessions (stores LangGraph state)
create table agent_sessions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  procurement_id uuid references procurement_requests(id) on delete set null,
  status agent_session_status default 'idle' not null,
  graph_state jsonb,
  messages jsonb[] default '{}',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Activity log for audit trail
create table activity_log (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  procurement_id uuid references procurement_requests(id) on delete set null,
  action text not null,
  details text,
  metadata jsonb,
  created_at timestamptz default now() not null
);

-- ============================================================================
-- INDEXES
-- ============================================================================

create index idx_procurement_requests_user_id on procurement_requests(user_id);
create index idx_procurement_requests_status on procurement_requests(status);
create index idx_procurement_requests_created_at on procurement_requests(created_at desc);
create index idx_supplier_quotes_procurement_id on supplier_quotes(procurement_id);
create index idx_agent_sessions_user_id on agent_sessions(user_id);
create index idx_agent_sessions_procurement_id on agent_sessions(procurement_id);
create index idx_activity_log_user_id on activity_log(user_id);
create index idx_activity_log_procurement_id on activity_log(procurement_id);
create index idx_activity_log_created_at on activity_log(created_at desc);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

alter table profiles enable row level security;
alter table procurement_requests enable row level security;
alter table supplier_quotes enable row level security;
alter table agent_sessions enable row level security;
alter table activity_log enable row level security;

-- Profiles: users can only access their own profile
create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Procurement requests: users can only access their own
create policy "Users can view own procurements"
  on procurement_requests for select using (auth.uid() = user_id);

create policy "Users can create procurements"
  on procurement_requests for insert with check (auth.uid() = user_id);

create policy "Users can update own procurements"
  on procurement_requests for update using (auth.uid() = user_id);

create policy "Users can delete own procurements"
  on procurement_requests for delete using (auth.uid() = user_id);

-- Supplier quotes: users can access quotes for their procurements
create policy "Users can view quotes for own procurements"
  on supplier_quotes for select using (
    exists (
      select 1 from procurement_requests
      where procurement_requests.id = supplier_quotes.procurement_id
      and procurement_requests.user_id = auth.uid()
    )
  );

create policy "Users can create quotes for own procurements"
  on supplier_quotes for insert with check (
    exists (
      select 1 from procurement_requests
      where procurement_requests.id = supplier_quotes.procurement_id
      and procurement_requests.user_id = auth.uid()
    )
  );

create policy "Users can update quotes for own procurements"
  on supplier_quotes for update using (
    exists (
      select 1 from procurement_requests
      where procurement_requests.id = supplier_quotes.procurement_id
      and procurement_requests.user_id = auth.uid()
    )
  );

-- Agent sessions: users can only access their own
create policy "Users can view own agent sessions"
  on agent_sessions for select using (auth.uid() = user_id);

create policy "Users can create agent sessions"
  on agent_sessions for insert with check (auth.uid() = user_id);

create policy "Users can update own agent sessions"
  on agent_sessions for update using (auth.uid() = user_id);

-- Activity log: users can only view their own
create policy "Users can view own activity"
  on activity_log for select using (auth.uid() = user_id);

create policy "Users can create activity entries"
  on activity_log for insert with check (auth.uid() = user_id);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email, full_name, company)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'company'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Auto-update updated_at timestamp
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at
  before update on profiles
  for each row execute function update_updated_at();

create trigger update_procurement_requests_updated_at
  before update on procurement_requests
  for each row execute function update_updated_at();

create trigger update_agent_sessions_updated_at
  before update on agent_sessions
  for each row execute function update_updated_at();
