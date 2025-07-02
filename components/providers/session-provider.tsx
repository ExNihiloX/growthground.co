'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

// Simple types for the session context
type SessionContextType = {
  user: User | null;
};

// Create context with default values
const SessionContext = createContext<SessionContextType>({
  user: null,
});

// Hook to use the session context
export function useSession() {
  return useContext(SessionContext);
}

// Provider component that maintains session state on the client
// Will be initialized with server-fetched session data
export function SessionProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: User | null;
}) {
  const [user, setUser] = useState<User | null>(initialUser);
  
  // Set up auth state listener for client-side changes
  useEffect(() => {
    const supabase = createClient();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event);
      setUser(session?.user ?? null);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  return (
    <SessionContext.Provider value={{ user }}>
      {children}
    </SessionContext.Provider>
  );
}
