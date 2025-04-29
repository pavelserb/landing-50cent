// app/api/content/route.js
// import { NextResponse } from 'next/server'
// import { promises as fs } from 'fs'
// import path from 'path'

// const FILE = path.resolve('data', 'content.json')

// export async function GET() {
//   const json = await fs.readFile(FILE, 'utf-8')
//   return NextResponse.json(JSON.parse(json))
// }

// export async function PUT(request) {
//   const newContent = await request.json()
//   // Можно дополнительно валидировать, что в newContent нет лишних полей
//   await fs.writeFile(FILE, JSON.stringify(newContent, null, 2), 'utf-8')
//   return NextResponse.json(newContent)
// }


// app/api/content/route.js
// import { NextResponse } from 'next/server'
// import { supabase }    from '@/lib/supabase'
// import { revalidateTag } from 'next/cache'   // ⬅ для ISR, если нужно

// /* ---------- GET ---------- */
// export async function GET () {
//   const { data, error } = await supabase
//     .from('content')
//     .select('data')
//     .eq('id', 'root')
//     .single()

//   if (error) return NextResponse.json({ error: error.message }, { status: 500 })
//   return NextResponse.json(data?.data ?? {})
// }

// /* ---------- PUT ---------- */
// export async function PUT (req) {
//   const body = await req.json()

//   const { error } = await supabase
//     .from('content')
//     .upsert({ id: 'root', data: body })

//   if (error) return NextResponse.json({ error: error.message }, { status: 500 })

//   /* сброс кеша (если используете revalidateTag в странице) */
//   // revalidateTag('content')

//   return NextResponse.json({ ok: true })
// }

// app/api/content/route.js
// import { NextResponse }   from 'next/server'
// import { createClient }   from '@supabase/supabase-js'
// import { revalidateTag }  from 'next/cache'      // если пользуетесь ISR

// /* ─────────────  Supabase  ───────────── */
// const supabase = createClient(
//   process.env.SUPABASE_URL,                // всегда на сервере
//   process.env.SUPABASE_SERVICE_ROLE_KEY    // нужен для INSERT/UPDATE
// )

// const TABLE = 'content'
// const ROW   = 'main'                        // primary-key из SQL-скрипта

// /* ─────────────  mini Basic-Auth  ───────────── */
// function isAuthOK (req) {
//   const h = req.headers.get('authorization') || ''
//   if (!h.startsWith('Basic ')) return false

//   const [, encoded] = h.split(' ')
//   const [user, pass] = Buffer.from(encoded, 'base64').toString().split(':')

//   return user === 'admin' && pass === process.env.ADMIN_PASS
// }

// /* ─────────────  GET /api/content  ───────────── */
// export async function GET () {
//   const { data, error } = await supabase
//     .from(TABLE)
//     .select('data')
//     .eq('id', ROW)
//     .single()

//   if (error) {
//     console.error('supabase error', error)
//     return NextResponse.json({ error: 'db error' }, { status: 500 })
//   }

//   return NextResponse.json(data?.data ?? {})
// }

// /* ─────────────  PUT /api/content  ───────────── */
// export async function PUT (req) {
//   if (!isAuthOK(req)) {
//     return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
//   }

//   const body = await req.json()

//   const { error } = await supabase
//     .from(TABLE)
//     .upsert({
//       id:         ROW,
//       data:       body,
//       updated_at: new Date().toISOString()
//     })

//   if (error) {
//     console.error('supabase error', error)
//     return NextResponse.json({ error: 'db error' }, { status: 500 })
//   }

//   /* если на странице применяете  <Cache>{ tag: 'content' }</Cache>  */
//   // revalidateTag('content')

//   return NextResponse.json({ ok: true })
// }

// app/api/content/route.js
import { NextResponse } from 'next/server'
import { supabase }     from '@/lib/supabase'

/* ───────── helper: минимальный basic-auth ───────── */
function isAuthOK (req) {
  const hdr = req.headers.get('authorization') || ''
  const valid = 'Basic ' + Buffer
    .from(`admin:${process.env.ADMIN_PASS}`)
    .toString('base64')

  return hdr === valid
}

/* ───────── GET  (получить весь контент) ───────── */
export async function GET () {
  const { data, error } = await supabase
    .from('content')
    .select('data')
    .eq('id', 'main')
    .single()

  if (error) {
    console.error('GET /api/content →', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data?.data ?? {})
}

/* ───────── PUT  (сохранить из админки) ───────── */
export async function PUT (req) {
  if (!isAuthOK(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()

  const { error } = await supabase
    .from('content')
    .upsert({ id: 'main', data: body })

  if (error) {
    console.error('PUT /api/content →', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Если используете ISR с revalidateTag — раскомментируйте:
  // import { revalidateTag } from 'next/cache'
  // revalidateTag('content')

  return NextResponse.json({ ok: true })
}
