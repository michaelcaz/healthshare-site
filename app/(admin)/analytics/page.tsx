'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { LoadingState } from '@/components/ui/loading-state'
import { QuestionnaireChart } from '@/components/ui/questionnaire-chart'
import { PlanRecommendationsChart } from '@/components/ui/plan-recommendations-chart'

interface AnalyticsData {
  totalVisitors: number
  questionnaireCompletions: number
  planRecommendations: number
  referralClicks: number
}

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<AnalyticsData>({
    totalVisitors: 0,
    questionnaireCompletions: 0,
    planRecommendations: 0,
    referralClicks: 0
  })
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function loadAnalytics() {
      try {
        // TODO: Replace with actual analytics queries
        const mockData = {
          totalVisitors: 1234,
          questionnaireCompletions: 567,
          planRecommendations: 456,
          referralClicks: 123
        }
        setData(mockData)
      } catch (error) {
        console.error('Error loading analytics:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadAnalytics()
  }, [])

  if (isLoading) {
    return <LoadingState message="Loading analytics..." />
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
          <p className="mt-2 text-sm text-gray-700">
            Track questionnaire completions, plan recommendations, and referrals.
          </p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 bg-purple-100 rounded-md flex items-center justify-center">
                  👥
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Visitors
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {data.totalVisitors.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center">
                  📝
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Questionnaire Completions
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {data.questionnaireCompletions.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 bg-green-100 rounded-md flex items-center justify-center">
                  ✨
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Plan Recommendations
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {data.planRecommendations.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 bg-yellow-100 rounded-md flex items-center justify-center">
                  🔗
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Referral Clicks
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {data.referralClicks.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900">Daily Questionnaire Completions</h3>
            <div className="mt-4 h-96">
              <QuestionnaireChart />
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900">Top Recommended Plans</h3>
            <div className="mt-4 h-96">
              <PlanRecommendationsChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
