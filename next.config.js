const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['media.dodostatic.net'],
  }
};
module.exports = withNextIntl(nextConfig);
