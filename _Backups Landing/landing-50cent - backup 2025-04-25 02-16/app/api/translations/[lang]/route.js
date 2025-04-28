// app/api/translations/[lang]/route.js
import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// GET /api/translations/{lang}
export async function GET(request, { params }) {
  const { lang } = params
  const filePath = path.join(process.cwd(), 'locales', `${lang}.json`)
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return NextResponse.json(JSON.parse(data))
  } catch (err) {
    // файл не найден или другая ошибка чтения
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}

// PUT /api/translations/{lang}
export async function PUT(request, { params }) {
  const { lang } = params
  const filePath = path.join(process.cwd(), 'locales', `${lang}.json`)
  try {
    const newData = await request.json()
    await fs.writeFile(filePath, JSON.stringify(newData, null, 2), 'utf-8')
    return NextResponse.json(newData)
  } catch (err) {
    return NextResponse.json({ error: 'Could not save' }, { status: 500 })
  }
}
