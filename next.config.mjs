/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.sanity.io', // For Sanity.io hosted images
      'lrwewkxwfgmzkvhozdin.supabase.co', // For Supabase hosted images
    ],
    formats: ['image/avif', 'image/webp'],
  },
  typescript: {
    // During development, type errors won't fail the build
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
  eslint: {
    // During development, lint errors won't fail the build
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
  // Optimize production builds
  swcMinify: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Enable static exports for static pages
  output: 'standalone',
}

export default nextConfig 