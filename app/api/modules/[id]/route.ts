/**
 * API Route: /api/modules/[id]
 * 
 * GET: Fetch a specific module by ID with its lessons
 */
import { NextRequest, NextResponse } from 'next/server';
import { contentService } from '@/lib/services/content-service';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/lib/database.types';

interface RouteParams {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    
    // Get auth status
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const { data: { session } } = await supabase.auth.getSession();
    
    // Fetch the module with its lessons
    const module = await contentService.getModule(id);
    
    if (!module) {
      return NextResponse.json(
        { error: 'Module not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      module,
      userAuthenticated: !!session 
    });
  } catch (error) {
    console.error(`Error in module API route:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch module' },
      { status: 500 }
    );
  }
}
