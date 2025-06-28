'use client';

import { useEffect } from 'react';
import { ModuleCard } from './module-card';
import { useAppStore } from '@/lib/store';
import { CurriculumModule, masterCurriculum } from '@/lib/curriculum';

interface ModulesGridProps {
  onStartModule: (module: CurriculumModule) => void;
}

export function ModulesGrid({ onStartModule }: ModulesGridProps) {
  const { modules, setModules } = useAppStore();

  useEffect(() => {
    // Always use the master curriculum
    setModules(masterCurriculum);
  }, [setModules]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Master Curriculum</h2>
          <p className="text-gray-600 mt-1">
            Complete learning path designed for founders and entrepreneurs
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {modules.length} modules • {Math.round(modules.reduce((total, module) => total + module.estimatedTime, 0) / 60)} hours total
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <ModuleCard 
            key={module.id} 
            module={module} 
            onStartModule={onStartModule}
          />
        ))}
      </div>
    </div>
  );
}