// components/Hero.jsx
'use client'
import { motion } from 'framer-motion'
import Button from './Button'

export default function Hero({ title, date, bgImage, ctaText, onCtaClick }) {
  return (
    <section
      className="relative h-screen flex items-center justify-center"
      style={{
        background: `url(${bgImage}) center/cover no-repeat`
      }}
    >
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
    </section>
  )
}
