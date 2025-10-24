-- Enable extensions
create extension if not exists "pgcrypto";

-- Projects and tagging
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  status text not null check (status in ('active', 'paused', 'planned', 'archived')),
  summary text,
  description text,
  repo_url text,
  live_url text,
  featured boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.project_tags (
  project_id uuid not null references public.projects(id) on delete cascade,
  tag text not null,
  created_at timestamptz not null default timezone('utc', now()),
  primary key (project_id, tag)
);

-- GitHub commit snapshots
create table public.github_activity (
  id bigserial primary key,
  repo_name text not null,
  commit_sha text not null,
  message text,
  committed_at timestamptz not null,
  author text,
  url text,
  additions integer default 0,
  deletions integer default 0,
  inserted_at timestamptz not null default timezone('utc', now()),
  unique (commit_sha)
);

-- Daily GitHub metrics (aggregated)
create table public.github_daily_metrics (
  activity_date date primary key,
  commits integer not null default 0,
  additions integer not null default 0,
  deletions integer not null default 0,
  repositories jsonb not null default '[]'::jsonb,
  refreshed_at timestamptz not null default timezone('utc', now())
);

-- LeetCode progress
create table public.leetcode_daily (
  id bigserial primary key,
  activity_date date not null unique,
  total_solved integer not null default 0,
  easy_solved integer not null default 0,
  medium_solved integer not null default 0,
  hard_solved integer not null default 0,
  current_streak integer not null default 0,
  longest_streak integer not null default 0,
  refreshed_at timestamptz not null default timezone('utc', now())
);

create table public.leetcode_topics (
  id bigserial primary key,
  activity_date date not null,
  problem_slug text not null,
  title text,
  difficulty text,
  url text,
  tags text[],
  submitted_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  unique (activity_date, problem_slug)
);

-- Activity log for manual overrides or sync errors
create table public.activity_log (
  id bigserial primary key,
  source text not null,
  action text not null,
  payload jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

-- Row Level Security
alter table public.projects enable row level security;
alter table public.project_tags enable row level security;
alter table public.github_activity enable row level security;
alter table public.github_daily_metrics enable row level security;
alter table public.leetcode_daily enable row level security;
alter table public.leetcode_topics enable row level security;
alter table public.activity_log enable row level security;

-- Policies (read-only for anon, full access for service role)
-- Replace 'authenticated_role' with the role used for admin/service if needed.
create policy "Public read access on projects"
  on public.projects for select
  using (true);

create policy "Public read access on project_tags"
  on public.project_tags for select
  using (true);

create policy "Public read access on github_activity"
  on public.github_activity for select
  using (true);

create policy "Public read access on github_daily_metrics"
  on public.github_daily_metrics for select
  using (true);

create policy "Public read access on leetcode_daily"
  on public.leetcode_daily for select
  using (true);

create policy "Public read access on leetcode_topics"
  on public.leetcode_topics for select
  using (true);
