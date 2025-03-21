'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ProgressIndicator } from '@/components/questionnaire/progress-indicator';
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { QuestionnaireData } from '@/lib/types';
import { PlansLoader } from '../../components/questionnaire';

const savingsSchema = z.object({
  currentPremium: z.string().optional()
});

type SavingsData = z.infer<typeof savingsSchema>;

const steps = [
  { label: 'Basic Info', route: '/questionnaire' },
  { label: 'Savings', route: '/questionnaire/savings' },
  { label: 'Health Status', route: '/questionnaire/health' },
  { label: 'Coverage Needs', route: '/questionnaire/coverage' }
];

// This would come from your actual data - example baseline prices
const getBaselinePricing = (coverageType: string, oldestAge: number) => {
  // Simple example logic - replace with actual pricing data
  let basePrice = 199; // Base price for single person
  
  if (coverageType === 'me_spouse') basePrice = 299;
  if (coverageType === 'me_kids') basePrice = 349;
  if (coverageType === 'family') basePrice = 449;
  
  // Age adjustment
  if (oldestAge > 50) basePrice += 100;
  if (oldestAge > 60) basePrice += 150;
  
  return basePrice;
};

export default function SavingsPage() {
  const router = useRouter();
  const [showSavings, setShowSavings] = useState(false);
  const [potentialSavings, setPotentialSavings] = useState<number | null>(null);
  const [basicInfo, setBasicInfo] = useState<{ coverageType: string; oldestAge: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Total number of plans available - this should match the value in results/page.tsx
  const TOTAL_AVAILABLE_PLANS = 22;
  
  const form = useForm<SavingsData>({
    resolver: zodResolver(savingsSchema),
    defaultValues: {
      currentPremium: ''
    }
  });

  useEffect(() => {
    // Load existing data from localStorage
    const existingData = localStorage.getItem('questionnaire-data');
    if (existingData) {
      try {
        const data = JSON.parse(existingData);
        if (data.basicInfo) {
          setBasicInfo({
            coverageType: data.basicInfo.coverageType,
            oldestAge: data.basicInfo.oldestAge
          });
        }
        
        // Pre-fill form if we have savings data
        if (data.savings && data.savings.currentPremium) {
          form.setValue('currentPremium', data.savings.currentPremium);
          calculateSavings(data.savings.currentPremium);
        }
      } catch (error) {
        console.error('Error parsing localStorage data:', error);
      }
    }
  }, [form]);

  const calculateSavings = (currentPremium: string) => {
    if (!currentPremium || !basicInfo) {
      setShowSavings(false);
      return;
    }
    
    const premium = parseFloat(currentPremium);
    if (isNaN(premium)) {
      setShowSavings(false);
      return;
    }
    
    const baselinePrice = getBaselinePricing(basicInfo.coverageType, parseInt(basicInfo.oldestAge));
    const savings = premium - baselinePrice;
    
    setPotentialSavings(savings > 0 ? savings : 0);
    setShowSavings(true);
  };

  const onSubmit = async (data: SavingsData) => {
    try {
      setIsSubmitting(true);
      
      const existingData = localStorage.getItem('questionnaire-data');
      const questionnaireData: QuestionnaireData = existingData ? JSON.parse(existingData) : {};
      questionnaireData.savings = data;
      localStorage.setItem('questionnaire-data', JSON.stringify(questionnaireData));
      
      // Simulate a delay to show the loading state
      setTimeout(() => {
        // Don't save to Supabase until final step
        router.push('/questionnaire/health');
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: 'Failed to save your responses. Please try again.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <PlansLoader 
            totalPlans={TOTAL_AVAILABLE_PLANS}
            onComplete={() => router.push('/questionnaire/health')}
          />
        </div>
      </div>
    );
  }

  return (
    <section className="relative py-24" style={{ background: 'var(--color-cream-bg)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProgressIndicator 
          currentPage={2}
          totalPages={4}
          steps={steps}
        />

        <div className={cn(
          "bg-white backdrop-blur-sm rounded-2xl p-8 shadow-sm",
          "transition-all duration-200"
        )}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Let's see how much you could save
              </h2>
              
              <div className="space-y-4">
                <label className="block text-gray-800 font-medium">
                  Roughly how much is your monthly health insurance premium (monthly payment)?
                </label>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      {...form.register('currentPremium')}
                      type="number"
                      id="currentPremium"
                      name="currentPremium"
                      placeholder="Enter amount"
                      className={cn(
                        "w-full p-3 pl-8 rounded-lg",
                        "border border-gray-200",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500",
                        "transition duration-200",
                        "text-gray-900 placeholder-gray-500"
                      )}
                      onChange={(e) => calculateSavings(e.target.value)}
                    />
                  </div>
                </div>

                {showSavings && potentialSavings && potentialSavings > 0 && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-lg">
                    <p className="text-green-800 text-lg font-semibold">
                      You may save ${potentialSavings.toFixed(0)} per month by switching to a healthshare plan.
                    </p>
                    <p className="text-green-700 text-sm mt-1">
                      This is an estimate. We'll get your final savings amount when you enroll.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={() => router.push('/questionnaire')}
                className={cn(
                  "px-6 py-2 rounded-full",
                  "border border-gray-300 text-gray-600",
                  "hover:bg-gray-50",
                  "transition-colors duration-200"
                )}
              >
                Back
              </button>
              <div className="space-x-4">
                <button
                  type="button"
                  onClick={() => router.push('/questionnaire/health')}
                  className={cn(
                    "px-6 py-2 rounded-full",
                    "border border-gray-300 text-gray-600",
                    "hover:bg-gray-50",
                    "transition-colors duration-200"
                  )}
                >
                  I have no clue
                </button>
                <button
                  type="submit"
                  className={cn(
                    "px-6 py-2 rounded-full text-white",
                    "transition-colors duration-200"
                  )}
                  style={{ background: 'var(--color-coral-primary)' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Continue'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
} 