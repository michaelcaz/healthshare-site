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
  email: z.string().email("Please enter a valid email address")
});

type FormValues = z.infer<typeof formSchema>;

// Type for the API request that includes the marketing consent field
type EmailCaptureApiRequest = {
  firstName: string;
  email: string;
  marketingConsent: boolean;
  questionnaireData: any;
};

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
      email: ''
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
      
      // Create the API request with the required fields
      const apiRequest: EmailCaptureApiRequest = {
        firstName: data.firstName,
        email: data.email,
        marketingConsent: false, // Default value since we removed the checkbox
        questionnaireData: questionnaireResponse
      };
      
      // Submit to server
      const response = await fetch('/api/email-capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiRequest),
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
      <div className="space-y-6 transition-all duration-300 max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-lg font-medium text-gray-800 mb-2">
            What's your first name?
          </label>
          <input
            id="firstName"
            type="text"
            {...register('firstName')}
            placeholder=""
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-colors"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.firstName.message}
            </p>
          )}
        </div>
        
        <div className="mb-6">
          <label htmlFor="email" className="block text-lg font-medium text-gray-800 mb-2">
            What's your email address?
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            placeholder=""
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-colors"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
        
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="btn-primary px-10 py-3 rounded-md shadow-sm hover:shadow-md transition-all"
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
    
    // Ensure we scroll to the top for the loading experience
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
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
      <div className="questionnaire-card max-w-xl mx-auto">
        <h1 className="questionnaire-step-title text-center mb-2">Get Your Personalized Results</h1>
        <p className="questionnaire-step-description text-center text-gray-600 mb-8">
          Enter your information to view your personalized healthshare recommendations.
        </p>
        
        <EmailForm />
        
        <div className="mt-10">
          <TrustBadges />
          <div className="text-xs text-center text-gray-500 mt-4">
            Your privacy is important to us. See our <a href="/privacy" className="underline hover:text-gray-700 transition-colors">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
} 