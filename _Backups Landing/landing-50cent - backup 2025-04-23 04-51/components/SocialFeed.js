// components/SocialFeed.js
'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function SocialFeed({ items }) {
  const t = useTranslations()
  return (
    <section className="py-12 bg-lightGray">
      <h2 className="text-3xl font-heading text-center text-primary mb-8">
        {t('socialFeed.title')}
      </h2>
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((post, i) => (
          <a
            key={i}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-2xl shadow-lg group relative"
            style={{ paddingBottom: '100%' }}
          >
            <Image
              src={post.img}
              alt=""
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </a>
        ))}
      </div>
    </section>
  )
}
