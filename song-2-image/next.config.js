/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['place.dog', 'i.scdn.co'],
  },
}

module.exports = nextConfig
