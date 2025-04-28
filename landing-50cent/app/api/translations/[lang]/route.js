// app/api/translations/[lang]/route.js
import fs   from 'fs/promises'
import path from 'path'

export async function GET(request, { params }) {
  const { lang } = params                    // ← ошибок больше нет
  const file     = path.join(process.cwd(), 'locales', `${lang}.json`)

  try {
    const data = await fs.readFile(file, 'utf-8')
    return new Response(data, { status: 200 })
  } catch {
    return new Response('Not found', { status: 404 })
  }
}


/* PUT /api/translations/{lang} */
export async function PUT(request, context) {
  const { lang }  = context.params
  const file      = path.join(process.cwd(), 'locales', `${lang}.json`)
  const body      = await request.json()

  await fs.writeFile(file, JSON.stringify(body, null, 2), 'utf-8')
  return new Response('Saved')
}
