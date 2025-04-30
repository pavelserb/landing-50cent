// components/ExclusiveOffers.js
'use client'

import { useTranslations } from 'next-intl'
import content from '../data/content.json'

export default function ExclusiveOffers() {
  const t = useTranslations()
  // Первый оффер — Meet & Greet
  const meet = content.exclusiveOffers[0]
  // Остальные офферы
  const others = content.exclusiveOffers.slice(1)

  return (
    <section className="py-12 bg-lightGray">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Meet & Greet — всегда первый */}
        <div className="bg-danger text-white p-8 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-heading mb-2">
            {t('exclusiveOffers.0.title')}
          </h3>
          <p className="font-body">
            {t('exclusiveOffers.0.description')}
          </p>
        </div>

        {/* Все остальные офферы */}
        {others.map((_, idx) => {
          const i = idx + 1
          return (
            <div
              key={i}
              className="bg-white text-black p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-heading mb-2">
                {t(`exclusiveOffers.${i}.title`)}
              </h3>
              <p className="font-body text-darkGray mb-4">
                {t(`exclusiveOffers.${i}.description`)}
              </p>
              <button className="w-full py-2 bg-danger text-white font-heading rounded">
                {t(`exclusiveOffers.${i}.buttonText`)}
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}
