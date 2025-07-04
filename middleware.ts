import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Create a response object that we'll modify and return
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

  // Use getSession() instead of getUser() to avoid network requests in middleware
  // This provides better reliability in the middleware environment
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { pathname } = request.nextUrl

  // Helper function to check if a path matches any of our module routes
  // Examples: /modules/module-1, /modules/abc123, /modules/module-1/lessons/lesson-1
  const isModuleRoute = (path: string) => {
    return /^\/modules\/[\w-]+(\/.*)?$/.test(path)
  }

  // Define protected routes
  const protectedRoutes = [
    '/dashboard',
    '/profile',
    '/progress',
    '/achievements',
    '/community',
    '/help',
    '/schedule'
  ];

  // Check if the route is protected - either explicit route or a module route
  const isProtectedRoute = protectedRoutes.some(path => pathname.startsWith(path)) || isModuleRoute(pathname);

  console.log(`Path: ${pathname}, Protected: ${isProtectedRoute}, Session: ${!!session}`);

  // If the user is not logged in and trying to access a protected route, redirect them
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // If the user is logged in and trying to access an auth page (except callback), redirect them
  if (session && pathname.startsWith('/auth')) {
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