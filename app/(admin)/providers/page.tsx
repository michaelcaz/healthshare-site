'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { StatusBadge } from '@/components/ui/status-badge'
import { LoadingState } from '@/components/ui/loading-state'
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog'
import { ProviderForm } from '@/components/ui/provider-form'

export default function ProvidersPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [providers, setProviders] = useState<any[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<any>(null)
  const supabase = createClientComponentClient()

  // Load providers
  const loadProviders = async () => {
    setIsLoading(true)
    const { data } = await supabase.from('providers').select('*')
    setProviders(data || [])
    setIsLoading(false)
  }

  // Delete provider
  const handleDelete = async () => {
    if (!selectedProvider) return

    await supabase
      .from('providers')
      .delete()
      .eq('id', selectedProvider.id)

    setShowDeleteDialog(false)
    setSelectedProvider(null)
    loadProviders()
  }

  if (isLoading) {
    return <LoadingState message="Loading providers..." />
  }

  if (showAddForm) {
    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Add Provider</h1>
        <ProviderForm
          onSuccess={() => {
            setShowAddForm(false)
            loadProviders()
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
          <h1 className="text-2xl font-semibold text-gray-900">Providers</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all healthshare providers in the system.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add provider
          </button>
        </div>
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
                      Website
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
                  {providers.map((provider) => (
                    <tr key={provider.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {provider.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <a href={provider.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">
                          {provider.website}
                        </a>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <StatusBadge status={provider.is_active ? 'active' : 'inactive'} />
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => {
                            setSelectedProvider(provider)
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
          setSelectedProvider(null)
        }}
        onConfirm={handleDelete}
        title="Delete Provider"
        message={`Are you sure you want to delete ${selectedProvider?.name}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  )
}
