import { withSentryConfig } from '@sentry/nextjs'

const nextConfig = {
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: true, // Enable source maps in production
  images: {
    domains: [
      'lrwewkxwfgmzkvhozdin.supabase.co', // Your Supabase domain
      'cdn.sanity.io' // Sanity CDN
    ],
    formats: ['image/avif', 'image/webp']
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: process.env.CACHE_CONTROL_HEADER || 'public, s-maxage=1, stale-while-revalidate=59'
        }
      ]
    }
  ],
  // Optimize production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Enable React strict mode
  reactStrictMode: true,
  // Supabase auth helper configuration
  experimental: {
    serverActions: true
  },
  sentry: {
    hideSourceMaps: true,
    disableServerWebpackPlugin: false,
    disableClientWebpackPlugin: false,
  }
}

// Wrap with Sentry if DSN is provided
export default process.env.NEXT_PUBLIC_SENTRY_DSN
  ? withSentryConfig(
      nextConfig,
      {
        silent: true, // Suppresses source map uploading logs
        org: "healthshare",
        project: "healthshare-site",
      },
      {
        // Upload a larger set of source maps for prettier stack traces (increases build time)
        widenClientFileUpload: true,
        // Routes browser requests to Sentry through a Next.js rewrite to avoid ad-blockers (increases server load)
        tunnelRoute: "/monitoring",
        // Hides source maps from generated client bundles
        hideSourceMaps: true,
        // Automatically tree-shake Sentry logger statements to reduce bundle size
        disableLogger: true,
      }
    )
  : nextConfig 