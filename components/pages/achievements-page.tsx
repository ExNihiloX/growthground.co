'use client';

import { useEffect } from 'react';
import { Trophy, Star, Clock, Target, Award, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAppStore } from '@/lib/store';
import { mockAchievements } from '@/lib/data';
import { Achievement } from '@/lib/types';
import { cn } from '@/lib/utils';

export function AchievementsPage() {
  const { achievements, setAchievements, userProgress, modules } = useAppStore();

  useEffect(() => {
    if (achievements.length === 0) {
      // Calculate earned achievements based on user progress
      const updatedAchievements = mockAchievements.map(achievement => {
        let earned = false;
        let progress = 0;

        switch (achievement.id) {
          case 'first-lesson':
            progress = userProgress.completedLessons.size;
            earned = progress >= achievement.requirement;
            break;
          case 'week-streak':
            progress = userProgress.streak;
            earned = progress >= achievement.requirement;
            break;
          case 'first-module':
            const completedModules = Object.values(userProgress.moduleProgress).filter(p => p === 100).length;
            progress = completedModules;
            earned = progress >= achievement.requirement;
            break;
          case 'ten-hours':
            progress = userProgress.totalTimeSpent;
            earned = progress >= achievement.requirement;
            break;
          case 'three-modules':
            const completedModulesCount = Object.values(userProgress.moduleProgress).filter(p => p === 100).length;
            progress = completedModulesCount;
            earned = progress >= achievement.requirement;
            break;
          case 'month-streak':
            progress = userProgress.streak;
            earned = progress >= achievement.requirement;
            break;
        }

        return {
          ...achievement,
          earned,
          earnedAt: earned && !achievement.earned ? new Date().toISOString() : achievement.earnedAt,
        };
      });

      setAchievements(updatedAchievements);
    }
  }, [achievements.length, setAchievements, userProgress, modules]);

  const earnedAchievements = achievements.filter(a => a.earned);
  const unlockedAchievements = achievements.filter(a => !a.earned);

  const getProgressForAchievement = (achievement: Achievement) => {
    switch (achievement.id) {
      case 'first-lesson':
        return Math.min((userProgress.completedLessons.size / achievement.requirement) * 100, 100);
      case 'week-streak':
      case 'month-streak':
        return Math.min((userProgress.streak / achievement.requirement) * 100, 100);
      case 'first-module':
      case 'three-modules':
        const completedModules = Object.values(userProgress.moduleProgress).filter(p => p === 100).length;
        return Math.min((completedModules / achievement.requirement) * 100, 100);
      case 'ten-hours':
        return Math.min((userProgress.totalTimeSpent / achievement.requirement) * 100, 100);
      default:
        return 0;
    }
  };

  const getProgressText = (achievement: Achievement) => {
    switch (achievement.id) {
      case 'first-lesson':
        return `${userProgress.completedLessons.size} / ${achievement.requirement} lessons`;
      case 'week-streak':
      case 'month-streak':
        return `${userProgress.streak} / ${achievement.requirement} days`;
      case 'first-module':
      case 'three-modules':
        const completedModules = Object.values(userProgress.moduleProgress).filter(p => p === 100).length;
        return `${completedModules} / ${achievement.requirement} modules`;
      case 'ten-hours':
        const hours = Math.round(userProgress.totalTimeSpent / 60);
        const targetHours = Math.round(achievement.requirement / 60);
        return `${hours} / ${targetHours} hours`;
      default:
        return '';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'progress': return Target;
      case 'time': return Clock;
      case 'streak': return Star;
      case 'completion': return Trophy;
      default: return Award;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'progress': return 'text-blue-600 bg-blue-50';
      case 'time': return 'text-green-600 bg-green-50';
      case 'streak': return 'text-orange-600 bg-orange-50';
      case 'completion': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const AchievementCard = ({ achievement }: { achievement: Achievement }) => {
    const Icon = getCategoryIcon(achievement.category);
    const colorClass = getCategoryColor(achievement.category);
    const progress = getProgressForAchievement(achievement);
    const progressText = getProgressText(achievement);

    return (
      <Card className={cn(
        "transition-all duration-300 hover:shadow-lg",
        achievement.earned ? "ring-2 ring-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50" : "hover:shadow-md"
      )}>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className={cn(
              "p-3 rounded-xl text-2xl flex items-center justify-center",
              achievement.earned ? "bg-yellow-100" : colorClass
            )}>
              {achievement.earned ? (
                <span className="text-2xl">{achievement.icon}</span>
              ) : (
                <Icon className="h-6 w-6" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className={cn(
                  "font-bold text-lg",
                  achievement.earned ? "text-yellow-800" : "text-gray-900"
                )}>
                  {achievement.title}
                </h3>
                {achievement.earned && (
                  <Badge className="bg-yellow-500 text-white">
                    <Trophy className="h-3 w-3 mr-1" />
                    Earned
                  </Badge>
                )}
                {!achievement.earned && (
                  <Badge variant="outline">
                    <Lock className="h-3 w-3 mr-1" />
                    Locked
                  </Badge>
                )}
              </div>
              
              <p className={cn(
                "text-sm mb-4",
                achievement.earned ? "text-yellow-700" : "text-gray-600"
              )}>
                {achievement.description}
              </p>

              {!achievement.earned && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700">Progress</span>
                    <span className="text-gray-500">{progressText}</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}

              {achievement.earned && achievement.earnedAt && (
                <p className="text-xs text-yellow-600 mt-2">
                  Earned on {new Date(achievement.earnedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Achievements</h1>
        <p className="text-gray-600">
          Celebrate your learning milestones and unlock new badges
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="bg-yellow-100 p-3 rounded-xl w-fit mx-auto mb-3">
              <Trophy className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{earnedAchievements.length}</h3>
            <p className="text-gray-600">Achievements Earned</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="bg-blue-100 p-3 rounded-xl w-fit mx-auto mb-3">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{unlockedAchievements.length}</h3>
            <p className="text-gray-600">In Progress</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="bg-green-100 p-3 rounded-xl w-fit mx-auto mb-3">
              <Star className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {Math.round((earnedAchievements.length / achievements.length) * 100)}%
            </h3>
            <p className="text-gray-600">Completion Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Earned Achievements */}
      {earnedAchievements.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-600" />
            Earned Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {earnedAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      )}

      {/* In Progress Achievements */}
      {unlockedAchievements.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="h-6 w-6 text-blue-600" />
            In Progress
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {unlockedAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {achievements.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No achievements yet
            </h3>
            <p className="text-gray-600">
              Start learning to unlock your first achievement!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}