// components/EarlyAccessForm.js
'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function EarlyAccessForm({ data }) {
  const t = useTranslations()

  const [form, setForm]   = useState({ name: '', email: '' })
  const [status, setStatus] = useState('idle')     // idle | ok | error | loading

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error()
      setStatus('ok')
      setForm({ name: '', email: '' })          // очистим поля
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="py-12 bg-lightGray">
      <div className="container mx-auto px-4 max-w-lg">
        <h2 className="text-6xl font-heading text-center text-primary mb-4">
          {t('earlyAccess.title')}
        </h2>
        <p className="text-center font-body mb-6">
          {t('earlyAccess.description')}
        </p>

        {/* feedback */}
        {status === 'ok' && (
          <p className="mb-4 text-green-600 text-center">
            Thanks! We’ll keep you posted.
          </p>
        )}
        {status === 'error' && (
          <p className="mb-4 text-red-600 text-center">
            Oops, something went wrong – try again later.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder={t('earlyAccess.placeholders.name')}
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded p-3"
            required
            disabled={status === 'loading'}
          />
          <input
            type="email"
            name="email"
            placeholder={t('earlyAccess.placeholders.email')}
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded p-3"
            required
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3 bg-black cursor-pointer bg-danger text-white font-heading rounded-lg
                       disabled:opacity-60 disabled:pointer-events-none"
          >
            {status === 'loading' ? '...' : t('earlyAccess.buttonText')}
          </button>
        </form>
      </div>
    </section>
  )
}
