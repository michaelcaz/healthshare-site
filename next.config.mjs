/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;
              style-src 'self' 'unsafe-inline' https://api.fontshare.com;
              img-src 'self' data: https:;
              font-src 'self' data: https: https://api.fontshare.com;
              connect-src 'self' https: wss:;
              frame-src 'self' https:;
            `.replace(/\s+/g, ' ').trim()
          }
        ],
      },
    ]
  }
}

export default nextConfig 