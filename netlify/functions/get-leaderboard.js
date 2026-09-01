// GET /.netlify/functions/get-leaderboard?date=YYYY-MM-DD&limit=20
// Defaults to today (UTC) and the top 20 scores.
const { getSupabaseClient } = require("./_supabaseClient");

exports.handler = async function (event) {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  const params = event.queryStringParameters || {};
  const dateKey = params.date || new Date().toISOString().slice(0, 10);
  const limit = Math.min(parseInt(params.limit, 10) || 20, 100);

  try {
    const supabase = getSupabaseClient();

    const { data: challenge } = await supabase
      .from("daily_challenges")
      .select("id")
      .eq("challenge_date", dateKey)
      .maybeSingle();

    if (!challenge) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: dateKey, playerCount: 0, topScores: [] }),
      };
    }

    const [{ data: topScores }, { data: counts }] = await Promise.all([
      supabase
        .from("daily_leaderboard")
        .select("display_name, score, completed_at")
        .eq("challenge_id", challenge.id)
        .order("score", { ascending: false })
        .order("completed_at", { ascending: true })
        .limit(limit),
      supabase
        .from("daily_player_counts")
        .select("player_count, average_score, high_score")
        .eq("challenge_id", challenge.id)
        .maybeSingle(),
    ]);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      body: JSON.stringify({
        date: dateKey,
        playerCount: counts?.player_count || 0,
        averageScore: counts?.average_score || 0,
        highScore: counts?.high_score || 0,
        topScores: topScores || [],
      }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
