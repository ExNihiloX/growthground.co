import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Create a response object that will be modified with cookies
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Create a Supabase client that handles cookies between request and response
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          // Set cookies on both request and response to keep them in sync
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          // Remove cookies from both request and response
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          // Next.js ResponseCookies doesn't have remove method, so we set with empty value and same options
          response.cookies.set({
            name,
            value: '',
            ...options
          })
        },
      },
    }
  )

  // Get the current user session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { pathname } = request.nextUrl

  console.log('Middleware running for path:', pathname, 'Session exists:', !!session)

  // **Protect the dashboard and related routes**
  // If no session exists and the user is trying to access protected routes,
  // redirect them to the login page.
  if (!session && (
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/profile') ||
    pathname.startsWith('/modules') ||
    pathname.startsWith('/lessons') ||
    pathname.startsWith('/settings')
  )) {
    console.log('No session found, redirecting to login')
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
    console.log('Session found, redirecting to dashboard')
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  // If none of the above conditions are met, continue to the requested page
  console.log('Continuing to requested page')
  return response
}

// Configure the middleware matcher to only run where needed
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (e.g. robots.txt)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};