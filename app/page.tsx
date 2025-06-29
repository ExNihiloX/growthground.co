'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { Footer } from '@/components/layout/footer';
import { StatsOverview } from '@/components/dashboard/stats-overview';
import { ModulesGrid } from '@/components/dashboard/modules-grid';
import { LessonViewer } from '@/components/lesson/lesson-viewer';
import { CoursesPage } from '@/components/pages/courses-page';
import { ProgressPage } from '@/components/pages/progress-page';
import { AchievementsPage } from '@/components/pages/achievements-page';
import { SchedulePage } from '@/components/pages/schedule-page';
import { CommunityPage } from '@/components/pages/community-page';
import { SettingsPage } from '@/components/pages/settings-page';
import { HelpPage } from '@/components/pages/help-page';
import { TestConnection } from '@/components/test-connection';
import { useAppStore } from '@/lib/store';
import { mockUser } from '@/lib/data';
import { CurriculumModule } from '@/lib/curriculum';

export default function Home() {
  const { 
    user, 
    setUser, 
    currentModule, 
    setCurrentModule, 
    currentPage,
    setCurrentPage 
  } = useAppStore();
  
  const [viewMode, setViewMode] = useState<'dashboard' | 'lesson'>('dashboard');

  useEffect(() => {
    if (!user) {
      setUser(mockUser);
    }
  }, [user, setUser]);

  const handleStartModule = (module: CurriculumModule) => {
    setCurrentModule(module);
    setViewMode('lesson');
  };

  const handleBackToDashboard = () => {
    setViewMode('dashboard');
    setCurrentModule(null);
    setCurrentPage('dashboard');
  };

  // If in lesson view, show lesson viewer
  if (viewMode === 'lesson' && currentModule) {
    return (
      <div className="min-h-screen flex flex-col">
        <LessonViewer 
          module={currentModule} 
          onBack={handleBackToDashboard}
        />
        <Footer />
      </div>
    );
  }

  // Render different pages based on currentPage
  const renderPageContent = () => {
    switch (currentPage) {
      case 'modules':
        return <CoursesPage />;
      case 'progress':
        return <ProgressPage />;
      case 'achievements':
        return <AchievementsPage />;
      case 'schedule':
        return <SchedulePage />;
      case 'community':
        return <CommunityPage />;
      case 'settings':
        return <SettingsPage />;
      case 'help':
        return <HelpPage />;
      default:
        return (
          <>
            {/* Supabase Connection Test - Remove this after testing */}
            <div className="mb-8">
              <TestConnection />
            </div>

            {/* Welcome Section */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, {user?.name || 'Guest'}! 👋
                </h1>
                <p className="text-blue-100 text-lg">
                  Ready to continue your learning journey? Let's master the fundamentals of building great products!
                </p>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="mb-8">
              <StatsOverview />
            </div>

            {/* Modules Grid */}
            <ModulesGrid onStartModule={handleStartModule} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 lg:ml-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderPageContent()}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}