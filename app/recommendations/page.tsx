'use client'

import { SelectedPlansProvider } from '@/components/recommendations/SelectedPlansContext'
import { RecommendationsLayout } from '@/components/recommendations'
import { getQuestionnaireResponse } from '@/lib/utils/storage'
import { getRecommendations } from '@/lib/recommendation/recommendations'
import { providerPlans } from '@/data/provider-plans'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PlanRecommendation } from '@/lib/recommendation/recommendations'
import { toast } from '@/components/ui/use-toast'
import { QuestionnaireResponse } from '@/types/questionnaire'

export default function RecommendationsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)
  const [questionnaire, setQuestionnaire] = useState<QuestionnaireResponse | null>(null)
  const [recommendations, setRecommendations] = useState<any[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Log when recommendations page is mounted
  useEffect(() => {
    console.log('%c RecommendationsPage: Component mounted', 'background: #0066ff; color: white; font-size: 14px;')
    console.log('Current URL:', window.location.href)
    
    // Log search parameters safely
    const params: Record<string, string> = {};
    if (searchParams) {
      // Use .get() for each known parameter instead of iterating
      params.age = searchParams.get('age') || '';
      params.coverageType = searchParams.get('coverageType') || '';
      params.visitFrequency = searchParams.get('visitFrequency') || '';
      params.iua = searchParams.get('iua') || '';
    }
    console.log('Search params:', params);
    
    window.scrollTo(0, 0)
  }, [searchParams])

  useEffect(() => {
    console.log('RecommendationsPage: Starting data loading effect')
    
    const loadData = async () => {
      try {
        // Try to get data from localStorage first
        const storedData = localStorage.getItem('questionnaire-data')
        console.log('RecommendationsPage: localStorage questionnaire-data:', storedData ? 'exists' : 'missing')
        
        let questionnaireData = null
        
        if (storedData) {
          console.log('RecommendationsPage: Raw localStorage data:', storedData.substring(0, 100) + '...')
          const parsed = JSON.parse(storedData)
          console.log('RecommendationsPage: Parsed questionnaire-data keys:', Object.keys(parsed))
          
          // IMPORTANT FIX: Handle different data formats
          if (parsed.response) {
            // Standard format with response property
            questionnaireData = parsed.response
            console.log('RecommendationsPage: Using data from parsed.response')
          } else if (typeof parsed === 'object' && parsed.age !== undefined) {
            // Data is directly stored without the response wrapper
            questionnaireData = parsed
            console.log('RecommendationsPage: Using direct parsed data (no response property)')
            
            // Update the storage to have the correct format for next time
            localStorage.setItem('questionnaire-data', JSON.stringify({ response: parsed }))
          }
        }

        // If no data in localStorage, try server-side storage
        if (!questionnaireData) {
          console.log('RecommendationsPage: Attempting to get data from server-side storage')
          questionnaireData = getQuestionnaireResponse()
          console.log('RecommendationsPage: Server-side storage result:', questionnaireData ? 'data found' : 'no data')
        }

        // IMPORTANT FIX: If we have selected plans but no questionnaire data,
        // create minimal questionnaire data to avoid redirecting
        if (!questionnaireData) {
          const selectedPlans = localStorage.getItem('selected-plans')
          if (selectedPlans) {
            console.log('RecommendationsPage: No questionnaire data, but selected plans exist')
            
            // Create minimal data based on URL parameters or defaults
            questionnaireData = {
              age: searchParams.get('age') || '30',
              coverageType: searchParams.get('coverageType') || 'just_me',
              familySize: searchParams.get('familySize') || '1',
              visitFrequency: searchParams.get('visitFrequency') || 'just_checkups',
              // Add other required fields with defaults
              iua: searchParams.get('iua') || '5000',
              state: 'TX',
              conditions: []
            }
            
            console.log('RecommendationsPage: Created minimal questionnaire data', questionnaireData)
            
            // Save this data for future navigation
            localStorage.setItem('questionnaire-data', JSON.stringify({ response: questionnaireData }))
          } else {
            console.log('RecommendationsPage: No questionnaire data found, redirecting to questionnaire')
            router.push('/questionnaire')
            return
          }
        }

        console.log('RecommendationsPage: Using questionnaire data:', questionnaireData)
        setQuestionnaire(questionnaireData)
        
        console.log('RecommendationsPage: Fetching recommendations data')
        const recommendationsData = await getRecommendations(providerPlans, questionnaireData)
        console.log('RecommendationsPage: Recommendations data received, count:', recommendationsData.length)
        setRecommendations(recommendationsData)
        
        // Store the top recommendation ID in localStorage
        if (recommendationsData && recommendationsData.length > 0) {
          console.log('RecommendationsPage: Storing top recommendation ID:', recommendationsData[0].plan.id)
          localStorage.setItem('top-recommendation-id', recommendationsData[0].plan.id)
        }
      } catch (error) {
        console.error('RecommendationsPage: Error loading recommendations:', error)
        setError('Failed to load recommendations')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [router, searchParams])

  if (isLoading) {
    console.log('RecommendationsPage: Rendering loading state')
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Loading your recommendations...
        </h2>
      </div>
    )
  }

  if (error) {
    console.log('RecommendationsPage: Rendering error state')
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
    console.log('RecommendationsPage: Rendering no data state')
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
    console.log('RecommendationsPage: Rendering empty recommendations state')
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

  console.log('RecommendationsPage: Rendering successful recommendations state')
  return (
    <SelectedPlansProvider>
      <RecommendationsLayout 
        recommendations={recommendations}
        questionnaire={questionnaire}
      />
    </SelectedPlansProvider>
  )
} 