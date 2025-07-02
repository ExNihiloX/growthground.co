'use client';

import { useMemo } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Footer } from '@/components/layout/footer';
import StatsOverview from '@/components/dashboard/stats-overview';
import ModuleCard from '@/components/dashboard/module-card';
import { Header } from '@/components/layout/header';
import { useRouter } from 'next/navigation';

export type Lesson = { id: string };
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
  sort_order: number | null;
  lessons: Lesson[];
};

type CategoryMap = Record<string, string>;
type ProgressMap = Record<string, number>;

export type DashboardClientProps = {
  profile: any;
  activeModules: Module[];
  nextModules: Module[];
  allModules: Module[];
  categories: CategoryMap;
  userProgress: ProgressMap;
  userId: string;
};

export default function DashboardClient({
  profile,
  activeModules,
  nextModules,
  allModules,
  categories,
  userProgress,
  userId
}: DashboardClientProps) {
  const router = useRouter();

  const handleStartModule = (module: Module) => {
    router.push(`/dashboard/modules/${module.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar currentPage="dashboard" />
        <main className="flex-1 lg:ml-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, {profile?.name || 'Learner'}! 👋
                </h1>
                <p className="text-blue-100 text-lg">
                  {activeModules.length > 0
                    ? "Let's pick up where you left off."
                    : 'Ready to start your learning journey?'}
                </p>
              </div>
            </div>

            {/* Section 1: Continue Learning */}
            {activeModules.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Continue Learning</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeModules.map(module => (
                    <ModuleCard
                      key={module.id}
                      module={module}
                      onStartModule={() => handleStartModule(module)}
                      progress={userProgress[module.id] || 0}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Section 2: Next Up For You */}
            {nextModules.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Up For You</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {nextModules.map(module => (
                    <ModuleCard
                      key={module.id}
                      module={module}
                      onStartModule={() => handleStartModule(module)}
                      progress={0}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Section 3: Explore All Modules */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Explore All Modules</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allModules.map(module => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    onStartModule={() => handleStartModule(module)}
                    progress={userProgress[module.id] || 0}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
