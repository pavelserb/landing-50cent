// app/[locale]/page.js
'use client'

import { useTranslations } from 'next-intl'
import Hero from '../../components/Hero'
import VideoSection from '../../components/VideoSection'
import Advantages from '../../components/Advantages'
import Tickets from '../../components/Tickets'
import ExclusiveOffers from '../../components/ExclusiveOffers'
import MusicSection from '../../components/MusicSection'
import Testimonials from '../../components/Testimonials'
import SocialFeed from '../../components/SocialFeed'
import FAQ from '../../components/FAQ'
import EarlyAccessForm from '../../components/EarlyAccessForm'
import content from '../../data/content.json'


// export function generateStaticParams() {
//   return [
//     { locale: 'en' },
//     { locale: 'pl' },
//   ]
// }

// export default function Page() {
  export default function Page({ params }) {
    const t = useTranslations()

  return (
    <>
      {/* === Hero full-screen === */}
      <Hero
        title={t('siteTitle')}
        date={t('eventDate')}
        bgImage={content.heroImage}
      />

      {/* === Видео + преимущества === */}
      <section className="py-12 bg-black text-white">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2">
            <VideoSection videoSrc={content.videoSrc} />
          </div>
          <div className="w-full lg:w-1/2 space-y-6">
            {t('advantages', { returnObjects: true }).map((item, i) => (
              <div key={i} className="flex items-start space-x-4">
                <span className="text-accent text-2xl">›</span>
                <div>
                  <h3 className="text-xl font-heading">{item.title}</h3>
                  <p className="mt-1 font-body text-gray-200">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === Секция билетов === */}
      <Tickets list={content.tickets} />

      {/* === Exclusive Offers === */}
      <section className="py-12 bg-black text-white">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Meet & Greet */}
          <div className="bg-danger rounded-2xl p-8 flex flex-col justify-between shadow-xl">
            <h3 className="text-2xl font-heading">
              {t('exclusiveOffers.meetGreet.title')}
            </h3>
            <p className="mt-4 font-body">
              {t('exclusiveOffers.meetGreet.desc')}
            </p>
          </div>
          {/* Other exclusive offers */}
          {t('exclusiveOffers.others', { returnObjects: true }).map((offer, i) => (
            <div
              key={i}
              className="bg-white text-black rounded-2xl p-8 flex flex-col justify-between shadow-lg"
            >
              <h3 className="text-2xl font-heading">{offer.title}</h3>
              <p className="mt-2 font-body text-gray-700">{offer.desc}</p>
              <a href={offer.link}>
                <button className="mt-4 w-full py-2 bg-danger text-white font-heading rounded-lg">
                  {offer.buttonText}
                </button>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* === Музыкальная секция === */}
      <MusicSection embedUrl={content.spotifyEmbedUrl} />

      {/* === Отзывы === */}
      <Testimonials items={content.testimonials} />

      {/* === Social Feed === */}
      <SocialFeed items={content.socialFeed} />

      {/* === FAQ === */}
      <FAQ items={t('faq', { returnObjects: true })} />

      {/* === Early Access Form === */}
      <EarlyAccessForm
        data={{
          title: t('earlyAccess.title'),
          description: t('earlyAccess.desc'),
          placeholders: {
            name: t('earlyAccess.placeholders.name'),
            email: t('earlyAccess.placeholders.email'),
          },
          buttonText: t('earlyAccess.buttonText'),
        }}
      />
    </>
  )
}
