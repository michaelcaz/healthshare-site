'use client'

interface ProgressIndicatorProps {
  currentPage: number
  totalPages: number
  steps: Array<{
    label: string
    description?: string
  }>
}

export function ProgressIndicator({ currentPage, totalPages, steps }: ProgressIndicatorProps) {
  const percentage = ((currentPage - 1) / (totalPages - 1)) * 100

  return (
    <div className="mb-8">
      {/* Progress percentage */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Step {currentPage} of {totalPages}
        </span>
        <span className="text-sm font-medium text-gray-700">
          {Math.round(percentage)}% Complete
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-indigo-600 transition-all duration-300 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Step labels */}
      <div className="mt-4 hidden sm:block">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-between">
            {steps.map((step, index) => (
              <li key={index} className={`flex items-center ${index === currentPage - 1 ? 'text-indigo-600' : 'text-gray-500'}`}>
                <span className="text-sm font-medium">
                  {step.label}
                  {step.description && (
                    <span className="hidden md:inline text-xs text-gray-400 ml-1">
                      {step.description}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  )
} 