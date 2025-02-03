import { LoadingSpinner } from './loading-spinner'

interface LoadingStateProps {
  message?: string
  className?: string
}

export function LoadingState({ message = 'Loading...', className = '' }: LoadingStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <LoadingSpinner size="large" className="mb-4" />
      <p className="text-gray-500">{message}</p>
    </div>
  )
}
