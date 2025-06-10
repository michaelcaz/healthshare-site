'use client'

import Script from 'next/script'

export function PlausibleAnalytics() {
  return (
    <>
      <Script
        defer
        data-domain="sharewize.com"
        src="https://plausible.io/js/script.outbound-links.js"
        strategy="afterInteractive"
      />
      <Script id="plausible-init" strategy="afterInteractive">
        {`
          window.plausible = window.plausible || function() { 
            (window.plausible.q = window.plausible.q || []).push(arguments) 
          }
        `}
      </Script>
    </>
  )
} 