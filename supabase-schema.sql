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
--   onboarded: whether the student has seen /course/welcome
-- ──────────────────────────────────────────────────────────
create table if not exists user_progress (
  email text primary key,
  last_lesson int default 0,
  bookmarks int[] default '{}',
  confused int[] default '{}',
  notes jsonb default '{}',
  completed_at timestamp with time zone,
  onboarded boolean default false,
  updated_at timestamp with time zone default now()
);
alter table user_progress add column if not exists onboarded boolean default false;

-- ──────────────────────────────────────────────────────────
-- chat_logs: every ask-claude exchange, logged for the admin dashboard.
-- ──────────────────────────────────────────────────────────
create table if not exists chat_logs (
  id uuid primary key default gen_random_uuid(),
  email text,
  session_id text,
  role text not null,
  content text not null,
  created_at timestamp with time zone default now()
);
create index if not exists chat_logs_created_idx on chat_logs (created_at desc);
create index if not exists chat_logs_session_idx on chat_logs (session_id);

-- ──────────────────────────────────────────────────────────
-- visits: lightweight page-visit log so the dashboard can show
-- "who's active" and which pages get traffic. Server-inserted only.
-- ──────────────────────────────────────────────────────────
create table if not exists visits (
  id uuid primary key default gen_random_uuid(),
  email text,
  path text,
  user_agent text,
  referrer text,
  created_at timestamp with time zone default now()
);
create index if not exists visits_created_idx on visits (created_at desc);
create index if not exists visits_path_idx on visits (path);

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
