import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ProgressPage as ProgressPageComponent } from '@/components/pages/progress-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Progress | GrowthGround',
  description: 'Track your learning progress and achievements',
};

export default async function ProgressPage() {
  // Create the Supabase client
  const supabase = await createClient();
  
  // Check for active session
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return redirect('/auth/login');
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProgressPageComponent />
      </div>
      <Footer />
    </div>
  );
}
