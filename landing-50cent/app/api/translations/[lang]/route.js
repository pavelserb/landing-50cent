// app/api/translations/[lang]/route.js
// import fs   from 'fs/promises'
// import path from 'path'

// export async function GET(request, { params }) {
//   const { lang } = params                    // ← ошибок больше нет
//   const file     = path.join(process.cwd(), 'locales', `${lang}.json`)

//   try {
//     const data = await fs.readFile(file, 'utf-8')
//     return new Response(data, { status: 200 })
//   } catch {
//     return new Response('Not found', { status: 404 })
//   }
// }


// /* PUT /api/translations/{lang} */
// export async function PUT(request, context) {
//   const { lang }  = context.params
//   const file      = path.join(process.cwd(), 'locales', `${lang}.json`)
//   const body      = await request.json()

//   await fs.writeFile(file, JSON.stringify(body, null, 2), 'utf-8')
//   return new Response('Saved')
// }

// app/api/translations/[lang]/route.js
// import { NextResponse } from 'next/server'
// import { supabase }    from '@/lib/supabase'

// export async function GET (_req, { params }) {
//   const { lang } = params
//   const { data, error } = await supabase
//     .from('translations')
//     .select('data')
//     .eq('locale', lang)
//     .single()

//   if (error) return NextResponse.json({ error: error.message }, { status: 500 })
//   return NextResponse.json(data?.data ?? {})
// }

// export async function PUT (req, { params }) {
//   const { lang } = params
//   const body = await req.json()

//   const { error } = await supabase
//     .from('translations')
//     .upsert({ locale: lang, data: body })

//   if (error) return NextResponse.json({ error: error.message }, { status: 500 })
//   return NextResponse.json({ ok: true })
// }

// app/api/translations/[lang]/route.js
// import { NextResponse } from 'next/server'
// // import { createClient } from '@supabase/supabase-js'
// import { createClient } from '@/lib/supabase'
// import { revalidatePath } from 'next/cache'

// // const supabase = createClient(
// //   process.env.SUPABASE_URL,
// //   process.env.SUPABASE_SERVICE_ROLE_KEY // service-role («insert/update») или anon+RLS
// // )
// const supabase = createClient()

// /* ----------  GET  -----------  (чтение переводов) */
// export async function GET(_req, ctx) {
//   const { lang } = await ctx.params
// // export async function GET (_req, { params }) {      // ✅ просто деструктурируем
// //   const { lang } = await params

//   const { data, error } = await supabase
//     .from('translations')
//     .select('data')
//     .eq('locale', lang)
//     .single()

//   if (error) {
//     console.error('supabase error', error)
//     return NextResponse.json({ error: 'db error' }, { status: 500 })
//   }

//   return NextResponse.json(data.data)
// }

// /* ----------  PUT  -----------  (сохранение из admin-формы) */
// export async function PUT(req, ctx) {
//   const { lang } = await ctx.params
// // export async function PUT (req, { params }) {       // ✅ то же самое
// //   const { lang } = await params

//   const body     = await req.json()            // «сырые» JSON-данные перевода

//   const { error } = await supabase
//     .from('translations')
//     .upsert(
//       { locale: lang, data: body, updated_at: new Date().toISOString() },
//       { onConflict: 'locale' }                 // обновит, если строка уже есть
//     )

//   if (error) {
//     console.error('supabase error', error)
//     return NextResponse.json({ error: 'db error' }, { status: 500 })
//   }

//   return NextResponse.json({ ok: true })
// }

// app/api/translations/[lang]/route.js
// import { NextResponse }   from 'next/server';
// import { createAdminClient } from '@/lib/supabase';   // service-role
// import { revalidatePath } from 'next/cache';

// const supabase = createAdminClient();

// /* ---------- GET ---------- */
// export async function GET(_req, { params }) {
//   const { lang } = params;

//   const { data, error } = await supabase
//     .from('translations')
//     .select('data')
//     .eq('locale', lang)
//     .single();

//   if (error) {
//     console.error('Supabase GET translations', error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }

//   return NextResponse.json(data?.data ?? {});
// }

// /* ---------- PUT ---------- */
// export async function PUT(req, { params }) {
//   const { lang } = params;
//   const body     = await req.json();

//   const { error } = await supabase
//     .from('translations')
//     .upsert({ locale: lang, data: body, updated_at: new Date().toISOString() },
//             { onConflict: 'locale' });

//   if (error) {
//     console.error('Supabase PUT translations', error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }

//   /* сбрасываем кэш страницы этого языка */
//   revalidatePath('/' + lang);         // или revalidateTag('translations')

//   return NextResponse.json({ ok: true });
// }

// app/api/translations/[lang]/route.js
// ────────────────────────────────────────────────────────────────────────────
// REST-эндпоинт для чтения / сохранения перевода конкретного языка.
//  - GET  → отдаёт JSON-файл переводов
//  - PUT  → записывает новые переводы из админки
// После успешного PUT вызываем revalidatePath('/{lang}'), чтобы страница
//       этого языка перегенерировалась и показывала свежие данные.
// ---------------------------------------------------------------------------

// app/api/translations/[lang]/route.js
import { NextResponse }   from 'next/server'
import { supabase }       from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

/* ────── mini Basic-Auth ────── */
function isAuthOK(req) {
  const h = req.headers.get('authorization') || ''
  if (!h.startsWith('Basic ')) return false

  const [, encoded] = h.split(' ')
  const [user, pass] = Buffer.from(encoded, 'base64').toString().split(':')

  return user === 'admin' && pass === process.env.ADMIN_PASSWORD
}

const TABLE = 'translations'

/* ───────── GET /api/translations/[lang] ───────── */
export async function GET(_req, { params }) {
  // const { lang } = await params
  const { lang } = params

  const { data, error } = await supabase
    .from(TABLE)
    .select('data')
    .eq('locale', lang)
    .single()

  if (error) {
    console.error('GET translations →', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data?.data ?? {})
}

/* ───────── PUT /api/translations/[lang] ───────── */
export async function PUT(req, { params }) {
  if (!isAuthOK(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // const { lang } = params
  const { lang } = await params
  const body     = await req.json()

  const { error } = await supabase
    .from(TABLE)
    .upsert(
      { locale: lang, data: body, updated_at: new Date().toISOString() },
      { onConflict: 'locale' }
    )

  if (error) {
    console.error('PUT translations →', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Сброс кеша страницы этого языка
  // revalidatePath('/' + lang)
  revalidatePath(`/${lang}`);


  return NextResponse.json({ ok: true })
}

