'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { X, Star, StarHalf, Sparkles, CheckCircle } from 'lucide-react'
import { planDetailsData } from '@/data/plan-details-data'
import { PlanDetailsData } from '@/types/plan-details'
import { Tooltip } from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { getPlanCost } from '@/lib/utils/plan-costs'
import { CoverageType } from '@/types/provider-plans'
import { getDisplayAnnualCost, formatCurrency } from '@/lib/utils/plan-display'
import { getVisitFrequencyCost, calculateAnnualCost } from '@/utils/plan-utils'
import { providerPlans } from '@/data/provider-plans'
import { ProviderLogo } from '@/components/recommendations/ProviderLogo'
import { planData } from '@/lib/plan-data'
import { PlanComparisonRow } from './PlanComparisonRow'

// Types
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

interface PlanComparisonTableProps {
  selectedPlans: PlanData[];
}

// Helper Components
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      ))}
    </div>
  )
}

// Helper Functions
const extractPrescriptionInfo = (planDetails: PlanDetailsData) => {
  const prescriptionText = planDetails.medicalServices?.prescriptionDrugs || ''
  
  const result = {
    generic: '$25/fill',
    brand: 'Full price',
    preferredBrand: 'Full price',
    specialty: 'Full price'
  }
  
  if (prescriptionText.includes('Generic') && prescriptionText.includes('$')) {
    const genericMatch = prescriptionText.match(/Generic\s*\(?\$(\d+)\)?/i)
    if (genericMatch && genericMatch[1]) {
      result.generic = `$${genericMatch[1]}/fill`
    }
  }
  
  return result
}

const extractPregnancyInfo = (planDetails: PlanDetailsData, planData?: PlanData) => {
  if (planData?.id?.toLowerCase().includes('knew')) {
    return {
      prenatalCare: 'Included after waiting period',
      delivery: 'Included after waiting period',
      waitingPeriod: '12 months'
    }
  }
  
  const pregnancyText = planDetails.medicalServices.pregnancy || planDetails.coverageDetails?.pregnancy || ''
  
  const result = {
    prenatalCare: 'Full price',
    delivery: 'Full price',
    waitingPeriod: '12 months'
  }
  
  if (pregnancyText.includes('global maternity fee')) {
    result.prenatalCare = 'Included in global fee'
    
    const deliveryMatch = pregnancyText.match(/\$([0-9,]+)\s*(?:global maternity fee|for normal delivery)/i)
    if (deliveryMatch && deliveryMatch[1]) {
      result.delivery = `$${deliveryMatch[1].replace(',', '')}`
    }
  }
  
  const waitingPeriodMatch = pregnancyText.match(/(\d+)\s*(?:month|months)/i)
  if (waitingPeriodMatch && waitingPeriodMatch[1]) {
    result.waitingPeriod = `${waitingPeriodMatch[1]} months`
  }
  
  return result
}

const extractPreExistingInfo = (planDetails: PlanDetailsData) => {
  const preExistingText = planDetails.coverageDetails?.preExistingConditions || ''
  let waitingPeriod = '12 months'
  
  const yearMatch = preExistingText.match(/(\d+)[\s-]*year waiting period/i)
  if (yearMatch && yearMatch[1]) {
    waitingPeriod = `${parseInt(yearMatch[1]) * 12} months`
  }
  
  const monthMatch = preExistingText.match(/(\d+)[\s-]*month waiting period/i)
  if (monthMatch && monthMatch[1]) {
    waitingPeriod = `${monthMatch[1]} months`
  }
  
  if (preExistingText.toLowerCase().includes('one-year') || 
      preExistingText.toLowerCase().includes('one year') ||
      preExistingText.toLowerCase().includes('1-year') || 
      preExistingText.toLowerCase().includes('1 year')) {
    waitingPeriod = '12 months'
  }
  
  if (preExistingText.toLowerCase().includes('two-year') || 
      preExistingText.toLowerCase().includes('two year') ||
      preExistingText.toLowerCase().includes('2-year') || 
      preExistingText.toLowerCase().includes('2 year')) {
    waitingPeriod = '24 months'
  }
  
  return { waitingPeriod }
}

const hasAlternativeMedicineCoverage = (planDetails: PlanDetailsData): boolean => {
  const includedServices = planDetails.coverageDetails?.includedServices || []
  
  const hasAlternativeMedicineService = includedServices.some(service => {
    const titleAndDesc = (service.title + ' ' + service.description).toLowerCase()
    return titleAndDesc.includes('alternative medicine') || 
           titleAndDesc.includes('acupuncture') || 
           titleAndDesc.includes('chiropractic') || 
           titleAndDesc.includes('massage therapy') ||
           titleAndDesc.includes('naturopath') ||
           titleAndDesc.includes('holistic')
  })
  
  const overviewText = JSON.stringify(planDetails.overview || {}).toLowerCase()
  const hasAlternativeMedicineOverview = overviewText.includes('alternative medicine') || 
                                        overviewText.includes('acupuncture') || 
                                        overviewText.includes('chiropractic') ||
                                        overviewText.includes('therapeutic treatments')
  
  const providerId = planDetails.overview?.providerInfo?.toLowerCase() || ''
  const isKnownProviderWithCoverage = providerId.includes('zion') || providerId.includes('known')
  
  return hasAlternativeMedicineService || hasAlternativeMedicineOverview || isKnownProviderWithCoverage
}

const hasPreventativeServices = (planDetails: PlanDetailsData, planData?: PlanData): boolean => {
  if (planData?.id) {
    const planId = planData.id.toLowerCase()
    
    if (planId.includes('zion') && planId.includes('essential')) return false
    if (planId.includes('zion') && planId.includes('direct')) return true
    if (planId.includes('sedera') && planId.includes('access+') && !planId.includes('dpc') && !planId.includes('vpc')) return true
    if (planId.includes('sedera') && planId.includes('access+') && (planId.includes('dpc') || planId.includes('vpc'))) return false
    if (planId.includes('crowd')) return true
    if (planId.includes('knew')) return true
  }
  
  const includedServices = planDetails.coverageDetails?.includedServices || []
  const preventativeService = includedServices.find(service => 
    service.title.toLowerCase().includes('prevent') || 
    service.description.toLowerCase().includes('prevent') ||
    service.title.toLowerCase().includes('wellness') ||
    service.description.toLowerCase().includes('wellness') ||
    service.title.toLowerCase().includes('check-up') ||
    service.description.toLowerCase().includes('check-up')
  )
  
  return preventativeService !== undefined
}

const extractLifetimeLimit = (planDetails: PlanDetailsData, planData?: PlanData): string => {
  return "None"
}

// Helper to round up to nearest 0.5
const roundUpToHalf = (num: number) => Math.ceil(num * 2) / 2;

const comparisonRows = [
  { label: 'Emergency Services', key: 'emergencyServices' },
  { label: 'Surgical Procedures and Treatment', key: 'surgicalProcedures' },
  { label: 'Preventative Services', key: 'preventativeServices' },
  { label: 'Maternity Coverage', key: 'maternityCoverage' },
  { label: 'Pregnancy Waiting Period', key: 'pregnancyWaitingPeriod' },
  { label: 'Pre-existing Condition Waiting Period', key: 'preExistingConditionWaitingPeriod' },
  { label: 'Alternative Medicine', key: 'alternativeMedicine' },
  { label: 'Telemedicine', key: 'telemedicine' },
  { label: 'Prescription Drugs Eligible for Sharing After Meeting IUA', key: 'prescriptionDrugsAfterIUA' },
  { label: 'Lifetime Limit', key: 'lifetimeLimit' },
];

// Mapping from selectedPlans planName to planData planName
const PLAN_NAME_MAP: Record<string, string> = {
  'Direct Membership': 'Zion Direct',
  'Essential': 'Zion Essential',
  'ACCESS+': 'Sedera Access+',
  'ACCESS+ DPC': 'Sedera Access+ DPC',
  'Crowd Health': 'Crowd Health',
  'Premium HSA': 'Knew Health',
  // Add more mappings as needed
};

// Main Component
export function PlanComparisonTable({ selectedPlans }: PlanComparisonTableProps) {
  if (!selectedPlans || selectedPlans.length === 0) {
    return <div className="text-gray-600 text-center py-8">No plans selected for comparison</div>;
  }

  // Map each selected plan to its corresponding planData entry using the mapping
  const filteredPlanData = selectedPlans.map(selPlan => {
    const mappedName = PLAN_NAME_MAP[selPlan.planName] || selPlan.planName;
    const match = planData.find(
      staticPlan => staticPlan.planName === mappedName
    );
    return match || null;
  });

  // Remove plan handler (should be lifted to context if you want to update global state)
  // For now, just disables the button
  const removePlan = (planId: string) => {
    // Optionally, you can call a context method here
    // This is a placeholder for UI consistency
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full divide-y divide-gray-200 text-xs md:text-sm">
        {/* Table header */}
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Plan Details
            </th>
            {selectedPlans.map(plan => (
              <th key={plan.id} scope="col" className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[180px] md:min-w-[220px]">
                <div className="flex items-center justify-between">
                  <span>{plan.planName}</span>
                  <button
                    onClick={() => removePlan(plan.id)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        
        {/* Table body */}
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Provider Row */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Provider
            </td>
            {selectedPlans.map(plan => (
              <td key={plan.id} className="px-2 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center justify-center gap-2">
                  <ProviderLogo providerName={plan.providerName} size="md" />
                </div>
              </td>
            ))}
          </tr>

          {/* Monthly Cost Row */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Monthly Cost
            </td>
            {selectedPlans.map(plan => (
              <td key={plan.id} className="px-2 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatCurrency(plan.monthlyCost)}
              </td>
            ))}
          </tr>

          {/* IUA Row */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Initial Unshared Amount (IUA)
            </td>
            {selectedPlans.map(plan => (
              <td key={plan.id} className="px-2 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatCurrency(plan.iua)}
              </td>
            ))}
          </tr>

          {/* Estimated Annual Cost Row */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Estimated Annual Cost
            </td>
            {selectedPlans.map(plan => (
              <td key={plan.id} className="px-2 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatCurrency(plan.estAnnualCost)}
              </td>
            ))}
          </tr>

          {/* Reviews Row */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Reviews
            </td>
            {selectedPlans.map(plan => {
              const ratings = plan.details.providerDetails?.ratings;
              const avgReviewsRaw = ratings?.overall ?? parseFloat(plan.avgReviews);
              const avgReviews = roundUpToHalf(avgReviewsRaw);
              const reviewCount = ratings?.reviewCount ?? plan.reviewCount;
              return (
                <td key={plan.id} className="px-2 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <StarRating rating={avgReviews} />
                    <span>({reviewCount})</span>
                  </div>
                </td>
              );
            })}
          </tr>

          {comparisonRows.map(row => (
            <PlanComparisonRow
              key={row.key}
              label={row.label}
              values={filteredPlanData.map(plan => plan ? plan[row.key as keyof typeof plan] : '')}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
} 