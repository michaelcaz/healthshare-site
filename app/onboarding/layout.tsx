import { Toaster } from "@/components/ui/toaster"
import { ScrollRestoration } from '@/components/ui/scroll-restoration'
import { Inter, Montserrat, Caveat } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-display'
})
const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-handwriting'
})

export const metadata = {
  title: 'Sharewize - Onboarding',
  description: 'Find the right healthshare plan for you',
}

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${inter.variable} ${montserrat.variable} ${caveat.variable} font-sans`} style={{ background: 'var(--color-cream-bg)' }}>
        <>
          <ScrollRestoration />
          <main>
            {children}
          </main>
          <Toaster />
        </>
      </body>
    </html>
  )
} 