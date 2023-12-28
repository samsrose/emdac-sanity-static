/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
      { hostname: 'source.unsplash.com' },
      { hostname: 'cdn.jsdelivr.net' },
      { hostname: 'emdac.org' },
      { hostname: 'picsum.photos' },
      { hostname: 'localhost' },
    ],
  },
}
