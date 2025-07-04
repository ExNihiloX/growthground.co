/**
 * Content Service
 * 
 * Provides functions for fetching and updating curriculum content and user progress.
 * Acts as a layer between the UI components and the Supabase database.
 */

import { createClient } from '@/lib/supabase/server';
import { Database } from '@/lib/database.types';

// Type definitions that match component expectations (from lib/types.ts)
export interface Module {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  lessons: Lesson[];
  progress: number; // 0-100
  estimatedTime: number; // in minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  isLocked: boolean;
  instructor?: string;
  rating?: number;
  studentsEnrolled?: number;
  learning_outcomes?: string[];
  prerequisites?: string[] | null;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  content: string;
  videoUrl?: string;
  order: number;
  completed: boolean;
  module_id?: string;
  core_concepts?: string[];
  analogy?: string | null;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  color: string | null;
  created_at: string;
  updated_at: string;
  sort_order: number | null;
}

class ContentService {
  // Helper method to map database module to component module
  private mapDbModuleToComponent(dbModule: Database['public']['Tables']['modules']['Row'], lessons: Database['public']['Tables']['lessons']['Row'][], progress: number = 0): Module {
    return {
      id: dbModule.id,
      title: dbModule.title || 'Untitled Module',
      description: dbModule.description || 'No description available',
      thumbnail: dbModule.thumbnail_url || '/images/module-placeholder.jpg',
      lessons: lessons.map((lesson) => this.mapDbLessonToComponent(lesson)),
      progress,
      estimatedTime: dbModule.estimated_time_minutes || 0,
      difficulty: (dbModule.difficulty as 'Beginner' | 'Intermediate' | 'Advanced') || 'Beginner',
      category: 'General', // Will be resolved by category lookup
      isLocked: Boolean(dbModule.is_locked),
      instructor: dbModule.instructor || 'GrowthGround Staff',
      rating: typeof dbModule.rating === 'number' ? dbModule.rating : 4.5,
      studentsEnrolled: typeof dbModule.students_enrolled === 'number' ? dbModule.students_enrolled : 0,
      learning_outcomes: Array.isArray(dbModule.learning_outcomes) ? dbModule.learning_outcomes : [],
      prerequisites: Array.isArray(dbModule.prerequisites) ? dbModule.prerequisites : null,
    };
  }

  // Helper method to map database lesson to component lesson
  private mapDbLessonToComponent(dbLesson: Database['public']['Tables']['lessons']['Row'], completed: boolean = false): Lesson {
    return {
      id: dbLesson.id,
      title: dbLesson.title,
      description: dbLesson.description || '',
      duration: dbLesson.duration_minutes || 0,
      content: typeof dbLesson.content === 'string' ? dbLesson.content : JSON.stringify(dbLesson.content || {}),
      order: dbLesson.sort_order || 0,
      completed,
      module_id: dbLesson.module_id,
      core_concepts: dbLesson.core_concepts || [],
      analogy: dbLesson.analogy,
    };
  }

  async getModules(): Promise<Module[]> {
    const supabase = createClient();
    
    const { data: modules, error } = await supabase
      .from('modules')
      .select('*')
      .order('sort_order', { ascending: true });
    
    if (error) {
      console.error('Error fetching modules:', error);
      throw new Error(`Failed to fetch modules: ${error.message}`);
    }

    if (!modules) return [];

    // Get lessons for all modules
    const modulesWithLessons = await Promise.all(
      modules.map(async (module: Database['public']['Tables']['modules']['Row']) => {
        const { data: lessons } = await supabase
          .from('lessons')
          .select('*')
          .eq('module_id', module.id)
          .order('sort_order', { ascending: true });

        return this.mapDbModuleToComponent(module, lessons || []);
      })
    );

    return modulesWithLessons;
  }

  async getModule(moduleId: string): Promise<Module | null> {
    const supabase = createClient();
    
    // Get the module
    const { data: module, error: moduleError } = await supabase
      .from('modules')
      .select('*')
      .eq('id', moduleId)
      .single();
      
    if (moduleError || !module) {
      console.error('Error fetching module:', moduleError);
      return null;
    }
    
    // Get the lessons for this module
    const { data: lessons, error: lessonsError } = await supabase
      .from('lessons')
      .select('*')
      .eq('module_id', moduleId)
      .order('sort_order', { ascending: true });

    if (lessonsError) {
      console.error('Error fetching lessons:', lessonsError);
      return this.mapDbModuleToComponent(module, []);
    }

    return this.mapDbModuleToComponent(module, lessons || []);
  }

  async getLesson(lessonId: string, moduleId: string): Promise<Lesson | null> {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('id', lessonId)
      .eq('module_id', moduleId)
      .single();
      
    if (error || !data) {
      console.error('Error fetching lesson:', error);
      return null;
    }
    
    return this.mapDbLessonToComponent(data);
  }

  async getCategories(): Promise<Category[]> {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching categories:', error);
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }

    return data || [];
  }

  async getUserProgress(userId: string) {
    const supabase = createClient();
    
    // Get user's lesson completions
    const { data: completions, error: completionsError } = await supabase
      .from('user_lesson_completions')
      .select('*')
      .eq('user_id', userId);

    if (completionsError) {
      console.error('Error fetching user completions:', completionsError);
      return { completedLessons: new Set(), moduleProgress: {} };
    }

    // Get user's overall progress
    const { data: progress, error: progressError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (progressError && progressError.code !== 'PGRST116') { // PGRST116 is "not found"
      console.error('Error fetching user progress:', progressError);
    }

    // Convert completions to a Set for easy lookup
    const completedLessons = new Set(completions?.map((c: Database['public']['Tables']['user_lesson_completions']['Row']) => c.lesson_id) || []);

    // Calculate module progress
    const moduleProgress: Record<string, number> = {};
    if (completions) {
      const moduleCompletions = completions.reduce((acc: Record<string, number>, completion: Database['public']['Tables']['user_lesson_completions']['Row']) => {
        acc[completion.module_id] = (acc[completion.module_id] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Get total lessons per module to calculate percentages
      const modules = await this.getModules();
      for (const module of modules) {
        const completedInModule = moduleCompletions[module.id] || 0;
        const totalLessons = module.lessons?.length || 0;
        moduleProgress[module.id] = totalLessons > 0 ? Math.round((completedInModule / totalLessons) * 100) : 0;
      }
    }

    return {
      completedLessons,
      moduleProgress,
      totalTimeSpent: progress?.total_time_spent_minutes || 0,
      currentStreak: progress?.current_streak_days || 0,
      lastActivity: progress?.last_activity_date || null
    };
  }

  async completeLesson(userId: string, lessonId: string, moduleId: string, timeSpentMinutes: number = 1) {
    const supabase = createClient();
    
    const { error } = await supabase
      .from('user_lesson_completions')
      .upsert({
        user_id: userId,
        lesson_id: lessonId,
        module_id: moduleId,
        completed_at: new Date().toISOString(),
        time_spent_minutes: timeSpentMinutes
      });
      
    if (error) {
      console.error('Error completing lesson:', error);
      throw new Error(`Failed to complete lesson: ${error.message}`);
    }

    // Update user's overall progress
    const { error: progressError } = await supabase
          .from('user_progress')
          .upsert({
            user_id: userId,
        last_activity_date: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (progressError) {
      console.error('Error updating user progress:', progressError);
    }
  }
}

export const contentService = new ContentService();

// This file is now a server-only export for the content service.
// If you need client-side access, import from './content-service.client'.
export * from './content-service.server';
