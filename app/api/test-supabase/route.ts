import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const supabase = createClient();

export async function GET() {
  try {
    console.log('API route triggered. Attempting to connect to Supabase...');
    console.log('Supabase URL Used:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Loaded' : 'MISSING');

    const { data, error, status } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);

    if (error) {
      console.error('Supabase API Error:', error);
      return NextResponse.json({ error: error.message, status }, { status });
    }

    console.log('Supabase query successful:', data);
    return NextResponse.json(data);

  } catch (e: any) {
    console.error('Catch block error:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
