// app/[locale]/layout.js
// import './globals.css'

import { setRequestLocale } from 'next-intl/server'

import { NextIntlClientProvider } from 'next-intl'
import { Montserrat, Oswald } from 'next/font/google'
import content from '../../data/content.json'
import Footer from '../../components/Footer'
// import LanguageSwitcher from '../../components/LanguageSwitcher'
import Header from '@/components/Header';
import MobileStickyBuy from '@/components/MobileStickyBuy' 

import Script from 'next/script'


const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400','700'],
  variable: '--font-montserrat'
})
const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400','700'],
  variable: '--font-oswald'
})

export const metadata = {
  title: content.siteTitle,
  description: 'Официальный лендинг концерта 50 Cent в Варшаве'
}

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'pl' },
  ]
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const messages  = (await import(`../../locales/${locale}.json`)).default

  return (
    // Обёртка, на которую накладываются css-переменные из шрифтов
    <div className={`${montserrat.variable} ${oswald.variable}`}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {/* ваш хэдер с переключателем */}
        {/* <header className="p-4">
          <LanguageSwitcher />
        </header> */}

        <Header />
        <MobileStickyBuy />



        {/* <header className="absolute top-0 w-full px-6 py-4 flex justify-end items-center
                          bg-black bg-opacity-30 backdrop-blur-md shadow-md">
          <LanguageSwitcher className="space-x-4 text-white font-semibold" 
                            activeClass="underline" />
        </header> */}
        {/* Скрипт, который выставляет Hero = 100vh - высота header */}
        <Script id="hero-resize" strategy="afterInteractive">
          {`
            function updateHeroHeight() {
              const header = document.querySelector('header');
              const hero   = document.querySelector('.hero-section');
              if (!header || !hero) return;
              const newH = window.innerHeight - header.offsetHeight;
              hero.style.height = newH + 'px';
            }

            // зарегистрируем на load и resize
            window.addEventListener('load',   updateHeroHeight);
            window.addEventListener('resize', updateHeroHeight);

            // и вызовем сразу, чтобы не ждать ни load, ни resize
            updateHeroHeight();
          `}
        </Script>

        {/* контент страницы */}
        <main className="flex-1 flex flex-col min-h-screen bg-white text-gray-800">
          {children}
        </main>

        {/* футер */}
        <Footer contacts={content.contacts} />
      </NextIntlClientProvider>
    </div>
  )
}
