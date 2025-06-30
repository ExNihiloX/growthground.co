'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
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
import { useAppStore } from '@/lib/store-db';
import { Module } from '@/lib/services/content-service';

export default function DashboardPage() {
  const { user: authUser, profile, isLoading } = useAuth();
  const router = useRouter();
  const { 
    setUser,
    currentPage, 
    setCurrentPage,
    currentModule,
    setCurrentModule,
    fetchModule,
    fetchUserProgress 
  } = useAppStore();
  
  const [viewMode, setViewMode] = useState<'dashboard' | 'lesson'>('dashboard');

  // Redirect unauthenticated users to home
  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push('/');
    }
  }, [authUser, isLoading, router]);

  useEffect(() => {
    if (authUser && profile && !useAppStore.getState().user) {
      // Map the authenticated user to our app user format
      const appUser = {
        id: authUser.id,
        name: profile.name || authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'User',
        email: authUser.email || '',
        avatar: profile.avatar_url || authUser.user_metadata?.avatar_url,
        joinedAt: profile.joined_at || authUser.created_at || new Date().toISOString(),
        preferences: {
          theme: 'light' as const,
          notifications: {
            email: true,
            push: false,
            reminders: true,
          },
          privacy: {
            profileVisible: true,
            progressVisible: true,
          },
          learning: {
            dailyGoal: 60,
            reminderTime: '19:00',
            autoplay: false,
          },
        },
      };
      setUser(appUser);
    }
  }, [authUser, profile, setUser]);

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't render anything if user is not authenticated
  if (!authUser) {
    return null;
  }

  // Handle loading a module and its lessons
  const handleStartModule = (module: Module) => {
    // Fetch the complete module with lessons from the API
    fetchModule(module.id).then(() => {
      setCurrentPage('lesson-viewer');
      setViewMode('lesson');
    });
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
          module={currentModule as any} /* Type cast to any to resolve type compatibility issues temporarily */
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
                  Welcome back, {profile?.name || authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'Guest'}! 👋
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