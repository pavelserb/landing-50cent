// app/[locale]/admin/page.js
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

const LOCALES = ['en', 'pl']

export default function AdminPage() {
  const { locale: initial } = useParams()
  const [locale, setLocale] = useState(initial || 'en')
  const [contentData, setContent] = useState(null)
  const [transData, setTrans]     = useState(null)
  const [status, setStatus]       = useState('')

  const authHeader = 'Basic ' + btoa(`admin:${process.env.NEXT_PUBLIC_ADMIN_PASS}`)

  useEffect(() => {
    setStatus('Loading…')
    Promise.all([
      fetch('/api/content',      { headers: { Authorization: authHeader } }).then(r=>r.json()),
      fetch(`/api/translations/${locale}`, { headers: { Authorization: authHeader } }).then(r=>r.json())
    ])
    .then(([common, translations]) => {
      setContent(common)
      setTrans(translations)
      setStatus('')
    })
    .catch(() => setStatus('Error loading data'))
  }, [locale, authHeader])

  const saveAll = async () => {
    setStatus('Saving…')
    try {
      await Promise.all([
        fetch('/api/content', {
          method: 'PUT',
          headers: { Authorization: authHeader, 'Content-Type':'application/json' },
          body: JSON.stringify(contentData, null, 2)
        }),
        fetch(`/api/translations/${locale}`, {
          method: 'PUT',
          headers: { Authorization: authHeader, 'Content-Type':'application/json' },
          body: JSON.stringify(transData, null, 2)
        })
      ])
      setStatus('Saved successfully')
    } catch {
      setStatus('Error saving data')
    }
  }

  if (!contentData || !transData) {
    return <p className="p-8 text-center">{status || 'Loading…'}</p>
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12">
      {/* Селектор языка */}
      <div className="space-x-2">
        {LOCALES.map(loc => (
          <button
            key={loc}
            onClick={() => setLocale(loc)}
            className={`px-4 py-2 rounded ${
              loc === locale ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {loc.toUpperCase()}
          </button>
        ))}
      </div>
      {status && <p className="text-red-600">{status}</p>}

      {/* === Hero === */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Hero</h2>
        <label className="block">
          Site Title:
          <input
            className="mt-1 w-full border rounded px-2 py-1"
            value={transData.siteTitle}
            onChange={e => setTrans({ ...transData, siteTitle: e.target.value })}
          />
        </label>
        <label className="block">
          Event Date:
          <input
            className="mt-1 w-full border rounded px-2 py-1"
            value={transData.eventDate}
            onChange={e => setTrans({ ...transData, eventDate: e.target.value })}
          />
        </label>
        <label className="block">
          Hero Image URL:
          <input
            className="mt-1 w-full border rounded px-2 py-1"
            value={contentData.heroImage}
            onChange={e => setContent({ ...contentData, heroImage: e.target.value })}
          />
        </label>
        <label className="block">
          Video Src:
          <input
            className="mt-1 w-full border rounded px-2 py-1"
            value={contentData.videoSrc}
            onChange={e => setContent({ ...contentData, videoSrc: e.target.value })}
          />
        </label>
        <label className="block">
          Button Text:
          <input
            className="mt-1 w-full border rounded px-2 py-1"
            value={transData.buyButton}
            onChange={e => setTrans({ ...transData, buyButton: e.target.value })}
          />
        </label>
      </section>

      {/* === Video + Advantages === */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Видео и Преимущества</h2>
        {/* Advantages */}
        {contentData.advantages.map((adv, i) => (
          <div key={adv.id} className="border rounded p-4 space-y-2">
            {/* только иконка из content.json */}
            <div>Icon: {adv.icon}</div>
            {/* переводимые title/description */}
            <label className="block">
              Title:
              <input
                className="mt-1 w-full border rounded px-2 py-1"
                value={transData.advantages[i]?.title}
                onChange={e => {
                  const arr = [...transData.advantages]
                  arr[i].title = e.target.value
                  setTrans({ ...transData, advantages: arr })
                }}
              />
            </label>
            <label className="block">
              Description:
              <textarea
                className="mt-1 w-full border rounded px-2 py-1"
                value={transData.advantages[i]?.description}
                onChange={e => {
                  const arr = [...transData.advantages]
                  arr[i].description = e.target.value
                  setTrans({ ...transData, advantages: arr })
                }}
              />
            </label>
          </div>
        ))}
      </section>

      {/* === Tickets === */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Tickets</h2>
        {contentData.tickets.map((ticket, i) => (
          <div key={i} className="border rounded p-4 grid grid-cols-2 gap-4">
            <label>
              Price:
              <input
                className="mt-1 w-full border rounded px-2 py-1"
                value={ticket.price}
                onChange={e => {
                  const arr = [...contentData.tickets]
                  arr[i].price = e.target.value
                  setContent({ ...contentData, tickets: arr })
                }}
              />
            </label>
            <label>
              Link:
              <input
                className="mt-1 w-full border rounded px-2 py-1"
                value={ticket.link}
                onChange={e => {
                  const arr = [...contentData.tickets]
                  arr[i].link = e.target.value
                  setContent({ ...contentData, tickets: arr })
                }}
              />
            </label>
            <label>
              Type:
              <input
                className="mt-1 w-full border rounded px-2 py-1"
                value={transData.tickets[i]?.type}
                onChange={e => {
                  const arr = [...transData.tickets]
                  arr[i].type = e.target.value
                  setTrans({ ...transData, tickets: arr })
                }}
              />
            </label>
            <label>
              Button Text:
              <input
                className="mt-1 w-full border rounded px-2 py-1"
                value={transData.tickets[i]?.buttonText}
                onChange={e => {
                  const arr = [...transData.tickets]
                  arr[i].buttonText = e.target.value
                  setTrans({ ...transData, tickets: arr })
                }}
              />
            </label>
          </div>
        ))}
      </section>

      {/* === Exclusive Offers === */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Exclusive Offers</h2>
        {contentData.exclusiveOffers.map((offer, i) => (
          <div key={i} className="border rounded p-4 space-y-2">
            <label>
              Link:
              <input
                className="mt-1 w-full border rounded px-2 py-1"
                value={offer.link}
                onChange={e => {
                  const arr = [...contentData.exclusiveOffers]
                  arr[i].link = e.target.value
                  setContent({ ...contentData, exclusiveOffers: arr })
                }}
              />
            </label>
            <label>
              Title:
              <input
                className="mt-1 w-full border rounded px-2 py-1"
                value={transData.exclusiveOffers[i]?.title}
                onChange={e => {
                  const arr = [...transData.exclusiveOffers]
                  arr[i].title = e.target.value
                  setTrans({ ...transData, exclusiveOffers: arr })
                }}
              />
            </label>
            <label>
              Description:
              <textarea
                className="mt-1 w-full border rounded px-2 py-1"
                value={transData.exclusiveOffers[i]?.description}
                onChange={e => {
                  const arr = [...transData.exclusiveOffers]
                  arr[i].description = e.target.value
                  setTrans({ ...transData, exclusiveOffers: arr })
                }}
              />
            </label>
            <label>
              Button Text:
              <input
                className="mt-1 w-full border rounded px-2 py-1"
                value={transData.exclusiveOffers[i]?.buttonText}
                onChange={e => {
                  const arr = [...transData.exclusiveOffers]
                  arr[i].buttonText = e.target.value
                  setTrans({ ...transData, exclusiveOffers: arr })
                }}
              />
            </label>
          </div>
        ))}
      </section>

      {/* === Music Section (общие поля) === */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Music Section</h2>
        <label>
          Spotify Embed URL:
          <input
            className="mt-1 w-full border rounded px-2 py-1"
            value={contentData.spotifyEmbedUrl}
            onChange={e => setContent({ ...contentData, spotifyEmbedUrl: e.target.value })}
          />
        </label>
      </section>

      {/* === Testimonials === */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Testimonials</h2>
        {contentData.testimonials.map((item, i) => (
          <div key={i} className="border rounded p-4 space-y-2">
            <label>
              Name:
              <input
                className="mt-1 w-full border rounded px-2 py-1"
                value={item.name}
                onChange={e => {
                  const arr = [...contentData.testimonials]
                  arr[i].name = e.target.value
                  setContent({ ...contentData, testimonials: arr })
                }}
              />
            </label>
            <label>
              Role:
              <input
                className="mt-1 w-full border rounded px-2 py-1"
                value={item.role}
                onChange={e => {
                  const arr = [...contentData.testimonials]
                  arr[i].role = e.target.value
                  setContent({ ...contentData, testimonials: arr })
                }}
              />
            </label>
            <label>
              Text:
              <textarea
                className="mt-1 w-full border rounded px-2 py-1"
                value={transData.testimonials[i]?.text}
                onChange={e => {
                  const arr = [...transData.testimonials]
                  arr[i].text = e.target.value
                  setTrans({ ...transData, testimonials: arr })
                }}
              />
            </label>
          </div>
        ))}
      </section>

      {/* === Social Feed === */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Social Feed</h2>
        {contentData.socialFeed.map((s, i) => (
          <div key={i} className="border rounded p-4 space-y-2">
            <label>
              Image URL:
              <input
                className="mt-1 w-full border rounded px-2 py-1"
                value={s.img}
                onChange={e => {
                  const arr = [...contentData.socialFeed]
                  arr[i].img = e.target.value
                  setContent({ ...contentData, socialFeed: arr })
                }}
              />
            </label>
            <label>
              Link:
              <input
                className="mt-1 w-full border rounded px-2 py-1"
                value={s.link}
                onChange={e => {
                  const arr = [...contentData.socialFeed]
                  arr[i].link = e.target.value
                  setContent({ ...contentData, socialFeed: arr })
                }}
              />
            </label>
          </div>
        ))}
      </section>

      {/* === FAQ === */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">FAQ</h2>
        {contentData.faq.map((_, i) => (
          <div key={i} className="border rounded p-4 space-y-2">
            <label>
              Question:
              <input
                className="mt-1 w-full border rounded px-2 py-1"
                value={transData.faq[i]?.question}
                onChange={e => {
                  const arr = [...transData.faq]
                  arr[i].question = e.target.value
                  setTrans({ ...transData, faq: arr })
                }}
              />
            </label>
            <label>
              Answer:
              <textarea
                className="mt-1 w-full border rounded px-2 py-1"
                value={transData.faq[i]?.answer}
                onChange={e => {
                  const arr = [...transData.faq]
                  arr[i].answer = e.target.value
                  setTrans({ ...transData, faq: arr })
                }}
              />
            </label>
          </div>
        ))}
      </section>

      {/* === Early Access Form === */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Early Access Form</h2>
        <label>
          Title:
          <input
            className="mt-1 w-full border rounded px-2 py-1"
            value={transData.earlyAccess.title}
            onChange={e => setTrans({ ...transData, earlyAccess: { ...transData.earlyAccess, title: e.target.value } })}
          />
        </label>
        <label>
          Description:
          <textarea
            className="mt-1 w-full border rounded px-2 py-1"
            value={transData.earlyAccess.description}
            onChange={e => setTrans({ ...transData, earlyAccess: { ...transData.earlyAccess, description: e.target.value } })}
          />
        </label>
        <label>
          Placeholder Name:
          <input
            className="mt-1 w-full border rounded px-2 py-1"
            value={transData.earlyAccess.placeholders.name}
            onChange={e => {
              const ea = { ...transData.earlyAccess }
              ea.placeholders.name = e.target.value
              setTrans({ ...transData, earlyAccess: ea })
            }}
          />
        </label>
        <label>
          Placeholder Email:
          <input
            className="mt-1 w-full border rounded px-2 py-1"
            value={transData.earlyAccess.placeholders.email}
            onChange={e => {
              const ea = { ...transData.earlyAccess }
              ea.placeholders.email = e.target.value
              setTrans({ ...transData, earlyAccess: ea })
            }}
          />
        </label>
        <label>
          Button Text:
          <input
            className="mt-1 w-full border rounded px-2 py-1"
            value={transData.earlyAccess.buttonText}
            onChange={e => setTrans({ ...transData, earlyAccess: { ...transData.earlyAccess, buttonText: e.target.value } })}
          />
        </label>
      </section>

      {/* === Contacts === */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Contacts</h2>
        {contentData.contacts.map((c, i) => (
          <div key={i} className="border rounded p-4 space-y-2">
            <label>
              Type:
              <input
                className="mt-1 w-full border rounded px-2 py-1"
                value={c.type}
                onChange={e => {
                  const arr = [...contentData.contacts]
                  arr[i].type = e.target.value
                  setContent({ ...contentData, contacts: arr })
                }}
              />
            </label>
            <label>
              Value:
              <input
                className="mt-1 w-full border rounded px-2 py-1"
                value={c.value}
                onChange={e => {
                  const arr = [...contentData.contacts]
                  arr[i].value = e.target.value
                  setContent({ ...contentData, contacts: arr })
                }}
              />
            </label>
            <label>
              Link:
              <input
                className="mt-1 w-full border rounded px-2 py-1"
                value={c.link}
                onChange={e => {
                  const arr = [...contentData.contacts]
                  arr[i].link = e.target.value
                  setContent({ ...contentData, contacts: arr })
                }}
              />
            </label>
          </div>
        ))}
      </section>

      {/* Кнопка сохранения */}
      <div className="text-center">
        <button
          onClick={saveAll}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          Save All
        </button>
      </div>
    </div>
  )
}
