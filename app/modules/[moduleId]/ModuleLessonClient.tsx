'use client';
import { useRouter } from 'next/navigation';
import { LessonViewer } from '@/components/lesson/lesson-viewer';
import { Module } from '@/lib/services/content-service.client';

export default function ModuleLessonClient({ module, initialLessonId }: { module: Module; initialLessonId?: string }) {
  const router = useRouter();
  return (
    <LessonViewer
      module={module}
      initialLessonId={initialLessonId}
      onBack={() => router.push('/modules')}
    />
  );
}
