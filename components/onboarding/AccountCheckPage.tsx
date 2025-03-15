'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { OnboardingLayout } from './OnboardingLayout'
import { ArrowRight } from 'lucide-react'

export function AccountCheckPage() {
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState<'yes' | 'no' | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleNext = () => {
    if (!selectedOption) return
    
    setIsLoading(true)
    
    // Redirect based on selection
    if (selectedOption === 'yes') {
      router.push('/auth/enhanced-login?redirectedFrom=/questionnaire')
    } else {
      router.push('/auth/enhanced-signup?redirectedFrom=/questionnaire')
    }
  }

  return (
    <OnboardingLayout 
      title="Hey! I'm Michael."
      description="Do you already have a ShareWell account?"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          {/* YEP option */}
          <label 
            className={`block p-4 rounded-lg border transition-all cursor-pointer ${
              selectedOption === 'yes' 
                ? 'border-indigo-500 bg-indigo-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                name="account"
                value="yes"
                checked={selectedOption === 'yes'}
                onChange={() => setSelectedOption('yes')}
                className="h-5 w-5 text-indigo-500 border-gray-300 focus:ring-indigo-500"
              />
              <span className="font-medium text-gray-700">Yep</span>
            </div>
          </label>

          {/* NOPE option */}
          <label 
            className={`block p-4 rounded-lg border transition-all cursor-pointer ${
              selectedOption === 'no' 
                ? 'border-indigo-500 bg-indigo-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                name="account"
                value="no"
                checked={selectedOption === 'no'}
                onChange={() => setSelectedOption('no')}
                className="h-5 w-5 text-indigo-500 border-gray-300 focus:ring-indigo-500"
              />
              <span className="font-medium text-gray-700">Nope</span>
            </div>
          </label>
        </div>

        <Button
          onClick={handleNext}
          disabled={!selectedOption || isLoading}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg transition-all"
        >
          <span className="flex items-center justify-center">
            {isLoading ? 'Please wait...' : 'NEXT'}
            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
          </span>
        </Button>
      </div>
    </OnboardingLayout>
  )
} 