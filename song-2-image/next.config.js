/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["place.dog", "i.scdn.co"],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
