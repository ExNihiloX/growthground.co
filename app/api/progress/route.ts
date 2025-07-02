/**
 * API Route: /api/progress
 * 
 * GET: Fetch user's progress data for all modules
 * POST: Update lesson completion status
 */
import { NextRequest, NextResponse } from 'next/server';
import { contentService } from '@/lib/services/content-service';
import { Database } from '@/lib/database.types';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    // Authentication required for progress data
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const userId = session.user.id;
    
    // Fetch progress data
    const moduleProgress = await contentService.getUserModuleProgress(userId);
    const completedLessons = await contentService.getUserCompletedLessons(userId);
    
    return NextResponse.json({
      moduleProgress,
      completedLessons
    });
  } catch (error) {
    console.error('Error in progress API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progress data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { lessonId, moduleId, timeSpent } = body;
    
    if (!lessonId || !moduleId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Authentication check
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const userId = session.user.id;
    
    // Mark lesson as completed
    const success = await contentService.completeLesson(
      userId, 
      lessonId, 
      moduleId, 
      timeSpent || 0
    );
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update lesson completion' },
        { status: 500 }
      );
    }
    
    // Return updated progress data
    const moduleProgress = await contentService.getUserModuleProgress(userId);
    const completedLessons = await contentService.getUserCompletedLessons(userId);
    
    return NextResponse.json({
      success: true,
      moduleProgress,
      completedLessons
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    );
  }
}
