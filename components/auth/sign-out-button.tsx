'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function SignOutButton() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
    router.push('/auth/login')
  }

  return (
    <Button 
      variant="ghost" 
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  )
} 