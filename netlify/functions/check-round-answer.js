// POST /.netlify/functions/check-round-answer
// Body: { challengeId: string, roundNumber: 1-5, orderedEventIds: [id,id,id,id] }
//
// Returns that ONE round's score plus the correct order and scripture
// references — used right after the player clicks "Lock In Answer" on
// a single round, so the game can show the immediate ✓/✕ reveal players
// are used to, without waiting until all 5 rounds are done.
//
// HONEST SECURITY NOTE: unlike submit-score.js, this endpoint is
// stateless and doesn't check whether a player has already completed
// today's challenge — so someone deliberately using their browser's
// dev tools could call it directly to peek at a round's answer before
// actually submitting a real guess. The score that actually lands on
// the leaderboard still only comes from submit-score.js, which
// re-verifies everything server-side and is what's protected against
// tampering. This endpoint is a UX convenience, not a security
// boundary — an acceptable trade-off for a friendly group-chat game
// with no prizes on the line. If that ever changes, remove this
// endpoint and reveal answers only via submit-score's response instead.
const { getSupabaseClient } = require("./_supabaseClient");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON body" }) };
  }

  const { challengeId, roundNumber, orderedEventIds } = body;
  if (!challengeId || !roundNumber || !Array.isArray(orderedEventIds) || orderedEventIds.length !== 4) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "challengeId, roundNumber, and 4 orderedEventIds are required" }),
    };
  }

  try {
    const supabase = getSupabaseClient();

    const { data: round, error: roundError } = await supabase
      .from("daily_rounds")
      .select(
        "id, events:daily_round_events(event_id, correct_sequence, event:events(scripture_reference))"
      )
      .eq("challenge_id", challengeId)
      .eq("round_number", roundNumber)
      .maybeSingle();

    if (roundError) throw roundError;
    if (!round) {
      return { statusCode: 404, body: JSON.stringify({ error: "Unknown challengeId/roundNumber" }) };
    }

    const correctOrder = round.events
      .slice()
      .sort((a, b) => a.correct_sequence - b.correct_sequence);
    const correctOrderIds = correctOrder.map((e) => e.event_id);
    const referencesById = Object.fromEntries(
      round.events.map((e) => [e.event_id, e.event.scripture_reference])
    );

    const results = orderedEventIds.map((id, i) => ({
      id,
      correct: id === correctOrderIds[i],
      reference: referencesById[id] || null,
    }));
    const score = results.filter((r) => r.correct).length;

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      body: JSON.stringify({ score, maxScore: 4, results }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
