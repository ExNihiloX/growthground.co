/**
 * API Route: /api/progress
 * 
 * GET: Fetch user's progress data for all modules
 * POST: Update lesson completion status
/**
 * API Route: /api/progress
 * 
 * GET: Fetch user's progress data for all modules
 * POST: Update lesson completion status
 */

import { NextRequest, NextResponse } from 'next/server';
import { contentService } from '@/lib/services/content-service';
import { createClient } from '@/lib/supabase/server';

interface ProgressResponse {
  moduleProgress: Record<string, number>;
  completedLessons: string[];
  totalTimeSpent?: number;
  currentStreak?: number;
  lastActivity?: string | null;
}

interface ProgressRequestBody {
  lessonId: string;
  moduleId: string;
  timeSpent?: number;
}

export async function GET(request: NextRequest): Promise<NextResponse<ProgressResponse | { error: string }>> {
  try {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    const userId = session.user.id;
    const progress = await contentService.getUserProgress(userId);
    return NextResponse.json({
      moduleProgress: progress.moduleProgress,
      completedLessons: Array.from(progress.completedLessons) as string[],
      totalTimeSpent: progress.totalTimeSpent as number | undefined,
      currentStreak: progress.currentStreak as number | undefined,
      lastActivity: progress.lastActivity as string | null,
    });
  } catch (error) {
    console.error('Error in progress API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progress data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<{ success: boolean } & ProgressResponse | { error: string }>> {
  try {
    const body: ProgressRequestBody = await request.json();
    const { lessonId, moduleId, timeSpent } = body;
    if (!lessonId || !moduleId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    const userId = session.user.id;
    await contentService.completeLesson(userId, lessonId, moduleId, timeSpent || 0);
    const progress = await contentService.getUserProgress(userId);
    return NextResponse.json({
      success: true,
      moduleProgress: progress.moduleProgress,
      completedLessons: Array.from(progress.completedLessons) as string[],
      totalTimeSpent: progress.totalTimeSpent as number | undefined,
      currentStreak: progress.currentStreak as number | undefined,
      lastActivity: progress.lastActivity as string | null,
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    );
  }
}
