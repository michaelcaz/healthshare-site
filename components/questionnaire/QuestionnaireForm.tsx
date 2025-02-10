'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { trackQuestionnaireStep, trackAbandonment } from '@/lib/analytics/funnel-tracking';
import { TrustBadges } from '@/components/ui/TrustBadges';
import { useRouter } from 'next/navigation';
import { saveQuestionnaireResponse, recoverPartialResponse } from '@/lib/questionnaire';
import { useToast } from '@/components/ui/toast';
import { QuestionnaireResponse } from '@/lib/types';

// Add these state variables
const [startTime] = useState(Date.now());
const [stepStartTime, setStepStartTime] = useState(Date.now());
const [isComplete, setIsComplete] = useState(false);
const [currentStep, setCurrentStep] = useState(1);
const [formData, setFormData] = useState<Record<string, any>>({});
const [isRecovering, setIsRecovering] = useState(true);

// Add questions array
const questions = [
  { title: 'Basic Information' },
  { title: 'Health Status' },
  { title: 'Coverage Needs' },
  // ... add your actual questions here
];

// Add to your existing component
useEffect(() => {
  // Track when user starts questionnaire
  trackQuestionnaireStep('QUESTIONNAIRE_START', {
    stepNumber: 1,
    stepName: 'Start',
  });

  // Track abandonment on unmount
  return () => {
    if (!isComplete) {
      trackAbandonment(currentStep, Date.now() - startTime);
    }
  };
}, []);

// Add to your step change handler
const handleStepChange = (newStep: number) => {
  trackQuestionnaireStep('QUESTIONNAIRE_STEP_COMPLETE', {
    stepNumber: currentStep,
    stepName: questions[currentStep - 1].title,
    timeSpent: Date.now() - stepStartTime,
    isComplete: true,
    answers: formData
  });
  
  setCurrentStep(newStep);
};

// Before sensitive questions
<div className="mb-4">
  <TrustBadges types={['security', 'compliance']} variant="subtle" />
</div>

export function QuestionnaireForm() {
  const { setValue, handleSubmit } = useForm<QuestionnaireResponse>();
  const router = useRouter();
  const { toast } = useToast();

  // Try to recover partial response
  useEffect(() => {
    async function recover() {
      try {
        const partial = await recoverPartialResponse();
        if (partial) {
          // Pre-fill form with recovered data
          Object.entries(partial).forEach(([key, value]) => {
            setValue(key as keyof QuestionnaireResponse, value);
          });
          toast({
            title: 'Recovered previous responses',
            description: 'Your previous answers have been restored.',
            variant: 'default',
          });
        }
      } catch (error) {
        console.error('Recovery failed:', error);
      } finally {
        setIsRecovering(false);
      }
    }
    recover();
  }, []);

  const onSubmit = async (data: QuestionnaireResponse) => {
    try {
      const response: QuestionnaireResponse = {
        age: parseInt(data.age.toString()),
        household_size: parseInt(data.household_size.toString()),
        iua_preference: data.iua_preference,
        pregnancy: data.pregnancy,
        pregnancy_planning: data.pregnancy_planning,
        medical_conditions: data.medical_conditions,
        expense_preference: data.expense_preference,
        annual_healthcare_spend: data.annual_healthcare_spend,
        pre_existing: data.pre_existing,
        prescription_needs: data.prescription_needs,
        provider_preference: data.provider_preference,
        state: data.state,
        zip: data.zip,
        zip_code: data.zip
      };

      await saveQuestionnaireResponse(response);
      router.push('/recommendations');
    } catch (error) {
      console.error('Error saving questionnaire:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save your responses. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (isRecovering) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Existing form fields */}
    </form>
  );
} 