import type { Database } from './database.types';
import type { Module, Lesson } from './services/content-service';
// Import utility functions for category handling
import { getCategoryById } from './utils/category-utils';

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

export async function mapDbModule(row: Database['public']['Tables']['modules']['Row']): Promise<Module> {
  try {
    // Fetch category information if we have a category ID
    const categoryInfo = await getCategoryById(row.category_id);

    // Return module with safe defaults for any missing data
    return {
      id: row.id,
      title: row.title || 'Untitled Module',
      description: row.description || 'No description available',
      difficulty: row.difficulty || 'Beginner',
      category: categoryInfo.name, // Use resolved category name instead of ID
      categoryId: row.category_id || null, // Store original ID for reference
      instructor: row.instructor || 'GrowthGround Staff',
      thumbnail: row.thumbnail_url || '/images/module-placeholder.jpg',
      estimated_time: row.estimated_time_minutes || 0,
      learning_outcomes: Array.isArray(row.learning_outcomes) ? row.learning_outcomes : [],
      prerequisites: Array.isArray(row.prerequisites) ? row.prerequisites : null,
      is_locked: Boolean(row.is_locked),
      rating: typeof row.rating === 'number' ? row.rating : 4.5,
      students_enrolled: typeof row.students_enrolled === 'number' ? row.students_enrolled : 0,
      order_index: typeof row.sort_order === 'number' ? row.sort_order : 0,
      lessons: []
    };
  } catch (err) {
    console.error('Error mapping module data:', err);
    
    // Return a minimal valid module to prevent UI errors
    return {
      id: row.id || 'error-module',
      title: row.title || 'Error Loading Module',
      description: 'There was a problem loading this module data.',
      difficulty: 'Beginner',
      category: 'General',
      categoryId: null,
      instructor: 'Unknown',
      thumbnail: '/images/module-placeholder.jpg',
      estimated_time: 0,
      learning_outcomes: [],
      prerequisites: null,
      is_locked: false,
      rating: 0,
      students_enrolled: 0,
      order_index: 999,
      lessons: []
    };
  }
}
