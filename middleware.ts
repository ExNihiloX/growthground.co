import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Create a Supabase client that can handle cookies specific to this request
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
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
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  // If none of the above conditions are met, continue to the requested page
  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*', 
    '/modules/:path*',
    '/lessons/:path*',
    '/settings/:path*',
    '/auth/:path*',
  ],
};