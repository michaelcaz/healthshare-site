import './globals.css'
import { Inter, Montserrat, Caveat } from 'next/font/google'
import { Header } from '@/components/layout/header'
import { Toaster } from '@/components/ui/toaster'
import { GoogleAnalytics } from '@/components/providers/GoogleAnalytics'
import { ScrollRestoration } from '@/components/ui/scroll-restoration'
import { FloatingCTA } from '@/components/ui/floating-cta'
import { ExitIntentPopup } from '@/components/ui/exit-intent-popup'
import { headers } from 'next/headers'
import Script from 'next/script'
import { AnnouncementBar } from '@/components/ui/announcement-bar'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-display'
})
const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-handwriting'
})

export const metadata: Metadata = {
  title: 'Sharewize - Share your health. Save your wealth.',
  description: 'Join 2M+ Americans saving 30-50% with healthcare plans that reward health-conscious entrepreneurs, freelancers, and independent contractors.',
  openGraph: {
    title: 'Sharewize - Share your health. Save your wealth.',
    description: 'Join 2M+ Americans saving 30-50% with healthcare plans that reward health-conscious entrepreneurs, freelancers, and independent contractors.',
    url: 'https://sharewize.com',
    siteName: 'Sharewize',
    images: [
      {
        url: '/images/sharewizelogofulljpg.jpg',
        width: 1200,
        height: 630,
        alt: 'Sharewize - Share your health. Save your wealth.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sharewize - Share your health. Save your wealth.',
    description: 'Join 2M+ Americans saving 30-50% with healthcare plans that reward health-conscious entrepreneurs, freelancers, and independent contractors.',
    images: ['/images/sharewizelogofulljpg.jpg'],
    creator: '@sharewize',
  },
  icons: {
    icon: '/images/illustrations/sharewizelogovector-white.svg',
  },
}

console.log('Rendering layout.tsx');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const nonce = headers().get('x-nonce') ?? 'default-nonce'

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>Sharewize</title>
        <link rel="icon" type="image/svg+xml" href="/images/illustrations/sharewizelogovector-white.svg" />
        <GoogleAnalytics />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} ${montserrat.variable} ${caveat.variable} font-sans bg-warm`}>
        <ScrollRestoration />
        <AnnouncementBar />
        <Header />
        <main>
          {children}
        </main>
        <FloatingCTA 
          phoneNumber="(225) 718-8977" 
          calendlyLink="https://calendly.com/michaelcaz/30min" 
        />
        <ExitIntentPopup 
          phoneNumber="(225) 718-8977" 
          calendlyLink="https://calendly.com/michaelcaz/30min" 
        />
        <Toaster />
      </body>
    </html>
  )
}
