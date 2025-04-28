// components/News.jsx
'use client'
import { useTranslations } from 'next-intl'
import NewsCard from './NewsCard'

export default function News({ items = [] }) {
  const t = useTranslations()

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-bebas text-6xl text-center text-primary mb-12">
          {t('newsTitle')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((n, i) => (
            <NewsCard key={i} {...n} />
          ))}
        </div>
      </div>
    </section>
  )
}
