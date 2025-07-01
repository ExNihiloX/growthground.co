import { createClient } from '@/lib/supabase/server'; // Use the server client
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | GrowthGround',
  description: 'Your learning progress and next steps',
};

// Map for category names
const CATEGORY_NAMES: Record<string, string> = {
  'fundamentals': 'Fundamentals',
  'design': 'Product Design',
  'development': 'Development',
  'business': 'Business & Strategy',
  'operations': 'Operations',
};

export default async function DashboardPage() {
  // Create the Supabase client (now awaits cookies() internally)
  const supabase = await createClient();

  // Check for active session
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return redirect('/auth/login');
  }
  
  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  // Fetch categories for mapping
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name')
    .order('name');
    
  // Build a map of category IDs to names
  const categoryMap: Record<string, string> = {};
  if (categories) {
    categories.forEach((cat: { id: string; name: string }) => {
      categoryMap[cat.id] = cat.name;
    });
  } else {
    // Fallback to hardcoded categories if DB fetch fails
    Object.entries(CATEGORY_NAMES).forEach(([id, name]) => {
      categoryMap[id] = name;
    });
  }

  // Fetch all modules, correctly ordered by 'sort_order'
  const { data: modules, error: modulesError } = await supabase
    .from('modules')
    .select(`
      *,
      lessons (id, title, description, duration_minutes, sort_order, core_concepts)
    `)
    .order('sort_order', { ascending: true })
    .order('sort_order', { foreignTable: 'lessons', ascending: true });

  // Fetch all of the user's completed lessons
  const { data: completedLessons, error: progressError } = await supabase
    .from('user_lesson_completions')
    .select('lesson_id')
    .eq('user_id', session.user.id);

  if (modulesError || progressError) {
    console.error('Error fetching dashboard data:', modulesError || progressError);
    return <div className="p-8 text-red-500">Error loading data. Please try again later.</div>;
  }

  // Create a Set for quick lookup of completed lesson IDs
  const completedLessonIds = new Set(completedLessons?.map((l: { lesson_id: string }) => l.lesson_id) || [] as string[]);

  // Pass all the fetched data as props to the Client Component
  return (
    <DashboardClient 
      modules={modules || []} 
      completedLessonIds={completedLessonIds} 
      userId={session.user.id}
      profile={profile || {}}
      categories={categoryMap}
    />
  );
}