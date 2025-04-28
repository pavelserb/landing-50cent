// components/Tickets.js
'use client'

import { useTranslations } from 'next-intl'

export default function Tickets({ list }) {
  const t = useTranslations()
  return (
    <section className="py-12 bg-lightGray">
      <h2 className="text-3xl font-heading text-center text-primary mb-8">
        {t('tickets.title')}
      </h2>
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center gap-6">
        {list.map((ticket, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-lg p-6 flex-1 flex flex-col items-center"
            style={{ maxWidth: '300px' }}
          >
            <h3 className="text-2xl font-heading mb-2">{ticket.type}</h3>
            <p className="text-4xl font-heading mb-4">{ticket.price}</p>
            <a href={ticket.link} className="w-full">
              <button className="w-full py-3 bg-danger text-white font-heading rounded-lg">
                {t('tickets.buyButton')}
              </button>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
