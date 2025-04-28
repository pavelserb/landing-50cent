// components/EarlyAccessForm.js
'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function EarlyAccessForm({ data }) {
  const t = useTranslations()
  const [form, setForm] = useState({ name: '', email: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: отправка form на сервер
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder={t('earlyAccess.placeholders.name')}
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded p-3"
            required
          />
          <input
            type="email"
            name="email"
            placeholder={t('earlyAccess.placeholders.email')}
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded p-3"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-danger text-white font-heading rounded-lg"
          >
            {t('earlyAccess.buttonText')}
          </button>
        </form>
      </div>
    </section>
  )
}
