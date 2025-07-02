import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SessionProvider } from '@/components/providers/session-provider';
import { createClient } from '@/lib/supabase/server';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GrowthGround - Learn, Grow, Succeed',
  description: 'An interactive educational platform for modern learners',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get the session server-side - this is the source of truth
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider initialUser={user}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}