/* Structured-LC — optional cloud sync (Supabase).
 *
 * Leave these blank to run local-only (progress is saved on this device).
 *
 * To enable accounts + cross-device sync:
 *   1. Create a free project at https://supabase.com
 *   2. In the SQL editor, run the queries in  supabase/schema.sql  (creates the
 *      user_state table and its row-level-security policies)
 *   3. In Authentication → Providers, enable "Email" (magic link) and/or Google
 *   4. In Authentication → URL Configuration, add your site URL to the allowed
 *      redirect URLs
 *   5. Paste your Project URL and anon/public key below, then redeploy.
 *
 * The anon key is meant to be public — row-level security limits each signed-in
 * user to their own row, so no one can read anyone else's data.
 */
window.SLC_CONFIG = {
  SUPABASE_URL: "https://eqyjlnwhmnvimrapjkku.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_nLdgwY4i4eZIBm5og7XdVg_NNne2xC7"
};
