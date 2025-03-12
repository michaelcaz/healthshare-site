'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PlanRecommendation } from '@/lib/recommendation/recommendations'
import { SimplifiedPlanComparison } from '@/components/plans/simplified-plan-comparison'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'

export default function PlanComparisonPage() {
  const [selectedPlans, setSelectedPlans] = useState<PlanRecommendation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Load selected plans from localStorage
    const storedPlans = localStorage.getItem('selected-plans')
    if (storedPlans) {
      try {
        const parsedPlans = JSON.parse(storedPlans)
        setSelectedPlans(parsedPlans)
      } catch (error) {
        console.error('Error parsing stored plans:', error)
      }
    }
    setIsLoading(false)
  }, [])

  const handleBackToRecommendations = () => {
    router.push('/recommendations')
  }

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 text-primary animate-spin mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Loading your plan comparison...</h1>
          <p className="text-gray-600">Please wait while we prepare your comparison.</p>
        </div>
      </div>
    )
  }

  if (selectedPlans.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto text-center bg-white p-8 rounded-xl shadow-sm">
          <h1 className="text-2xl font-bold mb-4">No Plans Selected</h1>
          <p className="text-gray-600 mb-8">
            You haven't selected any plans to compare. Please go back to the recommendations page and select plans to compare.
          </p>
          <Button onClick={handleBackToRecommendations} className="bg-primary hover:bg-primary/90">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Recommendations
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={handleBackToRecommendations}
            className="mr-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Recommendations
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900">Plan Comparison</h1>
        </div>
        
        <div className="mb-8">
          <p className="text-xl text-gray-600 max-w-3xl">
            Compare your selected plans side by side to find the best option for your needs.
          </p>
        </div>
        
        <SimplifiedPlanComparison plans={selectedPlans} />
      </div>
    </div>
  )
} 