// GET /.netlify/functions/get-daily-challenge
//
// Returns today's 5 rounds. Never sends the correct order or scripture
// references to the client — those stay server-side until submit-score
// verifies an answer. On the first request of a calendar date, this
// generates and saves that day's challenge; every request after that
// (from any player) reads the same saved rows.
const { getSupabaseClient } = require("./_supabaseClient");
const { buildDailyRounds } = require("./_dailyGenerator");

function todayDateKey() {
  // Server-side canonical "today", in UTC, so the daily reset happens
  // at the same instant for every player regardless of their device's
  // clock or timezone. (The frontend's client-only fallback mode uses
  // the player's local date instead — see app.js — so if you wire this
  // function in, expect the reset moment to shift slightly for players
  // far from UTC.)
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

exports.handler = async function (event) {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  try {
    const supabase = getSupabaseClient();
    const dateKey = todayDateKey();

    let { data: challenge } = await supabase
      .from("daily_challenges")
      .select("id, challenge_date")
      .eq("challenge_date", dateKey)
      .maybeSingle();

    if (!challenge) {
      challenge = await generateAndSaveChallenge(supabase, dateKey);
    }

    const { data: rounds, error: roundsError } = await supabase
      .from("daily_rounds")
      .select(
        "round_number, story:stories(story_key, name), events:daily_round_events(display_position, event:events(id, event_text))"
      )
      .eq("challenge_id", challenge.id)
      .order("round_number");

    if (roundsError) throw roundsError;

    const payload = {
      challengeId: challenge.id,
      date: dateKey,
      rounds: rounds
        .sort((a, b) => a.round_number - b.round_number)
        .map((r) => ({
          roundNumber: r.round_number,
          storyName: r.story.name,
          // storyKey is included for the "already played" flow on the
          // client and carries no spoiler information.
          storyKey: r.story.story_key,
          cards: r.events
            .sort((a, b) => a.display_position - b.display_position)
            .map((e) => ({ eventId: e.event.id, text: e.event.event_text })),
        })),
    };

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      body: JSON.stringify(payload),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};

async function generateAndSaveChallenge(supabase, dateKey) {
  const { data: stories, error } = await supabase
    .from("stories")
    .select("id, subcategory, difficulty, events(id, sequence)")
    .eq("active", true);
  if (error) throw error;
  if (!stories || stories.length === 0) {
    throw new Error("No active stories found — run backend/seed.sql first.");
  }

  const dailyRounds = buildDailyRounds(stories, dateKey);

  const { data: challenge, error: insertChallengeError } = await supabase
    .from("daily_challenges")
    .insert({ challenge_date: dateKey })
    .select("id, challenge_date")
    .single();
  // If two requests race on the very first hit of the day, the unique
  // constraint on challenge_date will reject the second insert — just
  // re-read the row that the other request created.
  if (insertChallengeError) {
    const { data: existing } = await supabase
      .from("daily_challenges")
      .select("id, challenge_date")
      .eq("challenge_date", dateKey)
      .single();
    if (existing) return existing;
    throw insertChallengeError;
  }

  for (let i = 0; i < dailyRounds.length; i++) {
    const round = dailyRounds[i];
    const { data: roundRow, error: roundError } = await supabase
      .from("daily_rounds")
      .insert({
        challenge_id: challenge.id,
        round_number: i + 1,
        story_id: round.storyId,
      })
      .select("id")
      .single();
    if (roundError) throw roundError;

    const rows = round.events.map((e) => ({
      round_id: roundRow.id,
      event_id: e.eventId,
      display_position: e.displayPosition,
      correct_sequence: e.correctSequence,
    }));
    const { error: eventsError } = await supabase.from("daily_round_events").insert(rows);
    if (eventsError) throw eventsError;
  }

  return challenge;
}
