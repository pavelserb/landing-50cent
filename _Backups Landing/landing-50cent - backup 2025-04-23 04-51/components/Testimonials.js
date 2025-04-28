// components/Testimonials.js
'use client'

import { useTranslations } from 'next-intl'

export default function Testimonials({ items }) {
  const t = useTranslations()
  return (
    <section className="py-12 bg-white">
      <h2 className="text-3xl font-heading text-center text-primary mb-8">
        {t('testimonials.title')}
      </h2>
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-lightGray p-6 rounded-2xl shadow flex flex-col"
          >
            <p className="font-body italic mb-4">“{item.text}”</p>
            <div className="mt-auto">
              <h4 className="font-heading">{item.name}</h4>
              <p className="text-darkGray">{item.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
