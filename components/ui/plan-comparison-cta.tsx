'use client'

import Link from 'next/link'

export function PlanComparisonCta({
  calendlyLink = "https://calendly.com/michaelcaz/30min",
  phoneNumber = "(737) 237-1055"
}) {
  return (
    <div className="mt-12 text-center">
      <h3 className="text-xl font-medium mb-3">Still comparing options?</h3>
      <p className="text-gray-warm/80 max-w-2xl mx-auto mb-6">
        Our team can help you understand the differences and find the best fit for your needs.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          href={`tel:${phoneNumber.replace(/[^0-9]/g, '')}`}
          className="btn-secondary flex items-center justify-center gap-2 py-3 px-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          Call {phoneNumber}
        </Link>
        <Link 
          href={calendlyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary flex items-center justify-center gap-2 py-3 px-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          Schedule a Consultation
        </Link>
      </div>
    </div>
  )
} 