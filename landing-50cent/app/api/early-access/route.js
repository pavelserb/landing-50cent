// app/api/early-access/route.js
import { NextResponse }  from 'next/server';
// import { createClient }  from '@supabase/supabase-js';
// import { supabaseBrowser }  from '@supabase/supabase-js';
// import { supabaseServer } from '@/lib/supabase'
import { supabaseServer }  from '@/lib/supabaseServer'

// const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;

// if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
//   console.error('Missing Supabase env vars');
// }

// const supabase = supabaseBrowser(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const supabase = supabaseServer;

export async function POST(req) {
  try {
    const { name, email } = await req.json();

    if (!name?.trim() || !/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email)) {
      return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }

    const { error } = await supabase
      .from('leads')
      .insert({ name: name.trim(), email: email.trim() });

    if (error) {
      console.error('Supabase error:', error);

      // дубликат уникального email
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Email exists' }, { status: 409 });
      }

      return NextResponse.json({ error: 'DB error' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('early-access API crash:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
