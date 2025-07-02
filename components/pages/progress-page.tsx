'use client';

import { useEffect } from 'react';
import { TrendingUp, Clock, Award, Target, Calendar, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/lib/store-db';

export function ProgressPage() {
  const { userProgress, modules, fetchModules, fetchUserProgress } = useAppStore();

  useEffect(() => {
    fetchModules(true);
    fetchUserProgress();
  }, [fetchModules, fetchUserProgress]);

  const completedModules = Object.values(userProgress.moduleProgress).filter(
    progress => progress === 100
  ).length;

  const totalLessons = modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = userProgress.completedLessons.size;
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const hoursLearned = Math.round(userProgress.totalTimeSpent / 60);
  const averageSessionTime = completedLessons > 0 ? Math.round(userProgress.totalTimeSpent / completedLessons) : 0;

  const stats = [
    {
      title: 'Overall Progress',
      value: `${overallProgress}%`,
      description: `${completedLessons} of ${totalLessons} lessons completed`,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Time Invested',
      value: `${hoursLearned}h`,
      description: `${averageSessionTime} min average per lesson`,
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Courses Completed',
      value: completedModules,
      description: `${modules.length - completedModules} courses in progress`,
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Learning Streak',
      value: `${userProgress.streak} days`,
      description: 'Keep it up! Consistency is key',
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    if (progress >= 25) return 'bg-orange-500';
    return 'bg-gray-300';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Learning Progress</h1>
        <p className="text-gray-600 mt-1">
          Track your learning journey and celebrate your achievements
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-xl`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Overall Progress Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Overall Learning Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Course Completion Rate
              </span>
              <span className="text-sm text-gray-500">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{completedLessons} lessons completed</span>
              <span>{totalLessons - completedLessons} lessons remaining</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Course Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {modules.map((module) => {
              const progress = userProgress.moduleProgress[module.id] || 0;
              const completedLessonsInModule = module.lessons.filter(lesson =>
                userProgress.completedLessons.has(lesson.id)
              ).length;

              return (
                <div key={module.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={module.thumbnail}
                        alt={module.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{module.title}</h3>
                        <p className="text-sm text-gray-500">
                          {completedLessonsInModule} of {module.lessons.length} lessons
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={progress === 100 ? 'default' : 'secondary'}
                        className={progress === 100 ? 'bg-green-500' : ''}
                      >
                        {progress === 100 ? 'Completed' : `${progress}%`}
                      </Badge>
                      <Badge variant="outline">{module.difficulty}</Badge>
                    </div>
                  </div>
                  
                  <div className="ml-15">
                    <Progress value={progress} className="h-2" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Learning Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Learning Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Learning Calendar Coming Soon
            </h3>
            <p className="text-gray-600">
              Track your daily learning activity and maintain your streak
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}