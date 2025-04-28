// app/api/content/route.js
import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const FILE = path.resolve('data', 'content.json')

export async function GET() {
  const json = await fs.readFile(FILE, 'utf-8')
  return NextResponse.json(JSON.parse(json))
}

export async function PUT(request) {
  const newContent = await request.json()
  // Можно дополнительно валидировать, что в newContent нет лишних полей
  await fs.writeFile(FILE, JSON.stringify(newContent, null, 2), 'utf-8')
  return NextResponse.json(newContent)
}
