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
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { RatingStars } from '@/components/ui/rating-stars'

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
    <div className="w-full">
      <div className="hidden md:block overflow-x-auto">
        <Table className="min-w-full border-separate border-spacing-y-2">
          <TableHeader>
            <TableRow>
              <TableHead className="sticky left-0 z-10 bg-white/95 backdrop-blur border-r border-gray-100 min-w-[160px]">Plan Details</TableHead>
              {selectedPlans.map((plan, idx) => (
                <TableHead key={plan.id} className="text-center min-w-[200px]">
                  <div className="flex flex-col items-center gap-2">
                    {idx === 0 && (
                      <Badge variant="primary" size="sm" className="mb-1">Top Recommendation</Badge>
                    )}
                    <ProviderLogo providerName={plan.providerName} size="md" />
                    <span className="font-semibold text-base">{plan.planName}</span>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="sticky left-0 z-10 bg-white/95 border-r border-gray-100 font-medium">Monthly Cost</TableCell>
              {selectedPlans.map(plan => (
                <TableCell key={plan.id} className="text-center font-medium">{formatCurrency(plan.monthlyCost)}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="sticky left-0 z-10 bg-white/95 border-r border-gray-100 font-medium">IUA</TableCell>
              {selectedPlans.map(plan => (
                <TableCell key={plan.id} className="text-center">{formatCurrency(plan.iua)}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="sticky left-0 z-10 bg-white/95 border-r border-gray-100 font-medium">Estimated Annual Cost</TableCell>
              {selectedPlans.map(plan => (
                <TableCell key={plan.id} className="text-center">{formatCurrency(plan.estAnnualCost)}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="sticky left-0 z-10 bg-white/95 border-r border-gray-100 font-medium">Reviews</TableCell>
              {selectedPlans.map(plan => (
                <TableCell key={plan.id} className="text-center">
                  <RatingStars rating={parseFloat(plan.avgReviews)} reviewCount={plan.reviewCount} size="md" showValue />
                </TableCell>
              ))}
            </TableRow>
            {/* Feature rows */}
            {comparisonRows.map(row => (
              <PlanComparisonRow
                key={row.key}
                label={row.label}
                values={filteredPlanData.map(plan => plan ? String(plan[row.key as keyof typeof plan] ?? '') : '')}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Mobile card view */}
      <div className="md:hidden flex flex-col gap-6">
        {selectedPlans.map((plan, idx) => (
          <div key={plan.id} className="bg-white rounded-xl shadow p-4 border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              {idx === 0 && (
                <Badge variant="primary" size="sm" className="mb-1">Top Recommendation</Badge>
              )}
              <ProviderLogo providerName={plan.providerName} size="sm" />
              <div>
                <div className="font-semibold text-lg">{plan.planName}</div>
              </div>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <div className="flex justify-between"><span>Monthly Cost</span><span className="font-medium">{formatCurrency(plan.monthlyCost)}</span></div>
              <div className="flex justify-between"><span>IUA</span><span>{formatCurrency(plan.iua)}</span></div>
              <div className="flex justify-between"><span>Est. Annual Cost</span><span>{formatCurrency(plan.estAnnualCost)}</span></div>
              <div className="flex justify-between"><span>Reviews</span><RatingStars rating={parseFloat(plan.avgReviews)} reviewCount={plan.reviewCount} size="sm" showValue /></div>
              {comparisonRows.map(row => (
                <div key={row.key} className="flex justify-between">
                  <span>{row.label}</span>
                  <span>{filteredPlanData[idx] ? String((filteredPlanData[idx] as any)[row.key] ?? '') : ''}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 