'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useToast } from '@/components/ui/toast'

function clearAllStorage() {
  if (typeof window === 'undefined') return

  // Clear localStorage
  try {
    window.localStorage.clear()
    console.log('✓ LocalStorage cleared')
  } catch (error) {
    console.warn('Error clearing localStorage:', error)
  }

  // Clear sessionStorage
  try {
    window.sessionStorage.clear()
    console.log('✓ SessionStorage cleared')
  } catch (error) {
    console.warn('Error clearing sessionStorage:', error)
  }

  // Clear cookies
  try {
    document.cookie.split(';').forEach(cookie => {
      const [name] = cookie.split('=')
      document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
    })
    console.log('✓ Cookies cleared')
  } catch (error) {
    console.warn('Error clearing cookies:', error)
  }
}

export default function DebugClearPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isClearing, setIsClearing] = useState(false)

  const clearAll = async () => {
    try {
      setIsClearing(true)
      
      // Clear client-side storage
      clearAllStorage()
      
      // Show success message
      toast({
        title: 'Success',
        description: 'All data cleared successfully',
        variant: 'default'
      })
      
      // Wait for 1 second to show the success message
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Refresh and redirect
      router.refresh()
      router.push('/')
    } catch (error) {
      console.error('Error clearing data:', error)
      toast({
        title: 'Error',
        description: 'Failed to clear data',
        variant: 'destructive'
      })
      setIsClearing(false)
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
          <Button
            onClick={clearAll}
            disabled={isClearing}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {isClearing ? 'Clearing...' : 'Clear All Data & Reload'}
          </Button>
        </div>
      </div>
    </div>
  )
} 