// POST /.netlify/functions/track-event
// Body: { eventName: string, challengeId?: string, anonymousKey?: string, metadata?: object }
//
// Fire-and-forget analytics. Suggested eventName values: 'page_view',
// 'challenge_start', 'round_start', 'round_complete', 'challenge_complete',
// 'share'. Query analytics_events directly in Supabase (or build a small
// dashboard) to get: daily active players, completion rate, drop-off by
// round, average time spent, shares, etc. — everything listed in the
// spec's analytics section is derivable from this one table plus
// `results`/`round_results`.
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

  const { eventName, challengeId, anonymousKey, metadata } = body;
  if (!eventName) {
    return { statusCode: 400, body: JSON.stringify({ error: "eventName is required" }) };
  }

  try {
    const supabase = getSupabaseClient();

    let playerId = null;
    if (anonymousKey) {
      const { data: player } = await supabase
        .from("players")
        .select("id")
        .eq("anonymous_key", anonymousKey)
        .maybeSingle();
      playerId = player?.id || null;
    }

    await supabase.from("analytics_events").insert({
      event_name: eventName,
      challenge_id: challengeId || null,
      player_id: playerId,
      metadata: metadata || null,
    });

    return { statusCode: 204, body: "" };
  } catch (err) {
    // Analytics should never break the game — log and move on.
    return { statusCode: 200, body: JSON.stringify({ warning: err.message }) };
  }
};
