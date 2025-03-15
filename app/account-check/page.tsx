'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { AuthForm } from '@/components/auth/auth-form'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function AccountCheckPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/questionnaire'
  
  // Debug state to show element dimensions
  const [debug, setDebug] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-md flex flex-col items-center justify-center px-4 mx-auto">
        {/* Debug controls */}
        {debug && (
          <div className="fixed top-4 right-4 bg-white p-2 rounded shadow-md z-50 text-xs">
            <p>Debug Mode: ON</p>
            <button 
              onClick={() => setDebug(false)}
              className="bg-red-500 text-white px-2 py-1 rounded mt-1"
            >
              Hide Debug
            </button>
          </div>
        )}
        
        {/* Profile Image with custom styling */}
        <div className="mb-6 relative flex justify-center w-full">
          {/* Container with glow effect */}
          <div 
            className="relative rounded-full overflow-hidden"
            style={{ 
              width: '105px', 
              height: '105px',
              boxShadow: '0 0 10px 3px rgba(99, 102, 241, 0.6)'
            }}
          >
            {/* Purple border/glow */}
            <div 
              style={{
                position: 'absolute',
                inset: '0',
                borderRadius: '9999px',
                border: '3px solid transparent',
                background: 'linear-gradient(to right, #3b82f6, #4f46e5) border-box',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                zIndex: 2
              }}
            ></div>
            
            {/* Image with zoom effect - moved down further */}
            <div className="absolute inset-0">
              <Image 
                src="/images/illustrations/headshot-for-sharewell-site.JPG"
                alt="Michael from ShareWell"
                fill
                sizes="105px"
                className="object-cover"
                style={{ 
                  transform: 'scale(2)', 
                  transformOrigin: 'center 20%',
                  objectPosition: 'center 20%'
                }}
                priority
              />
            </div>
          </div>
        </div>
        
        {/* Welcome Text - Centered with reduced spacing */}
        <div className="text-center mb-4 w-full">
          <h1 className="text-3xl font-bold text-gray-warm mb-2 font-display">
            Hey! I'm Michael.
          </h1>
          <div className="flex justify-center">
            <h2 className="text-2xl font-medium text-gray-warm/90 whitespace-nowrap">
              Do you already have a ShareWell account?
            </h2>
          </div>
        </div>
        
        {/* Auth Card */}
        <Card className="w-full shadow-xl border border-gray-100 bg-white/95 backdrop-blur-sm">
          <div className="flex flex-col space-y-1 text-center mb-3 pt-4 px-5">
            <p className="text-sm text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          <div className="space-y-3 px-5 pb-5">
            <AuthForm type="login" />
            
            <div className="text-xs text-center mt-3">
              <span className="text-muted-foreground">Don't have an account? </span>
              <button 
                onClick={() => router.push(`/auth/signup?redirectedFrom=${encodeURIComponent(redirectTo)}`)}
                className="text-primary hover:underline font-medium"
              >
                Create one
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 