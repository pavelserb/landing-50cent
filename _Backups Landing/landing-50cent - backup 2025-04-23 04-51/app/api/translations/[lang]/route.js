import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const LOCALES_DIR = path.join(process.cwd(), 'locales')

export async function GET(request, { params }) {
  const lang = await params.lang      // <-- дождаться Promise
  const file = path.join(LOCALES_DIR, `${lang}.json`)
  const data = await fs.readFile(file, 'utf-8')
  return NextResponse.json(JSON.parse(data))
}

export async function PUT(request, { params }) {
  const lang = await params.lang
  const file = path.join(LOCALES_DIR, `${lang}.json`)
  const body = await request.json()
  await fs.writeFile(file, JSON.stringify(body, null, 2), 'utf-8')
  return NextResponse.json({ status: 'ok' })
}
