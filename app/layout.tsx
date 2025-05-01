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
import { MobileBottomCTA } from '@/components/ui/MobileBottomCTA'
import { headers } from 'next/headers'
import Script from 'next/script'

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
        <Script
          id="navigation-debug-script"
          strategy="afterInteractive"
        >
          {`
            // Debug script to track navigation events
            console.log('%c Navigation Debug Initialized', 'background: #4b0082; color: white; font-size: 14px;');
            
            // Track URL changes
            let lastUrl = window.location.href;
            
            // Function to check URL changes
            function checkUrlChange() {
              const currentUrl = window.location.href;
              if (currentUrl !== lastUrl) {
                console.log('%c URL CHANGED:', 'background: #ff0000; color: white; font-size: 14px;', {
                  from: lastUrl,
                  to: currentUrl
                });
                lastUrl = currentUrl;
                
                // Also check localStorage on URL change
                try {
                  const qData = localStorage.getItem('questionnaire-data');
                  const selectedPlans = localStorage.getItem('selected-plans');
                  console.log('Debug localStorage after navigation:', { 
                    'questionnaire-data': qData ? 'exists' : 'missing',
                    'selected-plans': selectedPlans ? 'exists' : 'missing'
                  });
                } catch (e) {
                  console.error('Error checking localStorage:', e);
                }
              }
              setTimeout(checkUrlChange, 100);
            }
            
            // Start checking for URL changes
            checkUrlChange();
            
            // Listen for navigation events
            window.addEventListener('popstate', function(event) {
              console.log('%c POPSTATE EVENT:', 'background: #008000; color: white; font-size: 14px;', {
                state: event.state,
                url: window.location.href
              });
            });
          `}
        </Script>
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
          <MobileBottomCTA />
        </TooltipProvider>
        <Toaster />
      </body>
    </html>
  )
}
