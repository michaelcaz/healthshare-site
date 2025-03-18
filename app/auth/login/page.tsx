'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { EyeIcon, EyeOffIcon, PhoneIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { createBrowserClient } from '@supabase/ssr'
import { useToast } from '@/components/ui/toast'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/questionnaire'
  const { toast } = useToast()
  
  // Form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      // If session exists, redirect to questionnaire
      if (session) {
        router.replace('/questionnaire')
      }
    }
    
    checkUser()
  }, [router, supabase.auth])

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      return
    }
    
    setIsLoading(true)
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        throw error
      }
      
      toast({
        title: 'Login Successful',
        description: 'You have been successfully logged in.',
        variant: 'default'
      })
      
      // Redirect after successful login
      setTimeout(() => {
        router.refresh()
        router.push(redirectTo)
      }, 1000)
    } catch (error: any) {
      toast({
        title: 'Login Failed',
        description: error.message || 'An error occurred during login.',
        variant: 'destructive'
      })
      setIsLoading(false)
    }
  }

  // Handle "Create account" click
  const handleCreateAccount = () => {
    router.push(`/account-check?redirectTo=${encodeURIComponent(redirectTo)}`)
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center py-12 px-5">
        <div className="w-full max-w-md">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            {/* Card Header */}
            <div className="p-6 pb-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h1>
              <p className="text-gray-600 text-sm">
                Enter your email to sign in to your account
              </p>
            </div>
            
            {/* Card Body - Form */}
            <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-5">
              {/* Email field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@example.com"
                  required
                  className="w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary"
                />
              </div>
              
              {/* Password field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                
                <div className="flex justify-end">
                  <Link 
                    href="/auth/reset-password" 
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              
              {/* Submit button */}
              <Button
                type="submit"
                disabled={isLoading || !email || !password}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-md"
              >
                {isLoading ? "Please wait..." : "Sign in"}
              </Button>
              
              {/* Sign up link */}
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button 
                    onClick={handleCreateAccount}
                    className="text-primary hover:underline font-medium"
                  >
                    Create one
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Custom floating CTA for this page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <Link
            href="https://calendly.com/michaelcaz/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-primary shadow-lg rounded-full py-3 px-5 text-white hover:bg-primary/90 transition-all duration-300"
          >
            <PhoneIcon className="h-5 w-5" />
            <span>Holler at us</span>
          </Link>
        </motion.div>
      </div>
    </>
  )
} 