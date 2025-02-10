interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  className?: string
}

export function Badge({ children, variant = 'primary', className = '' }: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
  const variantStyles = {
    primary: "bg-blue-100 text-blue-800",
    secondary: "bg-green-100 text-green-800",
    outline: "border border-gray-300 text-gray-700"
  }

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  )
} 