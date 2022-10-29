/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["place.dog", "i.scdn.co"],
  },
};

module.exports = nextConfig;
