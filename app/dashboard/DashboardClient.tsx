'use client';

import { useState, useMemo, useCallback } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Footer } from '@/components/layout/footer';
import StatsOverview from '@/components/dashboard/stats-overview';
import { createClient } from '@/lib/supabase/client';
import ModuleCard from '@/components/dashboard/module-card';
import { Header } from '@/components/layout/header';
import { useRouter } from 'next/navigation';

// Type definitions for better type safety
export type Lesson = {
  id: string;
  title: string;
  description: string | null;
  duration_minutes: number;
  sort_order: number;
  core_concepts?: string[];
};

export type Module = {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string | null;
  estimated_time_minutes: number;
  difficulty: string;
  category_id: string | null;
  instructor: string;
  rating: number;
  students_enrolled: number;
  is_locked: boolean;
  sort_order: number;
  lessons: Lesson[];
};

type CategoryMap = Record<string, string>;

export type DashboardClientProps = {
  modules: Module[];
  completedLessonIds: Set<string>;
  userId: string;
  profile: any;
  categories: CategoryMap;
};

export default function DashboardClient({ 
  modules, 
  completedLessonIds: initialCompletedLessons,
  userId,
  profile,
  categories
}: DashboardClientProps) {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(initialCompletedLessons);
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const router = useRouter();
  const supabase = createClient();
  
  // Calculate aggregated stats
  const stats = useMemo(() => {
    const totalLessons = modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
    const completedCount = completedLessons.size;
    const completionRate = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
    
    return {
      totalLessons,
      completedLessons: completedCount,
      completionRate,
      totalModules: modules.length,
      completedModules: modules.filter(mod => 
        mod.lessons.every(lesson => completedLessons.has(lesson.id))
      ).length,
    };
  }, [modules, completedLessons]);

  // Start a module and navigate to its lessons
  const handleStartModule = useCallback((module: Module) => {
    setCurrentModule(module);
    setCurrentPage('lesson-viewer');
    router.push(`/dashboard/modules/${module.id}`);
  }, [router]);

  // Mark a lesson as complete
  const handleLessonComplete = useCallback(async (lessonId: string, moduleId: string) => {
    try {
      // Optimistically update UI
      setCompletedLessons(prev => new Set([...prev, lessonId]));
      
      // Persist to database
      const { error } = await supabase
        .from('user_lesson_completions')
        .upsert({
          user_id: userId,
          lesson_id: lessonId,
          module_id: moduleId,
          completed_at: new Date().toISOString(),
          time_spent_minutes: 0 // This could be tracked more accurately
        });
        
      if (error) {
        console.error('Error saving lesson completion:', error);
        // Revert optimistic update if save fails
        setCompletedLessons(prev => {
          const newSet = new Set([...prev]);
          newSet.delete(lessonId);
          return newSet;
        });
      } else {
        // Refresh server data to ensure everything is in sync
        router.refresh();
      }
    } catch (err) {
      console.error('Error in lesson completion:', err);
    }
  }, [supabase, userId, router]);
  
  // Group modules by category for better organization
  const modulesByCategory = useMemo(() => {
    return modules.reduce((acc, module) => {
      const categoryId = module.category_id || 'uncategorized';
      const categoryName = categories[categoryId] || 'Uncategorized';
      
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(module);
      return acc;
    }, {} as Record<string, Module[]>);
  }, [modules, categories]);

  // Calculate total curriculum hours
  const totalHours = useMemo(() => {
    return Math.round(
      modules.reduce((total, module) => total + module.estimated_time_minutes, 0) / 60
    );
  }, [modules]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-1 lg:ml-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, {profile?.name || 'Learner'}! 👋
                </h1>
                <p className="text-blue-100 text-lg">
                  Ready to continue your learning journey? Let's master the fundamentals of building great products!
                </p>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="mb-8">
              <StatsOverview stats={stats} />
            </div>

            {/* Modules by Category */}
            <div className="space-y-12">
              {Object.entries(modulesByCategory).map(([category, modulesInCategory]) => (
                <div key={category} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modulesInCategory.map(module => (
                      <ModuleCard 
                        key={module.id}
                        module={module}
                        onStartModule={() => handleStartModule(module)}
                        completedLessons={completedLessons}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Overall Curriculum Stats */}
            <div className="mt-8 text-center">
              <p className="text-gray-500">
                {modules.length} modules • {totalHours} hours total • {stats.completionRate}% complete
              </p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
