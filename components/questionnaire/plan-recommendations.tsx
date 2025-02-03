'use client'

import { type QuestionnaireResponse } from '@/types/questionnaire'

interface PlanRecommendationsProps {
  response: QuestionnaireResponse
}

export function PlanRecommendations({ response }: PlanRecommendationsProps) {
  const getRecommendationType = () => {
    if (response.pregnancy || response.pregnancy_planning === 'yes') {
      return 'Maternity Coverage'
    }
    if (response.medical_conditions) {
      return 'Comprehensive Coverage'
    }
    if (response.expense_preference === 'lower_monthly') {
      return 'High-Deductible Plan'
    }
    return 'Standard Coverage'
  }

  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-indigo-800">
          Recommended Plan Type: {getRecommendationType()}
        </h2>
        <p className="mt-2 text-sm text-indigo-700">
          Based on your responses, we recommend exploring these plan options.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Plan cards will go here */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium">Coming Soon</h3>
          <p className="text-sm text-gray-500">Plan details will be available shortly.</p>
        </div>
      </div>
    </div>
  )
}
