'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { type QuestionnaireResponse } from '@/types/questionnaire'
import { PlanRecommendations } from '@/components/questionnaire/plan-recommendations'

export default function ResultsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [response, setResponse] = useState<QuestionnaireResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLatestResponse = async () => {
      try {
        const supabase = createClientComponentClient()
        const { data, error } = await supabase
          .from('questionnaire_responses')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        if (error) throw error
        setResponse(data)
      } catch (err) {
        console.error('Error fetching response:', err)
        setError('Failed to load your responses')
      } finally {
        setIsLoading(false)
      }
    }

    fetchLatestResponse()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading your results...</div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !response) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">
            {error || 'No response found'}
            <button 
              onClick={() => router.push('/questionnaire')}
              className="mt-4 btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Your Results</h1>
          
          <PlanRecommendations response={response} />

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => router.push('/questionnaire')}
              className="btn-secondary mr-4"
            >
              Start Over
            </button>
            <button
              onClick={() => router.push('/plans')}
              className="btn-primary"
            >
              View Plans
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
