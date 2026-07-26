import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
});

export type Inquiry = {
  id?: string;
  name: string;
  email: string;
  company?: string | null;
  service?: string | null;
  message?: string | null;
  status?: string;
  created_at?: string;
};

export type Subscriber = {
  id?: string;
  email: string;
  created_at?: string;
};
