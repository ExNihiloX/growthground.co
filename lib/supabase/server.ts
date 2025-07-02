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
  // In Next.js 15, we need to await the cookies() call
  const cookieStore = await cookies();
  
  return createServerComponentClient<Database>({
    cookies: () => cookieStore
  });
}