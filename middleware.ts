import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Function to get Supabase instance in middleware
const getSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables in middleware');
    return null;
  }
  
  return createClient(supabaseUrl, supabaseAnonKey);
};

// Paths that need authentication
const protectedPaths = [
  '/dashboard',
  '/profile',
  '/modules',
  '/lessons',
  '/settings',
];

// Paths that are accessible only for non-authenticated users
const authOnlyPaths = [
  '/auth/login',
  '/auth/signup',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/verification',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path is protected
  const isProtectedPath = protectedPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );
  
  // Check if the path is auth-only
  const isAuthOnlyPath = authOnlyPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );
  
  // Skip middleware for non-protected paths and not auth-only paths
  if (!isProtectedPath && !isAuthOnlyPath) {
    return NextResponse.next();
  }
  
  const supabase = getSupabase();
  
  if (!supabase) {
    console.error('Could not initialize Supabase client');
    // Redirect to error page or home page
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // Get the user's session
  const { data: { session } } = await supabase.auth.getSession();
  
  // Handle protected routes
  if (isProtectedPath) {
    // If user is not authenticated, redirect to login
    if (!session) {
      const redirectUrl = new URL('/auth/login', request.url);
      // Store the original URL to redirect back after login
      redirectUrl.searchParams.set('redirectUrl', pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }
  
  // Handle auth-only routes 
  if (isAuthOnlyPath && session) {
    // If user is already authenticated, redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

// Configure the middleware matcher to only run on specific paths
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