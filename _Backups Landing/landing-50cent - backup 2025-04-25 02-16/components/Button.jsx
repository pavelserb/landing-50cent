// components/Button.jsx
'use client'
import { motion } from 'framer-motion'

export default function Button({ children, onClick, className = '', ...props }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        inline-flex items-center justify-center
        bg-red-600 text-white font-semibold
        py-4 px-8 rounded-full
        text-lg
        shadow-lg
        focus:outline-none focus:ring-2 focus:ring-red-400
        ${className}
      `}
      {...props}
    >
      <span className="mr-2">{children}</span>
      <span className="text-2xl leading-none">→</span>
    </motion.button>
  )
}
