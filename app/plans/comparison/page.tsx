'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { PlanComparisonTable } from '@/components/plans/comparison/PlanComparisonTable';
import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { getPlanDisplayData } from '@/lib/utils/plan-display';
import { planDetailsData } from '@/data/plan-details-data';

// Note: In Next.js 13+, metadata can't be defined in client components.
// It's a server-side feature, but we'll keep the page as a client component.

// Define the PlanData interface to match the one in PlanComparisonTable
interface PlanData {
  id: string;
  planName: string;
  providerName: string;
  monthlyCost: number;
  iua: number;
  estAnnualCost: number;
  avgReviews: string;
  reviewCount: number;
  details: any; // Using any for now since we don't have the full PlanDetailsData type
}

export default function PlanComparisonPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedPlans, setSelectedPlans] = useState<PlanData[]>([]);
  const [topRecommendationId, setTopRecommendationId] = useState<string>('');
  
  useEffect(() => {
    // Get selected plans from localStorage
    const storedPlans = localStorage.getItem('selected-plans');
    const storedTopRecommendation = localStorage.getItem('top-recommendation');
    
    if (storedPlans) {
      try {
        const parsedPlans = JSON.parse(storedPlans);
        console.log('Parsed plans from localStorage:', parsedPlans);
        
        // Map the plans to the format expected by PlanComparisonTable
        const mappedPlans = parsedPlans.map((rec: any) => {
          const plan = rec.plan;
          const questionnaire = rec.questionnaire;
          
          const displayData = getPlanDisplayData(
            rec,
            questionnaire.age,
            questionnaire.coverage_type,
            questionnaire.iua_preference,
            questionnaire.visit_frequency
          );
          
          const mappedPlan = {
            id: plan.id,
            planName: plan.planName,
            providerName: plan.providerName,
            monthlyCost: displayData.monthlyPremium,
            iua: displayData.initialUnsharedAmount,
            estAnnualCost: displayData.annualCost,
            avgReviews: '4.5', // fallback, or get from planDetailsData if available
            reviewCount: 100, // fallback, or get from planDetailsData if available
            details: (planDetailsData as any)[plan.id] || {},
          };
          console.log('Mapped plan:', mappedPlan);
          return mappedPlan;
        });
        
        console.log('Final mapped plans:', mappedPlans);
        setSelectedPlans(mappedPlans);

        // Only set topRecommendationId if it matches one of the selected plans
        if (storedTopRecommendation) {
          try {
            const parsed = JSON.parse(storedTopRecommendation);
            const topId = parsed.id || '';
            // Check if the top recommendation is in the selected plans
            const isTopPlanSelected = mappedPlans.some((plan: PlanData) => plan.id === topId);
            setTopRecommendationId(isTopPlanSelected ? topId : '');
          } catch (error) {
            console.error('Error parsing stored top recommendation:', error);
            setTopRecommendationId('');
          }
        }
      } catch (error) {
        console.error('Error parsing stored plans:', error);
      }
    }
  }, []);
  
  // Build the recommendations URL with the current parameters
  let recommendationsUrl = '/recommendations';
  
  // Get all the parameters
  const paramsObject: Record<string, string> = {};
  if (searchParams) {
    // Get known parameters
    const age = searchParams.get('age');
    const coverageType = searchParams.get('coverageType');
    const visitFrequency = searchParams.get('visitFrequency');
    const iua = searchParams.get('iua');
    
    // Add them to the object if they exist
    if (age) paramsObject.age = age;
    if (coverageType) paramsObject.coverageType = coverageType;
    if (visitFrequency) paramsObject.visitFrequency = visitFrequency;
    if (iua) paramsObject.iua = iua;
  }
  
  // Build the URL with parameters if we have any
  if (Object.keys(paramsObject).length > 0) {
    const queryString = new URLSearchParams(paramsObject).toString();
    recommendationsUrl = `${recommendationsUrl}?${queryString}`;
  }
  
  // Simple handler for back button click
  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Check if we have questionnaire data in localStorage
    const storedQuestionnaire = localStorage.getItem('questionnaire-data');
    let questionnaireData = null;
    
    if (storedQuestionnaire) {
      try {
        const parsed = JSON.parse(storedQuestionnaire);
        questionnaireData = parsed.response || parsed;
        console.log('Using existing questionnaire data for back navigation');
      } catch (error) {
        console.error('Error parsing stored questionnaire data:', error);
      }
    }
    
    // If we don't have questionnaire data, build a basic one from URL parameters
    if (!questionnaireData) {
      console.log('Building questionnaire data from URL parameters');
      questionnaireData = {
        age: parseInt(paramsObject.age || '34'),
        coverage_type: paramsObject.coverageType || 'just_me',
        visit_frequency: paramsObject.visitFrequency || 'just_checkups',
        iua_preference: paramsObject.iua || '5000',
        pregnancy: 'false',
        pre_existing: 'false',
        zip_code: '78620',
        state: 'TX',
        expense_preference: 'lower_monthly',
        medical_conditions: []
      };
      
      // Store the data in localStorage with proper wrapper
      localStorage.setItem('questionnaire-data', JSON.stringify({ response: questionnaireData }));
    }
    
    // Navigate using the router
    router.push(recommendationsUrl);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-6">
        <Button
          onClick={handleBackClick}
          variant="outline"
          size="sm"
          className="bg-white text-primary hover:bg-primary/5 hover:text-primary-dark border-primary/30 font-medium flex items-center gap-1 shadow-sm rounded-md"
          data-testid="back-button"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Recommendations
        </Button>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Plan Comparison</h1>
      <p className="text-lg text-gray-700 mb-8">
        Compare your selected plans side by side to find the best option for your needs.
      </p>
      
      {/* Ensure selectedPlans is always an array to prevent type errors */}
      <PlanComparisonTable 
        selectedPlans={selectedPlans || []} 
        topRecommendationId={topRecommendationId}
      />
    </div>
  );
} 