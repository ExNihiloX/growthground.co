// Core types for the GrowthGround application
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedAt: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    reminders: boolean;
  };
  privacy: {
    profileVisible: boolean;
    progressVisible: boolean;
  };
  learning: {
    dailyGoal: number; // minutes
    reminderTime: string;
    autoplay: boolean;
  };
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  content: string;
  videoUrl?: string;
  order: number;
  completed: boolean;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  lessons: Lesson[];
  progress: number; // 0-100
  estimatedTime: number; // in minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  isLocked: boolean;
  instructor?: string;
  rating?: number;
  studentsEnrolled?: number;
}

export interface UserProgress {
  userId: string;
  moduleProgress: Record<string, number>; // moduleId -> progress percentage
  completedLessons: Set<string>; // lesson IDs
  totalTimeSpent: number; // in minutes
  lastAccessed: string;
  streak: number; // days
  achievements: string[]; // achievement IDs
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'progress' | 'time' | 'streak' | 'completion';
  requirement: number;
  earned: boolean;
  earnedAt?: string;
}

export interface NavigationItem {
  id: string;
  title: string;
  href: string;
  icon: string;
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'module' | 'lesson';
  category: string;
  thumbnail?: string;
  url: string;
}

export interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  title: string;
  content: string;
  category: string;
  likes: number;
  replies: number;
  createdAt: string;
  tags: string[];
}

export interface ScheduleEvent {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  type: 'lesson' | 'assignment' | 'reminder';
  moduleId?: string;
  completed: boolean;
}