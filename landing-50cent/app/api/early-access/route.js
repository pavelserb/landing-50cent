// app/api/early-access/route.js
import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const FILE = path.join(process.cwd(), 'data', 'early-access.json');

export async function POST(req) {
  try {
    const { name, email } = await req.json();

    // элементарная валидация
    if (!name?.trim() || !/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email)) {
      return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }

    // читаем текущий список (если нет файла – пустой массив)
    let list = [];
    try {
      const txt = await fs.readFile(FILE, 'utf-8');
      list = JSON.parse(txt);
    } catch { /* first run – no file yet */ }

    list.push({ name, email, ts: Date.now() });

    await fs.writeFile(FILE, JSON.stringify(list, null, 2));

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('early-access POST error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
