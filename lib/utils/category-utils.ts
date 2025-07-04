/**
 * Utility functions for category management
 */

import { createClient } from '@/lib/supabase/client';

// Category cache to prevent repeated lookups
let categoryCache: Record<string, {name: string, color: string | null}> = {};

/**
 * Get category information by ID
 */
export async function getCategoryById(id: string | null): Promise<{name: string, color: string | null}> {
  // Return default for null ID
  if (!id) return { name: 'General', color: null };
  
  // Return from cache if available
  if (categoryCache[id]) return categoryCache[id];
  
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('categories')
      .select('name, color')
      .eq('id', id)
      .single();
      
    if (error || !data) {
      console.error('Error fetching category:', error);
      return { name: 'General', color: null };
    }
    
    // Cache the result
    categoryCache[id] = { 
      name: data.name, 
      color: data.color 
    };
    
    return categoryCache[id];
  } catch (err) {
    console.error('Unexpected error fetching category:', err);
    return { name: 'General', color: null };
  }
}

/**
 * Map from category name to CSS color classes
 */
export function getCategoryColorClasses(categoryName: string): string {
  switch (categoryName) {
    case 'Fundamentals': return 'bg-blue-100 text-blue-800';
    case 'Design': return 'bg-purple-100 text-purple-800';
    case 'Development': return 'bg-orange-100 text-orange-800';
    case 'Business': return 'bg-green-100 text-green-800';
    case 'Operations': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

/**
 * Bulk pre-load categories into cache
 */
export async function prefetchCategories(): Promise<void> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('categories')
      .select('id, name, color');
      
    if (error || !data) {
      console.error('Error pre-fetching categories:', error);
      return;
    }
    
    // Update cache with all categories
    data.forEach(cat => {
      categoryCache[cat.id] = { 
        name: cat.name, 
        color: cat.color 
      };
    });
  } catch (err) {
    console.error('Unexpected error pre-fetching categories:', err);
  }
}

/**
 * Clear the category cache
 */
export function clearCategoryCache(): void {
  categoryCache = {};
}
