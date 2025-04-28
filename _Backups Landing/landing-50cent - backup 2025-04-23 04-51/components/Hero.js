// components/Hero.js
'use client'
import { useTranslations } from 'next-intl'

export default function Hero({ bgImage }) {
  const t = useTranslations()
  return (
    <section
      className="relative w-full h-screen flex items-center justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-black bg-opacity-50 p-8 rounded">
        <h1 className="text-4xl md:text-6xl font-heading text-white mb-4">
          {t('siteTitle')}
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-6">
          {t('eventDate')}
        </p>
        <button className="px-6 py-3 bg-danger text-white font-heading rounded-lg">
          {t('buyTickets')}
        </button>
      </div>
    </section>
  )
}