-- Bible Sequence — backend schema (Postgres / Supabase)
-- ---------------------------------------------------------------------
-- Run this once in your Supabase project's SQL editor (or via the
-- Supabase CLI) to create everything the Netlify functions in
-- /netlify/functions expect. See /backend/README.md for the full setup
-- walkthrough.
--
-- Design note: `daily_challenges` / `daily_rounds` / `daily_round_events`
-- are populated lazily, not by a cron job. The first request of the day
-- (from anyone) triggers get-daily-challenge.js to deterministically
-- generate that day's 5 rounds from `stories`/`events` (same algorithm
-- as the frontend's engine.js, same date-based seed) and save them here.
-- Every request after that reads the saved rows, so nobody's browser
-- ever computes a different answer key. No scheduled function required.

create extension if not exists "pgcrypto"; -- for gen_random_uuid()

-- ---------------------------------------------------------------------
-- Content
-- ---------------------------------------------------------------------

create table stories (
  id            uuid primary key default gen_random_uuid(),
  story_key     text unique not null,       -- stable slug, matches data.js `key`
  name          text not null,
  category      text not null check (category in ('OLD_TESTAMENT', 'NEW_TESTAMENT')),
  subcategory   text not null,
  difficulty    smallint not null check (difficulty between 1 and 3),
  description   text not null,
  active        boolean not null default true,
  created_at    timestamptz not null default now()
);

create table events (
  id            uuid primary key default gen_random_uuid(),
  story_id      uuid not null references stories(id) on delete cascade,
  event_text    text not null,
  scripture_reference text not null,        -- e.g. "1 Samuel 17:48-51"
  book          text,
  chapter       int,
  verse_start   int,
  verse_end     int,
  sequence      smallint not null check (sequence between 1 and 4),
  explanation   text,                       -- optional, longer than event_text
  unique (story_id, sequence)
);

-- ---------------------------------------------------------------------
-- Daily challenge (generated lazily — see note above)
-- ---------------------------------------------------------------------

create table daily_challenges (
  id             uuid primary key default gen_random_uuid(),
  challenge_date date unique not null,      -- one row per calendar date
  status         text not null default 'ready' check (status in ('ready', 'archived')),
  created_at     timestamptz not null default now()
);

create table daily_rounds (
  id            uuid primary key default gen_random_uuid(),
  challenge_id  uuid not null references daily_challenges(id) on delete cascade,
  round_number  smallint not null check (round_number between 1 and 5),
  story_id      uuid not null references stories(id),
  unique (challenge_id, round_number)
);

create table daily_round_events (
  id               uuid primary key default gen_random_uuid(),
  round_id         uuid not null references daily_rounds(id) on delete cascade,
  event_id         uuid not null references events(id),
  display_position smallint not null check (display_position between 1 and 4), -- shuffled order shown to players
  correct_sequence smallint not null check (correct_sequence between 1 and 4), -- never sent to the client before lock-in
  unique (round_id, display_position)
);

-- ---------------------------------------------------------------------
-- Players & results
-- ---------------------------------------------------------------------

create table players (
  id             uuid primary key default gen_random_uuid(),
  anonymous_key  text unique not null,      -- the localStorage id from the browser
  display_name   text,
  created_at     timestamptz not null default now()
);

create table results (
  id            uuid primary key default gen_random_uuid(),
  challenge_id  uuid not null references daily_challenges(id) on delete cascade,
  player_id     uuid not null references players(id) on delete cascade,
  score         smallint not null check (score between 0 and 20),
  completed_at  timestamptz not null default now(),
  unique (challenge_id, player_id)          -- <- the actual "one result per day" enforcement
);

create table round_results (
  id            uuid primary key default gen_random_uuid(),
  result_id     uuid not null references results(id) on delete cascade,
  round_number  smallint not null check (round_number between 1 and 5),
  score         smallint not null check (score between 0 and 4),
  unique (result_id, round_number)
);

-- ---------------------------------------------------------------------
-- Analytics
-- ---------------------------------------------------------------------

create table analytics_events (
  id            uuid primary key default gen_random_uuid(),
  event_name    text not null,              -- e.g. 'page_view', 'round_start', 'challenge_complete', 'share'
  challenge_id  uuid references daily_challenges(id) on delete set null,
  player_id     uuid references players(id) on delete set null,
  metadata      jsonb,
  created_at    timestamptz not null default now()
);

create index idx_analytics_events_name_date on analytics_events (event_name, created_at);
create index idx_results_challenge on results (challenge_id);

-- ---------------------------------------------------------------------
-- Handy views for the leaderboard / daily player count
-- ---------------------------------------------------------------------

create view daily_leaderboard as
select
  r.challenge_id,
  dc.challenge_date,
  coalesce(p.display_name, 'Player #' || substr(p.anonymous_key, 8, 4)) as display_name,
  r.score,
  r.completed_at
from results r
join players p on p.id = r.player_id
join daily_challenges dc on dc.id = r.challenge_id
order by dc.challenge_date desc, r.score desc, r.completed_at asc;

create view daily_player_counts as
select challenge_id, count(*) as player_count, round(avg(score), 1) as average_score, max(score) as high_score
from results
group by challenge_id;
