'use client'

import useEmblaCarousel      from 'embla-carousel-react'
import Autoplay              from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image   from 'next/image'
import content from '@/data/content.json'

export default function SocialFeed() {
  /* Embla + autoplay */
  const autoplay    = Autoplay({ delay: 4000, stopOnInteraction: true })
  const [viewportRef, embla] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [autoplay]
  )

  const scrollPrev = () => { autoplay.stop(); embla?.scrollPrev(); autoplay.play() }
  const scrollNext = () => { autoplay.stop(); embla?.scrollNext(); autoplay.play() }

  return (
    <section className="py-12">
      <h2 className="font-bebas text-6xl text-center text-primary mb-8">
        SOCIAL&nbsp;FEED
      </h2>

      <div className="container relative mx-auto px-4">
        {/* навигация */}
        <button
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10
                     bg-black/60 text-white p-2 rounded-full"
          aria-label="Prev"
        >
          <ChevronLeft size={24}/>
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10
                     bg-black/60 text-white p-2 rounded-full"
          aria-label="Next"
        >
          <ChevronRight size={24}/>
        </button>

        {/* карусель */}
        <div ref={viewportRef} className="embla overflow-hidden">
          <div className="embla__container flex">
            {content.socialFeed.map((p, i) => (
              <div
                key={i}
                className="
                  embla__slide shrink-0
                  w-[300px] aspect-square
                  mr-6         /* ← margin вместо gap */
                  rounded-xl overflow-hidden shadow-lg
                "
              >
                <a href={p.link} target="_blank" rel="noopener">
                  <Image
                    src={p.img}
                    alt=""
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                    priority={i < 4}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
