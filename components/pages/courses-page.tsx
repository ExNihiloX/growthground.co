'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, Clock, Users, Star, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppStore } from '@/lib/store';
import { CurriculumModule, masterCurriculum, getModuleProgress, getAllCategories } from '@/lib/curriculum';
import { cn } from '@/lib/utils';

export function CoursesPage() {
  const { modules, setModules, userProgress } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredModules, setFilteredModules] = useState<CurriculumModule[]>([]);

  useEffect(() => {
    setModules(masterCurriculum);
  }, [setModules]);

  useEffect(() => {
    let filtered = modules;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(module =>
        module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(module => module.category === selectedCategory);
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(module => module.difficulty === selectedDifficulty);
    }

    setFilteredModules(filtered);
  }, [modules, searchQuery, selectedCategory, selectedDifficulty]);

  const categories = getAllCategories();
  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

  const ModuleCard = ({ module }: { module: CurriculumModule }) => {
    const progress = getModuleProgress(module.id, userProgress.completedLessons);
    const isCompleted = progress === 100;
    const isStarted = progress > 0;

    const formatDuration = (totalMinutes: number) => {
      if (!totalMinutes || totalMinutes === 0) return '0m';
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const parts = [];
      if (hours > 0) {
        parts.push(`${hours}h`);
      }
      if (minutes > 0) {
        parts.push(`${minutes}m`);
      }
      return parts.join(' ');
    };

    return (
      <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="relative">
          <img
            src={module.thumbnail}
            alt={module.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className={cn(
              module.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
              module.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            )}>
              {module.difficulty}
            </Badge>
            {isCompleted && (
              <Badge className="bg-green-500 text-white">Complete</Badge>
            )}
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-bold text-lg mb-1">{module.title}</h3>
            <p className="text-white/80 text-sm">by {module.instructor}</p>
          </div>
        </div>

        <CardContent className="p-6">
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {module.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{formatDuration(module.estimatedTime)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{module.studentsEnrolled?.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{module.rating}</span>
            </div>
          </div>

          {isStarted && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm text-gray-500">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <Button className="w-full" disabled={module.isLocked}>
            {module.isLocked ? 'Locked' : isCompleted ? 'Review' : isStarted ? 'Continue' : 'Start Module'}
          </Button>
        </CardContent>
      </Card>
    );
  };

  const ModuleListItem = ({ module }: { module: CurriculumModule }) => {
    const progress = getModuleProgress(module.id, userProgress.completedLessons);
    const isCompleted = progress === 100;
    const isStarted = progress > 0;

    const formatDuration = (totalMinutes: number) => {
      if (!totalMinutes || totalMinutes === 0) return '0m';
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const parts = [];
      if (hours > 0) {
        parts.push(`${hours}h`);
      }
      if (minutes > 0) {
        parts.push(`${minutes}m`);
      }
      return parts.join(' ');
    };

    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <img
              src={module.thumbnail}
              alt={module.title}
              className="w-24 h-24 rounded-lg object-cover"
            />
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{module.title}</h3>
                  <p className="text-sm text-gray-600">by {module.instructor}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={cn(
                    module.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                    module.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  )}>
                    {module.difficulty}
                  </Badge>
                  {isCompleted && (
                    <Badge className="bg-green-500 text-white">Complete</Badge>
                  )}
                </div>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">{module.description}</p>

              <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatDuration(module.estimatedTime)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{module.studentsEnrolled?.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{module.rating}</span>
                </div>
                <Badge variant="outline">{module.category}</Badge>
              </div>

              <div className="flex items-center justify-between">
                {isStarted && (
                  <div className="flex-1 mr-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm text-gray-500">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}
                
                <Button disabled={module.isLocked}>
                  {module.isLocked ? 'Locked' : isCompleted ? 'Review' : isStarted ? 'Continue' : 'Start Module'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Modules</h1>
          <p className="text-gray-600 mt-1">
            {filteredModules.length} module{filteredModules.length !== 1 ? 's' : ''} available • Master curriculum for founders
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search modules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {difficulties.map(difficulty => (
                    <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modules Grid/List */}
      {filteredModules.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No modules found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or browse all available modules.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className={cn(
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        )}>
          {filteredModules.map((module) => (
            viewMode === 'grid' ? (
              <ModuleCard key={module.id} module={module} />
            ) : (
              <ModuleListItem key={module.id} module={module} />
            )
          ))}
        </div>
      )}
    </div>
  );
}