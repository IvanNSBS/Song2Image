/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["place.dog", "i.scdn.co", "openailabsprodscus.blob.core.windows.net"],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
