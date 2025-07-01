import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HelpPage as HelpPageComponent } from '@/components/pages/help-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Help Center | GrowthGround',
  description: 'Get help and support with your learning journey',
};

export default async function HelpPage() {
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
        <HelpPageComponent />
      </div>
      <Footer />
    </div>
  );
}
