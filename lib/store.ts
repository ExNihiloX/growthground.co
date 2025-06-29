import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Lesson, UserProgress, User, Achievement, CommunityPost, ScheduleEvent, SearchResult } from './types';
import { CurriculumModule, masterCurriculum, getModuleById, getLessonById } from './curriculum';

interface AppState {
  // User data
  user: User | null;
  setUser: (user: User | null) => void;

  // Module and lesson data from curriculum
  modules: CurriculumModule[];
  currentModule: CurriculumModule | null;
  currentLesson: any | null; // Using curriculum lesson type
  setModules: (modules: CurriculumModule[]) => void;
  setCurrentModule: (module: CurriculumModule | null) => void;
  setCurrentLesson: (lesson: any | null) => void;

  // Progress tracking
  userProgress: UserProgress;
  updateProgress: (moduleId: string, progress: number) => void;
  completeLesson: (lessonId: string, moduleId: string) => void;
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
      setUser: (user) => set({ user }),

      // Module and lesson data
      modules: masterCurriculum,
      currentModule: null,
      currentLesson: null,
      setModules: (modules) => set({ modules }),
      setCurrentModule: (module) => set({ currentModule: module }),
      setCurrentLesson: (lesson) => set({ currentLesson: lesson }),

      // Progress tracking
      userProgress: {
        userId: '',
        moduleProgress: {},
        completedLessons: new Set(),
        totalTimeSpent: 0,
        lastAccessed: new Date().toISOString(),
        streak: 0,
        achievements: [],
      },
      updateProgress: (moduleId, progress) =>
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            moduleProgress: {
              ...state.userProgress.moduleProgress,
              [moduleId]: progress,
            },
            lastAccessed: new Date().toISOString(),
          },
        })),
      completeLesson: (lessonId, moduleId) =>
        set((state) => {
          const newCompletedLessons = new Set(state.userProgress.completedLessons);
          newCompletedLessons.add(lessonId);
          
          const module = getModuleById(moduleId);
          if (!module) return state;
          
          const completedCount = module.lessons.filter(lesson => 
            newCompletedLessons.has(lesson.id)
          ).length;
          const progress = Math.round((completedCount / module.lessons.length) * 100);

          return {
            userProgress: {
              ...state.userProgress,
              completedLessons: newCompletedLessons,
              moduleProgress: {
                ...state.userProgress.moduleProgress,
                [moduleId]: progress,
              },
              lastAccessed: new Date().toISOString(),
            },
          };
        }),
      addTimeSpent: (minutes) =>
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            totalTimeSpent: state.userProgress.totalTimeSpent + minutes,
          },
        })),
      updateStreak: () =>
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            streak: state.userProgress.streak + 1,
          },
        })),
      addAchievement: (achievementId) =>
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            achievements: [...state.userProgress.achievements, achievementId],
          },
        })),

      // UI state
      sidebarOpen: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      currentPage: 'dashboard',
      setCurrentPage: (page) => set({ currentPage: page }),

      // Search functionality
      searchResults: [],
      setSearchResults: (results) => set({ searchResults: results }),
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),

      // Achievements
      achievements: [],
      setAchievements: (achievements) => set({ achievements }),

      // Community
      communityPosts: [],
      setCommunityPosts: (posts) => set({ communityPosts: posts }),

      // Schedule
      scheduleEvents: [],
      setScheduleEvents: (events) => set({ scheduleEvents: events }),
    }),
    {
      name: 'growthground-storage',
      partialize: (state) => ({
        userProgress: {
          ...state.userProgress,
          completedLessons: Array.from(state.userProgress.completedLessons),
        },
        currentPage: state.currentPage,
      }),
      merge: (persistedState: any, currentState) => ({
        ...currentState,
        ...persistedState,
        userProgress: {
          ...currentState.userProgress,
          ...persistedState?.userProgress,
          completedLessons: new Set(persistedState?.userProgress?.completedLessons || []),
        },
      }),
    }
  )
);