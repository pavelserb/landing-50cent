// app/[locale]/layout.js
import { setRequestLocale } from 'next-intl/server'

import { NextIntlClientProvider } from 'next-intl'
import { Montserrat, Oswald } from 'next/font/google'
import content from '../../data/content.json'
import Footer from '../../components/Footer'
import LanguageSwitcher from '../../components/LanguageSwitcher'

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
        <header className="p-4">
          <LanguageSwitcher />
        </header>

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
