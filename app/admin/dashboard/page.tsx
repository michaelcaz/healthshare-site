'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalProviders: 0,
    activePlans: 0,
    questionnaireResponses: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      try {
        const [
          { count: providersCount },
          { count: plansCount },
          { count: responsesCount }
        ] = await Promise.all([
          supabase.from('providers').select('*', { count: 'exact', head: true }),
          supabase.from('pricing_plans').select('*', { count: 'exact', head: true }),
          supabase.from('questionnaire_responses').select('*', { count: 'exact', head: true })
        ])

        setStats({
          totalProviders: providersCount || 0,
          activePlans: plansCount || 0,
          questionnaireResponses: responsesCount || 0
        })
      } catch (error) {
        console.error('Error loading admin stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadStats()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Stats cards */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 bg-indigo-100 rounded-md flex items-center justify-center">
                  📋
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Providers
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.totalProviders}
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
                  💰
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Plans
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.activePlans}
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
                  📊
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Questionnaire Responses
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.questionnaireResponses}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 