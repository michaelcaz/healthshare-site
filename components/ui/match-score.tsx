'use client'

import { CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MatchScoreProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

export function MatchScore({
  score,
  size = 'md',
  showLabel = true,
  className
}: MatchScoreProps) {
  // Determine color based on score
  const getColorClass = () => {
    if (score >= 90) return "text-green-600 bg-green-50 border-green-200"
    if (score >= 80) return "text-blue-600 bg-blue-50 border-blue-200"
    if (score >= 70) return "text-yellow-600 bg-yellow-50 border-yellow-200"
    return "text-gray-600 bg-gray-50 border-gray-200"
  }
  
  const circleSizes = {
    sm: 'w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] text-xs',
    md: 'w-12 h-12 min-w-[3rem] min-h-[3rem] text-base',
    lg: 'w-16 h-16 min-w-[4rem] min-h-[4rem] text-lg'
  }
  
  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  }
  
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full border font-bold aspect-square",
        circleSizes[size],
        getColorClass(),
        className
      )}
      style={{ lineHeight: 1.1 }}
    >
      <span className="block text-center w-full leading-tight">
        {score}%{showLabel ? <span className="block text-xs font-medium sm:text-sm"> Match</span> : null}
      </span>
    </div>
  )
} 