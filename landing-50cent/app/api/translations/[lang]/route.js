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
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // service-role («insert/update») или anon+RLS
)

/* ----------  GET  -----------  (чтение переводов) */
// export async function GET(_req, ctx) {
//   const { lang } = ctx.params
export async function GET (_req, { params }) {      // ✅ просто деструктурируем
  const { lang } = await params

  const { data, error } = await supabase
    .from('translations')
    .select('data')
    .eq('locale', lang)
    .single()

  if (error) {
    console.error('supabase error', error)
    return NextResponse.json({ error: 'db error' }, { status: 500 })
  }

  return NextResponse.json(data.data)
}

/* ----------  PUT  -----------  (сохранение из admin-формы) */
// export async function PUT(req, ctx) {
//   const { lang } = ctx.params
export async function PUT (req, { params }) {       // ✅ то же самое
  const { lang } = await params

  const body     = await req.json()            // «сырые» JSON-данные перевода

  const { error } = await supabase
    .from('translations')
    .upsert(
      { locale: lang, data: body, updated_at: new Date().toISOString() },
      { onConflict: 'locale' }                 // обновит, если строка уже есть
    )

  if (error) {
    console.error('supabase error', error)
    return NextResponse.json({ error: 'db error' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
