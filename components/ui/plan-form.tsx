'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { type PricingPlan, type PlanMatrix, type AgeBracket, type HouseholdType } from '@/types/provider-plans'

interface PlanFormProps {
  onSuccess?: () => void
  onCancel?: () => void
  initialData?: PricingPlan
}

const AGE_BRACKETS: AgeBracket[] = ['18-29', '30-39', '40-49', '50-64']
const HOUSEHOLD_TYPES: HouseholdType[] = ['Member Only', 'Member & Spouse', 'Member & Child(ren)', 'Member & Family']
const IUA_OPTIONS = [1000, 2500, 5000]

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function PlanForm({ onSuccess, onCancel, initialData }: PlanFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<PricingPlan>(initialData || {
    id: '',
    providerName: '',
    planName: '',
    maxCoverage: '',
    annualUnsharedAmount: '',
    sourceUrl: '',
    ageRules: {
      type: 'standard'
    },
    planMatrix: AGE_BRACKETS.flatMap(ageBracket =>
      HOUSEHOLD_TYPES.map(householdType => ({
        ageBracket,
        householdType,
        costs: IUA_OPTIONS.map(initialUnsharedAmount => ({
          monthlyPremium: 0,
          initialUnsharedAmount
        }))
      }))
    )
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      if (initialData?.id) {
        // Update existing plan
        const { error } = await supabase
          .from('pricing_plans')
          .update(formData)
          .eq('id', initialData.id)

        if (error) throw error
      } else {
        // Create new plan
        const { error } = await supabase
          .from('pricing_plans')
          .insert([formData])

        if (error) throw error
      }

      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateMatrixCost = (
    ageBracket: AgeBracket,
    householdType: HouseholdType,
    initialUnsharedAmount: number,
    monthlyPremium: number
  ) => {
    const newMatrix = formData.planMatrix.map(entry => {
      if (entry.ageBracket === ageBracket && entry.householdType === householdType) {
        return {
          ...entry,
          costs: entry.costs.map(cost => {
            if (cost.initialUnsharedAmount === initialUnsharedAmount) {
              return { ...cost, monthlyPremium }
            }
            return cost
          })
        }
      }
      return entry
    })

    setFormData({ ...formData, planMatrix: newMatrix })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="providerName" className="block text-sm font-medium text-gray-700">
          Provider Name
        </label>
        <input
          type="text"
          name="providerName"
          id="providerName"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.providerName}
          onChange={(e) => setFormData({ ...formData, providerName: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="planName" className="block text-sm font-medium text-gray-700">
          Plan Name
        </label>
        <input
          type="text"
          name="planName"
          id="planName"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.planName}
          onChange={(e) => setFormData({ ...formData, planName: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="maxCoverage" className="block text-sm font-medium text-gray-700">
          Maximum Coverage
        </label>
        <input
          type="text"
          name="maxCoverage"
          id="maxCoverage"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.maxCoverage}
          onChange={(e) => setFormData({ ...formData, maxCoverage: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="annualUnsharedAmount" className="block text-sm font-medium text-gray-700">
          Annual Unshared Amount Description
        </label>
        <input
          type="text"
          name="annualUnsharedAmount"
          id="annualUnsharedAmount"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.annualUnsharedAmount}
          onChange={(e) => setFormData({ ...formData, annualUnsharedAmount: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="sourceUrl" className="block text-sm font-medium text-gray-700">
          Source URL
        </label>
        <input
          type="url"
          name="sourceUrl"
          id="sourceUrl"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.sourceUrl}
          onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
        />
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Plan Matrix</h3>
        <div className="space-y-6">
          {AGE_BRACKETS.map(ageBracket => (
            <div key={ageBracket}>
              <h4 className="text-md font-medium text-gray-700 mb-2">Age Bracket: {ageBracket}</h4>
              {HOUSEHOLD_TYPES.map(householdType => (
                <div key={`${ageBracket}-${householdType}`} className="mb-4">
                  <h5 className="text-sm font-medium text-gray-600 mb-2">{householdType}</h5>
                  <div className="grid grid-cols-3 gap-4">
                    {IUA_OPTIONS.map(iua => (
                      <div key={`${ageBracket}-${householdType}-${iua}`}>
                        <label className="block text-xs text-gray-500 mb-1">
                          Monthly Premium (${iua} IUA)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={
                            formData.planMatrix
                              .find(m => m.ageBracket === ageBracket && m.householdType === householdType)
                              ?.costs.find(c => c.initialUnsharedAmount === iua)
                              ?.monthlyPremium || 0
                          }
                          onChange={(e) => updateMatrixCost(
                            ageBracket,
                            householdType,
                            iua,
                            parseFloat(e.target.value)
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isSubmitting ? 'Saving...' : initialData ? 'Update Plan' : 'Create Plan'}
        </button>
      </div>
    </form>
  )
}
