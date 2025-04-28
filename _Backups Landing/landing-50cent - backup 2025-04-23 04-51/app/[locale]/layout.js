// app/[locale]/layout.js
// import './globals.css'
import Script from 'next/script'
import { NextIntlClientProvider } from 'next-intl'
import { Montserrat, Oswald } from 'next/font/google'
import content from '../../data/content.json'
import Footer from '../../components/Footer'

// import en from '../../locales/en.json'
// import pl from '../../locales/pl.json'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400','700'], variable: '--font-montserrat' })
const oswald     = Oswald({ subsets: ['latin'], weight: ['400','700'], variable: '--font-oswald' })

export const metadata = {
  title: content.siteTitle,
  description: 'Официальный лендинг концерта 50 Cent в Варшаве',
}

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'pl' },
  ]
}

// export default function RootLayout({ children, params }) {
//   const locale   = params.locale      // 'en' или 'pl'
//   const messages = require(`../../../locales/${locale}.json`)



  // export default function RootLayout({ children, params }) {
  //   const messages = params.locale === 'pl' ? pl : en

  // export default async function RootLayout({ children, params }) {
  //   const locale = await params.locale
  //   const messages = (await import(`../../locales/${locale}.json`)).default    

  // export default async function RootLayout({ children, params }) {
  //   // params.locale — это Promise<string>, ждём его
  //   const locale = await params.locale
  //   // теперь можем импортировать переводы
  //   const messages = (await import(`../../locales/${locale}.json`)).default


  export default async function RootLayout({ children, params }) {
    // дождаться всего объекта params
    const { locale } = await params
  
    // теперь locale — это строка ('en' или 'pl')
    const messages = (await import(`../../locales/${locale}.json`)).default

  return (
    <html lang={locale} className={`${montserrat.variable} ${oswald.variable}`}>
      <head>
        {/* Tailwind через CDN */}
        {/* <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" /> */}
      </head>
      <body className="flex flex-col min-h-screen">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <Footer contacts={content.contacts} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
