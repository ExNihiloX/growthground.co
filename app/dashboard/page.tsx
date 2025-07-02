import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | GrowthGround',
  description: 'Your learning progress and next steps',
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return redirect('/auth/login');
  }

  // --- Start of New Data Fetching & Logic ---

  // 1. Fetch all necessary data in parallel
  const [
    profileRes,
    categoriesRes,
    modulesRes,
    progressRes
  ] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', session.user.id).single(),
    supabase.from('categories').select('id, name'),
    supabase.from('modules').select(`*, lessons (id)`).order('sort_order', { ascending: true }),
    supabase.from('user_module_progress').select('*').eq('user_id', session.user.id)
  ]);

  // Handle potential errors
  if (profileRes.error || categoriesRes.error || modulesRes.error || progressRes.error) {
    console.error('Error fetching dashboard data:',
      profileRes.error || categoriesRes.error || modulesRes.error || progressRes.error
    );
    return <div className="p-8 text-red-500">Error loading data. Please try again later.</div>;
  }

  const profile = profileRes.data;
  const allModules = modulesRes.data || [];
  const userProgress = progressRes.data || [];

  // 2. Create helper maps for easy lookup
  const categoryMap: Record<string, string> = Object.fromEntries(
    (categoriesRes.data || []).map(cat => [cat.id, cat.name])
  );
  const progressMap: Record<string, number> = Object.fromEntries(
    userProgress.map((p: any) => [p.module_id, p.progress_percentage])
  );

  // 3. Filter modules into our new categories
  const activeModules = allModules.filter(
    (m: any) => (progressMap[m.id] > 0) && (progressMap[m.id] < 100)
  );

  const completedModules = allModules.filter((m: any) => progressMap[m.id] === 100);
  const completedModuleIds = new Set(completedModules.map((m: any) => m.id));

  const nextModules = allModules
    .filter((m: any) => !progressMap[m.id] && !completedModuleIds.has(m.id))
    .slice(0, 2);

  // --- End of New Data Fetching & Logic ---

  // We still pass all modules for the "Explore" section
  return (
    <DashboardClient
      profile={profile || {}}
      activeModules={activeModules}
      nextModules={nextModules}
      allModules={allModules}
      categories={categoryMap}
      userProgress={progressMap}
      userId={session.user.id}
    />
  );
}
