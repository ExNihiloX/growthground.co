import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Sidebar } from '@/components/layout/sidebar';
import { SchedulePage as SchedulePageComponent } from '@/components/pages/schedule-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schedule | GrowthGround',
  description: 'Organize your learning schedule and plan your courses',
};

export default async function SchedulePage() {
  // Create the Supabase client
  const supabase = await createClient();
  
  // Check for active session
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return redirect('/auth/login');
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar currentPage="schedule" setCurrentPage={() => {}} />
        <main className="flex-1 lg:ml-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <SchedulePageComponent />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
