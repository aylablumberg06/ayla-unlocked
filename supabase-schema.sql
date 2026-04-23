-- Run this in Supabase Dashboard > SQL Editor > New query > Run
-- https://supabase.com/dashboard/project/_/sql/new
-- Safe to re-run: everything uses "if not exists"

-- ──────────────────────────────────────────────────────────
-- users: paywall + backup contact info
-- ──────────────────────────────────────────────────────────
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  phone text,
  paid boolean default false,
  created_at timestamp with time zone default now()
);

-- ──────────────────────────────────────────────────────────
-- contact_submissions: landing page contact form + ask-ayla escalations
-- ──────────────────────────────────────────────────────────
create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  message text,
  created_at timestamp with time zone default now()
);

-- ──────────────────────────────────────────────────────────
-- user_progress: per-student course state
--   last_lesson: index of last visited lesson (0-based)
--   bookmarks: array of lesson indexes the student starred
--   confused: array of lesson indexes the student flagged "this is confusing"
--   notes: jsonb map of { lessonIndex: "my notes" }
-- ──────────────────────────────────────────────────────────
create table if not exists user_progress (
  email text primary key,
  last_lesson int default 0,
  bookmarks int[] default '{}',
  confused int[] default '{}',
  notes jsonb default '{}',
  completed_at timestamp with time zone,
  updated_at timestamp with time zone default now()
);

-- ──────────────────────────────────────────────────────────
-- confused_flags: aggregate table so Ayla can see what topics
--   the most students find confusing. Each row = one student flag.
-- ──────────────────────────────────────────────────────────
create table if not exists confused_flags (
  id uuid primary key default gen_random_uuid(),
  email text,
  lesson_index int not null,
  lesson_tag text,
  note text,
  created_at timestamp with time zone default now()
);
create index if not exists confused_flags_lesson_idx on confused_flags (lesson_index);

-- ──────────────────────────────────────────────────────────
-- indexes
-- ──────────────────────────────────────────────────────────
create index if not exists users_email_idx on users (email);
create index if not exists contact_submissions_created_idx on contact_submissions (created_at desc);

-- ──────────────────────────────────────────────────────────
-- RLS — every write is from server routes using the service role
-- which bypasses RLS. The anon policy lets a student read their
-- own progress row client-side.
-- ──────────────────────────────────────────────────────────
alter table users enable row level security;
alter table contact_submissions enable row level security;
alter table user_progress enable row level security;
alter table confused_flags enable row level security;

drop policy if exists "users can read own row" on users;
create policy "users can read own row"
  on users for select
  using (auth.jwt() ->> 'email' = email);

drop policy if exists "students read own progress" on user_progress;
create policy "students read own progress"
  on user_progress for select
  using (auth.jwt() ->> 'email' = email);
