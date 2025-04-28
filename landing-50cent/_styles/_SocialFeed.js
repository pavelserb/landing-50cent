// components/SocialFeed.js
'use client'

import Image from 'next/image'

export default function SocialFeed({ items }) {
  return (
    <section className="py-12" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading text-center text-primary mb-8">
          Мы в соцсетях
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              style={{
                display: 'block',           // блочный элемент
                position: 'relative',       // для absolute-детей
                height: '12rem',            // фиксированная высота
                overflow: 'hidden',         // обрезка по границам
                borderRadius: '1rem',       // скругление углов
                boxShadow: '0 10px 15px rgba(0,0,0,0.1)' // тень
              }}
            >
              <Image
                src={item.img}
                alt=""
                fill                         // занимает весь контейнер
                style={{ objectFit: 'cover' }}
                className="transition-transform group-hover:scale-105"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
