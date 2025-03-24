'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { X, Star, StarHalf, Sparkles } from 'lucide-react'
import { planDetailsData } from '@/data/plan-details-data'
import { PlanDetailsData } from '@/types/plan-details'
import { Tooltip, TooltipContent as BaseTooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

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
const extractPregnancyInfo = (planDetails: PlanDetailsData) => {
  // Parse the pregnancy string to extract information
  const pregnancyText = planDetails.medicalServices.pregnancy || '';
  
  // Default values
  const result = {
    prenatalCare: 'Full price',
    delivery: 'Full price'
  };
  
  // Try to extract more specific information if available
  if (pregnancyText.includes('global maternity fee')) {
    result.prenatalCare = 'Included in global fee';
    
    const deliveryMatch = pregnancyText.match(/\$([0-9,]+)\s*(?:global maternity fee|for normal delivery)/i);
    if (deliveryMatch && deliveryMatch[1]) {
      result.delivery = `$${deliveryMatch[1].replace(',', '')}`;
    }
  }
  
  return result;
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
  // Base URL 
  const baseUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000' 
    : 'https://healthshare-site.vercel.app';
  
  // Normalize the provider name (lowercase and remove spaces)
  const normalizedName = providerName.toLowerCase();
  
  // Check for each provider by substring to handle variations in naming
  if (normalizedName.includes('zion')) {
    return `${baseUrl}/images/logos/zion.svg`;
  } else if (normalizedName.includes('sedera')) {
    return `${baseUrl}/images/logos/sedera.svg`;
  } else if (normalizedName.includes('knew')) {
    return `${baseUrl}/images/logos/knew.svg`;
  } else if (normalizedName.includes('crowd')) {
    return `${baseUrl}/images/logos/crowd-health.svg`;
  }
  
  // Fallback to site logo
  console.warn(`No logo mapping found for provider: ${providerName}`);
  return `${baseUrl}/images/logo.svg`;
};

export function PlanComparisonTable() {
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
        
        // Extract query parameters
        const visitFrequency = searchParams.get('visitFrequency') || 'just_checkups'
        const coverageType = searchParams.get('coverageType') || 'just_me'
        const age = searchParams.get('age') || '34'
        const iua = searchParams.get('iua') || '5000'
        
        // Transform the plans data to match our component's needs
        const formattedPlans = parsedPlans.map((planData: any) => {
          const planId = planData.plan.id
          const planDetails = planDetailsData[planId] || null
          
          if (!planDetails) {
            console.warn(`No plan details found for plan ID: ${planId}`)
          }
          
          console.log('Plan provider name:', planData.plan.providerName);
          
          // Use the scoring data directly from the plan recommendation
          // Return 0 if data isn't found instead of using default values
          return {
            id: planId,
            planName: planData.plan.planName || '',
            providerName: planData.plan.providerName || '',
            monthlyCost: planData.monthlyCost || planData.plan.monthlyCost || 0,
            iua: planData.iua || parseInt(iua, 10) || 0,
            estAnnualCost: planData.annualCost || planData.plan.annualCost || 0,
            avgReviews: planDetails?.providerDetails?.ratings?.overall 
              ? planDetails.providerDetails.ratings.overall.toFixed(1) 
              : '0.0',
            reviewCount: planDetails?.providerDetails?.ratings?.reviewCount || 0,
            details: planDetails || planDetailsData['zion-healthshare-essential-membership'] // Need a fallback for details
          }
        })
        
        setPlans(formattedPlans)
        
        // Log the formatted plans for debugging
        console.log('Formatted plans for comparison:', formattedPlans)
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
    return (
      <div className="text-center py-16 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">No plans selected for comparison</h2>
        <p className="text-gray-600 mb-8">
          Please go back to the recommendations page and select plans to compare.
        </p>
        <a 
          href="/plans" 
          className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark transition-colors"
        >
          View Recommendations
        </a>
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
                    <p className="text-md text-gray-800 font-medium mt-1">{plan.planName}</p>
                    
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
            {/* Cost Information Section */}
            <tr className="bg-gray-50">
              <td colSpan={plans.length + 1} className="p-5 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Cost Information</h3>
              </td>
            </tr>
            
            {/* Monthly Cost */}
            <tr>
              <td className="p-5 border-b border-gray-200">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-gray-700 border-b border-dashed border-gray-400 cursor-help">
                      Monthly Cost
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Monthly contribution amount for your healthshare membership</p>
                  </TooltipContent>
                </Tooltip>
              </td>
              
              {plans.map((plan) => (
                <td key={`monthly-${plan.id}`} className="p-5 border-b border-gray-200 text-center">
                  <span className="font-semibold text-xl text-gray-900">${plan.monthlyCost}</span>
                </td>
              ))}
            </tr>
            
            {/* Initial Unshared Amount (IUA) */}
            <tr className="bg-gray-50/50">
              <td className="p-5 border-b border-gray-200">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-gray-700 border-b border-dashed border-gray-400 cursor-help">
                      Initial Unshared Amount (IUA)
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Amount you pay before the community begins sharing your eligible medical expenses</p>
                  </TooltipContent>
                </Tooltip>
              </td>
              
              {plans.map((plan) => (
                <td key={`iua-${plan.id}`} className="p-5 border-b border-gray-200 text-center">
                  <span className="font-semibold text-gray-900">${plan.iua.toLocaleString()}</span>
                </td>
              ))}
            </tr>
            
            {/* Est. Annual Cost */}
            <tr>
              <td className="p-5 border-b border-gray-200">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-gray-700 border-b border-dashed border-gray-400 cursor-help">
                      Est. Annual Cost
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Estimated annual cost including monthly contributions and one IUA</p>
                  </TooltipContent>
                </Tooltip>
              </td>
              
              {plans.map((plan) => (
                <td key={`annual-${plan.id}`} className="p-5 border-b border-gray-200 text-center">
                  <span className="font-semibold text-gray-900">${plan.estAnnualCost.toLocaleString()}</span>
                </td>
              ))}
            </tr>
            
            {/* Avg. Reviews */}
            <tr className="bg-gray-50/50">
              <td className="p-5 border-b border-gray-200">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-gray-700 border-b border-dashed border-gray-400 cursor-help">
                      Avg. Reviews
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Average member satisfaction rating</p>
                  </TooltipContent>
                </Tooltip>
              </td>
              
              {plans.map((plan) => (
                <td key={`reviews-${plan.id}`} className="p-5 border-b border-gray-200 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center gap-2 mb-1">
                      <StarRating rating={parseFloat(plan.avgReviews)} />
                      <span className="font-semibold text-gray-900">{plan.avgReviews}</span>
                    </div>
                    <span className="text-sm text-gray-600">({plan.reviewCount} reviews)</span>
                  </div>
                </td>
              ))}
            </tr>
            
            {/* Prescription Drugs Section */}
            <tr className="bg-gray-50">
              <td colSpan={plans.length + 1} className="p-5 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Prescription Drugs</h3>
              </td>
            </tr>
            
            {/* Generic Drugs */}
            <tr>
              <td className="p-5 border-b border-gray-200">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-gray-700 border-b border-dashed border-gray-400 cursor-help">
                      Generic Drugs
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Cost for generic prescription medications</p>
                  </TooltipContent>
                </Tooltip>
              </td>
              
              {plans.map((plan) => {
                const rxInfo = extractPrescriptionInfo(plan.details);
                return (
                  <td key={`generic-${plan.id}`} className="p-5 border-b border-gray-200 text-center">
                    <span className="font-semibold text-gray-900">{rxInfo.generic}</span>
                  </td>
                );
              })}
            </tr>
            
            {/* Brand Name Drugs */}
            <tr className="bg-gray-50/50">
              <td className="p-5 border-b border-gray-200">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-gray-700 border-b border-dashed border-gray-400 cursor-help">
                      Brand Name Drugs
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Cost for brand name prescription medications</p>
                  </TooltipContent>
                </Tooltip>
              </td>
              
              {plans.map((plan) => {
                const rxInfo = extractPrescriptionInfo(plan.details);
                return (
                  <td key={`brand-${plan.id}`} className="p-5 border-b border-gray-200 text-center">
                    <span className="font-semibold text-gray-900">{rxInfo.brand}</span>
                  </td>
                );
              })}
            </tr>
            
            {/* Pregnancy Section */}
            <tr className="bg-gray-50">
              <td colSpan={plans.length + 1} className="p-5 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Pregnancy</h3>
              </td>
            </tr>
            
            {/* Prenatal Care */}
            <tr>
              <td className="p-5 border-b border-gray-200">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-gray-700 border-b border-dashed border-gray-400 cursor-help">
                      Prenatal Care
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Coverage for prenatal doctor visits and care</p>
                  </TooltipContent>
                </Tooltip>
              </td>
              
              {plans.map((plan) => {
                const pregnancyInfo = extractPregnancyInfo(plan.details);
                return (
                  <td key={`prenatal-${plan.id}`} className="p-5 border-b border-gray-200 text-center">
                    <span className="font-semibold text-gray-900">{pregnancyInfo.prenatalCare}</span>
                  </td>
                );
              })}
            </tr>
            
            {/* Delivery */}
            <tr className="bg-gray-50/50">
              <td className="p-5 border-b border-gray-200">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-gray-700 border-b border-dashed border-gray-400 cursor-help">
                      Delivery
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Coverage for labor and delivery</p>
                  </TooltipContent>
                </Tooltip>
              </td>
              
              {plans.map((plan) => {
                const pregnancyInfo = extractPregnancyInfo(plan.details);
                return (
                  <td key={`delivery-${plan.id}`} className="p-5 border-b border-gray-200 text-center">
                    <span className="font-semibold text-gray-900">{pregnancyInfo.delivery}</span>
                  </td>
                );
              })}
            </tr>
            
            {/* Key Features Section */}
            <tr className="bg-gray-50">
              <td colSpan={plans.length + 1} className="p-5 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Key Features</h3>
              </td>
            </tr>
            
            {/* What We Love */}
            <tr>
              <td className="p-5 border-b border-gray-200 w-1/4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-gray-700 border-b border-dashed border-gray-400 cursor-help">
                      What We Love
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Standout features we appreciate about this plan</p>
                  </TooltipContent>
                </Tooltip>
              </td>
              
              {plans.map((plan) => (
                <td key={`love-${plan.id}`} className="p-5 border-b border-gray-200 w-[300px]">
                  <div className="space-y-3">
                    {plan.details.overview.whatWeLove.map((item, i) => (
                      <div key={i} className="flex items-start">
                        <div className="flex-shrink-0 mt-1 mr-2 text-green-600">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div className="text-sm text-gray-900" dangerouslySetInnerHTML={{ __html: item }} />
                      </div>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
            
            {/* Key Plan Features */}
            <tr className="bg-gray-50/50">
              <td className="p-5 border-b border-gray-200 w-1/4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-gray-700 border-b border-dashed border-gray-400 cursor-help">
                      Key Plan Features
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Important features and limitations of this plan</p>
                  </TooltipContent>
                </Tooltip>
              </td>
              
              {plans.map((plan) => (
                <td key={`features-${plan.id}`} className="p-5 border-b border-gray-200 w-[300px]">
                  <div className="space-y-3">
                    {plan.details.keyPlanFeatures?.map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <div className="flex-shrink-0 mt-1 mr-2 text-green-600">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="text-sm text-gray-900">
                              <span dangerouslySetInnerHTML={{ __html: feature.text }} />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{feature.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    ))}
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