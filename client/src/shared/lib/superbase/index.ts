import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
  "https://fajfkrpfkqekikigcjsu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhamZrcnBma3Fla2lraWdjanN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2ODQ5NDgsImV4cCI6MjA1MDI2MDk0OH0.GL4JAOBGOgP_-fqkT2mNk_ai_svFrZNQO9I8-nfGNf4",
);

export { supabaseClient };
