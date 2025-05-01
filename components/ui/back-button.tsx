'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

interface BackButtonProps {
  href: string
  label?: string
}

export function BackButton({ href, label = 'Back' }: BackButtonProps) {
  const router = useRouter()
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    console.log('%c BackButton: Navigation requested to: ' + href, 'background: #ff0; color: #000; font-size: 14px; font-weight: bold;')
    
    // IMPORTANT FIX: If we're navigating back to recommendations, ensure the data is properly stored
    if (href === '/recommendations') {
      try {
        // Check if we have the necessary data
        const selectedPlans = localStorage.getItem('selected-plans')
        const questionnaireData = localStorage.getItem('questionnaire-data')
        
        console.log('BackButton: Pre-navigation localStorage check:', {
          'selected-plans': selectedPlans ? 'exists' : 'missing',
          'questionnaire-data': questionnaireData ? 'exists' : 'missing'
        })
        
        // If questionnaire data exists but isn't in the expected format
        if (questionnaireData) {
          const parsedData = JSON.parse(questionnaireData)
          
          // If the data is missing the response property, fix it
          if (!parsedData.response && typeof parsedData === 'object') {
            // Restructure the data to match expected format
            const fixedData = { response: parsedData }
            localStorage.setItem('questionnaire-data', JSON.stringify(fixedData))
            console.log('BackButton: Fixed questionnaire data format')
          }
        }
      } catch (error) {
        console.error('BackButton: Error fixing localStorage data:', error)
      }
    }
    
    // Save document.referrer for analysis
    console.log('BackButton: Current URL:', window.location.href)
    console.log('BackButton: Document referrer:', document.referrer)
    
    // Use window.location for navigation to ensure a fresh page load
    window.location.href = href
    
    // Log after navigation (might not execute if page changes)
    console.log('BackButton: Navigation initiated')
  }
  
  return (
    <button 
      onClick={handleClick}
      className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
      data-testid="back-button"
    >
      <ChevronLeft className="h-4 w-4 mr-1" />
      <span>{label}</span>
    </button>
  )
} 