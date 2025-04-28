// components/MusicSection.js
'use client'

import { useTranslations } from 'next-intl'

export default function MusicSection({ embedUrl }) {
  const t = useTranslations()

  return (
    <section className="py-12 bg-lightGray">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-heading text-primary mb-8">
          {t('musicSectionTitle')}
        </h2>
        <div className="relative w-full overflow-hidden" style={{ paddingTop: '56.25%' }}>
          <iframe
            src={embedUrl}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            title="Spotify embed"
          />
        </div>
      </div>
    </section>
  )
}
