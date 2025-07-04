import { createClient } from '@/lib/supabase/client';
import { Database } from '@/lib/database.types';

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

class ContentServiceClient {
  private mapDbModuleToComponent(dbModule: Database['public']['Tables']['modules']['Row'], lessons: Database['public']['Tables']['lessons']['Row'][]): Module {
    return {
      id: dbModule.id,
      title: dbModule.title || 'Untitled Module',
      description: dbModule.description || 'No description available',
      thumbnail: dbModule.thumbnail_url || '/images/module-placeholder.jpg',
      lessons: lessons.map((lesson) => this.mapDbLessonToComponent(lesson)),
      progress: 0, // Client cannot calculate user progress
      estimatedTime: dbModule.estimated_time_minutes || 0,
      difficulty: (dbModule.difficulty as 'Beginner' | 'Intermediate' | 'Advanced') || 'Beginner',
      category: 'General',
      isLocked: Boolean(dbModule.is_locked),
      instructor: dbModule.instructor || 'GrowthGround Staff',
      rating: typeof dbModule.rating === 'number' ? dbModule.rating : 4.5,
      studentsEnrolled: typeof dbModule.students_enrolled === 'number' ? dbModule.students_enrolled : 0,
      learning_outcomes: Array.isArray(dbModule.learning_outcomes) ? dbModule.learning_outcomes : [],
      prerequisites: Array.isArray(dbModule.prerequisites) ? dbModule.prerequisites : null,
    };
  }

  private mapDbLessonToComponent(dbLesson: Database['public']['Tables']['lessons']['Row']): Lesson {
    return {
      id: dbLesson.id,
      title: dbLesson.title,
      description: dbLesson.description || '',
      duration: dbLesson.duration_minutes || 0,
      content: typeof dbLesson.content === 'string' ? dbLesson.content : JSON.stringify(dbLesson.content || {}),
      order: dbLesson.sort_order || 0,
      completed: false, // Client cannot know if completed
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
    const { data: module, error: moduleError } = await supabase
      .from('modules')
      .select('*')
      .eq('id', moduleId)
      .single();
    if (moduleError || !module) {
      console.error('Error fetching module:', moduleError);
      return null;
    }
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
}

export const contentServiceClient = new ContentServiceClient(); 