'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { TermsModal } from '@/components/ui/terms-modal'
import { EyeIcon, EyeOffIcon, PhoneIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { createBrowserClient } from '@supabase/ssr'
import { sendWelcomeEmailAction } from '@/app/actions/welcome-email'
import { useToast } from '@/components/ui/toast'

export default function AccountCheckPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/questionnaire'
  const { toast } = useToast()
  
  // Form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordMeetsRequirements, setPasswordMeetsRequirements] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Terms modal state
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
  
  // Initialize Supabase client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  
  // Force the floating CTA to be visible on this page
  useEffect(() => {
    // This is a custom floating CTA just for this page
    // The global one requires scrolling which might not happen on this page
  }, [])

  // Password validation
  const checkPasswordRequirements = (value: string) => {
    const meetsCriteria = value.length >= 8
    setPasswordMeetsRequirements(meetsCriteria)
    return meetsCriteria
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password || !firstName || !acceptedTerms) {
      return
    }
    
    if (!checkPasswordRequirements(password)) {
      return
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      console.log('Attempting signup with:', { 
        email, 
        firstName,
        passwordLength: password.length,
      });
      
      // DEVELOPMENT MODE ONLY: Skip Supabase authentication for local development
      // REMOVE THIS CONDITION BEFORE PRODUCTION
      if (process.env.NODE_ENV === 'development' && window.location.hostname === 'localhost') {
        console.log('DEV MODE: Bypassing Supabase auth for local development');
        
        // Store user info in localStorage (DEVELOPMENT ONLY)
        const mockUser = {
          id: `dev-${Date.now()}`,
          email,
          app_metadata: {},
          user_metadata: {
            first_name: firstName
          },
          aud: "authenticated",
          created_at: new Date().toISOString()
        } as any; // Use type assertion for development mode
        
        localStorage.setItem('dev_current_user', JSON.stringify(mockUser));
        
        // Try to send welcome email if configured
        try {
          console.log('Sending welcome email for:', email);
          // Don't wait for this to complete
          sendWelcomeEmailAction(mockUser, firstName)
            .then(result => {
              console.log('Welcome email result:', result);
            })
            .catch(emailError => {
              console.error('Failed to send welcome email:', emailError);
            });
        } catch (emailError) {
          console.error('Welcome email error:', emailError);
          // Don't block signup process if email fails
        }
        
        // Show success toast
        toast({
          title: 'Sign Up Successful! (Development Mode)',
          description: 'Your account has been created locally for development.',
          variant: 'default'
        });
        
        // Redirect to questionnaire
        router.push(redirectTo);
        return;
      }
      
      // PRODUCTION CODE - Only runs when not in development mode
      // First, try signing up with minimal metadata
      console.log('Testing signup with minimal metadata');
      let signupResult = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });
      
      if (signupResult.error) {
        console.error('Supabase signup error details:', {
          message: signupResult.error.message,
          status: signupResult.error.status,
          name: signupResult.error.name,
        });
        
        // If minimal signup fails, let's try one more approach
        if (signupResult.error.status === 500) {
          console.log('First signup attempt failed with 500 error, trying alternative approach');
          
          // Try an alternative signup method without any custom options
          const altSignupResult = await supabase.auth.signUp({
            email,
            password,
          });
          
          if (altSignupResult.error) {
            console.error('Alternative signup also failed:', {
              message: altSignupResult.error.message,
              status: altSignupResult.error.status,
              name: altSignupResult.error.name,
            });
            throw altSignupResult.error;
          }
          
          // Use the alternative result if it succeeded
          signupResult = altSignupResult;
          
          // If alternative signup worked, update user metadata separately
          if (signupResult.data.user) {
            console.log('Alternative signup succeeded, updating user metadata');
            
            const { error: updateError } = await supabase.auth.updateUser({
              data: { first_name: firstName }
            });
            
            if (updateError) {
              console.error('Failed to update user metadata:', updateError);
              // Continue anyway since the user was created
            } else {
              console.log('Successfully updated user metadata');
            }
          }
        } else {
          throw signupResult.error;
        }
      } else {
        console.log('Signup successful with minimal metadata');
        
        // If minimal signup worked and we need to update metadata
        if (signupResult.data.user && !signupResult.data.user.user_metadata?.first_name) {
          console.log('Updating user metadata with first name');
          const { error: updateError } = await supabase.auth.updateUser({
            data: { first_name: firstName }
          });
          
          if (updateError) {
            console.error('Failed to update user metadata:', updateError);
            // Continue anyway since the user was created
          } else {
            console.log('Successfully updated user metadata');
          }
        }
      }
      
      // Log successful response from Supabase
      console.log('Supabase signup response:', {
        userId: signupResult.data.user?.id,
        userMetadata: signupResult.data.user?.user_metadata,
        session: signupResult.data.session ? 'Session created' : 'No session',
      });
      
      // Try to send welcome email if user was created
      if (signupResult.data.user) {
        try {
          console.log('Sending welcome email for:', signupResult.data.user.email);
          // Don't wait for this to complete
          sendWelcomeEmailAction(signupResult.data.user, firstName)
            .then(result => {
              console.log('Welcome email result:', result);
            })
            .catch(emailError => {
              console.error('Failed to send welcome email:', emailError);
            });
        } catch (emailError) {
          console.error('Welcome email error:', emailError);
          // Don't block signup process if email fails
        }
      }
      
      // Show success toast
      toast({
        title: 'Sign Up Successful!',
        description: 'Your account has been created.',
        variant: 'default'
      })
      
      // Redirect to questionnaire
      router.push(redirectTo)
    } catch (error) {
      console.error('Authentication error:', error);
      
      // Enhanced error logging
      if (error instanceof Error) {
        console.error('Detailed error information:', {
          name: error.name,
          message: error.message,
          stack: error.stack,
        });
      }
      
      // Check if error is related to duplicate email
      const errorMessage = error instanceof Error ? error.message : 'Failed to create account';
      if (errorMessage.toLowerCase().includes('email') && 
          (errorMessage.toLowerCase().includes('exist') || 
           errorMessage.toLowerCase().includes('taken') || 
           errorMessage.toLowerCase().includes('already'))) {
        setError('This email is already registered. Please try logging in instead.');
      } else {
        setError(errorMessage);
      }
      
      setIsLoading(false)
    }
  }

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  // Handle terms modal
  const openTermsModal = () => setIsTermsModalOpen(true)
  const closeTermsModal = () => setIsTermsModalOpen(false)
  
  // Handle login click
  const handleLogin = () => {
    router.push(`/auth/login?redirectTo=${encodeURIComponent(redirectTo)}`)
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center py-12 px-5">
        <div className="w-full max-w-md">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            {/* Card Header */}
            <div className="p-6 pb-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Create your ShareWell account</h1>
              <p className="text-gray-600 text-sm">
                <span>Have an account? </span>
                <button 
                  onClick={handleLogin}
                  className="text-primary font-medium hover:underline focus:outline-none"
                >
                  Log in
                </button>
              </p>
            </div>
            
            {/* Card Body - Form */}
            <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-5">
              {/* First Name field */}
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder=""
                  required
                  className="w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary"
                />
              </div>
              
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
                  placeholder=""
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
                    onChange={(e) => {
                      setPassword(e.target.value)
                      checkPasswordRequirements(e.target.value)
                    }}
                    placeholder=""
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
                
                {/* Password requirements */}
                <div className="flex items-center text-sm mt-1">
                  <span className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                    passwordMeetsRequirements 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200'
                  }`}>
                    {passwordMeetsRequirements && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <span className={passwordMeetsRequirements ? 'text-green-600' : 'text-gray-500'}>
                    8 or more characters
                  </span>
                </div>
              </div>
              
              {/* Error message */}
              {error && (
                <div className="text-sm text-red-500">
                  {error}
                </div>
              )}
              
              {/* Submit button */}
              <Button
                type="submit"
                disabled={isLoading || !email || !password || !firstName || !acceptedTerms || !passwordMeetsRequirements}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-md"
              >
                {isLoading ? "Please wait..." : "Create Account"}
              </Button>
              
              {/* Terms and conditions text */}
              <div className="text-sm text-gray-600 pt-2">
                <p className="mt-1">
                  By creating an account, you agree to the{' '}
                  <button
                    type="button"
                    onClick={openTermsModal}
                    className="text-primary font-medium hover:underline focus:outline-none"
                  >
                    Terms of Use
                  </button>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-primary font-medium hover:underline">
                    Privacy Policy
                  </Link>
                  , and to receive from us emails with important enrollment information, updates and reminders.
                </p>
                
                {/* Terms checkbox (visually hidden but accessible) */}
                <div className="mt-4 flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I accept the terms and conditions
                  </label>
                </div>
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

      {/* Terms and Conditions Modal */}
      <TermsModal 
        isOpen={isTermsModalOpen} 
        onClose={closeTermsModal} 
      />
    </>
  )
} 