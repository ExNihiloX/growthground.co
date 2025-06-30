'use client';

import { useEffect } from 'react';
import { ModuleCard } from './module-card';
import { useAppStore } from '@/lib/store-db';
import { Module } from '@/lib/services/content-service';

interface ModulesGridProps {
  onStartModule: (module: Module) => void;
}

export function ModulesGrid({ onStartModule }: ModulesGridProps) {
  const { modules, fetchModules, modulesLoading, modulesError } = useAppStore();

  useEffect(() => {
    // Fetch modules from the database
    fetchModules(false); // don't include lessons in the initial fetch to keep it fast
  }, [fetchModules]);

  // Calculate total hours of content
  const totalHours = Math.round(
    modules.reduce((total, module) => total + module.estimated_time, 0) / 60
  );

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
          {modulesLoading ? (
            <span className="text-sm text-gray-500">Loading...</span>
          ) : (
            <span className="text-sm text-gray-500">
              {modules.length} modules • {totalHours} hours total
            </span>
          )}
        </div>
      </div>
      
      {modulesError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          Failed to load modules: {modulesError}
        </div>
      )}
      
      {modulesLoading && modules.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div 
              key={i}
              className="h-96 bg-gray-100 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <ModuleCard 
              key={module.id} 
              module={module} 
              onStartModule={onStartModule}
            />
          ))}
        </div>
      )}
    </div>
  );
}