'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Clock, BookOpen, Target, Lightbulb, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAppStore } from '@/lib/store';
import { CurriculumModule, CurriculumLesson, getLessonById, getModuleProgress } from '@/lib/curriculum';

interface LessonViewerProps {
  module: CurriculumModule;
  onBack: () => void;
}

export function LessonViewer({ module, onBack }: LessonViewerProps) {
  const { 
    userProgress, 
    currentLesson, 
    setCurrentLesson, 
    completeLesson,
    addTimeSpent 
  } = useAppStore();
  
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);

  // Initialize with first lesson if none selected
  useEffect(() => {
    if (!currentLesson && module.lessons.length > 0) {
      setCurrentLesson(module.lessons[0]);
    }
  }, [currentLesson, module.lessons, setCurrentLesson]);

  // Track time spent
  useEffect(() => {
    if (currentLesson) {
      setStartTime(new Date());
      setTimeSpent(0);
      
      const interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentLesson]);

  const currentLessonIndex = module.lessons.findIndex(l => l.id === currentLesson?.id);
  const isLastLesson = currentLessonIndex === module.lessons.length - 1;
  const isFirstLesson = currentLessonIndex === 0;
  const isCompleted = currentLesson ? userProgress.completedLessons.has(currentLesson.id) : false;

  const handleLessonComplete = () => {
    if (currentLesson && startTime) {
      const minutesSpent = Math.max(1, Math.floor(timeSpent / 60));
      addTimeSpent(minutesSpent);
      completeLesson(currentLesson.id, module.id);
    }
  };

  const goToNextLesson = () => {
    if (!isLastLesson) {
      const nextLesson = module.lessons[currentLessonIndex + 1];
      setCurrentLesson(nextLesson);
    }
  };

  const goToPreviousLesson = () => {
    if (!isFirstLesson) {
      const prevLesson = module.lessons[currentLessonIndex - 1];
      setCurrentLesson(prevLesson);
    }
  };

  const progress = getModuleProgress(module.id, userProgress.completedLessons);

  if (!currentLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No lesson selected</h2>
          <Button onClick={onBack}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-gray-900">{module.title}</h1>
                <p className="text-sm text-gray-500">
                  Lesson {currentLessonIndex + 1} of {module.lessons.length}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <Progress value={progress} className="w-32" />
                <p className="text-xs text-gray-500 mt-1 text-center">{progress}% Complete</p>
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
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{currentLesson.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {currentLesson.duration} min
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        {currentLesson.coreConcepts.length} concepts
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Core Concepts */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {currentLesson.coreConcepts.map((concept) => (
                    <Badge key={concept} variant="outline" className="text-xs">
                      {concept}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              
              <CardContent>
                {currentLesson.content ? (
                  <div className="space-y-8">
                    {/* The Hook */}
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold text-blue-900">Why This Matters</h3>
                      </div>
                      <p className="text-blue-800 leading-relaxed">
                        {currentLesson.content.hook}
                      </p>
                    </div>

                    {/* Core Explanation */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Understanding the Concept</h3>
                      <div className="prose max-w-none space-y-4">
                        {currentLesson.content.coreExplanation.map((paragraph, index) => (
                          <p key={index} className="text-gray-700 leading-relaxed" 
                             dangerouslySetInnerHTML={{ __html: paragraph }} />
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Strategic Insights */}
                    <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                      <div className="flex items-center gap-2 mb-4">
                        <Target className="h-5 w-5 text-green-600" />
                        <h3 className="font-semibold text-green-900">Strategic Insights for Founders</h3>
                      </div>
                      <div className="space-y-3">
                        {currentLesson.content.strategicInsights.map((insight, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="bg-green-500 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                            <p className="text-green-800 leading-relaxed" 
                               dangerouslySetInnerHTML={{ __html: insight }} />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Talking to Your Devs */}
                    <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                      <div className="flex items-center gap-2 mb-4">
                        <MessageSquare className="h-5 w-5 text-purple-600" />
                        <h3 className="font-semibold text-purple-900">Talking to Your Devs</h3>
                      </div>
                      <p className="text-purple-700 mb-4 text-sm">
                        Use these questions in your next team meeting to show you understand the concepts:
                      </p>
                      <div className="space-y-3">
                        {currentLesson.content.talkingToDevs.map((question, index) => (
                          <div key={index} className="bg-white rounded-lg p-4 border border-purple-200">
                            <p className="text-purple-800 font-medium">
                              "{question}"
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Element */}
                    <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                      <div className="flex items-center gap-2 mb-3">
                        <Target className="h-5 w-5 text-orange-600" />
                        <h3 className="font-semibold text-orange-900">Interactive Exercise</h3>
                      </div>
                      <p className="text-orange-800 leading-relaxed mb-4">
                        {currentLesson.content.interactiveElementBrief}
                      </p>
                      <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                        Start Interactive Exercise
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      This lesson covers {currentLesson.coreConcepts.join(', ').toLowerCase()}.
                    </p>
                    
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold mb-4">Key Learning Points</h3>
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h4 className="font-medium mb-2">Core Concepts</h4>
                          <div className="flex flex-wrap gap-2">
                            {currentLesson.coreConcepts.map((concept) => (
                              <Badge key={concept} variant="secondary">{concept}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h4 className="font-medium mb-2">Analogy</h4>
                          <p className="text-sm text-gray-600">{currentLesson.analogy}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={goToPreviousLesson}
                    disabled={isFirstLesson}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
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
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Module Lessons
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {module.lessons.map((lesson, index) => {
                    const isActive = lesson.id === currentLesson?.id;
                    const isLessonCompleted = userProgress.completedLessons.has(lesson.id);
                    
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setCurrentLesson(lesson)}
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
                          {isLessonCompleted && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}