// components/SocialFeed.js
'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function SocialFeed({ items }) {
  const t = useTranslations()

  return (
    <section className="py-12 bg-lightGray">
      <div className="container mx-auto px-4">
        <h2 className="text-6xl font-heading text-center text-primary mb-8">
          {t('socialFeedTitle')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-2xl shadow-lg group"
            >
              <div className="relative w-full h-0" style={{ paddingBottom: '100%' }}>
                <Image
                  src={item.img}
                  alt=""
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                  loading="lazy"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
