'use client'

import { SelectedPlansProvider } from '@/components/recommendations/SelectedPlansContext'
import { RecommendationsLayout } from '@/components/recommendations'
import { getQuestionnaireResponse } from '@/lib/utils/storage'
import { getRecommendations } from '@/lib/recommendation/recommendations'
import { providerPlans } from '@/data/provider-plans'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PlanRecommendation } from '@/lib/recommendation/recommendations'
import { toast } from '@/components/ui/use-toast'
import { QuestionnaireResponse } from '@/types/questionnaire'

export default function RecommendationsPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [questionnaire, setQuestionnaire] = useState<QuestionnaireResponse | null>(null)
  const [recommendations, setRecommendations] = useState<any[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const loadData = async () => {
      try {
        // Try to get data from localStorage first
        const storedData = localStorage.getItem('questionnaire-data')
        let questionnaireData = null
        
        if (storedData) {
          const parsed = JSON.parse(storedData)
          if (parsed.response) {
            questionnaireData = parsed.response
          }
        }

        // If no data in localStorage, try server-side storage
        if (!questionnaireData) {
          questionnaireData = getQuestionnaireResponse()
        }

        if (!questionnaireData) {
          console.log('No questionnaire data found, redirecting to questionnaire')
          router.push('/questionnaire')
          return
        }

        setQuestionnaire(questionnaireData)
        const recommendationsData = await getRecommendations(providerPlans, questionnaireData)
        setRecommendations(recommendationsData)
        
        // Store the top recommendation ID in localStorage
        if (recommendationsData && recommendationsData.length > 0) {
          localStorage.setItem('top-recommendation-id', recommendationsData[0].plan.id)
        }
      } catch (error) {
        console.error('Error loading recommendations:', error)
        setError('Failed to load recommendations')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [router])

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Loading your recommendations...
        </h2>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-red-600">
          Something went wrong
        </h2>
        <p className="mt-2 text-gray-600">
          We encountered an error while processing your questionnaire data. Please try again.
        </p>
        <a 
          href="/questionnaire" 
          className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Return to Questionnaire
        </a>
      </div>
    )
  }

  if (!questionnaire || !recommendations) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900">
          No questionnaire data found
        </h2>
        <p className="mt-2 text-gray-600">
          Please complete the questionnaire to get your personalized recommendations.
        </p>
        <a 
          href="/questionnaire" 
          className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Start Questionnaire
        </a>
      </div>
    )
  }

  if (recommendations.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900">
          No matching plans found
        </h2>
        <p className="mt-2 text-gray-600">
          We couldn't find any plans matching your criteria. Please try adjusting your preferences.
        </p>
        <a 
          href="/questionnaire" 
          className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Return to Questionnaire
        </a>
      </div>
    )
  }

  return (
    <SelectedPlansProvider>
      <RecommendationsLayout 
        recommendations={recommendations}
        questionnaire={questionnaire}
      />
    </SelectedPlansProvider>
  )
} 