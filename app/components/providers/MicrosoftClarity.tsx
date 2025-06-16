'use client'

import Script from 'next/script'

export function MicrosoftClarity() {
  return (
    <Script
      id="microsoft-clarity"
      strategy="afterInteractive"
      src={`https://www.clarity.ms/tag/rxctgzpaxt`}
    />
  )
} 