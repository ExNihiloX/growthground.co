/**
 * Database-connected App Store
 * 
 * This is a modified version of the original store that fetches data from the database
 * via API routes instead of using hardcoded data.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Lesson, UserProgress, User, Achievement, CommunityPost, ScheduleEvent, SearchResult } from './types';
import { Module } from './services/content-service';

interface LessonCompletion {
  id: string;
  moduleId: string;
}

interface AppState {
  // User data
  user: User | null;
  setUser: (user: User | null) => void;

  // Module and lesson data from database
  modules: Module[];
  currentModule: Module | null;
  currentLesson: any | null;
  modulesLoading: boolean;
  modulesError: string | null;
  
  // Module and lesson actions
  fetchModules: (includeLessons?: boolean) => Promise<void>;
  fetchModule: (moduleId: string) => Promise<void>;
  setCurrentModule: (module: Module | null) => void;
  setCurrentLesson: (lesson: any | null) => void;

  // Progress tracking
  userProgress: {
    completedLessons: Set<string>;
    moduleProgress: Record<string, number>;
    totalTimeSpent: number;
    streak: number;
    lastActive: string | null;
    achievements: Set<string>;
  };
  progressLoading: boolean;
  progressError: string | null;
  
  // Progress actions
  fetchUserProgress: () => Promise<void>;
  completeLesson: (lessonId: string, moduleId: string) => Promise<void>;
  addTimeSpent: (minutes: number) => void;
  updateStreak: () => void;
  addAchievement: (achievementId: string) => void;

  // UI state
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;

  // Search functionality
  searchResults: SearchResult[];
  setSearchResults: (results: SearchResult[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Achievements
  achievements: Achievement[];
  setAchievements: (achievements: Achievement[]) => void;

  // Community
  communityPosts: CommunityPost[];
  setCommunityPosts: (posts: CommunityPost[]) => void;

  // Schedule
  scheduleEvents: ScheduleEvent[];
  setScheduleEvents: (events: ScheduleEvent[]) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // User data
      user: null,
      setUser: (user: User | null) => set({ user }),

      // Module and lesson data
      modules: [],
      currentModule: null,
      currentLesson: null,
      modulesLoading: false,
      modulesError: null,
      
      // Module and lesson actions
      fetchModules: async (includeLessons = false) => {
        try {
          set({ modulesLoading: true, modulesError: null });
          
          const response = await fetch(`/api/modules?include_lessons=${includeLessons}`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch modules');
          }
          
          const data = await response.json();
          set({ 
            modules: data.modules,
            modulesLoading: false 
          });
        } catch (error) {
          console.error('Error fetching modules:', error);
          set({ 
            modulesError: error instanceof Error ? error.message : 'Unknown error',
            modulesLoading: false 
          });
        }
      },
      
      fetchModule: async (moduleId: string) => {
        try {
          set({ modulesLoading: true, modulesError: null });
          
          const response = await fetch(`/api/modules/${moduleId}`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch module');
          }
          
          const data = await response.json();
          
          // Update the module in the modules array
          set((state) => {
            const updatedModules = [...state.modules];
            const moduleIndex = updatedModules.findIndex(m => m.id === moduleId);
            
            if (moduleIndex >= 0) {
              updatedModules[moduleIndex] = data.module;
            } else {
              updatedModules.push(data.module);
            }
            
            return { 
              modules: updatedModules,
              currentModule: data.module,
              modulesLoading: false 
            };
          });
        } catch (error) {
          console.error('Error fetching module:', error);
          set({ 
            modulesError: error instanceof Error ? error.message : 'Unknown error',
            modulesLoading: false 
          });
        }
      },
      
      setCurrentModule: (module: Module | null) => set({ currentModule: module }),
      setCurrentLesson: (lesson: any | null) => set({ currentLesson: lesson }),

      // Progress tracking
      userProgress: {
        completedLessons: new Set<string>(),
        moduleProgress: {},
        totalTimeSpent: 0,
        streak: 0,
        lastActive: null,
        achievements: new Set<string>()
      },
      progressLoading: false,
      progressError: null,
      
      // Progress actions
      fetchUserProgress: async () => {
        try {
          set({ progressLoading: true, progressError: null });
          
          const response = await fetch('/api/progress');
          
          // If unauthorized, just clear loading state and return
          if (response.status === 401) {
            set({ progressLoading: false });
            return;
          }
          
          if (!response.ok) {
            throw new Error('Failed to fetch progress');
          }
          
          const data = await response.json();
          
          // Convert progress data to our store format
          const moduleProgress: Record<string, number> = {};
          data.moduleProgress.forEach((progress: any) => {
            moduleProgress[progress.module_id] = progress.progress_percentage;
          });
          
          set((state) => ({
            userProgress: {
              ...state.userProgress,
              completedLessons: new Set(data.completedLessons),
              moduleProgress
            },
            progressLoading: false
          }));
        } catch (error) {
          console.error('Error fetching user progress:', error);
          set({ 
            progressError: error instanceof Error ? error.message : 'Unknown error',
            progressLoading: false 
          });
        }
      },
      
      completeLesson: async (lessonId: string, moduleId: string) => {
        try {
          // Calculate time spent
          const { currentLesson } = get();
          const timeSpent = currentLesson?.duration || 0;
          
          // Call the API to mark the lesson as completed
          const response = await fetch('/api/progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lessonId, moduleId, timeSpent })
          });
          
          if (!response.ok) {
            throw new Error('Failed to complete lesson');
          }
          
          const data = await response.json();
          
          // Update the store with the new progress data
          const moduleProgress: Record<string, number> = {};
          data.moduleProgress.forEach((progress: any) => {
            moduleProgress[progress.module_id] = progress.progress_percentage;
          });
          
          set((state) => ({
            userProgress: {
              ...state.userProgress,
              completedLessons: new Set(data.completedLessons),
              moduleProgress,
              totalTimeSpent: state.userProgress.totalTimeSpent + timeSpent
            }
          }));
          
          // Update streak
          get().updateStreak();
        } catch (error) {
          console.error('Error completing lesson:', error);
          // We don't set an error state here as we don't want to block the UI
          // Instead, we might show a toast notification
        }
      },
      
      addTimeSpent: (minutes: number) => set((state) => ({
        userProgress: {
          ...state.userProgress,
          totalTimeSpent: state.userProgress.totalTimeSpent + minutes
        }
      })),
      
      updateStreak: () => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        const lastActive = state.userProgress.lastActive;
        
        let streak = state.userProgress.streak;
        // If last active was yesterday, increment streak
        if (lastActive) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];
          
          if (lastActive === yesterdayStr) {
            streak += 1;
          } else if (lastActive !== today) {
            // Reset streak if not active yesterday and not already logged today
            streak = 1;
          }
        } else {
          // First time logging activity
          streak = 1;
        }
        
        return {
          userProgress: {
            ...state.userProgress,
            streak,
            lastActive: today
          }
        };
      }),
      
      addAchievement: (achievementId: string) => set((state) => ({
        userProgress: {
          ...state.userProgress,
          achievements: new Set(Array.from(state.userProgress.achievements).concat([achievementId]))
        }
      })),

      // UI state
      sidebarOpen: false,
      setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
      currentPage: 'dashboard',
      setCurrentPage: (page: string) => set({ currentPage: page }),

      // Search functionality
      searchResults: [],
      setSearchResults: (results: SearchResult[]) => set({ searchResults: results }),
      searchQuery: '',
      setSearchQuery: (query: string) => set({ searchQuery: query }),

      // Achievements
      achievements: [],
      setAchievements: (achievements: Achievement[]) => set({ achievements }),

      // Community
      communityPosts: [],
      setCommunityPosts: (posts: CommunityPost[]) => set({ communityPosts: posts }),

      // Schedule
      scheduleEvents: [] as ScheduleEvent[],
      setScheduleEvents: (events: ScheduleEvent[]) => set({ scheduleEvents: events })
    }),
    {
      name: 'growthground-store',
      partialize: (state) => ({
        userProgress: state.userProgress,
        sidebarOpen: state.sidebarOpen,
        currentPage: state.currentPage,
      })
    }
  )
);
