'use client';

import { Clock, Award, TrendingUp, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatsProps {
  stats: {
    totalLessons: number;
    completedLessons: number;
    completionRate: number;
    totalModules: number;
    completedModules: number;
  };
}

export default function StatsOverview({ stats }: StatsProps) {
  // Stats already calculated and passed from parent

  const statsCards = [
    {
      icon: Clock,
      label: 'Hours Learned',
      value: '0', // Could be added to stats in future
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Award,
      label: 'Courses Completed',
      value: stats.completedModules,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: TrendingUp,
      label: 'Completion Rate',
      value: `${stats.completionRate}%`,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Target,
      label: 'Lessons Completed',
      value: stats.completedLessons,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsCards.map((stat) => {
        const Icon = stat.icon;
        
        return (
          <Card key={stat.label} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-xl`}>
                  <Icon className={`h-6 w-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}