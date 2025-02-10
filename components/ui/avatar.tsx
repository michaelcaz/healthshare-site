'use client'

interface AvatarProps {
  src?: string
  alt?: string
  fallback: string
  className?: string
}

export function Avatar({ src, alt, fallback, className = '' }: AvatarProps) {
  return (
    <div className={`relative h-10 w-10 rounded-full ${className}`}>
      {src ? (
        <img 
          src={src} 
          alt={alt || fallback} 
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200">
          <span className="text-sm font-medium">{fallback}</span>
        </div>
      )}
    </div>
  )
}

export const AvatarImage = Avatar
export const AvatarFallback = ({ children }: { children: React.ReactNode }) => <>{children}</> 