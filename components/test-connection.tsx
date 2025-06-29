'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Loader2, User } from 'lucide-react';

export function TestConnection() {
  const { user, profile, isLoading: authLoading } = useAuth();
  const [connectionStatus, setConnectionStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test basic connection by fetching the ID of a single profile
        const { data, error } = await supabase
          .from('profiles')
          .select('id') // Selecting a specific, likely existing column
          .limit(1);

        if (error) {
          throw error;
        }

        setConnectionStatus('success');
      } catch (err: any) {
        setConnectionStatus('error');
        setError(err.message);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Database Connection Test */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Database Connection
            {connectionStatus === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
            {connectionStatus === 'success' && <CheckCircle className="h-4 w-4 text-green-500" />}
            {connectionStatus === 'error' && <XCircle className="h-4 w-4 text-red-500" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {connectionStatus === 'loading' && (
            <Badge variant="secondary">Testing connection...</Badge>
          )}
          {connectionStatus === 'success' && (
            <Badge className="bg-green-500">✅ Database connected!</Badge>
          )}
          {connectionStatus === 'error' && (
            <div>
              <Badge variant="destructive">❌ Connection failed</Badge>
              {error && (
                <p className="text-sm text-red-600 mt-2">Error: {error}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Authentication Status */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Authentication Status
            {authLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {!authLoading && user && <CheckCircle className="h-4 w-4 text-green-500" />}
            {!authLoading && !user && <XCircle className="h-4 w-4 text-red-500" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {authLoading && (
            <Badge variant="secondary">Checking authentication...</Badge>
          )}
          {!authLoading && user && (
            <div className="space-y-2">
              <Badge className="bg-green-500">✅ User authenticated!</Badge>
              <div className="text-sm text-gray-600">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Name:</strong> {profile?.name || user.user_metadata?.name || 'Not set'}</p>
                <p><strong>User ID:</strong> {user.id}</p>
              </div>
            </div>
          )}
          {!authLoading && !user && (
            <Badge variant="destructive">❌ Not authenticated</Badge>
          )}
        </CardContent>
      </Card>
    </div>
  );
}