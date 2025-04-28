// next.config.js
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // убираем experimental.appDir — Next 15 App Router включён по-умолчанию
};

module.exports = withNextIntl(nextConfig);
