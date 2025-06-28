import { User, Achievement, CommunityPost, ScheduleEvent } from './types';

// Mock user data
export const mockUser: User = {
  id: '1',
  name: 'Alex Thompson',
  email: 'alex@example.com',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
  joinedAt: '2024-01-15',
  preferences: {
    theme: 'light',
    notifications: {
      email: true,
      push: true,
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

// Mock achievements data
export const mockAchievements: Achievement[] = [
  {
    id: 'first-lesson',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    category: 'progress',
    requirement: 1,
    earned: false,
  },
  {
    id: 'week-streak',
    title: 'Week Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    category: 'streak',
    requirement: 7,
    earned: false,
  },
  {
    id: 'first-module',
    title: 'Module Master',
    description: 'Complete your first module',
    icon: '🏆',
    category: 'completion',
    requirement: 1,
    earned: false,
  },
  {
    id: 'ten-hours',
    title: 'Dedicated Learner',
    description: 'Spend 10 hours learning',
    icon: '⏰',
    category: 'time',
    requirement: 600,
    earned: false,
  },
  {
    id: 'three-modules',
    title: 'Knowledge Seeker',
    description: 'Complete 3 modules',
    icon: '📚',
    category: 'completion',
    requirement: 3,
    earned: false,
  },
  {
    id: 'month-streak',
    title: 'Consistency Champion',
    description: 'Maintain a 30-day learning streak',
    icon: '💎',
    category: 'streak',
    requirement: 30,
    earned: false,
  },
];

// Mock community posts
export const mockCommunityPosts: CommunityPost[] = [
  {
    id: '1',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      role: 'Advanced Learner',
    },
    title: 'Tips for Understanding Backend Architecture',
    content: 'After completing the Backend Development module, I wanted to share some practical tips that helped me understand API design better. The restaurant kitchen analogy really clicked for me!',
    category: 'Tips & Tricks',
    likes: 24,
    replies: 8,
    createdAt: '2024-01-20T10:30:00Z',
    tags: ['Backend', 'APIs', 'Architecture'],
  },
  {
    id: '2',
    author: {
      name: 'Mike Rodriguez',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      role: 'Instructor',
    },
    title: 'New Advanced Scaling Module Coming Soon!',
    content: 'Excited to announce that we\'re working on an advanced scaling module covering microservices, Docker, and cloud deployment. What topics would you like to see covered?',
    category: 'Announcements',
    likes: 45,
    replies: 15,
    createdAt: '2024-01-19T14:15:00Z',
    tags: ['Scaling', 'Microservices', 'Docker'],
  },
  {
    id: '3',
    author: {
      name: 'Emma Thompson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      role: 'Beginner',
    },
    title: 'Struggling with Frontend Concepts - Any Resources?',
    content: 'I\'m working through the Frontend Development module and finding state management challenging. Does anyone have recommendations for additional practice resources?',
    category: 'Help & Support',
    likes: 12,
    replies: 6,
    createdAt: '2024-01-18T16:45:00Z',
    tags: ['Frontend', 'State Management', 'Help'],
  },
  {
    id: '4',
    author: {
      name: 'Alex Johnson',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400',
      role: 'Intermediate',
    },
    title: 'My First Full-Stack App is Live!',
    content: 'Just deployed my first full-stack application! The App Fundamentals and Frontend Development modules were incredibly helpful. Happy to answer questions about the process.',
    category: 'Success Stories',
    likes: 67,
    replies: 23,
    createdAt: '2024-01-17T09:20:00Z',
    tags: ['Full-Stack', 'Deployment', 'Success'],
  },
];

// Mock schedule events
export const mockScheduleEvents: ScheduleEvent[] = [
  {
    id: '1',
    title: 'Complete Anatomy of a Web App',
    description: 'Finish the app fundamentals lesson and practice exercises',
    startTime: '2024-01-22T10:00:00Z',
    endTime: '2024-01-22T10:45:00Z',
    type: 'lesson',
    moduleId: 'app-fundamentals',
    completed: false,
  },
  {
    id: '2',
    title: 'Frontend Components Assignment Due',
    description: 'Submit the component design assignment',
    startTime: '2024-01-23T23:59:00Z',
    endTime: '2024-01-23T23:59:00Z',
    type: 'assignment',
    moduleId: 'frontend-development',
    completed: false,
  },
  {
    id: '3',
    title: 'Daily Learning Reminder',
    description: 'Time for your daily learning session',
    startTime: '2024-01-22T19:00:00Z',
    endTime: '2024-01-22T19:00:00Z',
    type: 'reminder',
    completed: false,
  },
  {
    id: '4',
    title: 'UX Design Principles Practice',
    description: 'Work on user journey mapping exercises',
    startTime: '2024-01-24T14:00:00Z',
    endTime: '2024-01-24T15:00:00Z',
    type: 'lesson',
    moduleId: 'user-experience-design',
    completed: false,
  },
];