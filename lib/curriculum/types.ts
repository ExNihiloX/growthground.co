// Curriculum type definitions for GrowthGround

export interface CurriculumLesson {
  id: string;
  title: string;
  duration: number; // in minutes
  coreConcepts: string[];
  analogy: string;
  content?: {
    hook: string;
    coreExplanation: string[];
    strategicInsights: string[];
    talkingToDevs: string[];
    interactiveElementBrief: string;
  };
}

export interface CurriculumModule {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  lessons: CurriculumLesson[];
  estimatedTime: number; // in minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  isLocked: boolean;
  instructor: string;
  rating: number;
  studentsEnrolled: number;
  prerequisites?: string[];
  learningOutcomes: string[];
}
