// components/Tickets.jsx
'use client'

import { useTranslations } from 'next-intl'
import Button from './Button'

export default function Tickets({ list }) {
  const t = useTranslations()

  return (
    <section className="py-16 bg-lightGray">
      <div className="container mx-auto">
        <h2 className="text-4xl font-heading text-center text-primary mb-12">
          {t('ticketsTitle')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((ticket, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center transform transition-transform hover:scale-105"
            >
              <h3 className="text-2xl font-heading mb-4">{ticket.type}</h3>
              <p className="text-5xl font-heading mb-6">{ticket.price}</p>
              <Button
                as="a"
                href={ticket.link}
                className="w-full"
              >
                {ticket.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
