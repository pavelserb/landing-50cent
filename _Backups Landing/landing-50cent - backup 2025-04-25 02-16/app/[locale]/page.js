'use client'

export const dynamic = 'force-dynamic'

import { useTranslations } from 'next-intl'
import content from '../../data/content.json'

import Hero from '@/components/Hero'
import Button from '@/components/Button'
// import Hero from '../../components/Hero'
import VideoSection from '../../components/VideoSection'
import Advantages from '../../components/Advantages'
// import Tickets from '../../components/Tickets'
import Tickets from '@/components/Tickets'
import ExclusiveOffers from '../../components/ExclusiveOffers'
import MusicSection from '../../components/MusicSection'
import Testimonials from '../../components/Testimonials'
import SocialFeed from '../../components/SocialFeed'
import FAQ from '../../components/FAQ'
import EarlyAccessForm from '../../components/EarlyAccessForm'

export default function Page() {
  const t = useTranslations()

  // === 1) Advantages ===
  const advantages = content.advantages.map((adv, i) => ({
    id:          adv.id,
    icon:        adv.icon,
    title:       t(`advantages.${i}.title`),
    description: t(`advantages.${i}.description`)
  }))

  // === 2) Tickets ===
  const tickets = content.tickets.map((ticket, i) => ({
    price:      ticket.price,
    link:       ticket.link,
    type:       t(`tickets.${i}.type`),
    buttonText: t(`tickets.${i}.buttonText`)
  }))

  // === 3) Exclusive Offers ===
  // const exclusiveOffers = content.exclusiveOffers.map((offer, i) => ({
  //   link:        offer.link,
  //   title:       t(`exclusiveOffers.${i}.title`),
  //   description: t(`exclusiveOffers.${i}.description`),
  //   buttonText:  t(`exclusiveOffers.${i}.buttonText`)
  // }))
  const exclusiveOffers = content.exclusiveOffers.map((offer, i) => ({
    // из content.json остаётся только link
    link: offer.link,
    // из локалей тянем по точному пути
    title:       t(`exclusiveOffers.${i}.title`),
    description: t(`exclusiveOffers.${i}.description`),
    buttonText:  t(`exclusiveOffers.${i}.buttonText`)
  }))
  
  // для отладки сразу после — проверьте, что now у вас не пустые объекты:
  console.log('exclusiveOffers =', exclusiveOffers)

  // === 4) Testimonials ===
  const testimonials = content.testimonials.map((item, i) => ({
    name: item.name,
    role: item.role,
    text: t(`testimonials.${i}.text`)
  }))

  // === 5) FAQ ===
  const faqItems = content.faq.map((_, i) => ({
    question: t(`faq.${i}.question`),
    answer:   t(`faq.${i}.answer`)
  }))

  // === 6) Early Access Form ===
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

  return (
    <>
      {/* Hero */}
      <Hero
        title={t('siteTitle')}
        date={t('eventDate')}
        bgImage={content.heroImage}
        ctaText={t('buyButton')}
        onCtaClick={() => window.location.href = '/tickets'}
      />

      {/* Video  Advantages */}
      <section className="py-12 bg-black text-white">
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

      {/* Exclusive Offers */}
      {/* <section className="py-12">
        <div className="container mx-auto px-4">
          <ExclusiveOffers list={exclusiveOffers} />
        </div>
      </section> */}
      {/* === Exclusive Offers === */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* карточка Meet & Greet */}
          <ExclusiveOffers
            title={exclusiveOffers[0].title}
            description={exclusiveOffers[0].description}
            buttonText={exclusiveOffers[0].buttonText}
            link={exclusiveOffers[0].link}
          />

          {/* карточка Exclusive Merch */}
          <ExclusiveOffers
            title={exclusiveOffers[1].title}
            description={exclusiveOffers[1].description}
            buttonText={exclusiveOffers[1].buttonText}
            link={exclusiveOffers[1].link}
          />
        </div>
      </section>

      {/* Music Section */}
      <MusicSection embedUrl={content.spotifyEmbedUrl} />

      {/* Testimonials */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <Testimonials items={testimonials} />
        </div>
      </section>

      {/* Social Feed */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <SocialFeed items={content.socialFeed} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <FAQ items={faqItems} />
        </div>
      </section>

      {/* Early Access Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <EarlyAccessForm data={earlyAccessData} />
        </div>
      </section>
    </>
  )
}
