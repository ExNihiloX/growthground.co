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
          // Use set with empty value instead of remove (which isn't available)
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // Use the more secure getUser() which validates the session on the server
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Define protected routes
  const protectedRoutes = [
    '/dashboard',
    '/profile',
    '/modules',
    '/lessons',
    '/settings',
    '/progress',
    '/achievements',
    '/community',
    '/help',
    '/schedule'
  ];

  const isProtectedRoute = protectedRoutes.some(path => pathname.startsWith(path));

  // If the user is not logged in and trying to access a protected route, redirect them
  if (!user && isProtectedRoute) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // If the user is logged in and trying to access an auth page (except callback), redirect them
  if (user && pathname.startsWith('/auth')) {
    if (pathname !== '/auth/callback') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}