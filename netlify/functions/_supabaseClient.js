// Server-only Supabase client. Uses the SERVICE ROLE key, which must
// NEVER be sent to the browser — it lives only in Netlify's environment
// variables and is read here, inside a serverless function.
//
// This is a deliberate deviation from the anon-key-in-the-browser
// pattern: since the frontend never talks to Supabase directly (it only
// calls these Netlify functions), there's no need to ship any Supabase
// key to the client at all, which is simpler and strictly more secure.
const { createClient } = require("@supabase/supabase-js");

function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables. " +
        "Set them in Netlify: Site settings -> Environment variables."
    );
  }
  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

module.exports = { getSupabaseClient };
