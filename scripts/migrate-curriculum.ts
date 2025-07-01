/**
 * Enhanced Curriculum Migration Script
 * 
 * This script migrates the hardcoded curriculum data to the Supabase database.
 * It creates and populates the categories, modules, and lessons tables.
 */

import { createClient } from '@supabase/supabase-js';
import { Database } from '../lib/database.types';
import dotenv from 'dotenv';

// Import individual curriculum module files
import { theDigitalLandscape } from '../lib/curriculum/modules/the-digital-landscape';
import { theDevelopersToolkit } from '../lib/curriculum/modules/the-developers-toolkit';
import { howSoftwareIsBuilt } from '../lib/curriculum/modules/how-software-is-built';
import { userExperienceDesign } from '../lib/curriculum/modules/user-experience-design';
import { frontendDevelopment } from '../lib/curriculum/modules/frontend-development';
import { backendDevelopment } from '../lib/curriculum/modules/backend-development';
import { mobileDevelopment } from '../lib/curriculum/modules/mobile-development';
import { theTechStack } from '../lib/curriculum/modules/the-tech-stack';
import { qualitySecurity } from '../lib/curriculum/modules/quality-security';
import { leveragingDataAi } from '../lib/curriculum/modules/leveraging-data-ai';
import { buildingWithAiIdes } from '../lib/curriculum/modules/building-with-ai-ides';
import { leadershipCommunication } from '../lib/curriculum/modules/leadership-communication';

// Import the module types
import { CurriculumModule } from '../lib/curriculum/types';

// Combine all modules into a single array
const masterCurriculum: CurriculumModule[] = [
  theDigitalLandscape,
  theDevelopersToolkit,
  howSoftwareIsBuilt,
  userExperienceDesign,
  frontendDevelopment,
  backendDevelopment,
  mobileDevelopment,
  theTechStack,
  qualitySecurity,
  leveragingDataAi,
  buildingWithAiIdes,
  leadershipCommunication
];

console.log('====== CURRICULUM MIGRATION SCRIPT ======');
console.log('Script starting at', new Date().toISOString());
console.log('Current working directory:', process.cwd());
console.log('Node.js version:', process.version);

// Load environment variables from .env.local
console.log('Loading environment from .env.local...');
dotenv.config({ path: '.env.local' });

// Parse command line options
console.log('Command line arguments:', process.argv);

// Parse options from command line arguments
const options = {
  dryRun: process.argv.includes('--dry-run'),
  cleanup: process.argv.includes('--cleanup'),
  verbose: process.argv.includes('--verbose')
};

console.log('Fixed parsed options:', options);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

console.log('Environment variables check:', {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'defined' : 'missing',
  serviceKey: process.env.SUPABASE_SERVICE_KEY ? 'defined' : 'missing'
});

console.log('Verifying imported module content...');
console.log('theDigitalLandscape:', typeof theDigitalLandscape === 'object' ? 'loaded' : 'missing');
console.log('theDevelopersToolkit:', typeof theDevelopersToolkit === 'object' ? 'loaded' : 'missing');
console.log('howSoftwareIsBuilt:', typeof howSoftwareIsBuilt === 'object' ? 'loaded' : 'missing');
console.log('theTechStack:', typeof theTechStack === 'object' ? 'loaded' : 'missing');

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing Supabase URL or service key');
  process.exit(1);
}

// Initialize Supabase client with service role key for admin operations
const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey);

interface CategoryInsert {
  id: string;
  name: string;
  description: string | null;
  color: string | null;
  sort_order: number | null;
}

interface ModuleInsert {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  category_id: string;
  instructor: string;
  thumbnail_url: string | null;
  estimated_time_minutes: number;
  learning_outcomes: string[];
  prerequisites: string[] | null;
  is_locked: boolean;
  rating: number;
  students_enrolled: number;
  sort_order: number | null;
}

interface LessonInsert {
  id: string;
  module_id: string;
  title: string;
  description: string | null;
  duration_minutes: number;
  core_concepts: string[];
  analogy: string | null;
  sort_order: number | null;
  content: object | null;
}

/**
 * Extract unique categories from curriculum data
 */
function extractCategories(): CategoryInsert[] {
  const categoryMap = new Map<string, { name: string; count: number }>();
  
  // Extract unique categories and count modules in each
  masterCurriculum.forEach((module) => {
    const categoryName = module.category;
    if (!categoryMap.has(categoryName)) {
      // Create a sanitized ID from the category name
      const categoryId = categoryName.toLowerCase().replace(/\s+/g, '-');
      categoryMap.set(categoryId, { name: categoryName, count: 1 });
    } else {
      const category = categoryMap.get(categoryName)!;
      category.count += 1;
    }
  });
  
  // Convert to array for insertion
  return Array.from(categoryMap.entries()).map(([id, category], index) => ({
    id,
    name: category.name,
    description: `Contains ${category.count} modules`,
    color: null, // Using default color from DB
    sort_order: index
  }));
}

// Function removed as the logic is now directly implemented in mapModules

/**
 * Map curriculum modules to database format
 */
function mapModules(): ModuleInsert[] {
  return masterCurriculum.map(module => {
    // Convert category name to ID (slugified)
    const categoryId = module.category.toLowerCase().replace(/\s+/g, '-');
    
    // Get custom sort order based on module ID
    // Define the order mapping here to ensure modules are sorted according to specification
    const orderMap: Record<string, number> = {
      'the-digital-landscape': 1,
      'the-developers-toolkit': 2,
      'how-software-is-built': 3,
      'user-experience-design': 4,
      'frontend-development': 5,
      'backend-development': 6, 
      'mobile-development': 7,
      'the-tech-stack': 8,
      'quality-security': 9,
      'leveraging-data-ai': 10,
      'building-with-ai-ides': 11,
      'leadership-communication': 12
    };
    
    const sortOrder = module.id in orderMap ? orderMap[module.id] : 100;
    
    console.log(`Module: ${module.title} -> ID: ${module.id} -> Sort Order: ${sortOrder}`);
    
    return {
      id: module.id,
      title: module.title,
      description: module.description,
      difficulty: module.difficulty,
      category_id: categoryId,
      instructor: module.instructor,
      thumbnail_url: module.thumbnail || null,
      estimated_time_minutes: module.estimatedTime,
      learning_outcomes: module.learningOutcomes,
      prerequisites: module.prerequisites || null,
      is_locked: module.isLocked || false,
      rating: module.rating || 0,
      students_enrolled: module.studentsEnrolled || 0,
      sort_order: sortOrder
    };
  });
}

/**
 * Extract lessons from modules
 */
function extractLessons(): LessonInsert[] {
  const lessons: LessonInsert[] = [];
  
  masterCurriculum.forEach((module) => {
    module.lessons.forEach((lesson, index) => {
      lessons.push({
        id: lesson.id,
        module_id: module.id,
        title: lesson.title,
        description: lesson.content?.hook || null,
        duration_minutes: lesson.duration || 10, // Default is 10 minutes
        core_concepts: lesson.coreConcepts || [],
        analogy: lesson.analogy || null,
        sort_order: index, // Will be converted to null if undefined
        content: lesson.content || null
      });
    });
  });
  
  return lessons;
}

/**
 * Migrate categories to the database
 */
async function migrateCategories(categories: CategoryInsert[]) {
  console.log(`Migrating ${categories.length} categories...`);
  
  if (options.dryRun) {
    console.log('DRY RUN: Would insert/update categories:', categories);
    return;
  }
  
  const { error } = await supabase
    .from('categories')
    .upsert(categories, { onConflict: 'id' });
    
  if (error) {
    throw new Error(`Error inserting categories: ${error.message}`);
  }
  
  console.log(`Successfully migrated ${categories.length} categories`);
}

/**
 * Migrate modules to the database
 */
async function migrateModules(modules: ModuleInsert[]) {
  console.log(`Migrating ${modules.length} modules...`);
  
  if (options.dryRun) {
    if (options.verbose) {
      console.log('DRY RUN: Would insert/update modules:', modules);
    } else {
      console.log(`DRY RUN: Would insert/update ${modules.length} modules`);
    }
    return;
  }
  
  const { error } = await supabase
    .from('modules')
    .upsert(modules, { onConflict: 'id' });
    
  if (error) {
    throw new Error(`Error inserting modules: ${error.message}`);
  }
  
  console.log(`Successfully migrated ${modules.length} modules`);
}

/**
 * Migrate lessons to the database
 */
async function migrateLessons(lessons: LessonInsert[]) {
  console.log(`Migrating ${lessons.length} lessons...`);
  
  if (options.dryRun) {
    if (options.verbose) {
      console.log('DRY RUN: Would insert/update lessons:', lessons);
    } else {
      console.log(`DRY RUN: Would insert/update ${lessons.length} lessons`);
    }
    return;
  }
  
  const { error } = await supabase
    .from('lessons')
    .upsert(lessons, { onConflict: 'id' });
    
  if (error) {
    throw new Error(`Error inserting lessons: ${error.message}`);
  }
  
  console.log(`Successfully migrated ${lessons.length} lessons`);
}

/**
 * Clean up stale entities that no longer exist in the source
 */
async function cleanupStaleEntities(modules: ModuleInsert[], lessons: LessonInsert[]) {
  if (options.dryRun) {
    console.log('DRY RUN: Would clean up stale entities');
    return;
  }
  
  console.log('Cleaning up stale entities...');
  
  // Get module IDs that should remain
  const validModuleIds = modules.map(m => m.id);
  
  // Get lesson IDs that should remain
  const validLessonIds = lessons.map(l => l.id);
  
  // Delete stale modules
  const { error: moduleDeleteError } = await supabase
    .from('modules')
    .delete()
    .not('id', 'in', `(${validModuleIds.map(id => `'${id}'`).join(',')})`);
    
  if (moduleDeleteError) {
    console.warn(`Warning: Error cleaning up stale modules: ${moduleDeleteError.message}`);
  }
  
  // Delete stale lessons
  const { error: lessonDeleteError } = await supabase
    .from('lessons')
    .delete()
    .not('id', 'in', `(${validLessonIds.map(id => `'${id}'`).join(',')})`);
    
  if (lessonDeleteError) {
    console.warn(`Warning: Error cleaning up stale lessons: ${lessonDeleteError.message}`);
  }
  
  console.log('Cleanup completed');
}

/**
 * Validate that the migration completed successfully
 */
async function validateMigration(modules: ModuleInsert[], lessons: LessonInsert[]) {
  console.log('Validating migration results...');
  
  // Query the database for current counts
  const { data: dbModules, error: modulesError } = await supabase
    .from('modules')
    .select('id')
    .order('sort_order', { ascending: true });
  
  if (modulesError) {
    console.error('Error fetching modules for validation:', modulesError);
    return;
  }
  
  const { data: dbLessons, error: lessonsError } = await supabase
    .from('lessons')
    .select('id');
  
  if (lessonsError) {
    console.error('Error fetching lessons for validation:', lessonsError);
    return;
  }
  
  console.log('Migration validation results:');
  console.log(`- Modules: Expected ${modules.length}, Found ${dbModules?.length || 0}`);
  console.log(`- Lessons: Expected ${lessons.length}, Found ${dbLessons?.length || 0}`);
  
  if (modules.length !== (dbModules?.length || 0) || lessons.length !== (dbLessons?.length || 0)) {
    console.warn('WARNING: Count mismatch detected! Some items may not have been migrated correctly.');
  } else {
    console.log('✅ All counts match! Migration appears to be successful.');
  }
}

/**
 * Main migration function
 */
async function migrateCurriculum() {
  try {
    console.log('=======================================');
    console.log('Starting curriculum migration...');
    console.log(`Options: ${JSON.stringify(options)}`);
    console.log('=======================================');
    
    // 1. Extract and migrate categories
    console.log('\n1. Extracting categories...');
    const categories = extractCategories();
    console.log(`Found ${categories.length} categories to migrate`);
    if (options.verbose) {
      console.log('Categories:', JSON.stringify(categories, null, 2));
    }
    
    if (options.dryRun) {
      console.log('[DRY RUN] Would migrate categories:', categories);
    } else {
      console.log('Migrating categories...');
      await migrateCategories(categories);
    }
    
    // 2. Map and migrate modules
    console.log('\n2. Mapping modules...');
    const modules = mapModules();
    console.log(`Found ${modules.length} modules with ordering`);
    
    if (options.dryRun) {
      console.log('[DRY RUN] Would migrate modules:', modules);
    } else {
      console.log('Migrating modules...');
      await migrateModules(modules);
    }
    
    // 3. Extract and migrate lessons
    console.log('\n3. Extracting lessons...');
    const lessons = extractLessons();
    console.log(`Found ${lessons.length} total lessons across all modules`);
    
    if (options.dryRun) {
      console.log('[DRY RUN] Would migrate lessons (first 3 shown):', lessons.slice(0, 3));
    } else {
      console.log('Migrating lessons...');
      await migrateLessons(lessons);
    }
    
    // 4. Optional cleanup
    if (options.cleanup) {
      console.log('\n4. Running cleanup...');
      if (options.dryRun) {
        console.log('[DRY RUN] Would clean up stale entities');
      } else {
        await cleanupStaleEntities(modules, lessons);
      }
    }
    
    // 5. Validate
    console.log('\n5. Validation...');
    if (options.dryRun) {
      console.log('[DRY RUN] Would validate migration');
    } else {
      await validateMigration(modules, lessons);
    }
    
    console.log('\nCurriculum migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Stack trace:', error.stack);
    }
    process.exit(1);
  }
}

// Run the migration
migrateCurriculum();

