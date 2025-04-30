'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RatingStarsProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  reviewCount?: number
  className?: string
}

export function RatingStars({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = false,
  reviewCount,
  className
}: RatingStarsProps) {
  const starSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  }
  
  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }
  
  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex">
        {Array.from({ length: maxRating }).map((_, i) => (
          <Star 
            key={i}
            className={cn(
              starSizes[size],
              i < Math.floor(rating)
                ? "text-yellow-400 fill-yellow-400" // Full star
                : i < Math.floor(rating + 0.5)
                  ? "text-yellow-400 fill-yellow-400 opacity-50" // Half star
                  : "text-gray-300" // Empty star
            )}
          />
        ))}
      </div>
      
      {showValue && (
        <span className={cn("ml-1.5 font-medium", textSizes[size])}>
          {rating.toFixed(1)}
        </span>
      )}
      
      {showValue && reviewCount !== undefined && (
        <span className={cn("ml-1 text-gray-500", textSizes[size])}>
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  )
} 