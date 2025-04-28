// components/MusicSection.js
'use client'

import { useTranslations } from 'next-intl'

export default function MusicSection({ embedUrl }) {
  const t = useTranslations()
  return (
    <section className="py-12 bg-white">
      <h2 className="text-3xl font-heading text-center text-primary mb-8">
        {t('musicSection.title')}
      </h2>
      <div className="container mx-auto px-4">
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src={embedUrl}
            title="Spotify playlist"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            className="w-full h-full rounded-xl shadow"
          ></iframe>
        </div>
      </div>
    </section>
  )
}
