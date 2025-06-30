import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

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
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          // Next.js doesn't have a remove method on response.cookies, so we set with empty value
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { pathname } = request.nextUrl

  // Log for debugging session detection
  console.log('Middleware checking:', pathname, 'Session:', session ? 'Yes' : 'No')

  // **Protect the dashboard and related routes**
  if (!session && (
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/profile') ||
    pathname.startsWith('/modules') ||
    pathname.startsWith('/lessons') ||
    pathname.startsWith('/settings')
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
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};