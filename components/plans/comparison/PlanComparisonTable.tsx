'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { X, Star, StarHalf, Sparkles, CheckCircle } from 'lucide-react'
import { planDetailsData } from '@/data/plan-details-data'
import { PlanDetailsData } from '@/types/plan-details'
import { Tooltip, TooltipContent as BaseTooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { getPlanCost } from '@/lib/utils/plan-costs'
import { CoverageType } from '@/types/provider-plans'
import { getDisplayAnnualCost, formatCurrency } from '@/lib/utils/plan-display'
import { getVisitFrequencyCost, calculateAnnualCost } from '@/utils/plan-utils'

// Custom styled tooltip content for better readability
const TooltipContent = ({ children, className = '', ...props }: React.ComponentPropsWithoutRef<typeof BaseTooltipContent>) => (
  <BaseTooltipContent 
    className={`max-w-xs bg-white text-gray-900 p-3 rounded-md shadow-xl border border-gray-200 z-50 ${className}`}
    sideOffset={8}
    {...props}
  >
    <div className="text-sm font-medium">{children}</div>
  </BaseTooltipContent>
);

interface PlanData {
  id: string
  planName: string
  providerName: string
  monthlyCost: number
  iua: number
  estAnnualCost: number
  avgReviews: string
  reviewCount: number
  details: PlanDetailsData
}

// Helper function to extract prescription drug information from plan details
const extractPrescriptionInfo = (planDetails: PlanDetailsData) => {
  // Parse the prescriptionDrugs string to extract information
  const prescriptionText = planDetails.medicalServices.prescriptionDrugs || '';
  
  // Default values
  const result = {
    generic: '$25/fill',
    brand: 'Full price',
    preferredBrand: 'Full price',
    specialty: 'Full price'
  };
  
  // Try to extract more specific information if available
  if (prescriptionText.includes('Generic') && prescriptionText.includes('$')) {
    const genericMatch = prescriptionText.match(/Generic\s*\(?\$(\d+)\)?/i);
    if (genericMatch && genericMatch[1]) {
      result.generic = `$${genericMatch[1]}/fill`;
    }
  }
  
  return result;
}

// Helper function to extract pregnancy information from plan details
const extractPregnancyInfo = (planDetails: PlanDetailsData, planData?: any) => {
  // Special case for Knew Health - always use 12 months
  if (planData && planData.id && planData.id.toLowerCase().includes('knew')) {
    return {
      prenatalCare: 'Included after waiting period',
      delivery: 'Included after waiting period',
      waitingPeriod: '12 months'
    };
  }
  
  // Parse the pregnancy string to extract information
  const pregnancyText = planDetails.medicalServices.pregnancy || planDetails.coverageDetails?.pregnancy || '';
  
  // Default values
  const result = {
    prenatalCare: 'Full price',
    delivery: 'Full price',
    waitingPeriod: '12 months'  // Default waiting period
  };
  
  // Try to extract more specific information if available
  if (pregnancyText.includes('global maternity fee')) {
    result.prenatalCare = 'Included in global fee';
    
    const deliveryMatch = pregnancyText.match(/\$([0-9,]+)\s*(?:global maternity fee|for normal delivery)/i);
    if (deliveryMatch && deliveryMatch[1]) {
      result.delivery = `$${deliveryMatch[1].replace(',', '')}`;
    }
  }
  
  // Extract waiting period
  const waitingPeriodMatch = pregnancyText.match(/(\d+)\s*(?:month|months)/i);
  if (waitingPeriodMatch && waitingPeriodMatch[1]) {
    result.waitingPeriod = `${waitingPeriodMatch[1]} months`;
  }
  
  return result;
}

// Helper function to extract pre-existing condition information from plan details
const extractPreExistingInfo = (planDetails: PlanDetailsData) => {
  // Parse the pre-existing conditions string to extract information
  const preExistingText = planDetails.coverageDetails?.preExistingConditions || '';
  
  // Default waiting period
  let waitingPeriod = '12 months';
  
  // Try to extract the waiting period
  const yearMatch = preExistingText.match(/(\d+)[\s-]*year waiting period/i);
  if (yearMatch && yearMatch[1]) {
    waitingPeriod = `${parseInt(yearMatch[1]) * 12} months`;
  }
  
  const monthMatch = preExistingText.match(/(\d+)[\s-]*month waiting period/i);
  if (monthMatch && monthMatch[1]) {
    waitingPeriod = `${monthMatch[1]} months`;
  }
  
  // If text contains "one-year" or similar phrases
  if (preExistingText.toLowerCase().includes('one-year') || 
      preExistingText.toLowerCase().includes('one year') ||
      preExistingText.toLowerCase().includes('1-year') || 
      preExistingText.toLowerCase().includes('1 year')) {
    waitingPeriod = '12 months';
  }
  
  // If text contains "two-year" or similar phrases
  if (preExistingText.toLowerCase().includes('two-year') || 
      preExistingText.toLowerCase().includes('two year') ||
      preExistingText.toLowerCase().includes('2-year') || 
      preExistingText.toLowerCase().includes('2 year')) {
    waitingPeriod = '24 months';
  }
  
  return {
    waitingPeriod: waitingPeriod
  };
}

// Helper function to check if a plan covers alternative medicine
const hasAlternativeMedicineCoverage = (planDetails: PlanDetailsData): boolean => {
  // Check if any included services mention alternative medicine
  const includedServices = planDetails.coverageDetails?.includedServices || [];
  
  // Check if any service title or description contains alternative medicine terms
  const hasAlternativeMedicineService = includedServices.some(service => {
    const titleAndDesc = (service.title + ' ' + service.description).toLowerCase();
    return titleAndDesc.includes('alternative medicine') || 
           titleAndDesc.includes('acupuncture') || 
           titleAndDesc.includes('chiropractic') || 
           titleAndDesc.includes('massage therapy') ||
           titleAndDesc.includes('naturopath') ||
           titleAndDesc.includes('holistic');
  });
  
  // Also check in the overview text
  const overviewText = JSON.stringify(planDetails.overview || {}).toLowerCase();
  const hasAlternativeMedicineOverview = overviewText.includes('alternative medicine') || 
                                        overviewText.includes('acupuncture') || 
                                        overviewText.includes('chiropractic') ||
                                        overviewText.includes('therapeutic treatments');
  
  // Check provider name for known providers that cover alternative medicine
  const providerId = planDetails.overview?.providerInfo?.toLowerCase() || '';
  const isKnownProviderWithCoverage = providerId.includes('zion') || providerId.includes('known');
  
  return hasAlternativeMedicineService || hasAlternativeMedicineOverview || isKnownProviderWithCoverage;
}

// Helper function to check if plan has preventative services
const hasPreventativeServices = (planDetails: PlanDetailsData, planData?: any): boolean => {
  // Check specific plan IDs based on requirements
  if (planData && planData.id) {
    const planId = planData.id.toLowerCase();
    
    // Zion Essential - no
    if (planId.includes('zion') && planId.includes('essential')) {
      return false;
    }
    
    // Zion Direct - yes
    if (planId.includes('zion') && planId.includes('direct')) {
      return true;
    }
    
    // Sedera Access+ - yes
    if (planId.includes('sedera') && planId.includes('access+') && !planId.includes('dpc') && !planId.includes('vpc')) {
      return true;
    }
    
    // Sedera Access+ +DPC/VPC - no
    if (planId.includes('sedera') && planId.includes('access+') && (planId.includes('dpc') || planId.includes('vpc'))) {
      return false;
    }
    
    // Crowd Health - yes
    if (planId.includes('crowd')) {
      return true;
    }
    
    // Knew Health - yes
    if (planId.includes('knew')) {
      return true;
    }
  }
  
  // For any other plans, check included services for preventative care
  const includedServices = planDetails.coverageDetails?.includedServices || [];
  const preventativeService = includedServices.find(service => 
    service.title.toLowerCase().includes('prevent') || 
    service.description.toLowerCase().includes('prevent') ||
    service.title.toLowerCase().includes('wellness') ||
    service.description.toLowerCase().includes('wellness') ||
    service.title.toLowerCase().includes('check-up') ||
    service.description.toLowerCase().includes('check-up')
  );
  
  return preventativeService !== undefined;
}

// Helper function to extract lifetime sharing limit
const extractLifetimeLimit = (planDetails: PlanDetailsData, planData?: any): string => {
  // Return "None" for all plans as requested
  return "None";
  
  // Previous implementation commented out below
  /*
  // Default value
  let lifetimeLimit = 'Limited';
  
  // Special case for Knew Health - they have no lifetime maximum
  if (planData && planData.providerName && planData.providerName.toLowerCase().includes('knew health')) {
    return 'Unlimited';
  }
  
  // Check for mentions of maximum coverage or limits
  const overviewText = JSON.stringify(planDetails.overview || {}).toLowerCase();
  const coverageText = JSON.stringify(planDetails.coverageDetails || {}).toLowerCase();
  const allText = overviewText + coverageText;
  
  // Look for unlimited mentions
  if (allText.includes('no lifetime sharing limits') || 
      allText.includes('unlimited sharing') || 
      allText.includes('no sharing limits') ||
      allText.includes('no lifetime max')) {
    return 'Unlimited';
  }
  
  // Look for specific amount limits
  const limitMatches = allText.match(/\$(\d+(?:,\d+)*)\s*(?:million|M)/i);
  if (limitMatches && limitMatches[1]) {
    const amount = limitMatches[1].replace(/,/g, '');
    lifetimeLimit = `$${amount}M`;
  }
  
  // Also check the plan's max coverage field if available from the plan object
  if (planData && planData.plan && planData.plan.maxCoverage) {
    lifetimeLimit = planData.plan.maxCoverage;
  }
  
  return lifetimeLimit;
  */
}

// Star Rating component
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center">
      {/* Full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-primary text-primary" style={{ fill: 'var(--primary)' }} />
      ))}
      
      {/* Half star */}
      {hasHalfStar && <StarHalf className="w-4 h-4 fill-primary text-primary" style={{ fill: 'var(--primary)' }} />}
      
      {/* Empty stars */}
      {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <Star key={i + fullStars + (hasHalfStar ? 1 : 0)} className="w-4 h-4 text-primary" />
      ))}
    </div>
  );
};

// Helper function to get the correct logo path for providers
const getProviderLogoPath = (providerName: string): string => {
  // Normalize the provider name (lowercase and remove spaces)
  const normalizedName = providerName.toLowerCase();
  
  // Check for each provider by substring to handle variations in naming
  if (normalizedName.includes('zion')) {
    return `/images/logos/zion.svg`;
  } else if (normalizedName.includes('sedera')) {
    return `/images/logos/sedera.svg`;
  } else if (normalizedName.includes('knew')) {
    return `/images/logos/knew.svg`;
  } else if (normalizedName.includes('crowd')) {
    return `/images/logos/crowd-health.svg`;
  }
  
  // Fallback to site logo
  console.warn(`No logo mapping found for provider: ${providerName}`);
  return `/images/logo.svg`;
};

export function PlanComparisonTable({ questionnaire }: { questionnaire?: any }) {
  const searchParams = useSearchParams()
  const [plans, setPlans] = useState<PlanData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [logoLoaded, setLogoLoaded] = useState<Record<string, boolean>>({});
  const [topRecommendationId, setTopRecommendationId] = useState<string | null>(null);

  useEffect(() => {
    // Get selected plans from localStorage
    const storedPlans = localStorage.getItem('selected-plans')
    // Get the top recommendation ID from localStorage
    const topRecommendationId = localStorage.getItem('top-recommendation-id')
    
    if (topRecommendationId) {
      setTopRecommendationId(topRecommendationId)
    }
    
    if (storedPlans) {
      try {
        const parsedPlans = JSON.parse(storedPlans)
        
        // First try to use the passed questionnaire prop if available
        let questionnaireData = questionnaire || null;
        
        // If no prop was passed, get questionnaire data from the first plan if available
        if (!questionnaireData) {
          for (const plan of parsedPlans) {
            if (plan.questionnaire) {
              questionnaireData = plan.questionnaire;
              console.log('Found questionnaire data in plan:', questionnaireData);
              break;
            }
          }
        }
        
        // Extract query parameters as fallback
        const visitFrequency = searchParams.get('visitFrequency') || 
                              (questionnaireData?.visit_frequency) || 
                              'just_checkups'
        
        const coverageType = searchParams.get('coverageType') || 
                            (questionnaireData?.coverage_type) || 
                            'just_me'
        
        const ageParam = searchParams.get('age') || 
                        (questionnaireData?.age ? String(questionnaireData.age) : '34')
        
        const iuaPreference = searchParams.get('iua') || 
                             (questionnaireData?.iua_preference) || 
                             '5000'
        
        // If we still don't have questionnaire data, try to get it from localStorage
        if (!questionnaireData) {
          const storedQuestionnaire = localStorage.getItem('questionnaire-data');
          if (storedQuestionnaire) {
            try {
              const parsed = JSON.parse(storedQuestionnaire);
              questionnaireData = parsed.response || parsed;
              console.log('Using questionnaire data from localStorage:', questionnaireData);
            } catch (error) {
              console.error('Error parsing questionnaire data from localStorage:', error);
            }
          }
        }
        
        // If we have questionnaire data but no URL params, store it for the back button
        if (questionnaireData && 
            (!searchParams.get('visitFrequency') || 
             !searchParams.get('coverageType') || 
             !searchParams.get('age') || 
             !searchParams.get('iua'))) {
          
          // Store the data in localStorage for the back button
          localStorage.setItem('questionnaire-data', JSON.stringify({ 
            response: questionnaireData 
          }));
        }
        
        // Parse age as a number for the getPlanCost function
        const age = parseInt(ageParam, 10)
        
        // Log parameters for debugging
        console.log('PlanComparisonTable - Parameters:', { 
          visitFrequency, 
          coverageType, 
          age: ageParam, 
          iua: iuaPreference,
          questionnaireData: !!questionnaireData
        })
        
        // Transform the plans data to match our component's needs
        const formattedPlans = parsedPlans.map((planData: any) => {
          const planId = planData.plan.id
          const planDetails = planDetailsData[planId] || null
          
          if (!planDetails) {
            console.warn(`No plan details found for plan ID: ${planId}`)
          }
          
          console.log(`Processing plan: ${planId}`, {
            providerName: planData.plan.providerName,
            planName: planData.plan.planName
          });
          
          // Get plan costs using the getPlanCost utility
          const planCosts = getPlanCost(
            planId,
            age,
            coverageType as CoverageType,
            iuaPreference
          )
          
          // If we have valid plan costs, calculate the annual cost
          let annualCost = 0
          if (planCosts) {
            // Calculate annual cost using the getDisplayAnnualCost utility
            annualCost = getDisplayAnnualCost(
              planId,
              planCosts.monthlyPremium,
              planCosts.initialUnsharedAmount,
              visitFrequency,
              coverageType
            )
          } else {
            console.error(`Failed to get costs for plan ${planId}`)
          }
          
          return {
            id: planId,
            planName: planData.plan.planName || '',
            providerName: planData.plan.providerName || '',
            monthlyCost: planCosts?.monthlyPremium || 0,
            iua: planCosts?.initialUnsharedAmount || 0,
            estAnnualCost: annualCost,
            avgReviews: planId.toLowerCase().includes('knew') || planData.plan.providerName?.toLowerCase().includes('knew')
              ? '4.7' // Hard-coded rating for Knew Health
              : (planDetails?.providerDetails?.ratings?.overall 
                  ? planDetails.providerDetails.ratings.overall.toFixed(1) 
                  : '0.0'),
            reviewCount: planId.toLowerCase().includes('knew') || planData.plan.providerName?.toLowerCase().includes('knew')
              ? 137 // Hard-coded review count for Knew Health
              : (planDetails?.providerDetails?.ratings?.reviewCount || 0),
            details: planDetails || planDetailsData['zion-healthshare-essential-membership'] // Need a fallback for details
          }
        })
        
        setPlans(formattedPlans)
      } catch (error) {
        console.error('Error parsing selected plans:', error)
      }
    }
    
    setIsLoading(false)
  }, [searchParams])

  const removePlan = (planId: string) => {
    // Check if the removed plan is the top recommendation
    if (planId === topRecommendationId) {
      setTopRecommendationId(null)
    }
    
    setPlans(current => current.filter(plan => plan.id !== planId))
    
    // Also update localStorage
    const storedPlans = localStorage.getItem('selected-plans')
    if (storedPlans) {
      try {
        const parsedPlans = JSON.parse(storedPlans)
        const updatedPlans = parsedPlans.filter((plan: any) => plan.plan.id !== planId)
        localStorage.setItem('selected-plans', JSON.stringify(updatedPlans))
      } catch (error) {
        console.error('Error updating localStorage after plan removal:', error)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (plans.length === 0) {
    // Check if we have questionnaire data in localStorage to enable a better redirect
    const hasQuestionnaireData = !!localStorage.getItem('questionnaire-data');
    
    return (
      <div className="text-center py-16 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">No plans selected for comparison</h2>
        <p className="text-gray-600 mb-8">
          Please go back to the recommendations page and select plans to compare.
        </p>
        {hasQuestionnaireData ? (
          <a 
            href="/recommendations" 
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark transition-colors"
          >
            Return to Recommendations
          </a>
        ) : (
          <a 
            href="/questionnaire" 
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark transition-colors"
          >
            Start Questionnaire
          </a>
        )}
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="overflow-x-auto pb-8">
        <div className="w-full mt-10 mb-2 flex">
          <div className="w-1/4">
            {/* Empty space for the label column */}
          </div>
          
          {/* Badge container for each plan */}
          <div className="flex-1 grid" style={{ gridTemplateColumns: `repeat(${plans.length}, 1fr)` }}>
            {plans.map((plan, index) => (
              <div key={`badge-container-${plan.id}`} className="flex justify-center">
                {plan.id === topRecommendationId && (
                  <div className="bg-gradient-to-r from-[#6366F1]/90 to-[#5A51E5]/90 text-white rounded-full px-4 py-1.5 flex items-center gap-1.5 shadow-lg border border-white/30">
                    <Sparkles className="h-4 w-4 text-white/90" />
                    <span className="text-sm font-semibold whitespace-nowrap">Top Recommendation</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <table className="w-full border-collapse rounded-xl shadow-md bg-white overflow-hidden border border-gray-100">
          <thead>
            <tr>
              <th className="text-left p-6 bg-gray-50 border-b border-gray-200 w-1/4 rounded-tl-xl">
                <h3 className="text-lg font-semibold text-gray-800">Plan Information</h3>
              </th>
              
              {plans.map((plan, index) => (
                <th 
                  key={plan.id} 
                  className={`p-6 border-b border-gray-200 relative ${index === plans.length - 1 ? 'rounded-tr-xl' : ''}`}
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Provider Logo - Direct approach */}
                    <div className="mb-3 flex items-center justify-center" style={{ minHeight: '80px' }}>
                      {(() => {
                        const name = plan.providerName.toLowerCase();
                        
                        // Use very direct approach for each provider
                        if (name.includes('zion')) {
                          return (
                            <img 
                              src="/images/logos/zion.svg"
                              alt="Zion Healthshare logo"
                              width={140}
                              height={70}
                              style={{ 
                                maxWidth: '140px', 
                                height: 'auto',
                                objectFit: 'contain'
                              }}
                              onLoad={() => {
                                console.log('Zion logo loaded');
                                setLogoLoaded(prev => ({...prev, [plan.id]: true}));
                              }}
                              onError={() => {
                                console.error('Failed to load Zion logo');
                              }}
                            />
                          );
                        }
                        
                        if (name.includes('sedera')) {
                          return (
                            <img 
                              src="/images/logos/sedera.svg"
                              alt="Sedera logo"
                              width={140}
                              height={70}
                              style={{ 
                                maxWidth: '140px', 
                                height: 'auto',
                                objectFit: 'contain'
                              }}
                              onLoad={() => {
                                console.log('Sedera logo loaded');
                                setLogoLoaded(prev => ({...prev, [plan.id]: true}));
                              }}
                              onError={() => {
                                console.error('Failed to load Sedera logo');
                              }}
                            />
                          );
                        }
                        
                        if (name.includes('crowd')) {
                          return (
                            <img 
                              src="/images/logos/crowd-health.svg"
                              alt="CrowdHealth logo"
                              width={140}
                              height={70}
                              style={{ 
                                maxWidth: '140px', 
                                height: 'auto',
                                objectFit: 'contain'
                              }}
                              onLoad={() => {
                                console.log('CrowdHealth logo loaded');
                                setLogoLoaded(prev => ({...prev, [plan.id]: true}));
                              }}
                              onError={(e) => {
                                console.error('Failed to load CrowdHealth logo:', e);
                              }}
                            />
                          );
                        }
                        
                        if (name.includes('knew')) {
                          return (
                            <img 
                              src="/images/logos/knew.svg"
                              alt="Knew Health logo"
                              width={140}
                              height={70}
                              style={{ 
                                maxWidth: '140px', 
                                height: 'auto',
                                objectFit: 'contain'
                              }}
                              onLoad={() => {
                                console.log('Knew Health logo loaded');
                                setLogoLoaded(prev => ({...prev, [plan.id]: true}));
                              }}
                              onError={() => {
                                console.error('Failed to load Knew Health logo');
                              }}
                            />
                          );
                        }
                        
                        // Fallback to just displaying the name nicely
                        return (
                          <span className="font-bold text-xl text-primary">
                            {plan.providerName}
                          </span>
                        );
                      })()}
                    </div>
                    
                    {/* Remove the redundant company name heading - only show plan name */}
                    {/* Add empty spacing placeholder for consistent layout */}
                    <div className="mt-1" style={{ minHeight: '24px' }}>
                      {!plan.id.toLowerCase().includes('knew') && 
                       !plan.id.toLowerCase().includes('crowd') && (
                        <p className="text-md text-gray-800 font-medium">
                          {plan.planName}
                        </p>
                      )}
                    </div>
                    
                    <button 
                      onClick={() => removePlan(plan.id)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label="Remove plan"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            {/* Monthly Cost */}
            <tr>
              <td className="p-5 border-b border-gray-200">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-gray-700 border-b border-dashed border-gray-400 cursor-pointer">
                      Monthly Cost
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>The fixed monthly contribution amount you'll pay for your healthshare membership. This is similar to a premium in traditional health insurance but typically much lower in cost.</p>
                  </TooltipContent>
                </Tooltip>
              </td>
              
              {plans.map((plan) => (
                <td key={`monthly-${plan.id}`} className="p-5 border-b border-gray-200 text-center">
                  <span className="font-semibold text-xl text-gray-900">{formatCurrency(plan.monthlyCost)}</span>
                </td>
              ))}
            </tr>
            
            {/* Initial Unshared Amount (IUA) */}
            <tr className="bg-gray-50/50">
              <td className="p-5 border-b border-gray-200">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-gray-700 border-b border-dashed border-gray-400 cursor-pointer">
                      Initial Unshared Amount (IUA)
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>The amount you are responsible to pay before the healthshare community begins sharing your eligible medical expenses. This is similar to a deductible in traditional insurance but applies per medical incident rather than annually.</p>
                  </TooltipContent>
                </Tooltip>
              </td>
              
              {plans.map((plan) => (
                <td key={`iua-${plan.id}`} className="p-5 border-b border-gray-200 text-center">
                  <span className="font-semibold text-gray-900">{formatCurrency(plan.iua)}</span>
                </td>
              ))}
            </tr>
            
            {/* Est. Annual Cost */}
            <tr>
              <td className="p-5 border-b border-gray-200">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-gray-700 border-b border-dashed border-gray-400 cursor-pointer">
                      Est. Annual Cost
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>The projected total annual cost including 12 monthly contributions plus one Initial Unshared Amount (IUA), based on your expected healthcare utilization. This helps you compare the overall financial impact of different plans.</p>
                  </TooltipContent>
                </Tooltip>
              </td>
              
              {plans.map((plan) => (
                <td key={`annual-${plan.id}`} className="p-5 border-b border-gray-200 text-center">
                  <span className="font-semibold text-gray-900">{formatCurrency(plan.estAnnualCost)}</span>
                </td>
              ))}
            </tr>
            
            {/* Avg. Reviews */}
            <tr className="bg-gray-50/50">
              <td className="p-5 border-b border-gray-200">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-gray-700 border-b border-dashed border-gray-400 cursor-pointer">
                      Avg. Reviews
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>The average member satisfaction rating based on verified reviews from current and past members. This reflects overall experience with the provider including customer service, sharing process efficiency, and member satisfaction.</p>
                  </TooltipContent>
                </Tooltip>
              </td>
              
              {plans.map((plan) => {
                // Debug log to verify rating values
                console.log(`Plan ${plan.id} ratings:`, {
                  avgReviews: plan.avgReviews, 
                  reviewCount: plan.reviewCount,
                  isKnewHealth: plan.id.toLowerCase().includes('knew') || plan.providerName.toLowerCase().includes('knew')
                });
                
                // Check if this is a Knew Health plan - simplified condition and made more explicit
                const isKnewHealthPlan = plan.id.toLowerCase().includes('knew') || 
                                        plan.providerName.toLowerCase().includes('knew health');
                
                // Force hardcoded values for Knew Health plans
                const displayRating = isKnewHealthPlan ? 4.7 : parseFloat(plan.avgReviews);
                const displayReviewCount = isKnewHealthPlan ? 137 : plan.reviewCount;
                
                return (
                <td key={`reviews-${plan.id}`} className="p-5 border-b border-gray-200 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center gap-2 mb-1">
                      <StarRating rating={displayRating} />
                      <span className="font-semibold text-gray-900">
                        {isKnewHealthPlan ? '4.7' : plan.avgReviews}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">
                      ({isKnewHealthPlan ? '137' : plan.reviewCount} reviews)
                    </span>
                  </div>
                </td>
              )})}
            </tr>
            
            {/* Prenatal Care - changed to Pregnancy Waiting Period */}
            <tr>
              <td className="p-5 border-b border-gray-200">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-gray-700 border-b border-dashed border-gray-400 cursor-pointer">
                      Pregnancy Waiting Period
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>The minimum time you must be an active member before conception for pregnancy costs to be eligible for sharing. Pregnancy costs resulting from conception before this waiting period expires are typically not eligible for sharing.</p>
                  </TooltipContent>
                </Tooltip>
              </td>
              
              {plans.map((plan) => {
                const pregnancyInfo = extractPregnancyInfo(plan.details, plan);
                return (
                  <td key={`prenatal-${plan.id}`} className="p-5 border-b border-gray-200 text-center">
                    <span className="font-semibold text-gray-900">{pregnancyInfo.waitingPeriod}</span>
                  </td>
                );
              })}
            </tr>
            
            {/* Delivery - changed to Pre-existing Condition Waiting Period */}
            <tr className="bg-gray-50/50">
              <td className="p-5 border-b border-gray-200">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-gray-700 border-b border-dashed border-gray-400 cursor-pointer">
                      Pre-existing Condition Waiting Period
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>The time period you must be a member before medical costs related to pre-existing conditions become eligible for sharing. Pre-existing conditions are typically defined as conditions for which you've received treatment, medication, or medical advice within a certain timeframe prior to joining.</p>
                  </TooltipContent>
                </Tooltip>
              </td>
              
              {plans.map((plan) => {
                const preExistingInfo = extractPreExistingInfo(plan.details);
                return (
                  <td key={`preexisting-${plan.id}`} className="p-5 border-b border-gray-200 text-center">
                    <span className="font-semibold text-gray-900">{preExistingInfo.waitingPeriod}</span>
                  </td>
                );
              })}
            </tr>
            
            {/* Alternative Medicine Eligible for Sharing */}
            <tr>
              <td className="p-5 border-b border-gray-200">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-gray-700 border-b border-dashed border-gray-400 cursor-pointer">
                      Alternative Medicine Eligible for Sharing
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Indicates whether the plan includes sharing eligibility for complementary and alternative medicine treatments such as acupuncture, chiropractic care, massage therapy, and naturopathic services. When eligible, these services typically require a referral from a primary care provider.</p>
                  </TooltipContent>
                </Tooltip>
              </td>
              
              {plans.map((plan) => {
                const hasAlternativeMedicine = hasAlternativeMedicineCoverage(plan.details);
                return (
                  <td key={`alternative-${plan.id}`} className="p-5 border-b border-gray-200 text-center">
                    {hasAlternativeMedicine ? (
                      <div className="flex justify-center">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                );
              })}
            </tr>
            
            {/* Preventative Services */}
            <tr className="bg-gray-50/50">
              <td className="p-5 border-b border-gray-200">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-gray-700 border-b border-dashed border-gray-400 cursor-pointer">
                      Preventative Services
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Indicates if the plan includes sharing for preventative healthcare services such as annual wellness visits, health screenings, and routine check-ups. These services help detect health issues early and maintain overall wellness before conditions become more serious and costly.</p>
                  </TooltipContent>
                </Tooltip>
              </td>
              
              {plans.map((plan) => {
                const hasPreventative = hasPreventativeServices(plan.details, plan);
                return (
                  <td key={`preventative-${plan.id}`} className="p-5 border-b border-gray-200 text-center">
                    {hasPreventative ? (
                      <div className="flex justify-center">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                );
              })}
            </tr>
            
            {/* Lifetime Sharing Limit */}
            <tr>
              <td className="p-5 border-b border-gray-200">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-gray-700 border-b border-dashed border-gray-400 cursor-pointer">
                      Lifetime Sharing Limit
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>The maximum dollar amount eligible for sharing over your entire lifetime of membership. Some healthshares have unlimited sharing (no cap), while others may have limits of $1M or more. This is particularly important to consider for long-term or chronic health conditions.</p>
                  </TooltipContent>
                </Tooltip>
              </td>
              
              {plans.map((plan) => {
                const planLifetimeLimit = extractLifetimeLimit(plan.details, plan);
                return (
                  <td key={`lifetime-${plan.id}`} className="p-5 border-b border-gray-200 text-center">
                    <span className="font-semibold text-gray-900">{planLifetimeLimit}</span>
                  </td>
                );
              })}
            </tr>
            
            {/* Emergency Services */}
            <tr className="bg-gray-50/50">
              <td className="p-5 border-b border-gray-200">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-gray-700 border-b border-dashed border-gray-400 cursor-pointer">
                      Emergency Services
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Indicates whether emergency medical services like emergency room visits, urgent care, and ambulance services are eligible for sharing after your IUA is met. Most healthshare plans prioritize true emergency situations to ensure members receive necessary care in critical moments.</p>
                  </TooltipContent>
                </Tooltip>
              </td>
              
              {plans.map((plan) => (
                <td key={`emergency-${plan.id}`} className="p-5 border-b border-gray-200 text-center">
                  <div className="flex justify-center">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                </td>
              ))}
            </tr>
            
            {/* Surgery and Major Treatment */}
            <tr>
              <td className="p-5 border-b border-gray-200">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-gray-700 border-b border-dashed border-gray-400 cursor-pointer">
                      Surgery and Major Treatment
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Indicates if surgical procedures, hospitalizations, and other major medical treatments are eligible for sharing after your IUA. This includes both inpatient and outpatient surgeries, hospital stays, and specialty treatments for serious medical conditions.</p>
                  </TooltipContent>
                </Tooltip>
              </td>
              
              {plans.map((plan) => (
                <td key={`surgery-${plan.id}`} className="p-5 border-b border-gray-200 text-center">
                  <div className="flex justify-center">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                </td>
              ))}
            </tr>
            
            {/* Generic Drugs */}
            <tr>
              <td className="p-5 border-b border-gray-200">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-gray-700 border-b border-dashed border-gray-400 cursor-pointer">
                      Prescriptions covered after you hit your IUA
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Indicates if prescription medications related to an eligible medical need are shareable after your Initial Unshared Amount (IUA) is met. Typically applies to short-term prescriptions for acute conditions rather than maintenance medications for chronic conditions.</p>
                  </TooltipContent>
                </Tooltip>
              </td>
              
              {plans.map((plan) => (
                <td key={`generic-${plan.id}`} className="p-5 border-b border-gray-200 text-center">
                  <div className="flex justify-center">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                </td>
              ))}
            </tr>
            
            {/* Brand Name Drugs */}
            <tr className="bg-gray-50/50">
              <td className="p-5 border-b border-gray-200">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-gray-700 border-b border-dashed border-gray-400 cursor-pointer">
                      Maintenance Prescriptions Discount Card
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Indicates if members receive access to prescription discount programs for ongoing medication needs. While most healthshares don't directly share costs for maintenance medications, many provide access to discount programs that can reduce out-of-pocket costs by 15-80% depending on the medication.</p>
                  </TooltipContent>
                </Tooltip>
              </td>
              
              {plans.map((plan) => (
                <td key={`brand-${plan.id}`} className="p-5 border-b border-gray-200 text-center">
                  <div className="flex justify-center">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </TooltipProvider>
  )
} 