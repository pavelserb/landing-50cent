// components/Testimonials.js
'use client'

import { useTranslations } from 'next-intl'

export default function Testimonials({ items }) {
  const t = useTranslations()

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading text-center text-primary mb-8">
          {t('testimonialsTitle')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={i} className="p-6 bg-lightGray rounded-xl shadow">
              <p className="font-body italic mb-4">
                “{t(`testimonials.${i}.text`)}”
              </p>
              <h3 className="text-xl font-heading">{item.name}</h3>
              <p className="text-sm font-body text-darkGray">{item.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
