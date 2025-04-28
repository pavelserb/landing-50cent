// components/Location.jsx
'use client'

import { MapPin } from 'lucide-react'
import Button     from './Button'

export default function Location({ data }) {
  const {                /* всё приходит из  content.location  */
    name,                // «PGE Narodowy»
    address,             // «al. Księcia Józefa Poniatowskiego 1, 03-901 Warszawa»
    phone,               // «+48 22 295 9000»
    website,             // «https://pgenarodowy.pl»
    mapEmbed,            // готовая <iframe>-ссылка
    lat,                 // 52.2395
    lng                  // 21.0450
  } = data

  /* открыть маршрут → Google Maps
     если пользователь дал геолокацию — строим от его координат,
     иначе — просто к точке назначения                                  */
  const openDirections = () => {
    const fallback = `https://www.google.com/maps/dir//${lat},${lng}/`
    if (!navigator.geolocation) {
      window.open(fallback, '_blank'); return
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords
        window.open(
          `https://www.google.com/maps/dir/${latitude},${longitude}/${lat},${lng}/`,
          '_blank'
        )
      },
      () => window.open(fallback, '_blank'),
      { timeout: 5000 }
    )
  }

  return (
    <section className="py-16">
      {/* заголовок – как в других секциях */}
      <h2 className="font-bebas text-6xl text-center text-primary mb-12">
        LOCATION
      </h2>

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* карта слева */}
        <iframe
          title="PGE Narodowy map"
          src={mapEmbed}
          loading="lazy"
          className="w-full h-[360px] lg:h-[480px] rounded-2xl shadow-lg"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* информация + кнопка справа */}
        <div className="flex flex-col justify-start gap-6">
          <h3 className="font-bebas text-4xl lg:text-5xl text-dark">
            {name}
          </h3>

          <p className="flex items-start gap-2 text-lg">
            <MapPin className="shrink-0 mt-1" size={20}/>
            <span>{address}</span>
          </p>

          <p className="text-lg">
            <span className="font-semibold">Phone:&nbsp;</span>
            <a href={`tel:${phone}`} className="text-blue-600 hover:underline">
              {phone}
            </a>
          </p>

          <p className="text-lg">
            <span className="font-semibold">Website:&nbsp;</span>
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {website.replace(/^https?:\/\//, '')}
            </a>
          </p>

          <Button onClick={openDirections} className="w-max mt-auto">
            Get&nbsp;Directions
          </Button>
        </div>
      </div>
    </section>
  )
}
