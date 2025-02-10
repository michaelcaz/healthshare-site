'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TrustScoreBadgeProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function TrustScoreBadge({ score, size = 'md', className }: TrustScoreBadgeProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-50 text-green-700 border-green-200'
    if (score >= 80) return 'bg-blue-50 text-blue-700 border-blue-200'
    if (score >= 70) return 'bg-yellow-50 text-yellow-700 border-yellow-200'
    return 'bg-gray-50 text-gray-700 border-gray-200'
  }

  const getScoreText = (score: number) => {
    if (score >= 90) return 'Excellent'
    if (score >= 80) return 'Great'
    if (score >= 70) return 'Good'
    return 'Fair'
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-1 gap-1',
    md: 'text-sm px-3 py-1.5 gap-1.5',
    lg: 'text-base px-4 py-2 gap-2'
  }

  const starSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  }

  return (
    <div className={cn(
      'flex items-center rounded-full border',
      getScoreColor(score),
      sizeClasses[size],
      className
    )}>
      <Star 
        className={cn(starSizes[size], 'fill-current')} 
      />
      <span className="font-medium">{getScoreText(score)}</span>
      <span className="opacity-75">
        {score}/100
      </span>
    </div>
  )
} 