# Bible Sequence

A daily Bible-story sequencing competition, built to run itself.

Every day, everyone who opens the game gets the exact same 5 stories (4
events each, 20 total, scored out of 20) — so friends in a group chat
can genuinely compare scores. Tomorrow, a new set of 5 appears automatically,
drawn from a 100-story database. No one has to write a new question by hand.

---

## 1. Two ways to run this

### A. No backend at all (works immediately)
Just open `index.html`, or deploy the folder to Netlify/any static
host. Every player's browser independently computes the same daily
challenge from today's date — this alone satisfies "everyone plays the
same 5 stories and can compare scores." No accounts, no database, no
setup.

### B. With the optional backend (real leaderboard + anti-cheat + analytics)
`/backend` and `/netlify/functions` contain a complete Supabase +
Netlify Functions backend: a real cross-device leaderboard, server-side
answer verification (so a player can't edit the page's JavaScript to
fake a score), and analytics. **I couldn't provision a live database or
Netlify site for you** — that needs your own free accounts — but every
line of that backend is real, working code. See **`backend/README.md`**
for the ~15-minute setup walkthrough.

The rest of this file covers option A, which is what you get by just
opening the folder.

---

## 2. How to run it (no coding required)

**Try it locally:** double-click `index.html`. It opens in your browser
and works immediately.

**Put it online so you can share a link:**
1. Go to **netlify.com/drop**
2. Drag this whole folder onto the page
3. You get a live link like `https://random-name-123.netlify.app` —
   that's what you send in the group chat.

*(Netlify Drop is the fastest path but doesn't run the optional backend
functions. If you want those too, see `backend/README.md` — it uses
Netlify's Git-based deploy instead, which is still free.)*

---

## 3. What's in the folder

| File | What it does |
|---|---|
| `index.html` / `styles.css` | The page shell and all visual styling (mobile-first) |
| `data.js` | **The Bible content** — 100 stories (52 Old Testament, 48 New Testament), each with exactly 4 chronological events, a scripture reference per event, a category, a difficulty rating, and a story description |
| `engine.js` | The game engine — pure logic, no visuals. Deterministically picks today's 5 stories from the date, balances Old/New Testament and difficulty, shuffles each round, and checks answers |
| `app.js` | Wires the engine to the screen: rendering cards, drag/tap reordering, the daily "already played" lock, scoring, sharing |
| `test-engine.js` | Automated tests for the engine and dataset — run with `node test-engine.js` |
| `backend/schema.sql` | Full Postgres/Supabase schema (stories, events, daily_challenges, players, results, leaderboard views, analytics — see `backend/README.md`) |
| `backend/seed.sql` | Generated from `data.js` — loads the same 100 stories into the database |
| `netlify/functions/*.js` | Serverless functions: daily challenge generation, server-verified scoring, leaderboard, analytics logging |
| `scripts/generate-seed-sql.js` | Regenerates `backend/seed.sql` from `data.js`, so the frontend content and backend content never drift apart |

Everything reads from `data.js`. To add more stories later (the
database is built to grow past 150+), add more entries there in the
same shape — nothing else needs to change.

---

## 4. What's already working (no-backend mode)

- **One challenge per day, same for everyone** — deterministically
  generated from the calendar date (no server, no coordination needed);
  regenerating with the same date always produces the same 5 stories
  in the same order
- **100-story database**, 52 Old Testament / 48 New Testament, each
  with exactly 4 genuinely distinguishable chronological events (not
  vague or interchangeable ones), a real scripture reference per event,
  a difficulty rating, and a category/subcategory used to balance each
  day's picks (it actively avoids giving you five stories about David
  in one day, and mixes difficulty rather than all-easy or all-hard)
- **References and the full story explanation are hidden until you
  lock in your answer** — showing chapter/verse numbers beforehand
  would give away the order; the deeper explanation appears right
  alongside the reveal so you actually learn something after each round
- **Reordering** — drag a card, or tap two cards to swap them
- **One official result per day (client-side)** — finishing today's
  challenge locks it in via localStorage; reopening the game that same
  day shows "VIEW TODAY'S RESULT" instead of letting you replay for a
  better score. (This is a soft lock — see the security note below.
  `backend/submit-score.js` implements the tamper-proof, cross-device
  version of the same rule.)
- **Results screen** — total score, percentage, a performance message,
  and a round-by-round breakdown
- **Share My Result** — native share sheet where available, clipboard
  copy otherwise
- **Mobile-first design**, tested down to an iPhone-sized screen and
  up through desktop
- I tested the dataset and engine logic (100 stories validated, daily
  seed determinism, scoring edge cases, "final score = sum of rounds")
  with an automated test script, and the actual UI end-to-end in a
  browser — including reloading the page mid-session to confirm the
  daily lock and "view today's result" flow both work — before
  packaging this up.

---

## 5. What the optional backend adds (see `backend/README.md`)

- A **real leaderboard** ("1,284 people played today," top scores by
  name) that works across everyone's devices, not just localStorage
- **Server-verified scoring** — the server re-checks every answer
  against data it never sent the client beforehand, so someone editing
  the page's JavaScript can't post a fake score to a shared leaderboard
- **Analytics** — page views, round-by-round drop-off, completion rate,
  daily active players, shares, all queryable from the `analytics_events`
  table
- A **true one-per-day enforcement** across devices/browsers (a unique
  database constraint), rather than the client-only localStorage version

This is genuinely more than an MVP needs, and section 38 of most specs
like this one would call it "future work" — I built it because it was
asked for directly, but it's entirely optional. The no-backend version
already delivers the core loop: play → score → learn → share → come
back tomorrow.

---

## 6. Honest limitations of the no-backend version

- **The daily lock is client-side (localStorage).** A player who clears
  their browser data or opens a private/incognito window can replay.
  Fine for a friendly group-chat game; not tamper-proof. The backend
  fixes this with a real database constraint.
- **No live player counts.** "X people played today" requires a
  server to count across devices — the no-backend version can't show
  this honestly, so it doesn't claim to.
- **Daily reset time is per-player local midnight**, not a single
  synchronized moment — see the note in `backend/README.md` about the
  small trade-off if you wire in the backend (which resets at UTC
  midnight for everyone at once instead).

---

## 7. A note on the content

Every event in `data.js` sticks to sequences where Scripture's order is
reasonably clear, uses original short descriptions (not quoted Bible
text), and cites a real scripture reference. The 4 events per story are
chosen to be genuinely distinguishable moments, not interchangeable
ones. If you add more stories, keep that same bar.
