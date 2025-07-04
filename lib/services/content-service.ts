/**
 * Content Service
 * 
 * Provides functions for fetching and updating curriculum content and user progress.
 * Acts as a layer between the UI components and the Supabase database.
 */

import { createClient as createSupabaseClient } from '@/lib/supabase/client';
import { Database } from '../database.types';

// Types for modules and lessons
export interface Module {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  category: string; // Display name of the category
  categoryId: string | null; // ID reference to categories table
  instructor: string;
  thumbnail: string;
  estimated_time: number;
  learning_outcomes: string[];
  prerequisites: string[] | null;
  is_locked: boolean;
  rating: number;
  students_enrolled: number | null;
  order_index: number;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  description: string | null;
  duration: number;
  core_concepts: string[];
  analogy: string | null;
  order_index: number;
  content: {
    hook?: string;
    coreExplanation?: string[];
    strategicInsights?: string[];
    talkingToDevs?: string[];
    interactiveElementBrief?: string;
  } | null;
}

export interface UserLessonProgress {
  id?: string;
  user_id: string;
  lesson_id: string;
  module_id: string;
  completed: boolean;
  time_spent: number;
  completed_at?: string | null;
}

export interface ModuleProgress {
  module_id: string;
  total_lessons: number;
  completed_lessons: number;
  progress_percentage: number;
}

class ContentService {
  private supabase;
  
  constructor() {
    // Initialize with the authenticated Supabase client that uses cookies
    this.supabase = createSupabaseClient();
  }
  
  /**
   * Get all modules (optionally with lessons)
   */
  async getModules(includeLessons: boolean = false): Promise<Module[]> {
    let query = this.supabase
      .from('modules')
      .select('*')
      .order('order_index');
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching modules:', error);
      return [];
    }
    
    // Convert to Module type and optionally fetch lessons
    const modules = data as Module[];
    
    if (includeLessons) {
      // Fetch lessons for each module
      for (const module of modules) {
        const { data: lessonData, error: lessonError } = await this.supabase
          .from('lessons')
          .select('*')
          .eq('module_id', module.id)
          .order('order_index');
          
        if (!lessonError && lessonData) {
          module.lessons = lessonData as Lesson[];
        }
      }
    }
    
    return modules;
  }
  
  /**
   * Get a single module by ID with its lessons
   */
  async getModule(moduleId: string): Promise<Module | null> {
    const { data, error } = await this.supabase
      .from('modules')
      .select('*')
      .eq('id', moduleId)
      .single();
      
    if (error || !data) {
      console.error('Error fetching module:', error);
      return null;
    }
    
    const module = data as Module;
    
    // Fetch lessons for the module
    const { data: lessonData, error: lessonError } = await this.supabase
      .from('lessons')
      .select('*')
      .eq('module_id', moduleId)
      .order('order_index');
      
    if (!lessonError && lessonData) {
      module.lessons = lessonData as Lesson[];
    } else {
      module.lessons = [];
    }
    
    return module;
  }
  
  /**
   * Get a single lesson by ID
   */
  async getLesson(lessonId: string): Promise<Lesson | null> {
    const { data, error } = await this.supabase
      .from('lessons')
      .select('*')
      .eq('id', lessonId)
      .single();
      
    if (error || !data) {
      console.error('Error fetching lesson:', error);
      return null;
    }
    
    return data as Lesson;
  }
  
  /**
   * Get lessons for a specific module
   */
  async getLessons(moduleId: string): Promise<Lesson[]> {
    const { data, error } = await this.supabase
      .from('lessons')
      .select('*')
      .eq('module_id', moduleId)
      .order('order_index');
      
    if (error || !data) {
      console.error('Error fetching lessons:', error);
      return [];
    }
    
    return data as Lesson[];
  }
  
  /**
   * Mark a lesson as completed for a user
   */
  async completeLesson(userId: string, lessonId: string, moduleId: string, timeSpent: number = 0): Promise<boolean> {
    const { error } = await this.supabase
      .from('user_lesson_completions')
      .upsert({
        user_id: userId,
        lesson_id: lessonId,
        module_id: moduleId,
        completed: true,
        time_spent: timeSpent,
        completed_at: new Date().toISOString()
      }, { onConflict: 'user_id,lesson_id' });
      
    if (error) {
      console.error('Error marking lesson as completed:', error);
      return false;
    }
    
    // Update user_progress table with aggregated stats
    await this.updateUserProgress(userId);
    
    return true;
  }
  
  /**
   * Update user progress for the entire curriculum
   * This calculates and stores aggregate progress stats
   */
  private async updateUserProgress(userId: string): Promise<void> {
    try {
      // Get all modules
      const modules = await this.getModules();
      
      // Get all completed lessons for the user
      const { data: completions, error } = await this.supabase
        .from('user_lesson_completions')
        .select('*')
        .eq('user_id', userId)
        .eq('completed', true);
        
      if (error) {
        console.error('Error fetching lesson completions:', error);
        return;
      }
      
      // Calculate progress for each module
      for (const module of modules) {
        // Get lessons for this module
        const { data: moduleLessons, error: lessonError } = await this.supabase
          .from('lessons')
          .select('id')
          .eq('module_id', module.id);
          
        if (lessonError || !moduleLessons) {
          console.error('Error fetching module lessons:', lessonError);
          continue;
        }
        
        // Count completed lessons for this module
        const completedLessonsCount = completions?.filter(
          completion => completion.module_id === module.id && completion.completed
        ).length || 0;
        
        // Calculate progress percentage
        const totalLessons = moduleLessons.length;
        const progressPercentage = totalLessons > 0 
          ? Math.round((completedLessonsCount / totalLessons) * 100) 
          : 0;
          
        // Update user_progress table
        await this.supabase
          .from('user_progress')
          .upsert({
            user_id: userId,
            module_id: module.id,
            completed_lessons: completedLessonsCount,
            total_lessons: totalLessons,
            progress_percentage: progressPercentage,
            last_updated: new Date().toISOString()
          }, { onConflict: 'user_id,module_id' });
      }
    } catch (err) {
      console.error('Error updating user progress:', err);
    }
  }
  
  /**
   * Get user's progress for all modules
   */
  async getUserModuleProgress(userId: string): Promise<ModuleProgress[]> {
    const { data, error } = await this.supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId);
      
    if (error || !data) {
      console.error('Error fetching user progress:', error);
      return [];
    }
    
    return data.map(item => ({
      module_id: item.module_id,
      total_lessons: item.total_lessons,
      completed_lessons: item.completed_lessons,
      progress_percentage: item.progress_percentage
    }));
  }
  
  /**
   * Get all completed lessons for a user
   */
  async getUserCompletedLessons(userId: string): Promise<string[]> {
    const { data, error } = await this.supabase
      .from('user_lesson_completions')
      .select('lesson_id')
      .eq('user_id', userId)
      .eq('completed', true);
      
    if (error || !data) {
      console.error('Error fetching completed lessons:', error);
      return [];
    }
    
    return data.map(item => item.lesson_id);
  }
}

// Export singleton instance
export const contentService = new ContentService();
