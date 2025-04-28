// app/api/early-access/route.js
import { createClient }   from '@supabase/supabase-js';
import { NextResponse }   from 'next/server';

/* ➊ ключи берём из .env.local  */
const supabase = createClient(
  process.env.SUPABASE_URL,          // e.g. https://xyz.supabase.co
  process.env.SUPABASE_SERVICE_KEY   // **service-role** key ─ умеет INSERT
);

/* ➋ POST /api/early-access  */
export async function POST(req) {
  try {
    const { name, email } = await req.json();

    // простая валидация
    if (!name?.trim() || !/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email)) {
      return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }

    /* ➌ запись в таблицу leads */
    const { error } = await supabase
      .from('50-earlyAccessLeads')
      .insert({ name: name.trim(), email: email.trim() });

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'DB error' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('early-access API error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
