// components/Hero.jsx
'use client'

import { motion } from 'framer-motion'
import CountdownTimer from './CountdownTimer'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

export default function Hero({ bgImage, targetDate }) {
  const heroRef = useRef(null)
  const pathname = usePathname()

  const [showArrow, setShowArrow] = useState(true)

  useEffect(() => {
    // function updateHeight() {
    //   const hdr = document.querySelector('header')
    //   const hero   = heroRef.current
    // //   if (!header || !hero) return
    // //   hero.style.height = `${window.innerHeight - header.offsetHeight}px`
    // if (hdr && hero) {
    //     hero.style.height = `${window.innerHeight - hdr.offsetHeight}px`
    //   }
    
    function updateHeight() {
        const hdr  = document.querySelector('header')
        const hero = heroRef.current
        const bar  = document.getElementById('mobile-buy-bar')
        const barH = bar && getComputedStyle(bar).display !== 'none'
                ? bar.offsetHeight
                : 0
        if (hdr && hero) {
        hero.style.height = `${window.innerHeight - hdr.offsetHeight - barH}px`
        }    
    }



    updateHeight()
    window.addEventListener('resize', updateHeight)

    // const onScroll = () => setShowArrow(false)
    // прячем стрелку, когда прокрутка > определённого значения
    const threshold = heroRef.current
        ? heroRef.current.offsetHeight * 0.1  // например, половины высоты Hero
        : 100                                 // или 100px запасной вариант
    const onScroll = () => {
        if (window.scrollY > threshold) {
        setShowArrow(false)
        }
    }

    window.addEventListener('scroll', onScroll)

    return () => {
        window.removeEventListener('resize', updateHeight)
        window.removeEventListener('scroll', onScroll)
      }
  }, [pathname])

  const scrollDown = () => {
    document.getElementById('nextSection')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={heroRef}
      className="
        hero-section
        relative
        overflow-hidden
        flex flex-col items-center justify-center
        bg-[#0f0f0f]
        // bg-center bg-cover
      "
    //   style={{ backgroundImage: `url(${bgImage})` }}
    // style={{ backgroundImage: "url('/images/stadium.png')" }}

    >
        {/* ← слой стадиона */}
    <img
        src="/images/stadium.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-30"
    />
      {/* ────────────── 85%: блок с изображением и оверлеем ────────────── */}
      {/* <div className="relative w-full h-[85%] flex items-center justify-center overflow-hidden">
        <img
          src={bgImage}
          alt="Hero"
          className="absolute inset-0 w-auto h-full object-contain mx-auto"
        />
      </div> */}
      <motion.div
        className="relative w-full h-[85%] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <img
          src={bgImage}
          alt=""
          className="absolute inset-x-0 top-0 h-full w-auto object-contain object-top mx-auto"
        />
        {/* <div className="absolute inset-0 bg-black/50" /> */}
      </motion.div>

      {/* ────────────── 15%: блок с таймером ────────────── */}
      <div className="w-full h-[15%] flex flex-col items-center justify-between relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <CountdownTimer targetDate={targetDate} />
        </motion.div>

      {/* стрелочка вниз */}
      {/* <button
        onClick={scrollDown}
        className="bottom-4 left-1/2 transform text-white animate-bounce p-2"
        aria-label="Scroll down"
      >
        <ChevronDown size={32} />
      </button> */}
      {showArrow && (
        <button
          onClick={scrollDown}
          className="bottom-4 left-1/2 transform text-white animate-bounce cursor-pointer"
          aria-label="Scroll down"
        >
          <ChevronDown size={32} />
        </button>
      )}
      </div>

    </section>
  )
}



