'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EnhancedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  showArrow?: boolean
  fullWidth?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}

export function EnhancedButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  showArrow = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  ...props
}: EnhancedButtonProps) {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  // Size variants
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-[#6366F1] hover:bg-[#4F46E5] text-white shadow-sm focus:ring-primary',
    secondary: 'bg-white hover:bg-gray-50 text-gray-warm border border-gray-200 shadow-sm focus:ring-gray-300',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700 focus:ring-gray-300',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-300',
  }
  
  // Width styles
  const widthStyles = fullWidth ? 'w-full' : '';
  
  return (
    <motion.button
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        widthStyles,
        isLoading ? 'opacity-70 cursor-not-allowed' : '',
        className
      )}
      whileHover={{ scale: isLoading ? 1 : 1.02 }}
      whileTap={{ scale: isLoading ? 1 : 0.98 }}
      disabled={isLoading || props.disabled}
      onClick={props.onClick}
      type={props.type || 'button'}
      form={props.form}
      name={props.name}
      value={props.value}
      id={props.id}
      aria-label={props['aria-label']}
    >
      {isLoading && (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      )}
      
      {icon && iconPosition === 'left' && !isLoading && (
        <span className="mr-2">{icon}</span>
      )}
      
      <span>{children}</span>
      
      {showArrow && !isLoading && (
        <ChevronRight className="ml-2 w-4 h-4" />
      )}
      
      {icon && iconPosition === 'right' && !isLoading && (
        <span className="ml-2">{icon}</span>
      )}
    </motion.button>
  )
} 