import Link from 'next/link'

export default function PlanComparisonNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Page not found
      </h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        The plan comparison page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/recommendations"
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
      >
        Return to recommendations
      </Link>
    </div>
  )
} 