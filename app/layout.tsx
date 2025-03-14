import './globals.css'
import { Inter, Montserrat, Caveat } from 'next/font/google'
import { Header } from '@/components/layout/header'
import { AnnouncementBar } from '@/components/layout/announcement-bar'
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { GoogleAnalytics } from '@/components/providers/GoogleAnalytics'
import { ScrollRestoration } from '@/components/ui/scroll-restoration'
import { FloatingCTA } from '@/components/ui/floating-cta'
import { ExitIntentPopup } from '@/components/ui/exit-intent-popup'
import { headers } from 'next/headers'
// import Script from 'next/script'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-display'
})
const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-handwriting'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const nonce = headers().get('x-nonce') ?? 'default-nonce'

  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
        {/* <Script
          src="/scripts/main.js"
          strategy="beforeInteractive"
          nonce={nonce}
        /> */}
      </head>
      <body suppressHydrationWarning className={`${inter.variable} ${montserrat.variable} ${caveat.variable} font-sans`} style={{ background: 'var(--color-cream-bg)' }}>
        <TooltipProvider>
          <ScrollRestoration />
          <AnnouncementBar 
            phoneNumber="(225) 718-8977" 
            calendlyLink="https://calendly.com/michaelcaz/30min" 
          />
          <Header />
          <main className="pt-[calc(76px+var(--announcement-bar-height,0px))]">
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
        </TooltipProvider>
        <Toaster />
      </body>
    </html>
  )
}
