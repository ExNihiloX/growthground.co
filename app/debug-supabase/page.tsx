'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function DebugSupabasePage() {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [testNumber, setTestNumber] = useState(1);

  async function runTest(testNum: number) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const supabase = createClient();
      let data;
      let err;

      if (testNum === 1) {
        // Test 1: Basic connection test
        const response = await supabase.from('profiles').select('*').limit(1);
        data = response.data;
        err = response.error;
      } else if (testNum === 2) {
        // Test 2: Check auth status
        const response = await supabase.auth.getSession();
        data = response.data;
        err = response.error;
      } else if (testNum === 3) {
        // Test 3: Test signup functionality
        const testEmail = `test-${Date.now()}@example.com`;
        const response = await supabase.auth.signUp({
          email: testEmail,
          password: 'testpassword123',
          options: {
            data: {
              full_name: 'Test User'
            }
          }
        });
        data = { 
          user: response.data.user?.email, 
          session: !!response.data.session,
          needsConfirmation: !response.data.session 
        };
        err = response.error;
      }

      if (err) {
        console.error('Supabase error:', err);
        setError(JSON.stringify(err, null, 2));
      } else {
        setResult(data);
      }
    } catch (e: any) {
      console.error('Exception:', e);
      setError(e.message || 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    runTest(testNumber);
  }, [testNumber]);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Supabase Connection Debugger</h1>
      
      <div className="mb-6">
        <div className="flex gap-2 mb-4">
          <button 
            onClick={() => setTestNumber(1)}
            className={`px-4 py-2 rounded ${testNumber === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Test Database Connection
          </button>
          <button 
            onClick={() => setTestNumber(2)}
            className={`px-4 py-2 rounded ${testNumber === 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Test Auth Session
          </button>
          <button 
            onClick={() => setTestNumber(3)}
            className={`px-4 py-2 rounded ${testNumber === 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Test Signup Flow
          </button>
          <button 
            onClick={() => runTest(testNumber)}
            className="px-4 py-2 rounded bg-green-600 text-white"
          >
            Retry Current Test
          </button>
        </div>
        
        <div className="bg-gray-100 p-4 rounded">
          <div className="mb-2">
            <span className="font-semibold">Connection URL:</span> https://tjkejpynizmxroaealcp.supabase.co
          </div>
          <div>
            <span className="font-semibold">Test:</span> {
              testNumber === 1 ? 'Database Connection' : 
              testNumber === 2 ? 'Auth Session Check' : 'Signup Flow Test'
            }
          </div>
        </div>
      </div>
      
      <div className="bg-white border rounded p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Result:</h2>
        
        {isLoading ? (
          <div className="text-gray-500">Loading...</div>
        ) : error ? (
          <div>
            <div className="font-semibold text-red-600 mb-2">Error:</div>
            <pre className="bg-red-50 text-red-800 p-4 rounded overflow-auto max-h-96">
              {error}
            </pre>
          </div>
        ) : (
          <div>
            <div className="font-semibold text-green-600 mb-2">Success!</div>
            <pre className="bg-green-50 text-green-800 p-4 rounded overflow-auto max-h-96">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}