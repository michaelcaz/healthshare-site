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

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-display'
})
const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-handwriting'
})

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
      </body>
    </html>
  )
}
