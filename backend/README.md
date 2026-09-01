# Backend setup (optional)

**The game fully works without any of this.** Opening `index.html` (or
deploying the folder to Netlify) gives every player the same 5 stories
each day, computed independently in each browser from today's date —
no server required. That already satisfies "everyone plays the same
challenge and can compare scores."

This backend adds three things the client-only version can't do on its own:

1. **A real, cross-device leaderboard** ("1,284 people played today," top scores)
2. **Tamper-proof scoring** (the server re-checks every answer — a player
   editing their browser's JavaScript can't fake a score that lands on
   a shared leaderboard)
3. **Analytics** (completion rate, drop-off by round, daily active players, etc.)

I couldn't provision a live database or Netlify site for you — that
needs your own free accounts — but everything below is real, complete
code, ready to connect. It should take about 10–15 minutes.

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com), sign up free, and create a new project.
2. Once it's ready, open the **SQL Editor** and run `backend/schema.sql` (paste the whole file, click Run).
3. Generate the seed data from the same content the frontend uses, then run it:
   ```
   node scripts/generate-seed-sql.js > backend/seed.sql
   ```
   Paste `backend/seed.sql` into the SQL Editor and run it. This loads
   all 100 stories and 400 events — the exact same content already in
   `data.js`, so the frontend and backend never disagree.
4. Under **Project Settings → API**, copy your **Project URL** and your
   **`service_role` key** (not the `anon` key — the service role key,
   kept secret).

## 2. Deploy to Netlify with the functions enabled

1. Push this folder to a GitHub repo (Netlify's drag-and-drop upload
   at [app.netlify.com/drop](https://app.netlify.com/drop) does **not**
   run serverless functions — for those you need to connect a git repo
   through the normal "Import from Git" flow instead).
2. In Netlify: **Site settings → Environment variables**, add:
   - `SUPABASE_URL` = your Project URL
   - `SUPABASE_SERVICE_ROLE_KEY` = your service role key
3. Deploy. Netlify reads `netlify.toml`, installs `@supabase/supabase-js`
   from `package.json`, and publishes the functions in
   `netlify/functions/` at `/.netlify/functions/<name>`.

## 3. What each function does

| Function | Method | Purpose |
|---|---|---|
| `get-daily-challenge` | GET | Returns today's 5 rounds (event text only — no references, no correct order). Generates and saves the day's challenge on the first request of each date; every request after that reads the same saved rows. |
| `submit-score` | POST | Verifies a player's answers against the real answer key (server-side, never trusting the client), scores them, and rejects a second submission for the same player + day. |
| `get-leaderboard` | GET | Today's top scores, player count, and average — powers "1,284 people played today." |
| `track-event` | POST | Logs one analytics event (page view, round start, share, etc.) to `analytics_events`. |

## 4. Wiring the frontend to use it (not done automatically)

Right now `app.js` always computes the daily challenge locally in the
browser — that's what makes the no-backend version work at all. To
switch to the server-verified version, the natural change is:

- In `startGame()`, instead of using the locally-computed `todaysRounds`,
  `fetch('/.netlify/functions/get-daily-challenge')` and render those
  rounds instead (they won't include `reference` or the correct order,
  since the server withholds both until scoring).
- In `onLockIn()`'s last-round case, instead of computing the score
  locally, `POST` all 5 rounds' answers to `/.netlify/functions/submit-score`
  and render whatever score it returns.
- Swap the local "already played today" check for whatever `submit-score`
  returns on a second attempt (it responds `409` with the existing score).

I left this as a deliberate next step rather than doing it automatically,
because it changes the game's behavior in one meaningful way worth
deciding on purpose: the server's "today" resets at midnight **UTC**,
while the no-backend version resets at midnight in each player's own
timezone. For a friend group spread across timezones, that's a real
trade-off (fully synchronized reset vs. each person's own midnight) —
pick whichever fits your group before wiring it in.

## 5. Local testing without a live Supabase project

`test-engine.js` and the frontend both work fully offline — none of the
tests or the base game touch Supabase. `netlify/functions/_dailyGenerator.js`
is unit-testable on its own since it takes plain JS objects (no live
database needed) — see the shape it expects at the top of that file.

## 6. Known simplifications

- Story **selection order**: `pickDailyStories` shuffles whatever array
  order it's given. `data.js`'s `STORIES` array and a Supabase `select()`
  without an explicit `order()` aren't guaranteed to come back in the
  same order, so the *client-only* preview and the *server-generated*
  challenge for the same date aren't guaranteed to pick the identical 5
  stories. This only matters if you run both modes side by side — once
  you wire the frontend to fetch from `get-daily-challenge` (step 4
  above), the server response is the only thing ever rendered or scored,
  so this doesn't affect correctness. If you want the two to match
  exactly for debugging, add `.order("story_key")` to the Supabase
  query in `get-daily-challenge.js` and sort `STORIES` in `data.js` the
  same way.
- `scripts/generate-seed-sql.js` parses each `"Book Chapter:VerseStart-VerseEnd"`
  reference into `book`/`chapter`/`verse_start`/`verse_end` columns with
  a regex. A few references that span two chapters (e.g. `"Genesis
  1:26-2:3"`) don't parse cleanly into that shape — the `scripture_reference`
  text column is always correct regardless; the split columns are a
  convenience for querying, not the source of truth.
- Row Level Security (RLS) isn't enabled on these tables in `schema.sql`.
  Since the browser never talks to Supabase directly — only these
  server-side functions do, using the service role key — that's safe as
  shipped. If you ever add direct client-side Supabase calls (e.g. with
  the anon key) for something else, turn RLS on first.
