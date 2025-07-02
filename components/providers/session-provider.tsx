'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

// Simple types for the session context
type SessionContextType = {
  user: User | null;
  loading: boolean;
};

// Create context with default values
const SessionContext = createContext<SessionContextType>({
  user: null,
  loading: true,
});

// Hook to use the session context
export function useSession() {
  return useContext(SessionContext);
}

// Provider component that maintains session state on the client
export function SessionProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: User | null;
}) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [loading, setLoading] = useState(!initialUser);
  
  // Set up auth state listener for client-side changes
  useEffect(() => {
    const supabase = createClient();
    
    // Get initial session if we don't have initial user
    if (!initialUser) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event);
      setUser(session?.user ?? null);
      setLoading(false);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [initialUser]);
  
  return (
    <SessionContext.Provider value={{ user, loading }}>
      {children}
    </SessionContext.Provider>
  );
}