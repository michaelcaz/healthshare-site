import './globals.css'
import { Inter } from 'next/font/google'
import { Header } from '@/components/layout/header'
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { GoogleAnalytics } from '@/components/providers/GoogleAnalytics'
import { NavBar } from '@/components/marketing/NavBar'
import { headers } from 'next/headers'
// import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

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
      <body suppressHydrationWarning className={inter.className} style={{ background: 'var(--color-cream-bg)' }}>
        <TooltipProvider>
          <Header />
          <div className="pt-[88px]">
            {children}
          </div>
        </TooltipProvider>
        <Toaster />
      </body>
    </html>
  )
}
