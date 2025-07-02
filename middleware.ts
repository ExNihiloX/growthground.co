import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse, type NextRequest } from 'next/server'
import { Database } from '@/lib/database.types'

export async function middleware(request: NextRequest) {
  // Create a response object that we'll modify
  const response = NextResponse.next()
  
  // Create the Supabase middleware client using auth-helpers
  const supabase = createMiddlewareClient<Database>({ 
    req: request, 
    res: response 
  })

  // Get session with error handling
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    const { pathname } = request.nextUrl
    
    if (sessionError) {
      console.error('Middleware session error:', sessionError)
    }

    // **Protect the dashboard and related routes**
    if (!session && (
      pathname.startsWith('/dashboard') ||
      pathname.startsWith('/profile') ||
      pathname.startsWith('/modules') ||
      pathname.startsWith('/lessons') ||
      pathname.startsWith('/settings') ||
      pathname.startsWith('/progress') ||
      pathname.startsWith('/achievements') ||
      pathname.startsWith('/community') ||
      pathname.startsWith('/help') ||
      pathname.startsWith('/schedule')
    )) {
      console.log('Protected route, no session - redirecting to login')
      const url = request.nextUrl.clone()
      url.pathname = '/auth/login'
      // Store the original URL to redirect back after login
      url.searchParams.set('redirectUrl', pathname)
      return NextResponse.redirect(url)
    }

    // **Redirect authenticated users away from auth pages**
    if (session && (
      pathname.startsWith('/auth/login') || 
      pathname.startsWith('/auth/signup') ||
      pathname.startsWith('/auth/forgot-password') ||
      pathname.startsWith('/auth/reset-password')
    )) {
      console.log('Auth page accessed with session - redirecting to dashboard')
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }

    // For all other requests, return the response with the updated cookies
    return response
  } catch (error) {
    console.error('Middleware error:', error)
    return response
  }
}

// Configure the middleware matcher to only run where needed
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files 
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};