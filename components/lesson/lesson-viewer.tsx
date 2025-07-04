'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Clock, AlertCircle, BookOpen } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Module, Lesson } from '@/lib/services/content-service.client';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store-db';
import { LessonMarkdown } from './lesson-markdown';
import { LessonQuiz } from './lesson-quiz';

interface LessonViewerProps {
  module: Module;
  onBack: () => void;
  initialLessonId?: string;
}

export function LessonViewer({ module, onBack, initialLessonId }: LessonViewerProps) {
  const { 
    userProgress, 
    completeLesson 
  } = useAppStore();

  const [startTime, setStartTime] = useState<Date | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);

  // Initialize with first lesson if none selected
  // Track active lesson ID
  const [activeLessonId, setActiveLessonId] = useState<string>(
    initialLessonId || (module.lessons && module.lessons.length > 0 ? module.lessons[0]?.id || '' : '')
  );
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  
  // Set active lesson based on ID
  useEffect(() => {
    if (module.lessons && activeLessonId) {
      const lesson = module.lessons.find(l => l.id === activeLessonId);
      if (lesson) {
        setActiveLesson(lesson);
      }
    }
  }, [module.lessons, activeLessonId]);

  // Track time spent
  useEffect(() => {
    if (activeLesson) {
      setStartTime(new Date());
      setTimeSpent(0);
      
      const interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [activeLesson]);

  // Calculate the index of the current lesson
  const currentLessonIndex = module.lessons?.findIndex(l => l.id === activeLessonId) || 0;
  const isLastLesson = module.lessons ? currentLessonIndex === module.lessons.length - 1 : true;
  const isFirstLesson = currentLessonIndex === 0;
  // Safely check if a lesson is completed, handling both Set and Array/Object types
  const isCompleted = userProgress.completedLessons && (
    // If it's a proper Set with a has method
    (typeof userProgress.completedLessons.has === 'function' && userProgress.completedLessons.has(activeLessonId)) ||
    // If it's an array
    (Array.isArray(userProgress.completedLessons) && userProgress.completedLessons.includes(activeLessonId)) ||
    // If it's a plain object (as might happen with serialization issues)
    (typeof userProgress.completedLessons === 'object' && activeLessonId in userProgress.completedLessons)
  );

  const handleLessonComplete = () => {
    if (activeLesson && startTime) {
      const minutesSpent = Math.max(1, Math.floor(timeSpent / 60));
      if (completeLesson && activeLessonId) {
        completeLesson(activeLessonId, module.id);
      }
    }
  };

  const goToNextLesson = () => {
    if (module.lessons && module.lessons.length > 0) {
      if (currentLessonIndex < module.lessons.length - 1) {
        const nextLesson = module.lessons[currentLessonIndex + 1];
        setActiveLessonId(nextLesson.id);
        setActiveLesson(nextLesson);
        // Reset time spent when changing lessons
        setTimeSpent(0);
      }
    }
  };

  useEffect(() => {
    if (module.lessons && module.lessons.length > 0) {
      const initial = initialLessonId
        ? module.lessons.find(l => l.id === initialLessonId) || module.lessons[0]
        : module.lessons[0];
      setActiveLessonId(initial.id);
      setActiveLesson(initial);
    }
  }, [module, initialLessonId]);

  const goToPreviousLesson = () => {
    if (!isFirstLesson && module.lessons && currentLessonIndex > 0) {
      const prevLesson = module.lessons[currentLessonIndex - 1];
      setActiveLessonId(prevLesson.id);
      setActiveLesson(prevLesson);
      // Reset time spent when changing lessons
      setTimeSpent(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
                <ChevronLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
              <div className="hidden sm:block">
                <h1 className="text-3xl font-bold mb-2">{activeLesson?.title}</h1>
                <div className="text-lg text-gray-600 mb-6">{activeLesson?.description}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <Progress value={userProgress.moduleProgress[module.id] || 0} className="w-32" />
                <p className="text-xs text-gray-500 mt-1 text-center">{userProgress.moduleProgress[module.id] || 0}% Complete</p>
              </div>
              <Badge variant={isCompleted ? "default" : "secondary"}>
                {isCompleted ? "Completed" : "In Progress"}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Lesson Content */}
          <div className="lg:col-span-3">
            {/* Display appropriate content based on lesson type */}
            {activeLesson?.content && (
              <div className="prose prose-blue max-w-none">
                <LessonMarkdown content={typeof activeLesson.content === 'string' ? activeLesson.content : JSON.stringify(activeLesson.content)} />
              </div>
            )}
            {/* Quiz feature temporarily disabled until database schema is updated */}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={goToPreviousLesson}
              disabled={isFirstLesson}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <div className="flex items-center gap-3">
              {!isCompleted && (
                <Button
                  onClick={handleLessonComplete}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4" />
                  Complete Lesson
                </Button>
              )}
              
              <Button
                onClick={goToNextLesson}
                disabled={isLastLesson}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5" />
                <h3 className="font-semibold text-gray-900">Module Lessons</h3>
              </div>
              <div className="space-y-2">
                {module.lessons?.map((lesson, index) => {
                  const isActive = lesson.id === activeLessonId;
                  // Safely check if a lesson is completed, handling both Set and Array/Object types
                  const isLessonComplete = userProgress.completedLessons && (
                    // If it's a proper Set with a has method
                    (typeof userProgress.completedLessons.has === 'function' && userProgress.completedLessons.has(lesson.id)) ||
                    // If it's an array
                    (Array.isArray(userProgress.completedLessons) && userProgress.completedLessons.includes(lesson.id)) ||
                    // If it's a plain object (as might happen with serialization issues)
                    (typeof userProgress.completedLessons === 'object' && lesson.id in userProgress.completedLessons)
                  );
                  
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLessonId(lesson.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-blue-50 border border-blue-200' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-500">
                              {index + 1}.
                            </span>
                            <span className={`text-sm font-medium ${
                              isActive ? 'text-blue-700' : 'text-gray-900'
                            }`}>
                              {lesson.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            {lesson.duration} min
                          </div>
                        </div>
                        {isLessonComplete && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}