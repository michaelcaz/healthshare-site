'use client'

import { useRouter } from 'next/navigation'

function clearAllStorage() {
  if (typeof window === 'undefined') return

  // Clear localStorage
  try {
    window.localStorage.clear()
  } catch (error) {
    console.warn('Error clearing localStorage:', error)
  }

  // Clear sessionStorage
  try {
    window.sessionStorage.clear()
  } catch (error) {
    console.warn('Error clearing sessionStorage:', error)
  }

  // Clear cookies
  try {
    document.cookie.split(';').forEach(cookie => {
      const [name] = cookie.split('=')
      document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
    })
  } catch (error) {
    console.warn('Error clearing cookies:', error)
  }
}

export default function DebugClearPage() {
  const router = useRouter()

  const clearAll = async () => {
    try {
      // First clear client-side storage
      clearAllStorage()

      // Then call the server endpoint to clear server-side storage
      const response = await fetch('/api/debug/clear-all', {
        method: 'POST',
      })
      
      if (!response.ok) {
        throw new Error('Failed to clear server-side data')
      }

      // Redirect to questionnaire page
      router.push('/questionnaire')
    } catch (error) {
      console.error('Error clearing data:', error)
      // Still redirect even if there's an error, as we've cleared client-side data
      router.push('/questionnaire')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Debug Tools
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Clear all stored data and cache
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <button
            onClick={clearAll}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Clear All Data & Reload
          </button>
        </div>
      </div>
    </div>
  )
} 