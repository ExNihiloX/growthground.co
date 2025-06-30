/**
 * Curriculum Migration Script
 * 
 * This script migrates the hardcoded curriculum data to the Supabase database.
 * It creates and populates the modules and lessons tables.
 */

import { createClient } from '@supabase/supabase-js';
import { CurriculumModule, masterCurriculum } from '../lib/curriculum';
import { Database } from '../lib/database.types';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Initialize Supabase client with service role key for admin operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing Supabase URL or service key');
  process.exit(1);
}

const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey);

interface ModuleInsert {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  category: string;
  instructor: string;
  thumbnail: string;
  estimated_time: number;
  learning_outcomes: string[];
  prerequisites: string[] | null;
  is_locked: boolean;
  rating: number;
  students_enrolled: number | null;
  order_index: number;
}

interface LessonInsert {
  id: string;
  module_id: string;
  title: string;
  description: string | null;
  duration: number;
  core_concepts: string[];
  analogy: string | null;
  order_index: number;
  content: object | null;
}

async function migrateCurriculum() {
  try {
    console.log('Starting curriculum migration...');
    
    // 1. Migrate modules
    console.log('Migrating modules...');
    const modules: ModuleInsert[] = masterCurriculum.map((module, index) => ({
      id: module.id,
      title: module.title,
      description: module.description,
      difficulty: module.difficulty,
      category: module.category,
      instructor: module.instructor,
      thumbnail: module.thumbnail,
      estimated_time: module.estimatedTime,
      learning_outcomes: module.learningOutcomes,
      prerequisites: module.prerequisites || null,
      is_locked: module.isLocked || false,
      rating: module.rating || 0,
      students_enrolled: module.studentsEnrolled || null,
      order_index: index
    }));
    
    // Upsert modules (insert if not exists, update if exists)
    const { error: modulesError } = await supabase
      .from('modules')
      .upsert(modules, { onConflict: 'id' });
      
    if (modulesError) {
      throw new Error(`Error inserting modules: ${modulesError.message}`);
    }
    
    console.log(`Successfully migrated ${modules.length} modules`);
    
    // 2. Migrate lessons
    console.log('Migrating lessons...');
    const lessons: LessonInsert[] = [];
    
    masterCurriculum.forEach((module) => {
      module.lessons.forEach((lesson, index) => {
        lessons.push({
          id: lesson.id,
          module_id: module.id,
          title: lesson.title,
          description: lesson.content?.hook || null, // Using content hook as description since summary doesn't exist
          duration: lesson.duration,
          core_concepts: lesson.coreConcepts,
          analogy: lesson.analogy || null,
          order_index: index,
          content: lesson.content || null
        });
      });
    });
    
    // Upsert lessons (insert if not exists, update if exists)
    const { error: lessonsError } = await supabase
      .from('lessons')
      .upsert(lessons, { onConflict: 'id' });
      
    if (lessonsError) {
      throw new Error(`Error inserting lessons: ${lessonsError.message}`);
    }
    
    console.log(`Successfully migrated ${lessons.length} lessons`);
    
    console.log('Curriculum migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration
migrateCurriculum();
