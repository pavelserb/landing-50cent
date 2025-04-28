// /** @type {import('next').NextConfig} */
// module.exports = {
//   i18n: {
//     locales: ['en', 'pl', 'de'],   // все ваши языки
//     defaultLocale: 'en',           // язык по умолчанию
//   },
//   // … остальная ваша конфигурация
// }





// next.config.js
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // убираем experimental.appDir — Next 15 App Router включён по-умолчанию
};

module.exports = withNextIntl(nextConfig);


// // next.config.js
// import { withNextIntl } from 'next-intl/plugin'

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // сюда ваши другие опции (если нужны)
// }

// export default withNextIntl(nextConfig)

// next.config.js
// import createNextIntlPlugin from 'next-intl/plugin'

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     // В Next.js 15.2+ (canary) эта опция позволяет middleware работать на Node.js
//     nodeMiddleware: true,
//   }
// }

// export default createNextIntlPlugin(nextConfig)
