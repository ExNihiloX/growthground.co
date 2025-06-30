import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

// This route is critical for handling auth redirects from Supabase
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') || '/dashboard'
  
  // If there's no code, we can't do anything
  if (!code) {
    console.log('No code provided in auth callback')
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  
  // Create a response object that we'll modify with cookies
  let response = NextResponse.redirect(new URL(next, request.url))
  
  // Create a Supabase client using the same pattern as middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )
  
  // Exchange the auth code for a session 
  const { error } = await supabase.auth.exchangeCodeForSession(code)
  
  // If there was an error, redirect to login page
  if (error) {
    console.error('Auth callback error:', error)
    return NextResponse.redirect(
      new URL(`/auth/login?error=${encodeURIComponent(error.message)}`, request.url)
    )
  }
  
  console.log('Auth callback successful, redirecting to:', next)
  // Return the response which already contains the redirect and cookies
  return response
}
