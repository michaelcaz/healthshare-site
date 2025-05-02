'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { TrustBadges } from '@/components/ui/TrustBadges';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { PlansLoader } from '@/app/components/questionnaire';

// Define form schema for validation
const formSchema = z.object({
  firstName: z.string().min(2, "Please enter your first name"),
  email: z.string().email("Please enter a valid email address"),
  marketingConsent: z.boolean().default(true)
});

type FormValues = z.infer<typeof formSchema>;

// Separate EmailForm component to avoid nested form issues
function EmailForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      email: '',
      marketingConsent: true
    }
  });
  
  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      
      // Get questionnaire data from localStorage
      const questionnaireData = localStorage.getItem('questionnaire-data');
      let questionnaireResponse = null;
      
      if (questionnaireData) {
        const parsed = JSON.parse(questionnaireData);
        if (parsed.response) {
          questionnaireResponse = parsed.response;
        }
      }
      
      // Submit to server
      const response = await fetch('/api/email-capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: data.firstName,
          email: data.email,
          marketingConsent: data.marketingConsent,
          questionnaireData: questionnaireResponse
        }),
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to submit information');
      }
      
      // Mark email capture as complete in localStorage even if it's a development environment
      localStorage.setItem('email-capture-complete', 'true');
      
      // Navigate to results page
      router.push('/recommendations');
    } catch (error) {
      console.error('Error submitting email:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "There was a problem submitting your information. Please try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-8 transition-all duration-300">
        <div className="mb-6">
          <label htmlFor="firstName" className="block text-lg font-medium text-gray-900 mb-2">
            What's your first name?
          </label>
          <input
            id="firstName"
            type="text"
            {...register('firstName')}
            placeholder="Enter your first name"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.firstName.message}
            </p>
          )}
        </div>
        
        <div className="mb-6">
          <label htmlFor="email" className="block text-lg font-medium text-gray-900 mb-2">
            What's your email address?
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            placeholder="Enter your email address"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
        
        <div className="flex items-start space-x-3 mb-6">
          <input
            id="marketingConsent"
            type="checkbox"
            {...register('marketingConsent')}
            className="h-5 w-5 mt-1 text-primary border-gray-300 rounded"
          />
          <label htmlFor="marketingConsent" className="text-sm text-gray-700">
            I'd like to receive helpful information about healthshare plans, tips to save on healthcare costs, and exclusive offers.
          </label>
        </div>
        
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="btn-primary px-8"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'View My Results'}
          </button>
        </div>
      </div>
    </form>
  );
}

export default function EmailCapturePage() {
  const [showLoading, setShowLoading] = useState(true);
  
  useEffect(() => {
    // Force the loading screen to show for exactly 3 seconds
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // If we're still in the loading state, show the loader
  if (showLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <PlansLoader 
            totalPlans={22}
            durationMs={3000}
          />
        </div>
      </div>
    );
  }
  
  // Otherwise show the email capture form
  return (
    <div className="questionnaire-container">
      <div className="questionnaire-card">
        <h1 className="questionnaire-step-title">Get Your Personalized Results</h1>
        <p className="questionnaire-step-description">
          Enter your information to view your personalized healthshare recommendations.
        </p>
        
        <EmailForm />
        
        <div className="mt-8">
          <TrustBadges />
          <div className="text-xs text-center text-gray-500 mt-4">
            Your privacy is important to us. See our <a href="/privacy" className="underline hover:text-gray-700">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
} 