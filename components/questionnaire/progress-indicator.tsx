'use client'

interface ProgressIndicatorProps {
  currentPage: number
  totalPages: number
  steps: Array<{
    label: string
    description?: string
  }>
}

export function ProgressIndicator({ currentPage, totalPages = 3, steps }: ProgressIndicatorProps) {
  const percentage = ((currentPage - 1) / (totalPages - 1)) * 100

  console.log("ProgressIndicator rendering with currentPage:", currentPage);

  return (
    <div className="mb-8 fade-in">
      {/* Step navigation - Updated with connected steps and active indicators */}
      <div className="step-navigation">
        {steps.map((step, index) => (
          <div key={index} className="step-item">
            <div 
              className={`step-indicator ${
                index < currentPage - 1 ? 'completed' : 
                index === currentPage - 1 ? 'active' : ''
              }`}
            >
              {index < currentPage - 1 ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span 
              className={`step-label ${
                index === currentPage - 1 ? 'active' : ''
              }`}
            >
              {step.label}
              {step.description && (
                <span className="hidden md:inline text-xs text-gray-400 ml-1">
                  {step.description}
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
} 