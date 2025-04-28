// app/admin/page.js
'use client'

import { useState, useEffect } from 'react'

export default function AdminPage() {
  const [content, setContent] = useState(null)
  const [status, setStatus] = useState('')
  const [auth, setAuth] = useState('')

  // 1) Логинимся и сразу тащим content.json
  const handleLogin = async (e) => {
    e.preventDefault()
    const authHeader = 'Basic ' + btoa(`admin:${e.target.password.value}`)
    setAuth(authHeader)
    try {
      const res = await fetch('/api/content', { headers: { Authorization: authHeader } })
      if (!res.ok) throw new Error(res.statusText)
      const json = await res.json()
      setContent(json)
      setStatus('Loaded content')
    } catch (err) {
      setStatus('Login failed')
    }
  }

  // 2) Сохраняем изменения
  const handleSave = async () => {
    setStatus('Saving…')
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          Authorization: auth,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content, null, 2),
      })
      if (!res.ok) throw new Error(res.statusText)
      setStatus('Saved!')
    } catch (err) {
      setStatus('Save failed')
    }
  }

  // 3) Показываем форму входа, если ещё не залогинены
  if (!content) {
    return (
      <div className="p-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <label className="block">
            Пароль: 
            <input name="password" type="password" className="ml-2 border rounded px-2" required />
          </label>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Войти
          </button>
          {status && <p className="text-red-600 mt-2">{status}</p>}
        </form>
      </div>
    )
  }

  // 4) Форма редактирования
  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Content Editor</h1>
      {status && <p className="text-green-600">{status}</p>}

      {/* Общие настройки */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Общие</h2>
        <label className="block">
          Заголовок сайта:
          <input
            type="text"
            value={content.siteTitle}
            onChange={(e) => setContent({ ...content, siteTitle: e.target.value })}
            className="w-full border rounded px-2 py-1"
          />
        </label>
        <label className="block">
          Дата мероприятия:
          <input
            type="text"
            value={content.eventDate}
            onChange={(e) => setContent({ ...content, eventDate: e.target.value })}
            className="w-full border rounded px-2 py-1"
          />
        </label>
        <label className="block">
          Hero Image URL:
          <input
            type="text"
            value={content.heroImage}
            onChange={(e) => setContent({ ...content, heroImage: e.target.value })}
            className="w-full border rounded px-2 py-1"
          />
        </label>
        <label className="block">
          Видео src:
          <input
            type="text"
            value={content.videoSrc}
            onChange={(e) => setContent({ ...content, videoSrc: e.target.value })}
            className="w-full border rounded px-2 py-1"
          />
        </label>
      </section>

      {/* Преимущества */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Преимущества</h2>
        {content.advantages.map((adv, i) => (
          <div key={i} className="p-4 border rounded space-y-2">
            <label className="block">
              Заголовок:
              <input
                type="text"
                value={adv.title}
                onChange={(e) => {
                  const arr = [...content.advantages]
                  arr[i].title = e.target.value
                  setContent({ ...content, advantages: arr })
                }}
                className="w-full border rounded px-2 py-1"
              />
            </label>
            <label className="block">
              Описание:
              <textarea
                value={adv.description}
                onChange={(e) => {
                  const arr = [...content.advantages]
                  arr[i].description = e.target.value
                  setContent({ ...content, advantages: arr })
                }}
                className="w-full border rounded px-2 py-1"
              />
            </label>
          </div>
        ))}
      </section>

      {/* Билеты */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Билеты</h2>
        {content.tickets.map((t, i) => (
          <div key={i} className="p-4 border rounded space-y-2">
            <label className="block">
              Тип:
              <input
                type="text"
                value={t.type}
                onChange={(e) => {
                  const arr = [...content.tickets]
                  arr[i].type = e.target.value
                  setContent({ ...content, tickets: arr })
                }}
                className="w-full border rounded px-2 py-1"
              />
            </label>
            <label className="block">
              Цена:
              <input
                type="text"
                value={t.price}
                onChange={(e) => {
                  const arr = [...content.tickets]
                  arr[i].price = e.target.value
                  setContent({ ...content, tickets: arr })
                }}
                className="w-full border rounded px-2 py-1"
              />
            </label>
            <label className="block">
              Ссылка:
              <input
                type="text"
                value={t.link}
                onChange={(e) => {
                  const arr = [...content.tickets]
                  arr[i].link = e.target.value
                  setContent({ ...content, tickets: arr })
                }}
                className="w-full border rounded px-2 py-1"
              />
            </label>
          </div>
        ))}
      </section>

      {/* Остальные секции по аналогии… */}
      {/* ExclusiveOffers, spotifyEmbedUrl, testimonials, socialFeed, faq, earlyAccess, contacts */}

      {/* Кнопка Save */}
      <button
        onClick={handleSave}
        className="mt-8 bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded"
      >
        Сохранить все изменения
      </button>
    </div>
  )
}
