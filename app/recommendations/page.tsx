'use client'

import { SelectedPlansProvider } from '@/components/recommendations/SelectedPlansContext'
import { RecommendationsLayout } from '@/components/recommendations'
import { getRecommendations } from '@/lib/recommendation/recommendations'
import { providerPlans } from '@/data/provider-plans'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { QuestionnaireResponse } from '@/types/questionnaire'

export default function RecommendationsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)
  const [questionnaire, setQuestionnaire] = useState<QuestionnaireResponse | null>(null)
  const [recommendations, setRecommendations] = useState<any[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Simple data loading with clean error handling
  useEffect(() => {
    const loadData = async () => {
      try {
        // Try to get data from localStorage
        const storedData = localStorage.getItem('questionnaire-data')
        
        if (!storedData) {
          setError('No questionnaire data found')
          setIsLoading(false)
          return
        }
        
        // Parse the data
        const parsed = JSON.parse(storedData)
        let questionnaireData = null
        
        // Handle different data formats
        if (parsed.response) {
          questionnaireData = parsed.response
        } else if (typeof parsed === 'object' && parsed.age !== undefined) {
          questionnaireData = parsed
          // Update storage with proper structure for next time
          localStorage.setItem('questionnaire-data', JSON.stringify({ response: parsed }))
        } else {
          setError('Invalid questionnaire data format')
          setIsLoading(false)
          return
        }
        
        // Ensure age is a number
        if (typeof questionnaireData.age === 'string') {
          questionnaireData.age = parseInt(questionnaireData.age)
        }
        
        // Set questionnaire data to state
        setQuestionnaire(questionnaireData)
        
        // Fetch recommendations
        const recommendationsData = await getRecommendations(providerPlans, questionnaireData)
        setRecommendations(recommendationsData)
        setIsLoading(false)
      } catch (error) {
        console.error('Error loading recommendations:', error)
        setError('Failed to load recommendations')
        setIsLoading(false)
      }
    }
    
    loadData()
  }, [router, searchParams])

  // Render loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Loading your recommendations...
        </h2>
      </div>
    )
  }

  // Handle error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-red-600">
          Something went wrong
        </h2>
        <p className="mt-2 text-gray-600">
          {error}
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

  // Handle no data state
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

  // Handle empty recommendations
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

  // Render successful state
  return (
    <SelectedPlansProvider>
      <RecommendationsLayout 
        recommendations={recommendations}
        questionnaire={questionnaire}
      />
    </SelectedPlansProvider>
  )
} 