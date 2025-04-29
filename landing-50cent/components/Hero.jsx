// components/Hero.jsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion }            from 'framer-motion'
import { usePathname }       from 'next/navigation'
import Link from 'next/link'
import { ChevronDown }       from 'lucide-react'
import CountdownTimer        from './CountdownTimer'

// export default function Hero({ bgImage, targetDate }) {
export default function Hero({ bgImage, targetDate, ctaHref = '#', ctaText }) {
  const heroRef   = useRef(null)
  const pathname  = usePathname()
  const [showArrow, setShowArrow] = useState(true)

  /* ── динамический расчёт высоты ── */
  useEffect(() => {
    function updateHeight() {
      const hero = heroRef.current
      const hdr  = document.querySelector('header')
      const bar  = document.getElementById('mobile-buy-bar')

      if (!hero || !hdr) return

      const barH = bar && getComputedStyle(bar).display !== 'none'
        ? bar.offsetHeight
        : 0

      /* ① сколько места есть по высоте */
      const avail = window.innerHeight - hdr.offsetHeight - barH

      /* ② максимум по соотношению (H ≤ 1.5 × W) */
      const maxByRatio = hero.getBoundingClientRect().width * 1.5

      hero.style.height = `${Math.min(avail, maxByRatio)}px`
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  /* ── прячем стрелку при прокрутке hero на 10 % ── */
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const threshold = hero.offsetHeight * 0.1
    const onScroll  = () => window.scrollY > threshold && setShowArrow(false)

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  const scrollDown = () =>
    document.getElementById('nextSection')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      ref={heroRef}
      className="
        hero-section relative overflow-hidden
        flex flex-col items-center justify-center bg-[#0f0f0f]
      "
    >
      {/* фоновый стадион */}
      <img
        src="/images/stadium.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />

      {/* постер артиста (займёт всё свободное сверху) */}
      <motion.div
        className="relative w-full flex-1 overflow-hidden"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: .3, duration: 1 }}
      >
        <img
          src={bgImage}
          alt=""
          className="absolute inset-x-0 top-0 h-full w-auto mx-auto object-contain object-top"
        />
      </motion.div>

      {/* таймер + стрелка */}
      <div className="w-full py-4 flex flex-col items-center">
        <CountdownTimer targetDate={targetDate} />

        {showArrow && (
          <button
            onClick={scrollDown}
            className="mt-3 text-white animate-bounce"
            aria-label="Scroll down"
          >
            <ChevronDown size={32}/>
          </button>
        )}
      </div>
    </section>
  )
}
