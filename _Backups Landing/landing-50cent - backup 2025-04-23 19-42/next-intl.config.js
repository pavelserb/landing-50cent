// next-intl.config.js
/** @type {import('next-intl').NextIntlConfig} */
module.exports = {
    locales: ['en', 'pl'],    // префиксы URL: /en, /pl
    defaultLocale: 'en',       // локаль по умолчанию
    localeDetection: true      // авто-определение языка
  };
  