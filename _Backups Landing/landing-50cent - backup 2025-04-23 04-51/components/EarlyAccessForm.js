// components/EarlyAccessForm.js
'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function EarlyAccessForm() {
  const t = useTranslations()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    // TODO: интеграция с Mailchimp / API
    setSent(true)
  }

  return (
    <section className="py-12 bg-lightGray">
      <div className="container mx-auto px-4 max-w-md">
        <h2 className="text-3xl font-heading text-center text-primary mb-4">
          {t('earlyAccess.title')}
        </h2>
        <p className="font-body text-center text-darkGray mb-6">
          {t('earlyAccess.desc')}
        </p>

        {sent ? (
          <p className="text-center text-accent font-heading">
            {t('earlyAccess.thanksMessage')}
          </p>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <input
              type="text"
              placeholder={t('earlyAccess.placeholders.name')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border-2 border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <input
              type="email"
              placeholder={t('earlyAccess.placeholders.email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border-2 border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="w-full py-3 bg-danger hover:bg-danger/90 text-white font-heading rounded-xl shadow-md transition"
            >
              {t('earlyAccess.buttonText')}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
