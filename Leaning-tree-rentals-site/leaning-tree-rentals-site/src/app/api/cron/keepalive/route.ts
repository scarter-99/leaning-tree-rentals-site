import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Must hit Supabase on every invocation — a cached response would defeat the point.
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Vercel sends `Authorization: Bearer $CRON_SECRET` when a CRON_SECRET env var
  // is set on the project. If it isn't set we still run, so a missing secret can
  // never be the reason the database quietly pauses.
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    if (request.headers.get('authorization') !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  } else {
    console.warn('Keepalive: CRON_SECRET is not set, endpoint is unauthenticated');
  }

  try {
    // Plain client rather than the cookie-based server client — there is no user
    // session on a cron invocation.
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false } }
    );

    // A real PostgREST read is what counts as project activity.
    const { data, error } = await supabase
      .from('keepalive')
      .select('last_checked_at')
      .eq('id', 1)
      .single();

    if (error) {
      console.error('Keepalive query failed:', error);
      return NextResponse.json(
        { error: 'Keepalive query failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      pinged_at: new Date().toISOString(),
      row_last_checked_at: data.last_checked_at,
    });
  } catch (error) {
    console.error('Keepalive error:', error);
    return NextResponse.json({ error: 'Keepalive failed' }, { status: 500 });
  }
}
