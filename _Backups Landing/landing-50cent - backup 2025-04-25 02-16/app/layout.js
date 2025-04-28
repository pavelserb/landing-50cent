// app/layout.js

// import '../app/globals.css'    // <-- теперь именно так
// import './globals.css'

export const metadata = {
    title: 'Landing',
    description: 'Root layout for redirect page',
  }
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <head>
        {/* Подключаем сгенерированный tailwind-файл */}
        <link rel="stylesheet" href="/styles.css" />
        <link rel="stylesheet" href="../globals.css" />
      </head>
        <body>
          {children}</body>
      </html>
    )
  }
  