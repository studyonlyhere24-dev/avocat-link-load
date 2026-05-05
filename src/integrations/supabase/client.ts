import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

function createSupabaseClient() {
  // Vite automatically exposes environment variables with VITE_ prefix via import.meta.env
  // For local development: use .env with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
  // For Vercel: set SUPABASE_URL and SUPABASE_ANON_KEY in project settings, then add build scripts to set VITE_ vars
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
  const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error(
      '[Supabase] Environment variables not configured. ' +
      'Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file for development, ' +
      'or SUPABASE_URL and SUPABASE_ANON_KEY in Vercel project settings for production.'
    );
    // Return a placeholder client for build time - will be configured properly at runtime
    return createClient<Database>(
      'https://placeholder.supabase.co',
      'placeholder-key',
      { auth: { persistSession: false } }
    );
  }

  return createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      storage: typeof window !== 'undefined' ? localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    }
  });
}

let _supabase: ReturnType<typeof createSupabaseClient> | undefined;

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";
export const supabase = new Proxy({} as ReturnType<typeof createSupabaseClient>, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  },
});
