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
  
  const sizesClass = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-base px-3 py-1.5'
  }
  
  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  }
  
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border font-medium",
        sizesClass[size],
        getColorClass(),
        className
      )}
    >
      <CheckCircle className={cn("flex-shrink-0", iconSizes[size])} />
      <span>{score}%{showLabel ? " Match" : ""}</span>
    </div>
  )
} 