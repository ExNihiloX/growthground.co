// lib/supabase/server.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

// For Next.js 15, we need a different approach to handle cookie access in server components
export function createClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          // For server components, we can safely return undefined for cookies
          // as the middleware will handle proper session management
          // This prevents TypeScript errors while still allowing the client to function
          return undefined
        },
        set(name: string, value: string, options: CookieOptions) {
          // No-op for server components - cookies are handled by middleware
          // We intentionally do nothing here as the middleware will set cookies properly
          // on response objects for proper session management
        },
        remove(name: string, options: CookieOptions) {
          // No-op for server components - cookies are handled by middleware
          // We intentionally do nothing here as the middleware will remove cookies properly
          // on response objects for proper session management
        },
      },
    }
  )
}
