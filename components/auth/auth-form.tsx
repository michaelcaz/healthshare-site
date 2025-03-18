'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from 'next/link'
import { getQuestionnaireResponse } from '@/lib/utils/storage'
import { saveQuestionnaireResponse as saveToSupabase } from '@/lib/supabase/questionnaire'
import { useToast } from '@/components/ui/toast'
import { CheckCircle } from 'lucide-react'

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

interface AuthFormProps {
  type: 'login' | 'signup'
  termsAccepted?: boolean
}

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function AuthForm({ type, termsAccepted = false }: AuthFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!termsAccepted) {
      toast({
        title: "Terms and Conditions Required",
        description: "Please accept the terms and conditions to continue",
        variant: "destructive"
      })
      return
    }
    
    setError(null)
    setIsLoading(true)
    setIsSuccess(false)

    try {
      if (type === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        })
        if (error) throw error
        
        // Check if there's questionnaire data in localStorage
        const questionnaireData = getQuestionnaireResponse()
        
        if (questionnaireData) {
          try {
            // Save the questionnaire data to Supabase with the user's ID
            await saveToSupabase(questionnaireData)
            console.log('Questionnaire data saved to Supabase')
            toast({
              title: 'Questionnaire Data Saved',
              description: 'Your questionnaire data has been successfully saved to Supabase.',
              variant: 'default'
            })
          } catch (saveError) {
            console.error('Error saving questionnaire data:', saveError)
            // Continue even if there's an error saving
          }
        }
        
        // Show success toast first
        toast({
          title: 'Login Successful',
          description: 'You have been successfully logged in.',
          variant: 'default'
        })
        
        // Set success state
        setIsSuccess(true)
        
        // Instead of using router.push which triggers the loading state,
        // use window.location to navigate after showing success state
        setTimeout(() => {
          // Refresh the session first
          router.refresh()
          // Use window.location for a full page navigation without loading state
          window.location.href = '/questionnaire'
        }, 1500)
      } else {
        // For signup, we need to handle the flow differently
        const { data, error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: {
            emailRedirectTo: `${location.origin}/auth/callback`,
          },
        })
        if (error) throw error
        
        // Get the redirectedFrom parameter or default to '/'
        const redirectTo = searchParams.get('redirectedFrom') || '/'
        
        // Show success toast first
        toast({
          title: 'Signup Successful',
          description: 'You have been successfully signed up.',
          variant: 'default'
        })
        
        // Set success state for signup
        setIsSuccess(true)
        
        // For signup, we need to ensure the session is established
        // Sign in the user immediately after signup
        if (data.user) {
          // After signup, sign in the user with the same credentials
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password,
          })
          
          if (signInError) {
            console.error('Error signing in after signup:', signInError)
            // Continue with redirect even if there's an error
          }
        }
        
        // Use window.location for a full page navigation without loading state
        setTimeout(() => {
          router.refresh()
          window.location.href = redirectTo
        }, 1500)
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && (
          <div className="text-sm text-red-500">
            {error}
          </div>
        )}

        <Button
          type="submit"
          className={`w-full transition-all duration-500 ${
            isSuccess 
              ? 'bg-green-500 hover:bg-green-600 text-white scale-105' 
              : ''
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <span className="animate-spin">⌛</span>
              <span>Please wait...</span>
            </div>
          ) : isSuccess ? (
            <div className="flex items-center justify-center space-x-2 animate-pulse">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">{type === 'login' ? 'Login' : 'Signup'} Successful!</span>
            </div>
          ) : (
            <span>{type === 'login' ? 'Sign in' : 'Sign up'}</span>
          )}
        </Button>

        {type === 'login' && (
          <div className="text-sm text-center">
            <Link href="/auth/reset-password" className="text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
        )}
      </form>
    </div>
  )
} 