'use client'

import { Star, StarHalf } from 'lucide-react'
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
        {Array.from({ length: maxRating }).map((_, i) => {
          if (i < Math.floor(rating)) {
            // Full star
            return (
              <Star
                key={i}
                className={cn(starSizes[size], "text-yellow-400 fill-yellow-400")}
              />
            );
          } else if (i === Math.floor(rating) && rating % 1 >= 0.5) {
            // Half star
            return (
              <StarHalf
                key={i}
                className={cn(starSizes[size], "text-yellow-400 fill-yellow-400")}
              />
            );
          } else {
            // Empty star
            return (
              <Star
                key={i}
                className={cn(starSizes[size], "text-gray-300")}
              />
            );
          }
        })}
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