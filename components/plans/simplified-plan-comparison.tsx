'use client'

import React from 'react'
import { PlanRecommendation } from '@/lib/recommendation/recommendations'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface SimplifiedPlanComparisonProps {
  plans: PlanRecommendation[]
}

// Helper function to format currency
function formatCurrency(amount: number | string): string {
  if (typeof amount === 'string') {
    // Try to parse the string as a number if it looks like one
    if (/^\d+(\.\d+)?$/.test(amount)) {
      amount = parseFloat(amount)
    } else {
      return amount
    }
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Helper function to get representative costs for a plan
function getRepresentativeCosts(plan: PlanRecommendation) {
  // Try to find costs for a 30-39 year old individual with a mid-tier IUA
  const costs = plan.plan.planMatrix
    .find(matrix => matrix.ageBracket === '30-39' && matrix.householdType === 'Member Only')
    ?.costs.find(cost => cost.initialUnsharedAmount === 2500)
  
  // Fallback to the first cost option if the specific one isn't found
  const fallbackCosts = plan.plan.planMatrix[0]?.costs[0]
  
  return costs || fallbackCosts || { 
    monthlyPremium: 0, 
    initialUnsharedAmount: 0 
  }
}

// Helper function to safely access plan properties with type conversion
function getPlanProperty(plan: PlanRecommendation, key: string): string | number | undefined {
  const value = plan.plan[key as keyof typeof plan.plan] || 
         (plan as any)[key] || 
         (plan.plan as any)[key];
  
  // Convert boolean values to string
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  
  return value;
}

export function SimplifiedPlanComparison({ plans }: SimplifiedPlanComparisonProps) {
  // Find the lowest cost plan for highlighting
  const getLowestCostPlan = () => {
    if (plans.length <= 1) return plans[0]?.plan.id;
    
    return plans.reduce((lowest, current) => {
      const lowestCost = getRepresentativeCosts(lowest).monthlyPremium;
      const currentCost = getRepresentativeCosts(current).monthlyPremium;
      return currentCost < lowestCost ? current : lowest;
    }, plans[0]).plan.id;
  }

  const lowestCostPlanId = getLowestCostPlan();

  // Define all comparison items
  const comparisonItems = [
    // Highlights
    { 
      id: 'monthly-premium',
      category: 'Highlights',
      label: 'Monthly premium',
      tooltip: 'The monthly amount you pay to maintain your membership',
      getValue: (plan: PlanRecommendation) => formatCurrency(getRepresentativeCosts(plan).monthlyPremium)
    },
    { 
      id: 'deductible',
      category: 'Highlights',
      label: 'Deductible',
      tooltip: 'The amount you pay before sharing begins (Initial Unshared Amount)',
      getValue: (plan: PlanRecommendation) => formatCurrency(getRepresentativeCosts(plan).initialUnsharedAmount)
    },
    { 
      id: 'max-out-of-pocket',
      category: 'Highlights',
      label: 'Max out-of-pocket',
      tooltip: 'The maximum amount you would pay in a year before 100% sharing begins',
      getValue: (plan: PlanRecommendation) => {
        const maxOutOfPocket = getPlanProperty(plan, 'maxOutOfPocket');
        return formatCurrency(typeof maxOutOfPocket === 'number' ? maxOutOfPocket : 9200);
      }
    },
    { 
      id: 'tier',
      category: 'Highlights',
      label: 'Tier',
      tooltip: 'The coverage tier of this plan',
      getValue: (plan: PlanRecommendation) => getPlanProperty(plan, 'tier') || 'Bronze'
    },
    { 
      id: 'network-type',
      category: 'Highlights',
      label: 'Network type',
      tooltip: 'The type of provider network this plan uses',
      getValue: (plan: PlanRecommendation) => getPlanProperty(plan, 'networkType') || 'HMO'
    },
    { 
      id: 'rating',
      category: 'Highlights',
      label: 'Rating',
      tooltip: 'Member satisfaction rating',
      getValue: (plan: PlanRecommendation) => {
        const ratingValue = getPlanProperty(plan, 'rating');
        const rating = typeof ratingValue === 'number' ? ratingValue : 3;
        return (
          <div className="flex justify-center">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < rating ? "text-amber-400" : "text-gray-300"}>★</span>
            ))}
          </div>
        )
      }
    },
    { 
      id: 'special-features',
      category: 'Highlights',
      label: 'Special features',
      tooltip: 'Unique benefits of this plan',
      getValue: (plan: PlanRecommendation) => getPlanProperty(plan, 'specialFeatures') || 'Easy Pricing'
    },
    
    // Doctors
    { 
      id: 'doctors-header',
      category: 'Doctors',
      isHeader: true,
      label: 'Doctors',
      tooltip: 'Medical provider costs',
      getValue: () => ''
    },
    { 
      id: 'primary-care-visits',
      category: 'Doctors',
      label: 'Primary care visits',
      tooltip: 'Cost for a visit to your primary care physician',
      getValue: (plan: PlanRecommendation) => {
        const primaryCareVisit = getPlanProperty(plan, 'primaryCareVisit');
        return formatCurrency(typeof primaryCareVisit === 'number' ? primaryCareVisit : 50) + '/visit';
      }
    },
    { 
      id: 'specialist-visits',
      category: 'Doctors',
      label: 'Specialist visits',
      tooltip: 'Cost for a visit to a specialist',
      getValue: (plan: PlanRecommendation) => {
        const specialistVisit = getPlanProperty(plan, 'specialistVisit');
        return formatCurrency(typeof specialistVisit === 'number' ? specialistVisit : 100) + '/visit';
      }
    },
    
    // Prescription Drugs
    { 
      id: 'prescription-header',
      category: 'Prescription Drugs',
      isHeader: true,
      label: 'Prescription Drugs',
      tooltip: 'Medication costs',
      getValue: () => ''
    },
    { 
      id: 'generic',
      category: 'Prescription Drugs',
      label: 'Generic',
      tooltip: 'Cost for generic prescription medications',
      getValue: (plan: PlanRecommendation) => {
        const genericDrugs = getPlanProperty(plan, 'genericDrugs');
        return formatCurrency(typeof genericDrugs === 'number' ? genericDrugs : 25) + '/fill';
      }
    },
    { 
      id: 'brand',
      category: 'Prescription Drugs',
      label: 'Brand',
      tooltip: 'Cost for brand-name prescription medications',
      getValue: (plan: PlanRecommendation) => getPlanProperty(plan, 'brandDrugs') || 'Full price'
    },
    { 
      id: 'preferred-brand',
      category: 'Prescription Drugs',
      label: 'Preferred brand',
      tooltip: 'Cost for preferred brand-name prescription medications',
      getValue: (plan: PlanRecommendation) => getPlanProperty(plan, 'preferredBrandDrugs') || 'Full price'
    },
    { 
      id: 'specialty',
      category: 'Prescription Drugs',
      label: 'Specialty',
      tooltip: 'Cost for specialty medications',
      getValue: (plan: PlanRecommendation) => getPlanProperty(plan, 'specialtyDrugs') || 'Full price'
    },
    
    // Surgery & Treatment
    { 
      id: 'surgery-header',
      category: 'Surgery & Treatment',
      isHeader: true,
      label: 'Surgery & Treatment',
      tooltip: 'Costs for surgical procedures and treatments',
      getValue: () => ''
    },
    { 
      id: 'inpatient',
      category: 'Surgery & Treatment',
      label: 'Inpatient',
      tooltip: 'Cost for inpatient hospital stays',
      getValue: (plan: PlanRecommendation) => getPlanProperty(plan, 'inpatient') || 'Full price'
    },
    { 
      id: 'outpatient',
      category: 'Surgery & Treatment',
      label: 'Outpatient',
      tooltip: 'Cost for outpatient procedures',
      getValue: (plan: PlanRecommendation) => getPlanProperty(plan, 'outpatient') || 'Full price'
    },
    { 
      id: 'imaging',
      category: 'Surgery & Treatment',
      label: 'Imaging',
      tooltip: 'Cost for imaging services like X-rays and MRIs',
      getValue: (plan: PlanRecommendation) => getPlanProperty(plan, 'imaging') || 'Full price'
    },
    { 
      id: 'labs',
      category: 'Surgery & Treatment',
      label: 'Labs',
      tooltip: 'Cost for laboratory services',
      getValue: (plan: PlanRecommendation) => getPlanProperty(plan, 'labs') || 'Full price'
    },
    
    // Emergency Care
    { 
      id: 'emergency-header',
      category: 'Emergency Care',
      isHeader: true,
      label: 'Emergency Care',
      tooltip: 'Costs for emergency medical services',
      getValue: () => ''
    },
    { 
      id: 'emergency-room',
      category: 'Emergency Care',
      label: 'Emergency room',
      tooltip: 'Cost for emergency room visits',
      getValue: (plan: PlanRecommendation) => getPlanProperty(plan, 'emergencyRoom') || 'Full price'
    },
    { 
      id: 'urgent-care',
      category: 'Emergency Care',
      label: 'Urgent care',
      tooltip: 'Cost for urgent care visits',
      getValue: (plan: PlanRecommendation) => {
        const urgentCare = getPlanProperty(plan, 'urgentCare');
        return formatCurrency(typeof urgentCare === 'number' ? urgentCare : 75) + '/visit';
      }
    },
    
    // Pregnancy
    { 
      id: 'pregnancy-header',
      category: 'Pregnancy',
      isHeader: true,
      label: 'Pregnancy',
      tooltip: 'Costs for pregnancy and childbirth services',
      getValue: () => ''
    },
    { 
      id: 'prenatal-care',
      category: 'Pregnancy',
      label: 'Prenatal care',
      tooltip: 'Cost for prenatal care services',
      getValue: (plan: PlanRecommendation) => getPlanProperty(plan, 'prenatalCare') || 'Full price'
    },
    { 
      id: 'delivery',
      category: 'Pregnancy',
      label: 'Delivery',
      tooltip: 'Cost for delivery and postnatal care',
      getValue: (plan: PlanRecommendation) => getPlanProperty(plan, 'delivery') || 'Full price'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <TooltipProvider>
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-white">
            <tr>
              <th className="w-64 p-5 text-left font-medium text-gray-500 bg-gray-50 border-b border-r"></th>
              {plans.map((plan, index) => (
                <th key={plan.plan.id} className="p-6 text-center border-b border-r last:border-r-0 relative">
                  {index === 0 && (
                    <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-b-md border border-primary/20 border-t-0">
                      Recommended
                    </div>
                  )}
                  <div className="flex justify-center mb-3">
                    <img 
                      src={`/images/providers/${plan.plan.providerName.toLowerCase().replace(/\s+/g, '-')}.png`} 
                      alt={`${plan.plan.providerName} logo`}
                      className="h-12 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/providers/default-provider.png'
                      }}
                    />
                  </div>
                  <h3 className="font-semibold text-base text-gray-900 mb-1">{plan.plan.providerName}</h3>
                  <p className="text-lg font-medium text-gray-800 mb-2">{plan.plan.planName}</p>
                  
                  {plan.plan.id === lowestCostPlanId && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-medium">
                      Lowest Cost
                    </Badge>
                  )}
                  
                  <button 
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-full transition-colors"
                    aria-label={`Remove ${plan.plan.planName} from comparison`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonItems.map((item) => (
              <tr key={item.id} className={item.isHeader ? "bg-gray-50" : ""}>
                <td className={`p-4 border-t border-r ${item.isHeader ? "font-semibold text-lg text-gray-900" : "align-middle"}`}>
                  {item.isHeader ? (
                    <div>{item.label}</div>
                  ) : (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-gray-700 font-medium border-b border-dashed border-gray-400 cursor-help">
                          {item.label}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs bg-gray-900 text-white">
                        <p>{item.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </td>
                
                {plans.map((plan) => (
                  <td 
                    key={`${plan.plan.id}-${item.id}`} 
                    className={`p-4 text-center border-t border-r last:border-r-0 ${item.isHeader ? "bg-gray-50" : ""}`}
                  >
                    {!item.isHeader && (
                      <div className="text-gray-900 font-medium">
                        {item.getValue(plan)}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </TooltipProvider>
    </div>
  )
} 