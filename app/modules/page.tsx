import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Sidebar } from '@/components/layout/sidebar';
import { Metadata } from 'next';
import { ModulesPageClient } from '@/components/pages/modules-page-client';

export const metadata: Metadata = {
  title: 'Modules | GrowthGround',
  description: 'Explore our comprehensive curriculum designed for founders and entrepreneurs',
};

export default async function ModulesPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    return redirect('/auth/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar currentPage="modules" />
        <main className="flex-1 lg:ml-0 p-8">
          <ModulesPageClient />
        </main>
      </div>
      <Footer />
    </div>
  );
}
