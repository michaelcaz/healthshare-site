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
  topRecommendationId: string;
  renderLogo?: (providerName: string, size?: 'sm' | 'md' | 'lg' | 'xl') => React.ReactNode;
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

const hasDetails = (obj: any): obj is { details: any } => obj && typeof obj === 'object' && 'details' in obj;

const getDetailsData = (plan: PlanData) => {
  // Try direct match
  if (planDetailsData[plan.id]) return planDetailsData[plan.id];
  // Crowd Health fallback
  if (plan.id.toLowerCase().includes('crowd')) return planDetailsData['crowdhealth-membership'];
  // Knew Health fallback
  if (plan.id.toLowerCase().includes('knew')) return planDetailsData['knew-health'];
  // Sedera Access+ DPC/VPC fallback
  if (plan.id.toLowerCase().includes('dpc') || plan.id.toLowerCase().includes('vpc')) return planDetailsData['sedera-access+-+dpc/vpc'];
  // Sedera Access+ fallback
  if (plan.id.toLowerCase().includes('sedera-access+')) return planDetailsData['sedera-access+'];
  // Zion Essential fallback
  if (plan.id.toLowerCase().includes('essential')) return planDetailsData['zion-healthshare-essential-membership'];
  // Zion Direct fallback
  if (plan.id.toLowerCase().includes('direct')) return planDetailsData['zion-healthshare-direct-membership'];
  return undefined;
};

const getFeatureData = (plan: PlanData) => {
  if (plan.id.toLowerCase().includes('crowd')) return planData.find(p => p.planName === 'Crowd Health');
  if (plan.id.toLowerCase().includes('knew')) return planData.find(p => p.planName === 'Knew Health');
  if (plan.id.toLowerCase().includes('sedera-access+') && (plan.id.toLowerCase().includes('dpc') || plan.id.toLowerCase().includes('vpc')))
    return planData.find(p => p.planName === 'Sedera Access+ DPC');
  if (plan.id.toLowerCase().includes('sedera-access+')) return planData.find(p => p.planName === 'Sedera Access+');
  if (plan.id.toLowerCase().includes('essential')) return planData.find(p => p.planName === 'Zion Essential');
  if (plan.id.toLowerCase().includes('direct')) return planData.find(p => p.planName === 'Zion Direct');
  return planData.find(p => p.planName === plan.planName);
};

// Main Component
export function PlanComparisonTable({ selectedPlans, topRecommendationId, renderLogo }: PlanComparisonTableProps) {
  console.log('PlanComparisonTable received selectedPlans:', selectedPlans);

  if (!selectedPlans || selectedPlans.length === 0) {
    return <div className="text-gray-600 text-center py-8">No plans selected for comparison</div>;
  }

  return (
    <div className="w-full">
      <div className="hidden md:block overflow-x-auto">
        <Table className="min-w-full border-separate border-spacing-y-2 font-sans" style={{ fontFamily: 'Inter, Lato, Work Sans, sans-serif' }}>
          <TableHeader>
            <TableRow>
              <TableHead className="sticky left-0 z-10 bg-gradient-to-r from-blue-50 via-white to-white/80 backdrop-blur border-r border-gray-100 min-w-[160px] text-gray-700 text-base font-semibold rounded-tl-xl">Plan Details</TableHead>
              {selectedPlans.map((plan) => {
                const canonicalName = getFeatureData(plan)?.planName?.toLowerCase();
                return (
                  <TableHead key={plan.id} className="text-center min-w-[220px] bg-gradient-to-b from-white via-blue-50 to-white/80 rounded-tr-xl">
                    <div className="flex flex-col items-center gap-2">
                      {plan.id === topRecommendationId && (
                        <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-indigo-100 via-blue-100 to-blue-50 text-indigo-700 font-semibold text-xs shadow-sm mb-1 animate-fade-in">Top Recommendation</span>
                      )}
                      {renderLogo
                        ? renderLogo(plan.providerName, 'md')
                        : <ProviderLogo providerName={plan.providerName} size="md" className="mb-1 drop-shadow-md" />}
                      {canonicalName !== 'crowd health' && canonicalName !== 'knew health' && (
                        <span className="font-bold text-lg text-gray-900 tracking-tight">{plan.planName}</span>
                      )}
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="sticky left-0 z-10 bg-gradient-to-r from-blue-50 via-white to-white/80 border-r border-gray-100 font-medium text-gray-700">Monthly Cost</TableCell>
              {selectedPlans.map(plan => (
                <TableCell key={plan.id} className="text-center font-bold text-indigo-700 text-base">{formatCurrency(plan.monthlyCost)}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="sticky left-0 z-10 bg-gradient-to-r from-blue-50 via-white to-white/80 border-r border-gray-100 font-medium text-gray-700">IUA</TableCell>
              {selectedPlans.map(plan => (
                <TableCell key={plan.id} className="text-center font-semibold text-gray-800">{formatCurrency(plan.iua)}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="sticky left-0 z-10 bg-gradient-to-r from-blue-50 via-white to-white/80 border-r border-gray-100 font-medium text-gray-700">Estimated Annual Cost</TableCell>
              {selectedPlans.map(plan => (
                <TableCell key={plan.id} className="text-center font-semibold text-gray-800">{formatCurrency(plan.estAnnualCost)}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="sticky left-0 z-10 bg-gradient-to-r from-blue-50 via-white to-white/80 border-r border-gray-100 font-medium text-gray-700">Reviews</TableCell>
              {selectedPlans.map((plan) => {
                const details = getDetailsData(plan);
                const avgReviews = details?.providerDetails?.ratings?.overall || plan.avgReviews;
                const reviewCount = details?.providerDetails?.ratings?.reviewCount || plan.reviewCount;
                return (
                  <TableCell key={plan.id} className="text-center">
                    <RatingStars rating={parseFloat(String(avgReviews))} reviewCount={Number(reviewCount)} size="md" showValue />
                  </TableCell>
                );
              })}
            </TableRow>
            {/* Feature rows */}
            {comparisonRows.map(row => (
              <PlanComparisonRow
                key={row.key}
                label={row.label}
                values={selectedPlans.map(plan => {
                  const featureData = getFeatureData(plan);
                  const value = featureData ? String((featureData as any)[row.key] ?? '') : '';
                  return value;
                })}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Mobile card view */}
      <div className="md:hidden flex flex-col gap-6">
        {selectedPlans.map((plan) => {
          // Get accurate plan details for reviews and features
          const details = getDetailsData(plan);
          const avgReviews = details?.providerDetails?.ratings?.overall || plan.avgReviews;
          const reviewCount = details?.providerDetails?.ratings?.reviewCount || plan.reviewCount;
          const canonicalName = getFeatureData(plan)?.planName?.toLowerCase();
          return (
            <div key={plan.id} className="bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-2xl shadow-lg p-5 border border-gray-100 hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-3">
                {plan.id === topRecommendationId && (
                  <span className="inline-block px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-100 via-blue-100 to-blue-50 text-indigo-700 font-semibold text-[11px] shadow-sm animate-fade-in max-w-[90px] break-words leading-tight whitespace-nowrap text-center">Top Pick</span>
                )}
                {renderLogo
                  ? renderLogo(plan.providerName, 'lg')
                  : <ProviderLogo providerName={plan.providerName} size="lg" className="mb-1 drop-shadow-md" />}
                {canonicalName !== 'crowd health' && canonicalName !== 'knew health' && (
                  <div className="font-bold text-lg text-gray-900 tracking-tight">{plan.planName}</div>
                )}
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-600 text-xs font-medium" style={{maxWidth:'40%',wordBreak:'break-word',whiteSpace:'normal'}}>Monthly Cost</span><span className="font-bold text-indigo-700">{formatCurrency(plan.monthlyCost)}</span></div>
                <div className="flex justify-between"><span className="text-gray-600 text-xs font-medium" style={{maxWidth:'40%',wordBreak:'break-word',whiteSpace:'normal'}}>IUA</span><span className="font-semibold text-gray-800">{formatCurrency(plan.iua)}</span></div>
                <div className="flex justify-between"><span className="text-gray-600 text-xs font-medium" style={{maxWidth:'40%',wordBreak:'break-word',whiteSpace:'normal'}}>Est. Annual Cost</span><span className="font-semibold text-gray-800">{formatCurrency(plan.estAnnualCost)}</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-600 text-xs font-medium" style={{maxWidth:'40%',wordBreak:'break-word',whiteSpace:'normal'}}>Reviews</span><RatingStars rating={parseFloat(String(avgReviews))} reviewCount={Number(reviewCount)} size="sm" showValue /></div>
                {comparisonRows.map(row => {
                  const value = getFeatureData(plan) ? String((getFeatureData(plan) as any)[row.key] ?? '') : '';
                  return (
                    <div key={row.key} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-b-0">
                      <span className="text-gray-600 text-xs font-medium" style={{maxWidth:'40%',wordBreak:'break-word',whiteSpace:'normal'}}>{row.label}</span>
                      <span className="font-semibold text-gray-800 text-sm flex items-center gap-1">
                        {value === 'check' ? (
                          <svg className="inline-block text-emerald-500 w-5 h-5 align-middle" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M9 12l2 2l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        ) : value === 'x' ? (
                          <svg className="inline-block text-gray-300 w-5 h-5 align-middle" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        ) : (
                          value
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 