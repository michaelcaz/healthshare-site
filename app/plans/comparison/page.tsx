import { Metadata } from 'next'
import { PlanComparisonTable } from '@/components/plans/comparison/PlanComparisonTable'
import { BackButton } from '@/components/ui/back-button'

export const metadata: Metadata = {
  title: 'Plan Comparison | HealthShare',
  description: 'Compare your selected healthshare plans side by side to find the best option for your needs.',
}

export default function PlanComparisonPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-6">
        <BackButton href="/plans" label="Back to Recommendations" />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Plan Comparison</h1>
      <p className="text-lg text-gray-700 mb-8">
        Compare your selected plans side by side to find the best option for your needs.
      </p>
      
      <PlanComparisonTable />
    </div>
  )
} 