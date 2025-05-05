'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'success' | 'danger' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
  onClick
}: BadgeProps) {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-colors'

  // Size variants
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base'
  }

  // Variant styles
  const variantStyles = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-primary text-white',
    secondary: 'bg-gray-200 text-gray-800',
    outline: 'border border-gray-300 text-gray-700 bg-transparent',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800'
  }

  return (
    <span
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        onClick ? 'cursor-pointer hover:opacity-90' : '',
        className
      )}
      onClick={onClick}
    >
      {children}
    </span>
  )
} 