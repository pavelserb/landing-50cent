// app/layout.js

// import '../app/globals.css'    // <-- теперь именно так
// import './globals.css'
// import './styles.css'

import { Bebas_Neue, Roboto, Roboto_Condensed } from 'next/font/google'

// подключаем
const bebas = Bebas_Neue({
  weight: ['400'],      // Bebas Neue обычно только в одном начертании
  subsets: ['latin'],   // нужные вам наборы символов
  variable: '--font-bebas', // если хотите CSS-переменную
})
const roboto = Roboto({
  weight: ['400', '500', '700'],  // какие веса нужны
  subsets: ['latin'],
  variable: '--font-roboto',
})
const robotoCond = Roboto_Condensed({
  weight: ['400', '500', '700'],  // какие веса нужны
  subsets: ['latin'],
  variable: '--font-robotocond',
})

export const metadata = {
    title: 'Landing',
    description: 'Root layout for redirect page',
  }
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en" 
      // className={`${bebas.variable} ${bebas.className}`}>
      className={`${bebas.variable} ${bebas.className} ${roboto.variable} ${roboto.className} ${robotoCond.variable} ${robotoCond.className}`}>
        <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        {/* Подключаем сгенерированный tailwind-файл */}
        <link rel="stylesheet" href="/styles.css" />
        <link rel="stylesheet" href="../globals.css" />
      </head>
        <body>
          {children}</body>
      </html>
    )
  }
  