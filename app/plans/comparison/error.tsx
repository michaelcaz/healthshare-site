'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function PlanComparisonError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Plan comparison error:', error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Something went wrong
      </h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        We encountered an error while loading your plan comparison. Please try again or return to the recommendations page.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Try again
        </button>
        <Link
          href="/recommendations"
          className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
        >
          Return to recommendations
        </Link>
      </div>
    </div>
  )
} 