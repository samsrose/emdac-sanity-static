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
    // 1 year — image URLs are content-addressed by Sanity, so they're safe to cache aggressively.
    minimumCacheTTL: 60 * 60 * 24 * 365,
    // Match the `sizes` attributes used in the codebase to avoid generating
    // unused image variants.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
  },
  // Auto-tree-shake barrel files for the most common heavy imports.
  // For date-fns this can shave 50–100KB off client bundles.
  experimental: {
    optimizePackageImports: [
      '@heroicons/react',
      'date-fns',
      'classnames',
    ],
  },
  // The legacy `pages/` Sentry test API and example page were removed; the
  // Sentry tunnelRoute remains opt-in via the wrapper below.
  poweredByHeader: false,
}


// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://www.npmjs.com/package/@sentry/webpack-plugin#options

    org: "xploring",
    project: "node",

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: "/monitoring",

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
);
