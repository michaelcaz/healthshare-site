import './globals.css'
import { Inter, Montserrat, Caveat } from 'next/font/google'
import { Header } from '@/components/layout/header'
import { Footer } from 'app/components/layout/footer'
import { Toaster } from '@/components/ui/toaster'
import { GoogleAnalytics } from '@/components/providers/GoogleAnalytics'
import { PlausibleAnalytics } from './components/providers/PlausibleAnalytics'
import { MicrosoftClarity } from './components/providers/MicrosoftClarity'
import { FacebookPixel } from '@/components/providers/FacebookPixel'
import { ScrollRestoration } from '@/components/ui/scroll-restoration'
import { FloatingCTA } from '@/components/ui/floating-cta'
import { ExitIntentPopup } from '@/components/ui/exit-intent-popup'
import { headers } from 'next/headers'
import { AnnouncementBar } from '@/components/ui/announcement-bar'
import { Metadata } from 'next'
import Head from 'next/head'

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
  title: 'Sharewize',
  description: 'Join 2M+ Americans saving 30-50% with healthcare plans that reward health-conscious entrepreneurs, freelancers, and independent contractors.',
  metadataBase: new URL('https://sharewize.com'),
  openGraph: {
    title: 'Sharewize',
    description: 'Join 2M+ Americans saving 30-50% with healthcare plans that reward health-conscious entrepreneurs, freelancers, and independent contractors.',
    url: 'https://sharewize.com',
    siteName: 'Sharewize',
    images: [
      {
        url: '/images/sharewizelogofulljpg.jpg',
        width: 1200,
        height: 630,
        alt: 'Sharewize Logo',
        type: 'image/jpeg',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sharewize',
    description: 'Join 2M+ Americans saving 30-50% with healthcare plans that reward health-conscious entrepreneurs, freelancers, and independent contractors.',
    images: ['/images/sharewizelogofulljpg.jpg'],
    creator: '@sharewize',
    site: '@sharewize',
  },
  icons: {
    icon: '/images/illustrations/sharewizelogovector-white.svg',
  },
  alternates: {
    canonical: 'https://sharewize.com',
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
    <>
      <Head>
        <link rel="preload" as="image" href="/images/logos/zion.svg" />
        <link rel="preload" as="image" href="/images/logos/sedera.svg" />
        <link rel="preload" as="image" href="/images/logos/crowd-health.svg" />
        <link rel="preload" as="image" href="/images/logos/knew.svg" />
      </Head>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <title>Sharewize</title>
          <link rel="icon" type="image/svg+xml" href="/images/illustrations/sharewizelogovector-white.svg" />
          <GoogleAnalytics />
          <PlausibleAnalytics />
          <MicrosoftClarity />
          <FacebookPixel />
        </head>
        <body suppressHydrationWarning className={`${inter.variable} ${montserrat.variable} ${caveat.variable} font-sans bg-warm`}>
          <ScrollRestoration />
          <AnnouncementBar />
          <Header />
          <main className="pt-[72px] md:pt-[72px]">
            {children}
          </main>
          <Footer />
          <FloatingCTA 
            phoneNumber="(737) 237-1055" 
            calendlyLink="https://calendly.com/michaelcaz/30min" 
          />
          <ExitIntentPopup 
            phoneNumber="(737) 237-1055" 
            calendlyLink="https://calendly.com/michaelcaz/30min" 
          />
          <Toaster />
        </body>
      </html>
    </>
  )
}
