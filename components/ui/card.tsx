export function Card({ 
  children, 
  className = '' 
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`bg-white rounded-lg shadow ${className}`}>
      {children}
    </div>
  )
} 