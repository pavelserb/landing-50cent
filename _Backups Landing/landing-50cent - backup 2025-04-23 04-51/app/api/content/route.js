// app/api/content/route.js
import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const CONTENT_FILE = path.join(process.cwd(), 'data', 'content.json')
const ADMIN_PASS = process.env.ADMIN_PASSWORD

// Проверяет Basic Auth: заголовок Authorization: Basic base64(user:pass)
function checkAuth(authHeader) {
  if (!authHeader || !authHeader.startsWith('Basic ')) return false
  const encoded = authHeader.split(' ')[1]
  const [user, pass] = Buffer.from(encoded, 'base64').toString().split(':')
  return user === 'admin' && pass === ADMIN_PASS
}

export async function GET(request) {
  // Авторизация
  if (!checkAuth(request.headers.get('authorization'))) {
    return NextResponse.error({ status: 401, statusText: 'Unauthorized' })
  }
  // Читаем JSON и возвращаем
  const json = await fs.readFile(CONTENT_FILE, 'utf-8')
  return NextResponse.json(JSON.parse(json))
}

export async function PUT(request) {
  if (!checkAuth(request.headers.get('authorization'))) {
    return NextResponse.error({ status: 401, statusText: 'Unauthorized' })
  }
  // Получаем тело запроса (новый JSON)
  const data = await request.json()
  // Валидация (минимально можно проверить, что это объект)
  if (typeof data !== 'object') {
    return NextResponse.error({ status: 400, statusText: 'Invalid JSON' })
  }
  // Записываем в файл
  await fs.writeFile(CONTENT_FILE, JSON.stringify(data, null, 2), 'utf-8')
  return NextResponse.json({ status: 'ok' })
}
