/**
 * API Route: /api/modules
 * 
 * GET: Fetch all modules, optionally including their lessons
 */
import { NextRequest, NextResponse } from 'next/server';
import { contentService } from '@/lib/services/content-service';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/lib/database.types';

export async function GET(request: NextRequest) {
  try {
    // Get the include_lessons query parameter
    const { searchParams } = new URL(request.url);
    const includeLessons = searchParams.get('include_lessons') === 'true';
    
    // Get auth status for protected routes
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const { data: { session } } = await supabase.auth.getSession();
    
    // Fetch modules from the service
    const modules = await contentService.getModules(includeLessons);
    
    return NextResponse.json({ 
      modules,
      userAuthenticated: !!session 
    });
  } catch (error) {
    console.error('Error in modules API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch modules' },
      { status: 500 }
    );
  }
}
