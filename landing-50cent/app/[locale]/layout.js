// app/[locale]/layout.js
// export const dynamic = 'force-dynamic'
// import { setRequestLocale } from 'next-intl/server'
// import { NextIntlClientProvider } from 'next-intl'
// import { Montserrat, Oswald } from 'next/font/google'
// import Header          from '@/components/Header'
// import Footer          from '@/components/Footer'
// import MobileStickyBuy from '@/components/MobileStickyBuy'
// import Script          from 'next/script'

// /* ---------- Supabase helper ---------- */
// import { createClient } from '@/lib/supabase'   // lib/supabase.ts ─► см. ранее

// /* ---------- шрифты ---------- */
// const montserrat = Montserrat({
//   subsets : ['latin'],
//   weight  : ['400','700'],
//   variable: '--font-montserrat'
// })
// const oswald = Oswald({
//   subsets : ['latin'],
//   weight  : ['400','700'],
//   variable: '--font-oswald'
// })

// export const metadata = {
//   title      : '50 Cent • Live in Warsaw',
//   description: 'Официальный лендинг концерта 50 Cent в Варшаве'
// }

// /* для статической генерации путей /en /pl */
// export function generateStaticParams () {
//   return [{ locale:'en' }, { locale:'pl' }]
// }

// export default async function LocaleLayout ({ children, params }) {
//   const { locale } = await params
//   setRequestLocale(locale)

//   /* ─── читаем переводы из Supabase ─── */
//   const supabase = createClient()
//   // const { data, error } = await supabase
//   //   .from('translations')
//   //   .select('data')
//   //   .eq('locale', locale)
//   //   .single()

//   // if (error) {
//   //   console.error('Supabase translations error', error)
//   //   throw new Error('Can’t load translations')
//   // }

//   // const messages = data?.data ?? {}
//   const [{ data: tr }, { data: cnt }] = await Promise.all([
//     supabase
//       .from('translations')
//       .select('data')
//       .eq('locale', locale)
//       .single(),
//     supabase
//       .from('content')
//       .select('data')
//       .eq('id', 'main')
//       .single()
//     ])
    
//     const messages = tr?.data ?? {}
//     const contacts = cnt?.data?.contacts ?? []

//   return (
//     <div className={`${montserrat.variable} ${oswald.variable}`}>
//       <NextIntlClientProvider locale={locale} messages={messages}>
//         <Header />
//         <MobileStickyBuy />

//         {/* Скрипт, который высчитывает высоту Hero = 100vh - header */}
//         <Script id="hero-resize" strategy="afterInteractive">
//           {`
//             function updateHeroHeight () {
//               const hdr  = document.querySelector('header')
//               const hero = document.querySelector('.hero-section')
//               if (!hdr || !hero) return
//               hero.style.height = (window.innerHeight - hdr.offsetHeight) + 'px'
//             }
//             window.addEventListener('load',   updateHeroHeight)
//             window.addEventListener('resize', updateHeroHeight)
//             updateHeroHeight()
//           `}
//         </Script>

//         <main className="flex-1 flex flex-col min-h-screen bg-white text-gray-800">
//           {children}
//         </main>

//         {/* <Footer /> */}
//         <Footer contacts={contacts} />
//       </NextIntlClientProvider>
//     </div>
//   )
// }

// app/[locale]/layout.js
export const dynamic = 'force-dynamic';

import { setRequestLocale }         from 'next-intl/server';
import { NextIntlClientProvider }   from 'next-intl';
import { Montserrat, Oswald }       from 'next/font/google';
import Header                       from '@/components/Header';
import Footer                       from '@/components/Footer';
import MobileStickyBuy              from '@/components/MobileStickyBuy';
import Script                       from 'next/script';
import { createClient }             from '@/lib/supabase';   // anon-client

const montserrat = Montserrat({ subsets:['latin'], weight:['400','700'], variable:'--font-montserrat' });
const oswald     = Oswald    ({ subsets:['latin'], weight:['400','700'], variable:'--font-oswald' });

export const metadata = {
  title      : '50 Cent • Live in Warsaw',
  description: 'Официальный лендинг концерта 50 Cent в Варшаве'
};

export function generateStaticParams() {
  return [{ locale:'en' }, { locale:'pl' }];
}

export default async function LocaleLayout({ children, params }) {
// export default async function LocaleLayout ({ children, params: { locale } }) {
  // const { locale } = params;              // ❗️ без await
  const { locale } = await params
  setRequestLocale(locale);

  const supabase = createClient();

  const [{ data: tr }, { data: cnt }] = await Promise.all([
    supabase.from('translations').select('data').eq('locale', locale).single(),
    supabase.from('content')     .select('data').eq('id',     'main').single()
  ]);

  const messages = tr?.data ?? {};
  const contacts = cnt?.data?.contacts ?? [];

  return (
    <div className={`${montserrat.variable} ${oswald.variable}`}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Header />
        <MobileStickyBuy />

        {/* скрипт «hero = 100vh − header» */}
        <Script id="hero-resize" strategy="afterInteractive">
          {`function upd(){const h=document.querySelector('header');const hero=document.querySelector('.hero-section');if(!h||!hero)return;hero.style.height=(innerHeight-h.offsetHeight)+'px';}addEventListener('load',upd);addEventListener('resize',upd);upd();`}
        </Script>

        <main className="flex-1 flex flex-col min-h-screen bg-white text-gray-800">
          {children}
        </main>

        <Footer contacts={contacts} />
      </NextIntlClientProvider>
    </div>
  );
}
