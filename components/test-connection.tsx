'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export function TestConnection() {
  const [connectionStatus, setConnectionStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test basic connection
        const { data, error } = await supabase
          .from('profiles')
          .select('count')
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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Supabase Connection Test
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
          <Badge className="bg-green-500">✅ Connected successfully!</Badge>
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
  );
}