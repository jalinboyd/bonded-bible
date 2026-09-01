// POST /.netlify/functions/submit-score
// Body: {
//   anonymousKey: string,       // from the browser's localStorage id
//   displayName?: string,
//   challengeId: string,
//   answers: [{ roundNumber: 1-5, orderedEventIds: [id, id, id, id] }]
// }
//
// The server re-derives the correct order from daily_round_events (never
// trusting a score the client computed itself) and rejects a second
// submission for the same player + challenge — this is the real,
// tamper-proof version of the "one official result per day" rule that
// app.js also enforces client-side with localStorage.
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

  const { anonymousKey, displayName, challengeId, answers } = body;
  if (!anonymousKey || !challengeId || !Array.isArray(answers) || answers.length !== 5) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "anonymousKey, challengeId, and 5 answers are required" }),
    };
  }

  try {
    const supabase = getSupabaseClient();

    // Find or create the player.
    let { data: player } = await supabase
      .from("players")
      .select("id")
      .eq("anonymous_key", anonymousKey)
      .maybeSingle();
    if (!player) {
      const { data: created, error: createError } = await supabase
        .from("players")
        .insert({ anonymous_key: anonymousKey, display_name: displayName || null })
        .select("id")
        .single();
      if (createError) throw createError;
      player = created;
    }

    // Already played today? Return the existing result instead of
    // letting them overwrite it (also enforced by a DB unique
    // constraint below as a second line of defense).
    const { data: existingResult } = await supabase
      .from("results")
      .select("id, score, completed_at")
      .eq("challenge_id", challengeId)
      .eq("player_id", player.id)
      .maybeSingle();
    if (existingResult) {
      return {
        statusCode: 409,
        body: JSON.stringify({
          error: "You already completed today's challenge.",
          score: existingResult.score,
          maxScore: 20,
        }),
      };
    }

    // Pull the answer key: every round for this challenge, with each
    // event's correct_sequence — never sent to the client until now.
    const { data: rounds, error: roundsError } = await supabase
      .from("daily_rounds")
      .select("round_number, events:daily_round_events(event_id, correct_sequence)")
      .eq("challenge_id", challengeId);
    if (roundsError) throw roundsError;
    if (!rounds || rounds.length !== 5) {
      return { statusCode: 404, body: JSON.stringify({ error: "Unknown challengeId" }) };
    }

    const byRoundNumber = Object.fromEntries(rounds.map((r) => [r.round_number, r]));
    const roundResults = [];
    let total = 0;

    for (const answer of answers) {
      const round = byRoundNumber[answer.roundNumber];
      if (!round || !Array.isArray(answer.orderedEventIds) || answer.orderedEventIds.length !== 4) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: `Malformed answer for round ${answer.roundNumber}` }),
        };
      }
      // correct order = event ids sorted by correct_sequence (1..4)
      const correctOrder = round.events
        .slice()
        .sort((a, b) => a.correct_sequence - b.correct_sequence)
        .map((e) => e.event_id);

      const score = answer.orderedEventIds.reduce(
        (sum, id, i) => sum + (id === correctOrder[i] ? 1 : 0),
        0
      );
      roundResults.push({ round_number: answer.roundNumber, score });
      total += score;
    }

    const { data: result, error: resultError } = await supabase
      .from("results")
      .insert({ challenge_id: challengeId, player_id: player.id, score: total })
      .select("id, completed_at")
      .single();
    if (resultError) {
      // Unique constraint (challenge_id, player_id) caught a race —
      // someone submitted for this player twice at nearly the same time.
      if (resultError.code === "23505") {
        return {
          statusCode: 409,
          body: JSON.stringify({ error: "You already completed today's challenge." }),
        };
      }
      throw resultError;
    }

    await supabase
      .from("round_results")
      .insert(roundResults.map((r) => ({ ...r, result_id: result.id })));

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        score: total,
        maxScore: 20,
        roundResults,
        completedAt: result.completed_at,
      }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
