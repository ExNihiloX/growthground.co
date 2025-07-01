// lib/supabase/server.ts
// This implements a server-side Supabase client for Next.js 15

// Use the correct import for Next.js 15
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '../database.types';

// For Next.js 15, we need to use an async function to properly await cookies()
export async function createClient() {
  // The createServerComponentClient expects the cookies() function itself
  return createServerComponentClient<Database>({ cookies })
}
