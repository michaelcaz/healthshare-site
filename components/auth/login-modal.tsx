'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AuthForm } from '@/components/auth/auth-form'
import { X } from 'lucide-react'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  redirectTo?: string
  onContinueAsGuest?: () => void
}

export function LoginModal({ isOpen, onClose, redirectTo = '/questionnaire', onContinueAsGuest }: LoginModalProps) {
  const router = useRouter()
  const [showLogin, setShowLogin] = useState(true)

  const handleContinueAsGuest = () => {
    onClose()
    if (onContinueAsGuest) {
      onContinueAsGuest()
    } else {
      router.push(redirectTo)
    }
  }

  const handleCreateAccount = () => {
    router.push(`/auth/signup?redirectedFrom=${encodeURIComponent(redirectTo)}`)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>
              {showLogin ? 'Welcome Back' : 'Do you have an account?'}
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            {showLogin 
              ? 'Sign in to your account to continue' 
              : 'Sign in or create an account to save your progress and recommendations'}
          </DialogDescription>
        </DialogHeader>

        {showLogin ? (
          <div className="space-y-6">
            <AuthForm type="login" />
            
            <div className="flex flex-col space-y-4 mt-6">
              <div className="text-sm text-center">
                <span className="text-muted-foreground">Don't have an account? </span>
                <button 
                  onClick={handleCreateAccount}
                  className="text-primary hover:underline font-medium"
                >
                  Create one
                </button>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                onClick={handleContinueAsGuest}
              >
                Continue as Guest
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col space-y-4">
              <Button 
                onClick={() => setShowLogin(true)}
                className="w-full"
              >
                Sign In
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleCreateAccount}
              >
                Create Account
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                onClick={handleContinueAsGuest}
              >
                Continue as Guest
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
} 