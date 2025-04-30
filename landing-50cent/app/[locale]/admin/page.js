// app/[locale]/admin/page.js
'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabaseClient'

const LOCALES = ['en', 'pl']
const ADMIN_USER = 'admin'

export default function AdminPage() {
  const { locale: initial } = useParams()
  const [locale, setLocale]       = useState(initial || 'en')
  const [contentData, setContent] = useState(null)
  const [transData, setTrans]     = useState(null)
  const [status, setStatus]       = useState('')

  const authHeader = 'Basic ' + btoa(`${ADMIN_USER}:${process.env.NEXT_PUBLIC_ADMIN_PASS}`)

  // Load content & translations
  useEffect(() => {
    setStatus('Loading…')
    Promise.all([
      fetch('/api/content', { headers: { Authorization: authHeader } }).then(r => r.json()),
      fetch(`/api/translations/${locale}`, { headers: { Authorization: authHeader } }).then(r => r.json())
    ])
      .then(([c, t]) => { setContent(c); setTrans(t); setStatus('') })
      .catch(() => setStatus('Error loading data'))
  }, [locale, authHeader])

  // Save all (PUT) with callback
  const saveAll = useCallback(async () => {
    setStatus('Saving…')
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
  }, [contentData, transData, authHeader, locale])

  // «Сохранить по Ctrl+S / ⌘+S»
  useEffect(() => {
    const onKey = e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        saveAll();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [saveAll]);

  const storage = supabaseBrowser.storage
  // const storage = supabaseBrowser

  // Хелпер для загрузки файлов:
  const uploadAndSet = useCallback(async (pathInContent, file, bucket = 'media') => {

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `${locale}/${bucket}/${fileName}`

    const { data: upData, error: upErr } = await storage
      .from(bucket)
      .upload(filePath, file, { upsert: true })

    if (upErr) {
      console.error('Upload error', upErr)
      setStatus('Upload failed')
      return
    }

    const { data: { publicUrl } } = storage
      .from(bucket)
      .getPublicUrl(filePath)

    // Обновляем contentData по пути pathInContent, например ['heroImage']
    updateContent(pathInContent, publicURL)
    setStatus('')      // сбросить статус

  }, [locale, storage])  
  // })  


  if (!contentData || !transData)
    return <p className="p-8 text-center">{status || 'Loading…'}</p>

  // Helpers for add/remove
  const addItem = (key, initC, initT) => {
    setContent(prev => ({ ...prev, [key]: [...(prev[key]||[]), initC] }))
    setTrans(prev => ({ ...prev,   [key]: [...(prev[key]||[]), initT] }))
  }
  const removeItem = (key, index) => {
    setContent(prev => {
      const arr = [...(prev[key]||[])]
      arr.splice(index,1)
      return { ...prev, [key]: arr }
    })
    setTrans(prev => {
      const arr = [...(prev[key]||[])]
      arr.splice(index,1)
      return { ...prev, [key]: arr }
    })
  }


  /* -------- render -------- */
  return (
    <div className="p-0 max-w-4xl mx-auto space-y-12">

      <div className="flex justify-between sticky top-[76px] pt-[32px] pb-[10px] bg-white z-10 transition-all duration-200">

      {/* language switch */}
      <div className="space-x-2">
        {LOCALES.map(loc=>(
          <button key={loc} onClick={()=>setLocale(loc)}
            className={`px-4 py-2 rounded ${loc===locale?'bg-blue-600 text-white':'bg-gray-200 text-gray-800'}`}>
            {loc.toUpperCase()}
          </button>
        ))}
      </div>
      {status && <p className="text-red-600 content-center">{status}</p>}

      {/* Кнопка сохранения */}
      <div className="text-center">
        <button
          onClick={saveAll}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          Save All
        </button>
      </div>

      </div>

      {/* === Hero === */}
      {/* <section className="space-y-4">
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
      </section> */}

      {/* === Hero === */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Hero</h2>

        {/* Site Title */}
        <label className="block">
          Site Title:
          <input
            className="mt-1 w-full border rounded px-2 py-1"
            value={transData.siteTitle}
            onChange={e => setTrans({ ...transData, siteTitle: e.target.value })}
          />
        </label>

        {/* Event Date */}
        <label className="block">
          Event Date:
          <input
            className="mt-1 w-full border rounded px-2 py-1"
            value={transData.eventDate}
            onChange={e => setTrans({ ...transData, eventDate: e.target.value })}
          />
        </label>

        {/* Hero Image URL + Upload */}
        <label className="block">
          Hero Image URL:
          <input
            type="file"
            accept="image/*"
            onChange={e => e.target.files?.[0] && 
              uploadAndSet(['heroImage'], e.target.files[0], 'images')}
            className="mt-1 w-full border rounded px-2 py-1"
            value={contentData.heroImage}
            // onChange={e => setContent({ ...contentData, heroImage: e.target.value })}
          />
        </label>
        {/* <input
          type="file"
          accept="image/*"
          className="mt-2"
          onChange={e => handleFileUpload('heroImage', e.target.files[0])}
        /> */}

        {/* Video Src URL + Upload */}
        <label className="block">
          Video Src URL:
          <input
            type="file"
            accept="video/*"
            onChange={e => e.target.files?.[0] &&
              uploadAndSet(['videoSrc'], e.target.files[0], 'videos')}
            className="mt-1 w-full border rounded px-2 py-1"
            value={contentData.videoSrc}
            // onChange={e => setContent({ ...contentData, videoSrc: e.target.value })}
          />
        </label>
        {/* <input
          type="file"
          accept="video/*"
          className="mt-2"
          onChange={e => handleFileUpload('videoSrc', e.target.files[0])}
        /> */}

        {/* Button Text */}
        <label className="block">
          Button Text:
          <input
            className="mt-1 w-full border rounded px-2 py-1"
            value={transData.buyButton}
            onChange={e => setTrans({ ...transData, buyButton: e.target.value })}
          />
        </label>
      </section>


      {/* === Video  Advantages === */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Video & Advantages</h2>
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
              Description:
              <input
                className="mt-1 w-full border rounded px-2 py-1"
                value={transData.tickets[i]?.desc}
                onChange={e => {
                  const arr = [...transData.tickets]
                  arr[i].desc = e.target.value
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

<section className="space-y-4">
  <h2 className="text-xl font-semibold">News / Updates</h2>

  {/* ==== список карточек ==== */}
  {(contentData.news ?? []).map((item, i) => (
    <div key={i} className="border rounded p-4 space-y-2 relative">

      {/* удалить карточку */}
      <button
        type="button"
        onClick={() => {
          /* удаляем i-й элемент из обоих массивов */
          const newsC = [...contentData.news]
          const newsT = [...transData.news]
          newsC.splice(i, 1)
          newsT.splice(i, 1)
          setContent({ ...contentData, news: newsC })
          setTrans  ({ ...transData,   news: newsT })
        }}
        className="absolute -right-3 -top-3 w-7 h-7 rounded-full bg-red-600
                   text-white flex items-center justify-center text-sm"
        title="Delete"
      >× </button>

      <label>Link:
        <input
          className="mt-1 w-full border rounded px-2 py-1"
          value={item.link}
          onChange={e => {
            const arr = [...contentData.news]
            arr[i].link = e.target.value
            setContent({ ...contentData, news: arr })
          }}
        />
      </label>

      <label>Title:
        <input
          className="mt-1 w-full border rounded px-2 py-1"
          value={transData.news[i]?.title || ''}
          onChange={e => {
            const arr = [...transData.news]
            arr[i] = { ...arr[i], title: e.target.value }
            setTrans({ ...transData, news: arr })
          }}
        />
      </label>

      <label>Description:
        <textarea
          className="mt-1 w-full border rounded px-2 py-1"
          value={transData.news[i]?.description || ''}
          onChange={e => {
            const arr = [...transData.news]
            arr[i] = { ...arr[i], description: e.target.value }
            setTrans({ ...transData, news: arr })
          }}
        />
      </label>

      <label>Button text:
        <input
          className="mt-1 w-full border rounded px-2 py-1"
          value={transData.news[i]?.buttonText || ''}
          onChange={e => {
            const arr = [...transData.news]
            arr[i] = { ...arr[i], buttonText: e.target.value }
            setTrans({ ...transData, news: arr })
          }}
        />
      </label>
    </div>
  ))}

  {/* ==== кнопка «добавить новость» ==== */}
  <button
    type="button"
    onClick={() => {
        setContent({
          ...contentData,
          news: [...(contentData.news ?? []), { link: '' }]
        })
        setTrans({
          ...transData,
          news: [...(transData.news ?? []), { title: '', description: '', buttonText: '' }]
        })
      }}
      className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
    >
      + Add news item
    </button>
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

       {/* === Social Feed === */}
      {/* <section className="space-y-4">
        <h2 className="text-xl font-semibold">Social Feed</h2>

        {contentData.socialFeed.map((post, i) => (
          <div key={i} className="border rounded p-4 space-y-2">
            <label>
              Link:
              <input
                className="mt-1 w-full border rounded px-2 py-1"
                value={post.link}
                onChange={e => {
                  const arr = [...contentData.socialFeed]
                  arr[i].link = e.target.value
                  setContent({ ...contentData, socialFeed: arr })
                }}
              />
            </label>

            <label>
              Thumbnail URL:
              <input
                className="mt-1 w-full border rounded px-2 py-1"
                value={post.img}
                onChange={e => {
                  const arr = [...contentData.socialFeed]
                  arr[i].img = e.target.value
                  setContent({ ...contentData, socialFeed: arr })
                }}
              />
            </label>
          </div>
        ))}

        <button
          onClick={() =>
            setContent({
              ...contentData,
              socialFeed: [...contentData.socialFeed,
                { link: '', img: '' }]
            })}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
            Add Post
        </button>
      </section> */}

      {/* === Social Feed === */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Social Feed</h2>

        {contentData.socialFeed.map((post, i) => (
          <div key={i} className="border rounded p-4 space-y-2 relative">
            {/* кнопка “удалить” */}
            <button
              type="button"
              onClick={() => {
                const feed = [...contentData.socialFeed];
                const trsf = [...transData.socialFeed];
                feed.splice(i, 1);
                trsf.splice(i, 1);
                setContent({ ...contentData, socialFeed: feed });
                setTrans({ ...transData, socialFeed: trsf });
              }}
              className="absolute -right-3 -top-3 w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center text-sm"
            >
              ×
            </button>

            {/* Link */}
            <label className="block">
              Link:
              <input
                className="mt-1 w-full border rounded px-2 py-1"
                value={post.link}
                onChange={e => {
                  const arr = [...contentData.socialFeed];
                  arr[i].link = e.target.value;
                  setContent({ ...contentData, socialFeed: arr });
                }}
              />
            </label>

            {/* Thumbnail URL */}
            <label className="block">
              Thumbnail URL:
              <input
                type="file"
                accept="image/*"
                onChange={e => e.target.files?.[0] &&
                  uploadAndSet(['socialFeed', i, 'img'], e.target.files[0], 'images')}
                className="mt-1 w-full border rounded px-2 py-1"
                value={post.img}
                // onChange={e => {
                //   const arr = [...contentData.socialFeed];
                //   arr[i].img = e.target.value;
                //   setContent({ ...contentData, socialFeed: arr });
                // }}
              />
            </label>

            {/* Upload Thumbnail */}
            {/* <input
              type="file"
              accept="image/*"
              className="mt-2"
              onChange={e => handleFileUpload('socialFeed', e.target.files[0], i)}
            /> */}
          </div>
        ))}

        {/* Add Post */}
        <button
          type="button"
          onClick={() => {
            setContent({
              ...contentData,
              socialFeed: [...contentData.socialFeed, { link: '', img: '' }]
            });
            setTrans({
              ...transData,
              socialFeed: [...(transData.socialFeed || []), { img: '' }]
            });
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Add Post
        </button>
      </section>

      {/* === Location === */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Location</h2>

        <label>Name:
          <input
            className="mt-1 w-full border rounded px-2 py-1"
            value={contentData.location.name}
            onChange={e =>
              setContent({
                ...contentData,
                location: { ...contentData.location, name: e.target.value }
              })}
          />
        </label>

        <label>Address:
          <input
            className="mt-1 w-full border rounded px-2 py-1"
            value={contentData.location.address}
            onChange={e =>
              setContent({
                ...contentData,
                location: { ...contentData.location, address: e.target.value }
              })}
          />
        </label>

        <label>Phone:
          <input
            className="mt-1 w-full border rounded px-2 py-1"
            value={contentData.location.phone}
            onChange={e =>
              setContent({
                ...contentData,
                location: { ...contentData.location, phone: e.target.value }
              })}
          />
        </label>

        <label>Website:
          <input
            className="mt-1 w-full border rounded px-2 py-1"
            value={contentData.location.website}
            onChange={e =>
              setContent({
                ...contentData,
                location: { ...contentData.location, website: e.target.value }
              })}
          />
        </label>

        <label>Map Embed URL:
          <textarea
            className="mt-1 w-full border rounded px-2 py-1"
            value={contentData.location.mapEmbed}
            onChange={e =>
              setContent({
                ...contentData,
                location: { ...contentData.location, mapEmbed: e.target.value }
              })}
          />
        </label>
      </section>

      {/* === FAQ === */}
      {/* <section className="space-y-4">
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
      </section> */}

      <section className="space-y-4 relative">
        <h2 className="text-xl font-semibold">FAQ</h2>
        {(contentData.faq ?? []).map((_, i) => (
          <div key={i} className="border rounded p-4 space-y-2 relative">
            {/* ❗️ Удалить запись */}
            <button
              type="button"
              onClick={() => {
                const faqC = [...contentData.faq]
                const faqT = [...transData.faq]
                faqC.splice(i, 1)
                faqT.splice(i, 1)
                setContent({ ...contentData, faq: faqC })
                setTrans  ({ ...transData,   faq: faqT })
              }}
              className="absolute -right-3 -top-3 w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center text-sm"
              title="Delete FAQ"
            >×</button>

            <label>Question:
              <input
                className="mt-1 w-full border rounded px-2 py-1"
                value={transData.faq[i]?.question || ''}
                onChange={e => {
                  const arr = [...transData.faq]
                  arr[i] = { ...arr[i], question: e.target.value }
                  setTrans({ ...transData, faq: arr })
                }}
              />
            </label>

            <label>Answer:
              <textarea
                className="mt-1 w-full border rounded px-2 py-1"
                value={transData.faq[i]?.answer || ''}
                onChange={e => {
                  const arr = [...transData.faq]
                  arr[i] = { ...arr[i], answer: e.target.value }
                  setTrans({ ...transData, faq: arr })
                }}
              />
            </label>
          </div>
        ))}

        {/* ❗️ Кнопка «Добавить FAQ» */}
        <button
          type="button"
          onClick={() => {
            setContent({
              ...contentData,
              faq: [...(contentData.faq ?? []), { question: '', answer: '' }]
            })
            setTrans({
              ...transData,
              faq: [...(transData.faq ?? []),       { question: '', answer: '' }]
            })
          }}
          className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          + Add FAQ
        </button>
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
    </div>
  )
}
