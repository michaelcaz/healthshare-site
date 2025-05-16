'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { useToast } from '@/components/ui/toast'

interface SignOutButtonProps {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive'
  size?: 'default' | 'sm' | 'lg'
  className?: string
}

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function SignOutButton({ 
  variant = 'ghost', 
  size = 'default',
  className = ''
}: SignOutButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSignOut = async () => {
    try {
      setIsLoading(true)
      await supabase.auth.signOut()
      
      toast({
        title: 'Logged out successfully',
        description: 'You have been logged out of your account.',
        variant: 'default'
      })
      
      router.refresh()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
      toast({
        title: 'Error logging out',
        description: 'There was a problem logging you out. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      onClick={handleSignOut} 
      variant={variant} 
      size={size}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? (
        <span>Logging out...</span>
      ) : (
        <>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </>
      )}
    </Button>
  )
} 