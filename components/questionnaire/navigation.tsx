import { cn } from '@/lib/utils'

interface NavigationProps {
  currentStep: number
  totalSteps: number
  onNext: () => void
  onBack: () => void
  isValid?: boolean
}

export function QuestionnaireNavigation({ 
  currentStep = 1, 
  totalSteps = 4,  // Changed from 5
  onNext,
  onBack,
  isValid = true
}: NavigationProps) {
  return (
    <div className="flex justify-between mt-8">
      {currentStep > 1 && (
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800"
        >
          Back
        </button>
      )}
      <button
        onClick={onNext}
        disabled={!isValid}
        className={cn(
          "px-6 py-2 rounded-lg",
          "bg-blue-600 text-white",
          "hover:bg-blue-700",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {currentStep === 4 ? 'Get Recommendations' : 'Next'}  // Changed from 5
      </button>
    </div>
  )
} 