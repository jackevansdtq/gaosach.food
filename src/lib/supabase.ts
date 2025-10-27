import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jsomezfryjzpsagglngt.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impzb21lemZyeWp6cHNhZ2dsbmd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1NzkxMzIsImV4cCI6MjA3NzE1NTEzMn0.3jucBlVw1GefopS_bbPPmdarDc5SOg9T71rfdyhv6j8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
