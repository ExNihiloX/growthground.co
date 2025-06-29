import { CurriculumModule, CurriculumLesson } from './types';

import { theDigitalLandscape } from './modules/the-digital-landscape';
import { backendDevelopment } from './modules/backend-development';
import { frontendDevelopment } from './modules/frontend-development';
import { leadershipCommunication } from './modules/leadership-communication';
import { theDevelopersToolkit } from './modules/the-developers-toolkit';
import { howSoftwareIsBuilt } from './modules/how-software-is-built';
import { theTechStack } from './modules/the-tech-stack';
import { buildingWithAiIdes } from './modules/building-with-ai-ides';
import { leveragingDataAi } from './modules/leveraging-data-ai';
import { mobileDevelopment } from './modules/mobile-development';
import { qualitySecurity } from './modules/quality-security';
import { userExperienceDesign } from './modules/user-experience-design';

export const masterCurriculum: CurriculumModule[] = [
  theDigitalLandscape,
  frontendDevelopment,
  backendDevelopment,
  userExperienceDesign,
  mobileDevelopment,
  qualitySecurity,
  leveragingDataAi,
  leadershipCommunication,
  theDevelopersToolkit,
  howSoftwareIsBuilt,
  theTechStack,
  buildingWithAiIdes
];

// Helper functions
export function getModuleById(id: string): CurriculumModule | undefined {
  return masterCurriculum.find(module => module.id === id);
}

export function getLessonById(moduleId: string, lessonId: string): CurriculumLesson | undefined {
  const module = getModuleById(moduleId);
  return module?.lessons.find(lesson => lesson.id === lessonId);
}

export function getModuleProgress(moduleId: string, completedLessons: Set<string>): number {
  const module = getModuleById(moduleId);
  if (!module) return 0;
  
  const completedCount = module.lessons.filter(lesson => 
    completedLessons.has(lesson.id)
  ).length;
  
  return Math.round((completedCount / module.lessons.length) * 100);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(masterCurriculum.map(module => module.category)));
}

export function getModulesByCategory(category: string): CurriculumModule[] {
  return masterCurriculum.filter(module => module.category === category);
}

export function getPrerequisites(moduleId: string): CurriculumModule[] {
  const module = getModuleById(moduleId);
  if (!module?.prerequisites) return [];
  
  return module.prerequisites
    .map(prereqId => getModuleById(prereqId))
    .filter((module): module is CurriculumModule => module !== undefined);
}

export function isModuleUnlocked(moduleId: string, completedModules: string[]): boolean {
  const module = getModuleById(moduleId);
  if (!module?.prerequisites) return true;
  
  return module.prerequisites.every(prereqId => completedModules.includes(prereqId));
}

// Re-export types for convenience
export type { CurriculumModule, CurriculumLesson };
