// lib/supabase/server.ts
// This implements a server-side Supabase client for Next.js 15

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '../database.types';

export function createClient() {
  return createServerComponentClient<Database>({ cookies });
}
