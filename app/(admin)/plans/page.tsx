'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { StatusBadge } from '@/components/ui/status-badge'
import { LoadingState } from '@/components/ui/loading-state'
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog'
import { PlanForm } from '@/components/ui/plan-form'
import { SearchInput } from '@/components/ui/search-input'

export default function PlansPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [plans, setPlans] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredPlans, setFilteredPlans] = useState<any[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const supabase = createClientComponentClient()

  // Load plans
  const loadPlans = async () => {
    setIsLoading(true)
    const { data } = await supabase
      .from('plans')
      .select(`
        *,
        providers (
          name
        )
      `)
    setPlans(data || [])
    setFilteredPlans(data || [])
    setIsLoading(false)
  }

  // Add search handler
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const filtered = plans.filter(plan => 
      plan.name.toLowerCase().includes(query.toLowerCase()) ||
      plan.providers?.name.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredPlans(filtered)
  }

  // Delete plan
  const handleDelete = async () => {
    if (!selectedPlan) return

    await supabase
      .from('plans')
      .delete()
      .eq('id', selectedPlan.id)

    setShowDeleteDialog(false)
    setSelectedPlan(null)
    loadPlans()
  }

  if (isLoading) {
    return <LoadingState message="Loading plans..." />
  }

  if (showAddForm) {
    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Add Plan</h1>
        <PlanForm
          onSuccess={() => {
            setShowAddForm(false)
            loadPlans()
          }}
          onCancel={() => setShowAddForm(false)}
        />
      </div>
    )
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Plans</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage available health share plans.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Plan
          </button>
        </div>
      </div>

      {/* Add search input */}
      <div className="mt-4 mb-4">
        <SearchInput 
          onSearch={handleSearch}
          placeholder="Search plans..."
          className="max-w-xs"
        />
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Provider
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Monthly Cost
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {(searchQuery ? filteredPlans : plans).map((plan) => (
                    <tr key={plan.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {plan.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {plan.providers?.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        ${plan.monthly_cost.toFixed(2)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <StatusBadge status={plan.is_active ? 'active' : 'inactive'} />
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => {
                            setSelectedPlan(plan)
                            setShowDeleteDialog(true)
                          }}
                          className="text-red-600 hover:text-red-900 ml-4"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationDialog
        open={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false)
          setSelectedPlan(null)
        }}
        onConfirm={handleDelete}
        title="Delete Plan"
        message={`Are you sure you want to delete ${selectedPlan?.name}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  )
}
