/**
 * API Route: /api/lessons/[id]
 * 
 * GET: Fetch a specific lesson by ID
 */
import { NextRequest, NextResponse } from 'next/server';
import { contentService } from '@/lib/services/content-service';
import { Database } from '@/lib/database.types';
import { createClient } from '@/lib/supabase/server';

interface RouteParams {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    
    // Get auth status
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    // Auth required for lessons
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Fetch the lesson
    const lesson = await contentService.getLesson(id);
    
    if (!lesson) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ lesson });
  } catch (error) {
    console.error(`Error in lesson API route:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch lesson' },
      { status: 500 }
    );
  }
}
