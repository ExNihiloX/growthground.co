// lib/supabase/server.ts
// This implements a server-side Supabase client for Next.js 15

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '../database.types';

/**
 * Creates a Supabase client for use in server components
 * Uses the Next.js 15 App Router's cookies() API
 */
export async function createClient() {
  // No need to await cookies() in Next.js 15
  return createServerComponentClient<Database>({
    cookies
  });
}
