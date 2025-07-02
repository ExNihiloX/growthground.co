'use client';

import { useState } from 'react';
import { Play, Clock, BookOpen, Lock, CheckCircle, Users, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Module } from '@/app/dashboard/DashboardClient';

interface ModuleCardProps {
  module: Module;
  onStartModule: (module: Module) => void;
  progress?: number;
  completedLessons?: Set<string>;
}

export default function ModuleCard({ module, onStartModule, progress: progressProp, completedLessons }: ModuleCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate progress based on completed lessons
  const totalLessons = module.lessons?.length || 0;
  const completedInThisModule = module.lessons?.filter(lesson =>
    completedLessons?.has(lesson.id)
  ).length || 0;

  const computedProgress = totalLessons > 0 ? Math.round((completedInThisModule / totalLessons) * 100) : 0;
  const progress = progressProp !== undefined ? progressProp : computedProgress;
  const isCompleted = progress === 100;
  const isStarted = progress > 0;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Fundamentals': return 'bg-blue-100 text-blue-800';
      case 'Design': return 'bg-purple-100 text-purple-800';
      case 'Development': return 'bg-orange-100 text-orange-800';
      case 'Business': return 'bg-green-100 text-green-800';
      case 'Operations': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card 
      className={cn(
        "group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl",
        module.is_locked && "opacity-60 cursor-not-allowed",
        isCompleted && "ring-2 ring-green-200 bg-gradient-to-br from-green-50 to-emerald-50"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => !module.is_locked && onStartModule(module)}
    >
      <div className="relative">
        <img
          src={module.thumbnail_url || '/images/module-placeholder.jpg'}
          alt={module.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Status indicators */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className="flex gap-2">
            <Badge className={getDifficultyColor(module.difficulty)}>
              {module.difficulty}
            </Badge>
            <Badge className="bg-blue-100 text-blue-800">
              {module.category_id || 'General'}
            </Badge>
          </div>
          {isCompleted && (
            <Badge className="bg-green-500 text-white w-fit">
              <CheckCircle className="h-3 w-3 mr-1" />
              Complete
            </Badge>
          )}
          {module.is_locked && (
            <Badge className="bg-gray-500 text-white w-fit">
              <Lock className="h-3 w-3 mr-1" />
              Locked
            </Badge>
          )}
        </div>

        {/* Play button overlay */}
        {!module.is_locked && (
          <div className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
              <Play className="h-8 w-8 text-blue-600 fill-current" />
            </div>
          </div>
        )}

        {/* Module info overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-lg mb-1 line-clamp-2">
            {module.title}
          </h3>
          <p className="text-white/80 text-sm">by {module.instructor}</p>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="mb-4">
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {module.description}
          </p>
        </div>

        {/* Module meta info */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{module.lessons?.length || 0} lessons</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{Math.round(module.estimated_time_minutes / 60)}h {module.estimated_time_minutes % 60}m</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{module.students_enrolled?.toLocaleString() || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{module.rating}</span>
          </div>
        </div>

        {/* We could fetch prerequisites from a related table if needed */}

        {/* Progress bar */}
        {isStarted && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm text-gray-500">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Key skills or outcomes could come from a separate table */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">Course highlights:</p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li className="flex items-start gap-1">
              <span className="text-green-500 mt-0.5">•</span>
              <span className="line-clamp-1">{module.description.split('.')[0]}</span>
            </li>
            <li className="flex items-start gap-1">
              <span className="text-green-500 mt-0.5">•</span>
              <span className="line-clamp-1">Taught by {module.instructor}</span>
            </li>
          </ul>
        </div>

        {/* Action button */}
        <Button 
          className={cn(
            "w-full transition-all duration-200",
            isCompleted 
              ? "bg-green-600 hover:bg-green-700" 
              : isStarted 
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-900 hover:bg-gray-800"
          )}
          disabled={module.is_locked}
          onClick={(e) => {
            e.stopPropagation();
            if (!module.is_locked) onStartModule(module);
          }}
        >
          {module.is_locked ? (
            <>
              <Lock className="h-4 w-4 mr-2" />
              Locked
            </>
          ) : isCompleted ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Review Module
            </>
          ) : isStarted ? (
            <>
              <Play className="h-4 w-4 mr-2" />
              Continue Learning
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Start Module
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}