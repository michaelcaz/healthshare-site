'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { PlanComparisonTable } from '@/components/plans/comparison/PlanComparisonTable';
import { ChevronLeft } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

// Note: In Next.js 13+, metadata can't be defined in client components.
// It's a server-side feature, but we'll keep the page as a client component.

export default function PlanComparisonPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
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
      
      <PlanComparisonTable />
    </div>
  );
} 