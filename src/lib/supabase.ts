import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

// Lazy initialization to prevent crash if keys are missing during build/startup
export const getSupabase = () => {
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-project')) {
    console.warn('Supabase credentials missing. Using mock mode.');
    return null;
  }
  return createClient(supabaseUrl, supabaseAnonKey);
};

export const supabase = getSupabase();
