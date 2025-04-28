// app/[locale]/admin/page.js
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

const LOCALES = ['en', 'pl'] // можно добавить 'uk', 'de' и т.д.

export default function AdminPage() {
  const params = useParams()
  const [locale, setLocale] = useState(params.locale || 'en')
  const [contentData, setContent] = useState(null)
  const [transData, setTrans] = useState(null)
  const [status, setStatus] = useState('')

  useEffect(() => {
    setStatus('Loading...')
    const auth = 'Basic ' + btoa(`admin:${process.env.NEXT_PUBLIC_ADMIN_PASS}`)
    Promise.all([
      fetch('/api/content', { headers: { Authorization: auth } }).then(r => r.json()),
      fetch(`/api/translations/${locale}`, { headers: { Authorization: auth } }).then(r => r.json())
    ])
      .then(([c, t]) => {
        setContent(c)
        setTrans(t)
        setStatus('')
      })
      .catch(() => setStatus('Error loading data'))
  }, [locale])  
  

  // Сохранение данных
  const saveAll = async () => {
    setStatus('Saving...')
    try {
      await Promise.all([
        fetch('/api/content', {
          method: 'PUT',
          headers: { Authorization: authHeader, 'Content-Type': 'application/json' },
          body: JSON.stringify(contentData, null, 2)
        }),
        fetch(`/api/translations/${locale}`, {
          method: 'PUT',
          headers: { Authorization: authHeader, 'Content-Type': 'application/json' },
          body: JSON.stringify(transData, null, 2)
        })
      ])
      setStatus('Saved successfully')
    } catch {
      setStatus('Error saving data')
    }
  }

  if (!contentData || !transData) {
    return <p className="p-8 text-center">{status || 'Loading...'}</p>
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {/* Locale selector */}
      <div>
        {LOCALES.map(loc => (
          <button
            key={loc}
            onClick={() => setLocale(loc)}
            className={`px-4 py-2 mr-2 rounded ${loc === locale ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
            {loc.toUpperCase()}
          </button>
        ))}
      </div>

      {status && <p className="text-red-600">{status}</p>}

      {/* Content JSON editor */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Common Content</h2>
        {/* Hero & Video */}
        <label className="block">
          Site Title:
          <input className="mt-1 w-full border rounded px-2 py-1" value={contentData.siteTitle}
            onChange={e => setContent({ ...contentData, siteTitle: e.target.value })} />
        </label>
        <label className="block">
          Event Date:
          <input className="mt-1 w-full border rounded px-2 py-1" value={contentData.eventDate}
            onChange={e => setContent({ ...contentData, eventDate: e.target.value })} />
        </label>
        <label className="block">
          Hero Image URL:
          <input className="mt-1 w-full border rounded px-2 py-1" value={contentData.heroImage}
            onChange={e => setContent({ ...contentData, heroImage: e.target.value })} />
        </label>
        <label className="block">
          Video Src:
          <input className="mt-1 w-full border rounded px-2 py-1" value={contentData.videoSrc}
            onChange={e => setContent({ ...contentData, videoSrc: e.target.value })} />
        </label>

        {/* Tickets */}
        <div className="space-y-4">
          <h3 className="font-medium">Tickets</h3>
          {contentData.tickets.map((t, i) => (
            <div key={i} className="p-2 border rounded space-y-2">
              <input className="w-full border rounded px-2 py-1" placeholder="Type" value={t.type}
                onChange={e => {
                  const arr = [...contentData.tickets]; arr[i].type = e.target.value; setContent({ ...contentData, tickets: arr })
                }} />
              <input className="w-full border rounded px-2 py-1" placeholder="Price" value={t.price}
                onChange={e => {
                  const arr = [...contentData.tickets]; arr[i].price = e.target.value; setContent({ ...contentData, tickets: arr })
                }} />
              <input className="w-full border rounded px-2 py-1" placeholder="Link" value={t.link}
                onChange={e => {
                  const arr = [...contentData.tickets]; arr[i].link = e.target.value; setContent({ ...contentData, tickets: arr })
                }} />
            </div>
          ))}
        </div>

        {/* ExclusiveOffers */}
        <div className="space-y-4">
          <h3 className="font-medium">Exclusive Offers (Common)</h3>
          {contentData.exclusiveOffers.map((o, i) => (
            <div key={i} className="p-2 border rounded space-y-2">
              <input className="w-full border rounded px-2 py-1" placeholder="Title" value={o.title}
                onChange={e => {
                  const arr = [...contentData.exclusiveOffers]; arr[i].title = e.target.value; setContent({ ...contentData, exclusiveOffers: arr })
                }} />
              <input className="w-full border rounded px-2 py-1" placeholder="Description" value={o.description}
                onChange={e => {
                  const arr = [...contentData.exclusiveOffers]; arr[i].description = e.target.value; setContent({ ...contentData, exclusiveOffers: arr })
                }} />
              <input className="w-full border rounded px-2 py-1" placeholder="Link" value={o.link}
                onChange={e => {
                  const arr = [...contentData.exclusiveOffers]; arr[i].link = e.target.value; setContent({ ...contentData, exclusiveOffers: arr })
                }} />
              <input className="w-full border rounded px-2 py-1" placeholder="Button Text" value={o.buttonText}
                onChange={e => {
                  const arr = [...contentData.exclusiveOffers]; arr[i].buttonText = e.target.value; setContent({ ...contentData, exclusiveOffers: arr })
                }} />
            </div>
          ))}
        </div>

        {/* Spotify Embed URL */}
        <div className="space-y-2">
          <h3 className="font-medium">Spotify Embed URL</h3>
          <input className="w-full border rounded px-2 py-1" placeholder="Embed URL" value={contentData.spotifyEmbedUrl}
            onChange={e => setContent({ ...contentData, spotifyEmbedUrl: e.target.value })} />
        </div>

        {/* Testimonials */}
        <div className="space-y-4">
          <h3 className="font-medium">Testimonials (Common)</h3>
          {contentData.testimonials.map((t, i) => (
            <div key={i} className="p-2 border rounded space-y-2">
              <input className="w-full border rounded px-2 py-1" placeholder="Name" value={t.name}
                onChange={e => {
                  const arr = [...contentData.testimonials]; arr[i].name = e.target.value; setContent({ ...contentData, testimonials: arr })
                }} />
              <input className="w-full border rounded px-2 py-1" placeholder="Role" value={t.role}
                onChange={e => {
                  const arr = [...contentData.testimonials]; arr[i].role = e.target.value; setContent({ ...contentData, testimonials: arr })
                }} />
              <textarea className="w-full border rounded px-2 py-1" placeholder="Text" value={t.text}
                onChange={e => {
                  const arr = [...contentData.testimonials]; arr[i].text = e.target.value; setContent({ ...contentData, testimonials: arr })
                }} />
            </div>
          ))}
        </div>

        {/* Social Feed */}
        <div className="space-y-4">
          <h3 className="font-medium">Social Feed (Common)</h3>
          {contentData.socialFeed.map((s, i) => (
            <div key={i} className="p-2 border rounded space-y-2">
              <input className="w-full border rounded px-2 py-1" placeholder="Image URL" value={s.img}
                onChange={e => {
                  const arr = [...contentData.socialFeed]; arr[i].img = e.target.value; setContent({ ...contentData, socialFeed: arr })
                }} />
              <input className="w-full border rounded px-2 py-1" placeholder="Link" value={s.link}
                onChange={e => {
                  const arr = [...contentData.socialFeed]; arr[i].link = e.target.value; setContent({ ...contentData, socialFeed: arr })
                }} />
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          <h3 className="font-medium">FAQ (Common)</h3>
          {contentData.faq.map((q, i) => (
            <div key={i} className="p-2 border rounded space-y-2">
              <input className="w-full border rounded px-2 py-1" placeholder="Question" value={q.question}
                onChange={e => {
                  const arr = [...contentData.faq]; arr[i].question = e.target.value; setContent({ ...contentData, faq: arr })
                }} />
              <textarea className="w-full border rounded px-2 py-1" placeholder="Answer" value={q.answer}
                onChange={e => {
                  const arr = [...contentData.faq]; arr[i].answer = e.target.value; setContent({ ...contentData, faq: arr })
                }} />
            </div>
          ))}
        </div>

        {/* Early Access */}
        <div className="space-y-4">
          <h3 className="font-medium">Early Access Form (Common)</h3>
          <label className="block">
            Title:
            <input className="mt-1 w-full border rounded px-2 py-1" value={contentData.earlyAccess.title}
              onChange={e => setContent({ ...contentData, earlyAccess: { ...contentData.earlyAccess, title: e.target.value } })} />
          </label>
          <label className="block">
            Description:
            <textarea className="w-full border rounded px-2 py-1" value={contentData.earlyAccess.description}
              onChange={e => setContent({ ...contentData, earlyAccess: { ...contentData.earlyAccess, description: e.target.value } })} />
          </label>
          <label className="block">
            Placeholder Name:
            <input className="mt-1 w-full border rounded px-2 py-1" value={contentData.earlyAccess.placeholders.name}
              onChange={e => {
                const ea = { ...contentData.earlyAccess }; ea.placeholders.name = e.target.value; setContent({ ...contentData, earlyAccess: ea })
              }} />
          </label>
          <label className="block">
            Placeholder Email:
            <input className="mt-1 w-full border rounded px-2 py-1" value={contentData.earlyAccess.placeholders.email}
              onChange={e => {
                const ea = { ...contentData.earlyAccess }; ea.placeholders.email = e.target.value; setContent({ ...contentData, earlyAccess: ea })
              }} />
          </label>
          <label className="block">
            Button Text:
            <input className="mt-1 w-full border rounded px-2 py-1" value={contentData.earlyAccess.buttonText}
              onChange={e => setContent({ ...contentData, earlyAccess: { ...contentData.earlyAccess, buttonText: e.target.value } })} />
          </label>
        </div>

        {/* Contacts */}
        <div className="space-y-4">
          <h3 className="font-medium">Contacts (Common)</h3>
          {contentData.contacts.map((c, i) => (
            <div key={i} className="p-2 border rounded space-y-2">
              <input className="w-full border rounded px-2 py-1" placeholder="Type" value={c.type}
                onChange={e => {
                  const arr = [...contentData.contacts]; arr[i].type = e.target.value; setContent({ ...contentData, contacts: arr })
                }} />
              <input className="w-full border rounded px-2 py-1" placeholder="Value" value={c.value}
                onChange={e => {
                  const arr = [...contentData.contacts]; arr[i].value = e.target.value; setContent({ ...contentData, contacts: arr })
                }} />
              <input className="w-full border rounded px-2 py-1" placeholder="Link" value={c.link}
                onChange={e => {
                  const arr = [...contentData.contacts]; arr[i].link = e.target.value; setContent({ ...contentData, contacts: arr })
                }} />
            </div>
          ))}
        </div>
      </section>

      {/* Translations editor */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Translations ({locale})</h2>
        {/* Site Title, Event Date, BuyTickets */}
        <label className="block">
          Site Title:
          <input className="mt-1 w-full border rounded px-2 py-1" value={transData.siteTitle}
            onChange={e => setTrans({ ...transData, siteTitle: e.target.value })} />
        </label>
        <label className="block">
          Event Date:
          <input className="mt-1 w-full border rounded px-2 py-1" value={transData.eventDate}
            onChange={e => setTrans({ ...transData, eventDate: e.target.value })} />
        </label>
        <label className="block">
          Buy Tickets Text:
          <input className="mt-1 w-full border rounded px-2 py-1" value={transData.buyTickets}
            onChange={e => setTrans({ ...transData, buyTickets: e.target.value })} />
        </label>

        {/* Advantages translations */}
        <div className="space-y-2">
          <h3 className="font-medium">Advantages (Translations)</h3>
          {transData.advantages.map((adv, i) => (
            <div key={i} className="p-2 border rounded space-y-1">
              <input className="w-full border rounded px-2 py-1" placeholder="Title" value={adv.title}
                onChange={e => {
                  const arr = [...transData.advantages]; arr[i].title = e.target.value; setTrans({ ...transData, advantages: arr })
                }} />
              <textarea className="w-full border rounded px-2 py-1" placeholder="Description" value={adv.desc}
                onChange={e => {
                  const arr = [...transData.advantages]; arr[i].desc = e.target.value; setTrans({ ...transData, advantages: arr })
                }} />
            </div>
          ))}
        </div>

        {/* ExclusiveOffers translations */}
        <div className="space-y-2">
          <h3 className="font-medium">ExclusiveOffers (Translations)</h3>
          {transData.exclusiveOffers.map((o, i) => (
            <div key={i} className="p-2 border rounded space-y-1">
              <input className="w-full border rounded px-2 py-1" placeholder="Title" value={o.title}
                onChange={e => {
                  const arr = [...transData.exclusiveOffers]; arr[i].title = e.target.value; setTrans({ ...transData, exclusiveOffers: arr })
                }} />
              <textarea className="w-full border rounded px-2 py-1" placeholder="Description" value={o.desc}
                onChange={e => {
                  const arr = [...transData.exclusiveOffers]; arr[i].desc = e.target.value; setTrans({ ...transData, exclusiveOffers: arr })
                }} />
              <input className="w-full border rounded px-2 py-1" placeholder="Button Text" value={o.buttonText}
                onChange={e => {
                  const arr = [...transData.exclusiveOffers]; arr[i].buttonText = e.target.value; setTrans({ ...transData, exclusiveOffers: arr })
                }} />
            </div>
          ))}
        </div>

        {/* FAQ translations */}
        <div className="space-y-2">
          <h3 className="font-medium">FAQ (Translations)</h3>
          {transData.faq.map((q, i) => (
            <div key={i} className="p-2 border rounded space-y-1">
              <input className="w-full border rounded px-2 py-1" placeholder="Question" value={q.question}
                onChange={e => {
                  const arr = [...transData.faq]; arr[i].question = e.target.value; setTrans({ ...transData, faq: arr })
                }} />
              <textarea className="w-full border rounded px-2 py-1" placeholder="Answer" value={q.answer}
                onChange={e => {
                  const arr = [...transData.faq]; arr[i].answer = e.target.value; setTrans({ ...transData, faq: arr })
                }} />
            </div>
          ))}
        </div>

        {/* EarlyAccess translations */}
        <div className="space-y-2">
          <h3 className="font-medium">Early Access (Translations)</h3>
          <label className="block">
            Title:
            <input className="mt-1 w-full border rounded px-2 py-1" value={transData.earlyAccess.title}
              onChange={e => setTrans({ ...transData, earlyAccess: { ...transData.earlyAccess, title: e.target.value } })} />
          </label>
          <label className="block">
            Description:
            <textarea className="w-full border rounded px-2 py-1" value={transData.earlyAccess.desc}
              onChange={e => setTrans({ ...transData, earlyAccess: { ...transData.earlyAccess, desc: e.target.value } })} />
          </label>
          <label className="block">
            Placeholder Name:
            <input className="mt-1 w-full border rounded px-2 py-1" value={transData.earlyAccess.placeholders.name}
              onChange={e => {
                const ea = { ...transData.earlyAccess }; ea.placeholders.name = e.target.value; setTrans({ ...transData, earlyAccess: ea })
              }} />
          </label>
          <label className="block">
            Placeholder Email:
            <input className="mt-1 w-full border rounded px-2 py-1" value={transData.earlyAccess.placeholders.email}
              onChange={e => {
                const ea = { ...transData.earlyAccess }; ea.placeholders.email = e.target.value; setTrans({ ...transData, earlyAccess: ea })
              }} />
          </label>
          <label className="block">
            Button Text:
            <input className="mt-1 w-full border rounded px-2 py-1" value={transData.earlyAccess.buttonText}
              onChange={e => setTrans({ ...transData, earlyAccess: { ...transData.earlyAccess, buttonText: e.target.value } })} />
          </label>
        </div>

        {/* Contacts translations (если нужно) */}
        <div className="space-y-2">
          <h3 className="font-medium">Contacts (If translatable)</h3>
          {transData.contacts.map((c, i) => (
            <input key={i} className="w-full border rounded px-2 py-1 mb-2" value={c.value}
              onChange={e => {
                const arr = [...transData.contacts]; arr[i].value = e.target.value; setTrans({ ...transData, contacts: arr })
              }} placeholder={`Contact ${c.type}`} />
          ))}
        </div>
      </section>

      {/* Save button */}
      <button onClick={saveAll} className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">
        Save All
      </button>
    </div>
  )
}
