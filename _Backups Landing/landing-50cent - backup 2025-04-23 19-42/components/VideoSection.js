// components/VideoSection.js
'use client'  // чтобы видео работало сразу на клиенте

export default function VideoSection({ videoSrc }) {
  return (
    <section className="py-12 flex justify-center">
      <div className="w-full md:w-4/5">
        <video
          src={videoSrc}
          muted
          controls
          className="w-full h-auto aspect-video rounded-2xl shadow-2xl border-4 border-accent"
          poster=""  // сюда можно указать превью‑картинку, например "/images/video-poster.jpg"
        >
          Ваш браузер не поддерживает видео.
        </video>
      </div>
    </section>
  )
}
