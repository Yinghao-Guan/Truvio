import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Plain anon client — no cookie/session handling. This endpoint is fully
// public so we always want the anon role, never authenticated.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// In-memory rate limiter: 5 submissions per IP per 10 minutes.
// Per-instance only (serverless), so not a hard guarantee, but meaningfully
// raises the cost of bulk abuse without requiring an external store.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const ipMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipMap.get(ip);

  if (!entry || now > entry.resetAt) {
    ipMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;

  entry.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  let email: string;

  try {
    const body = await req.json();
    const raw = body.email;
    if (typeof raw !== 'string') throw new Error('email must be a string');
    email = raw.trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // RFC 5321 max email length is 254 characters
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 422 });
  }

  const { error } = await supabase.from('waitlist').insert({ email });

  if (error) {
    // Unique violation — already signed up
    if (error.code === '23505') {
      return NextResponse.json({ message: "You're already on the list!" }, { status: 200 });
    }
    console.error('Waitlist insert error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Thanks! We\'ll be in touch.' }, { status: 201 });
}
