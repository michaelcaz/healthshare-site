'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { type QuestionnaireResponse } from '@/types/questionnaire'
import { PlanRecommendations } from '@/components/questionnaire/plan-recommendations'
import { PlansLoader } from '../../components/questionnaire'
import { createBrowserClient } from '@supabase/ssr'

export default function ResultsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [response, setResponse] = useState<QuestionnaireResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string[]>([])
  // Total number of plans available - this could be fetched from an API or config
  const TOTAL_AVAILABLE_PLANS = 22

  // Add debug log function
  const addDebugLog = (message: string) => {
    console.log(message)
    setDebugInfo(prev => [...prev, message])
  }

  useEffect(() => {
    const fetchLatestResponse = async () => {
      try {
        addDebugLog('Starting to fetch questionnaire response data')
        
        // First try to fetch from cookies as a fallback
        let cookieData = null
        try {
          addDebugLog('Attempting to read from cookies first')
          const cookieString = document.cookie
            .split('; ')
            .find(row => row.startsWith('questionnaire-data='))
            
          if (cookieString) {
            addDebugLog('Found questionnaire data in cookies')
            const cookieValue = cookieString.split('=')[1]
            if (cookieValue) {
              try {
                cookieData = JSON.parse(decodeURIComponent(cookieValue))
                addDebugLog('Successfully parsed cookie data')
              } catch (parseError) {
                addDebugLog(`Error parsing cookie data: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`)
              }
            }
          } else {
            addDebugLog('No questionnaire data found in cookies')
          }
        } catch (cookieError) {
          addDebugLog(`Error reading from cookies: ${cookieError instanceof Error ? cookieError.message : 'Unknown error'}`)
        }
        
        // Then try Supabase
        try {
          addDebugLog('Initializing Supabase client')
          
          // Get environment variables
          const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
          const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
          
          addDebugLog(`Supabase URL available: ${!!supabaseUrl}`)
          addDebugLog(`Supabase ANON KEY available: ${!!supabaseAnonKey}`)
          
          if (!supabaseUrl || !supabaseAnonKey) {
            throw new Error('Missing Supabase environment variables')
          }
          
          // Create a direct client instance for this component
          const supabase = createBrowserClient(
            supabaseUrl,
            supabaseAnonKey
          )
          
          addDebugLog('Fetching from Supabase table: questionnaire_responses')
          const { data, error } = await supabase
            .from('questionnaire_responses')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(1)
            .single()

          if (error) {
            addDebugLog(`Supabase query error: ${error.message}`)
            throw error
          }
          
          addDebugLog('Successfully retrieved data from Supabase')
          setResponse(data)
        } catch (supabaseError) {
          addDebugLog(`Supabase error: ${supabaseError instanceof Error ? supabaseError.message : 'Unknown error'}`)
          
          // If we have cookie data, use it as a fallback
          if (cookieData) {
            addDebugLog('Using cookie data as fallback')
            setResponse(cookieData)
          } else {
            throw supabaseError
          }
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        addDebugLog(`Error in fetchLatestResponse: ${errorMessage}`)
        console.error('Error fetching response:', err)
        setError(`Failed to load your responses: ${errorMessage}`)
      } finally {
        // We'll keep isLoading true for a moment to show the loader
        // The FindingPlansLoader will call setIsLoading(false) when it's done
        setTimeout(() => {
          setIsLoading(false)
        }, 3500) // Slightly longer than the loader animation
      }
    }

    fetchLatestResponse()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <PlansLoader 
            totalPlans={TOTAL_AVAILABLE_PLANS} 
            onComplete={() => setIsLoading(false)}
          />
        </div>
      </div>
    )
  }

  if (error || !response) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-600 mb-4">
              {error || 'No response found'}
            </div>
            <div className="mt-4">
              <p className="text-gray-600 mb-4">
                We're having trouble connecting to our database. Your responses have been saved locally.
              </p>
              <button 
                onClick={() => router.push('/questionnaire')}
                className="btn-primary"
              >
                Try Again
              </button>
              <button 
                onClick={() => router.push('/plans')}
                className="btn-primary ml-4"
              >
                View Plans
              </button>
            </div>
            
            {/* Debug information - only shown in development */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-8 text-left p-4 bg-gray-100 rounded-lg">
                <h3 className="font-bold mb-2">Debug Information:</h3>
                <pre className="text-xs overflow-auto max-h-60">
                  {debugInfo.map((log, i) => (
                    <div key={i}>{log}</div>
                  ))}
                </pre>
              </div>
            )}
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
