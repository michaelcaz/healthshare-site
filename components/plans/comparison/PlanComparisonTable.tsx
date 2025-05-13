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
const getProviderLogoPath = (providerName: string): string => {
  const normalizedName = providerName.toLowerCase().replace(/\s+/g, '-')
  return `/images/providers/${normalizedName}.png`
}

const extractPrescriptionInfo = (planDetails: PlanDetailsData) => {
  const prescriptionText = planDetails.medicalServices.prescriptionDrugs || ''
  
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

// Main Component
export function PlanComparisonTable({ questionnaire }: { questionnaire?: any }) {
  const searchParams = useSearchParams()
  const [selectedPlans, setSelectedPlans] = useState<PlanData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPlans = async () => {
      try {
        // Get plan IDs from URL parameters
        const planIds = searchParams.get('plans')?.split(',') || []
        
        // Filter plan details data based on selected plan IDs
        const plans = planIds
          .map(planId => {
            const planDetails = planDetailsData[planId]
            const pricingPlan = providerPlans.find(p => p.id === planId)
            
            if (!planDetails || !pricingPlan) return null
            
            // Get the first pricing option for the 18-29 age bracket and Member Only household type
            const pricingMatrix = pricingPlan.planMatrix.find(
              m => m.ageBracket === '18-29' && m.householdType === 'Member Only'
            )
            
            const costs = pricingMatrix?.costs[0] || { monthlyPremium: 0, initialUnsharedAmount: 0 }
            
            return {
              id: planId,
              planName: pricingPlan.planName,
              providerName: pricingPlan.providerName,
              monthlyCost: costs.monthlyPremium,
              iua: costs.initialUnsharedAmount,
              estAnnualCost: costs.monthlyPremium * 12,
              avgReviews: "4.5",
              reviewCount: 100,
              details: planDetails
            }
          })
          .filter((plan): plan is PlanData => plan !== null)

        setSelectedPlans(plans)
      } catch (error) {
        console.error('Error loading plans:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPlans()
  }, [searchParams])

  const removePlan = (planId: string) => {
    setSelectedPlans(prev => prev.filter(plan => plan.id !== planId))
  }

  if (isLoading) {
    return <div>Loading plans...</div>
  }

  if (selectedPlans.length === 0) {
    return <div>No plans selected for comparison</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        {/* Table header */}
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Plan Details
            </th>
            {selectedPlans.map(plan => (
              <th key={plan.id} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
              <td key={plan.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Image
                    src={getProviderLogoPath(plan.providerName)}
                    alt={`${plan.providerName} logo`}
                    width={24}
                    height={24}
                    className="rounded-sm"
                  />
                  {plan.providerName}
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
              <td key={plan.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
              <td key={plan.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
              <td key={plan.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatCurrency(plan.estAnnualCost)}
              </td>
            ))}
          </tr>

          {/* Reviews Row */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Reviews
            </td>
            {selectedPlans.map(plan => (
              <td key={plan.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <StarRating rating={parseFloat(plan.avgReviews)} />
                  <span>({plan.reviewCount})</span>
                </div>
              </td>
            ))}
          </tr>

          {/* Prescription Drugs Row */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Prescription Drugs
            </td>
            {selectedPlans.map(plan => {
              const prescriptionInfo = extractPrescriptionInfo(plan.details)
              return (
                <td key={plan.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="space-y-1">
                    <div>Generic: {prescriptionInfo.generic}</div>
                    <div>Brand: {prescriptionInfo.brand}</div>
                    <div>Preferred Brand: {prescriptionInfo.preferredBrand}</div>
                    <div>Specialty: {prescriptionInfo.specialty}</div>
                  </div>
                </td>
              )
            })}
          </tr>

          {/* Pregnancy Coverage Row */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Pregnancy Coverage
            </td>
            {selectedPlans.map(plan => {
              const pregnancyInfo = extractPregnancyInfo(plan.details, plan)
              return (
                <td key={plan.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="space-y-1">
                    <div>Prenatal Care: {pregnancyInfo.prenatalCare}</div>
                    <div>Delivery: {pregnancyInfo.delivery}</div>
                    <div>Waiting Period: {pregnancyInfo.waitingPeriod}</div>
                  </div>
                </td>
              )
            })}
          </tr>

          {/* Pre-existing Conditions Row */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Pre-existing Conditions
            </td>
            {selectedPlans.map(plan => {
              const preExistingInfo = extractPreExistingInfo(plan.details)
              return (
                <td key={plan.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Waiting Period: {preExistingInfo.waitingPeriod}
                </td>
              )
            })}
          </tr>

          {/* Alternative Medicine Row */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Alternative Medicine
            </td>
            {selectedPlans.map(plan => (
              <td key={plan.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {hasAlternativeMedicineCoverage(plan.details) ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <X className="h-5 w-5 text-red-500" />
                )}
              </td>
            ))}
          </tr>

          {/* Preventative Services Row */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Preventative Services
            </td>
            {selectedPlans.map(plan => (
              <td key={plan.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {hasPreventativeServices(plan.details, plan) ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <X className="h-5 w-5 text-red-500" />
                )}
              </td>
            ))}
          </tr>

          {/* Lifetime Limit Row */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Lifetime Limit
            </td>
            {selectedPlans.map(plan => (
              <td key={plan.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {extractLifetimeLimit(plan.details, plan)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
} 