import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Sidebar } from '@/components/layout/sidebar';
import { Metadata } from 'next';
import ModuleLessonClient from './ModuleLessonClient';
import { contentService } from '@/lib/services/content-service';

export const metadata: Metadata = {
  title: 'Module | GrowthGround',
};

interface PageProps {
  params: { moduleId: string };
  searchParams: { lessonId?: string };
}

export default async function ModulePage({ params, searchParams }: PageProps) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return redirect('/auth/login');
  }

  const module = await contentService.getModule(params.moduleId);
  if (!module) {
    return <div className="p-8">Module not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar currentPage="modules" />
        <main className="flex-1 lg:ml-0">
          <ModuleLessonClient module={module} initialLessonId={searchParams.lessonId} />
        </main>
      </div>
      <Footer />
    </div>
  );
}
