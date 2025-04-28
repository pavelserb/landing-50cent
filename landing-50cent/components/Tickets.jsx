// components/Tickets.jsx
'use client'

import { useTranslations } from 'next-intl'
import Button from './Button'

export default function Tickets({ list = [] }) {
  const t = useTranslations()        // нужен только для заголовка

  return (
    <section id="tickets" className="py-16 bg-lightGray">
      <div className="container mx-auto flex flex-col">
        {/* Заголовок секции */}
        <h2 className="font-bebas text-6xl text-center text-primary mb-12">
          {t('ticketsTitle')}
        </h2>

        {/* Карточки */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((tk, i) => (
            <article
              key={i}
              className="bg-white text-black rounded-2xl shadow-lg p-8
                         flex flex-col items-center transition-transform
                         hover:scale-105"
            >
              <h3 className="text-2xl font-heading mb-2">{tk.type}</h3>

              {tk.price && (
                <p className="text-5xl font-heading mb-2 text-nowrap">{tk.price}</p>
              )}

              {tk.desc && (
                <p className="font-robotocond text-sm text-gray-600 mb-6 text-center">
                  {tk.desc}
                </p>
              )}

              <Button as="a" href={tk.link ?? '#tickets'} className="w-full">
                {tk.buttonText}
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
