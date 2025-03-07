import './globals.css'
import { Inter, Montserrat, Caveat } from 'next/font/google'
import { Header } from '@/components/layout/header'
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { GoogleAnalytics } from '@/components/providers/GoogleAnalytics'
import { ScrollRestoration } from '@/components/ui/scroll-restoration'
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
          <Header />
          <main className="pt-[76px]">
            {children}
          </main>
        </TooltipProvider>
        <Toaster />
      </body>
    </html>
  )
}
