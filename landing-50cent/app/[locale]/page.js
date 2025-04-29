// 'use client'

export const dynamic = 'force-dynamic'

// import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { getTranslationsFromDb }  from '@/lib/getTranslationsFromDb'
// import content            from '../../data/content.json'
// после
import { getContent }      from '@/lib/getContent'

import Location from '@/components/Location'


/* компоненты */
import Hero            from '@/components/Hero'
import VideoSection    from '@/components/VideoSection'
import Advantages      from '@/components/Advantages'
import Tickets         from '@/components/Tickets'
import News            from '@/components/News'          // ← NEW
import MusicSection    from '@/components/MusicSection'
import Testimonials    from '@/components/Testimonials'
import SocialFeed      from '@/components/SocialFeed'
import FAQ             from '@/components/FAQ'
import EarlyAccessForm from '@/components/EarlyAccessForm'

// export default async function Page({ params }) {
export default async function Page({ params }) {
// export default async function Page ({ params: { locale } }) {

  // const t = useTranslations()
  // const t = await getTranslations({ locale: params.locale })
  // const { locale } = params
  const { locale } = await params
  const messages   = await getTranslationsFromDb(locale)
  const t          = await getTranslations({ locale, messages })

  // const t = await getTranslations()

  const content = await getContent()

  const locationData = content.location


  /* === 1) Advantages === */
  const advantages = content.advantages.map((adv, i) => ({
    id:          adv.id,
    icon:        adv.icon,
    title:       t(`advantages.${i}.title`),
    description: t(`advantages.${i}.description`)
  }))

  /* === 2) Tickets === */
  const tickets = content.tickets.map((ticket, i) => ({
    price:      ticket.price,
    link:       ticket.link,
    type:       t(`tickets.${i}.type`),
    desc:       t(`tickets.${i}.desc`),
    buttonText: t(`tickets.${i}.buttonText`)
  }))

  /* === 3) News === */
  const news = content.news.map((n, i) => ({
    link:        n.link,
    title:       t(`news.${i}.title`),
    description: t(`news.${i}.description`),
    buttonText:  t(`news.${i}.buttonText`)
  }))

  /* === 4) Testimonials === */
  // const testimonials = content.testimonials.map((item, i) => ({
  //   name: item.name,
  //   role: item.role,
  //   text: t(`testimonials.${i}.text`)
  // }))

  /* === 5) FAQ === */
  const faqItems = content.faq.map((_, i) => ({
    question: t(`faq.${i}.question`),
    answer:   t(`faq.${i}.answer`)
  }))

  /* === 6) Early Access === */
  const earlyAccessData = {
    ...content.earlyAccess,
    title:        t('earlyAccess.title'),
    description:  t('earlyAccess.description'),
    placeholders: {
      name:  t('earlyAccess.placeholders.name'),
      email: t('earlyAccess.placeholders.email')
    },
    buttonText:   t('earlyAccess.buttonText')
  }

  /* ───────── JSX ───────── */
  return (
    <>
      {/* Hero */}
      <Hero
        title={t('siteTitle')}
        date={t('eventDate')}
        bgImage={content.heroImage}
        ctaText={t('buyButton')}
        // onCtaClick={() => window.location.href = '/tickets'}
        ctaHref="/tickets"
        targetDate="2025-08-10T20:00:00Z"
      />

      {/* Video + Advantages */}
      <section id="nextSection" className="py-12 bg-[#0f0f0f] text-white">
        <div className="container mx-auto px-4 lg:flex lg:items-center lg:gap-12">
          <div className="w-full lg:w-1/2">
            <VideoSection videoSrc={content.videoSrc} />
          </div>
          <div className="w-full lg:w-1/2">
            <Advantages items={advantages} />
          </div>
        </div>
      </section>

      {/* Tickets */}
      <Tickets list={tickets} />

      {/* News / Updates */}
      <News items={news} />

      {/* Music */}
      <MusicSection embedUrl={content.spotifyEmbedUrl} />

      {/* Testimonials */}
      {/* <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <Testimonials items={testimonials} />
        </div>
      </section> */}

      {/* Social Feed */}
      {/* <section className="py-12">
        <div className="container mx-auto px-4">
          <SocialFeed items={content.socialFeed} />
        </div>
      </section> */}
      <SocialFeed />

      {/* Location */}
      <Location data={locationData} />


      {/* FAQ */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <FAQ items={faqItems} />
        </div>
      </section>

      {/* Early Access */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <EarlyAccessForm data={earlyAccessData} />
        </div>
      </section>
    </>
  )
}
