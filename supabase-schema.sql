-- Run this in Supabase Dashboard > SQL Editor > New query > Run
-- https://supabase.com/dashboard/project/_/sql/new

-- users table: paywall + backup contact info
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  phone text,
  paid boolean default false,
  created_at timestamp with time zone default now()
);

-- contact_submissions table: landing page contact form
create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  message text,
  created_at timestamp with time zone default now()
);

-- indexes
create index if not exists users_email_idx on users (email);
create index if not exists contact_submissions_created_idx on contact_submissions (created_at desc);

-- Enable RLS on both tables. All writes come from server routes using the
-- service role key (which bypasses RLS), so the default policies below only
-- allow reads for the row-owning authed user. Tweak as needed.
alter table users enable row level security;
alter table contact_submissions enable row level security;

-- Allow an authenticated user to read their own row
create policy "users can read own row"
  on users for select
  using (auth.jwt() ->> 'email' = email);

-- contact_submissions: only service role (server) can read/write.
-- No client-facing policy needed. Everything is inserted via /api/contact
-- using the service role key.
