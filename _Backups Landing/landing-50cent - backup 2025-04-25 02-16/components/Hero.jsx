// components/Hero.jsx
'use client'
import { motion } from 'framer-motion'
import Button from './Button'

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation'; // для App Router

export default function Hero({ title, date, bgImage, ctaText, onCtaClick }) {
    const heroRef = useRef(null);
    const pathname = usePathname(); // меняется при переключении языка

    useEffect(() => {
        function updateHeight() {
          const header = document.querySelector('header');
          const hero   = heroRef.current;
          if (!header || !hero) return;
          hero.style.height = `${window.innerHeight - header.offsetHeight}px`;
        }
    
        updateHeight();                             // сразу при монтировании
        window.addEventListener('resize', updateHeight);
    
        return () => {
          window.removeEventListener('resize', updateHeight);
        };
      }, [pathname]);  // эффект перезапустится при изменении пути/языка

  return (
    <section
    ref={heroRef}
      className="hero-section bg-[#1E1E1E] relative flex items-center justify-center overflow-hidden
                ">
                <img
                src={bgImage}
                alt="Hero"
                className="absolute inset-0 w-full h-full object-contain"
              />
    
      {/* полупрозрачный чёрный оверлей */}
      <div className="absolute inset-0 bg-black/50" />

      <motion.div
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-white font-black text-5xl md:text-7xl mb-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="text-red-400 font-semibold text-2xl mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {date}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Button onClick={onCtaClick}>{ctaText}</Button>
        </motion.div>
      </motion.div>
      <div className="bg-green-500 test-xyz">
      </div>
    </section>
  )
}
