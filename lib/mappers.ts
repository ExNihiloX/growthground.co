import type { Database } from './database.types';
import type { Module, Lesson } from './services/content-service';

export function mapDbLesson(row: Database['public']['Tables']['lessons']['Row']): Lesson {
  return {
    id: row.id,
    module_id: row.module_id,
    title: row.title,
    description: row.description,
    duration: row.duration_minutes,
    core_concepts: row.core_concepts,
    analogy: row.analogy,
    order_index: row.sort_order ?? 0,
    content: row.content as any,
  };
}

export function mapDbModule(row: Database['public']['Tables']['modules']['Row']): Module {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    difficulty: row.difficulty,
    category: row.category_id || '',
    instructor: row.instructor,
    thumbnail: row.thumbnail_url || '',
    estimated_time: row.estimated_time_minutes,
    learning_outcomes: row.learning_outcomes,
    prerequisites: row.prerequisites,
    is_locked: row.is_locked,
    rating: row.rating,
    students_enrolled: row.students_enrolled,
    order_index: row.sort_order ?? 0,
    lessons: []
  };
}
