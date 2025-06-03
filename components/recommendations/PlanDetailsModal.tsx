'use client'

import { type PlanRecommendation } from './types'
import { X, Star, Building } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { type QuestionnaireResponse } from '@/types/questionnaire'
import { Overview } from './tabs/Overview'
import { CoverageDetails } from './tabs/CoverageDetails'
import { MedicalServices } from './tabs/MedicalServices'
import { planDetailsData } from '@/data/plan-details-data'
import { RatingStars } from '@/components/ui/rating-stars'
import { MatchScore } from '@/components/ui/match-score'
import { ProviderLogo } from './ProviderLogo'
import { useRouter } from 'next/navigation'
import { BottomCTAAction } from '@/components/ui/MobileBottomCTAAction'

interface PlanDetailsModalProps {
  plan: PlanRecommendation
  isOpen: boolean
  onClose: () => void
  questionnaire?: QuestionnaireResponse
}

export function PlanDetailsModal({ 
  plan, 
  isOpen, 
  onClose,
  questionnaire
}: PlanDetailsModalProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const router = useRouter();
  
  if (!isOpen) return null
  
  // Extract relevant questionnaire data for cost calculations
  console.log('PlanDetailsModal - Questionnaire:', questionnaire);
  const age = questionnaire?.age || 35; // Default to middle of 30-39 range
  const coverageType = questionnaire?.coverage_type || 'just_me'; // Default to single coverage
  const iuaPreference = questionnaire?.iua_preference || '2500'; // Default to middle IUA tier
  const visitFrequency = questionnaire?.visit_frequency || 'just_checkups'; // Default to annual checkups
  console.log('PlanDetailsModal - Extracted Data:', { age, coverageType, iuaPreference, visitFrequency });
  
  // Get plan data
  const planData = plan.plan.id && planDetailsData[plan.plan.id];
  
  // Check if this is a Knew Health plan
  const isKnewHealthPlan = plan.plan.id?.toLowerCase().includes('knew') || 
                           plan.plan.providerName?.toLowerCase().includes('knew');
  
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 h-screen">
      {/* Modal */}
      <div className="relative z-50 w-full max-w-4xl bg-white rounded-lg shadow-xl max-h-[100dvh] flex flex-col h-full mt-6 md:mt-10 sm:mt-0">
        {/* Sticky header + tabs block */}
        <div className="sticky top-0 z-10 bg-white">
          {/* Header */}
          <div className="flex justify-between items-center p-4 sm:p-6 border-b">
            <div className="flex items-center gap-4 min-w-0 w-full">
              <ProviderLogo providerName={plan.plan.providerName} size="lg" className="flex-shrink-0" />
              {/* Only show plan name for non-Crowd/Knew plans */}
              {!(plan.plan.id?.toLowerCase().includes('knew') || plan.plan.id?.toLowerCase().includes('crowd')) && (
                <div className="min-w-0 flex flex-col">
                  <h2 className="text-xl sm:text-2xl font-bold break-words whitespace-normal leading-tight truncate sm:whitespace-normal sm:truncate-0">{plan.plan.planName}</h2>
                </div>
              )}
            </div>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700 ml-2 flex-shrink-0"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {/* Tabs */}
          <div className="flex border-b px-0 sm:px-6">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'coverage', label: 'Coverage Details' },
              { id: 'medical', label: 'Medical Services' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'px-4 py-2 font-medium',
                  activeTab === tab.id 
                    ? 'border-b-2 border-blue-500 text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {/* Scrollable content: trust row and main content */}
        <div className="p-4 sm:p-6 flex-1 min-h-0 overflow-y-auto pb-32 sm:pb-8 md:pb-44">
          {/* Trust row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 border-b border-gray-200 mb-4 pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 w-full">
              <div className="flex flex-col items-center sm:items-start flex-1 min-w-0">
                <div className="flex items-center justify-center sm:justify-start w-full">
                  <MatchScore score={plan.score} size="lg" showLabel={true} />
                </div>
                <span className="text-xs text-gray-500 mt-1 text-center sm:text-left">Based on your preferences</span>
              </div>
              <div className="hidden sm:block h-10 border-l border-gray-300 mx-4"></div>
              <div className="flex flex-col items-center sm:items-start flex-1 min-w-0 mt-4 sm:mt-0">
                <div className="flex items-center justify-center sm:justify-start w-full">
                  {plan.plan.id?.toLowerCase().includes('crowd') && planDetailsData['crowdhealth-membership'] && planDetailsData['crowdhealth-membership'].providerDetails ? (
                    <RatingStars
                      rating={planDetailsData['crowdhealth-membership'].providerDetails.ratings?.overall ?? 4.8}
                      size="lg"
                      showValue={true}
                      reviewCount={planDetailsData['crowdhealth-membership'].providerDetails.ratings?.reviewCount ?? 450}
                    />
                  ) : isKnewHealthPlan ? (
                    <RatingStars 
                      rating={4.7} 
                      size="lg"
                      showValue={true}
                      reviewCount={137}
                    />
                  ) : (
                    <RatingStars 
                      rating={planData && planData.providerDetails ? planData.providerDetails.ratings?.overall || 4.5 : 4.5} 
                      size="lg"
                      showValue={true}
                      reviewCount={planData && planData.providerDetails ? planData.providerDetails.ratings?.reviewCount || 150 : 150}
                    />
                  )}
                </div>
                <span className="text-xs text-gray-500 mt-1 text-center sm:text-left">Member rating</span>
              </div>
              <div className="hidden sm:block h-10 border-l border-gray-300 mx-4"></div>
              <div className="flex flex-col items-center sm:items-start flex-1 min-w-0 mt-4 sm:mt-0">
                <div className="flex items-center justify-center sm:justify-start w-full">
                  <Building className="h-5 w-5 text-blue-600 mr-1.5" />
                  <span className="font-medium text-lg">
                    {planData && planData.providerDetails ? 
                      new Date().getFullYear() - planData.providerDetails.yearEstablished : 
                      "5+"} Years
                  </span>
                </div>
                <span className="text-xs text-gray-500 mt-1 text-center sm:text-left">In operation</span>
              </div>
            </div>
          </div>
          {/* Main tab content */}
          {activeTab === 'overview' && <Overview plan={plan} age={age} coverageType={coverageType} iuaPreference={iuaPreference} visitFrequency={visitFrequency} questionnaire={questionnaire} />}
          {activeTab === 'coverage' && <CoverageDetails plan={plan} age={age} coverageType={coverageType} iuaPreference={iuaPreference} visitFrequency={visitFrequency} />}
          {activeTab === 'medical' && <MedicalServices plan={plan} />}
        </div>
      </div>
      {/* Mobile sticky CTA (Sign Up Now) - fixed at viewport bottom */}
      <BottomCTAAction
        mode="signup"
        onSignup={() => {
          // Find the selected cost object based on iuaPreference
          const iuaPref = iuaPreference ? Number(iuaPreference) : undefined;
          let selectedCost;
          if (iuaPref && Array.isArray(plan.plan.planMatrix)) {
            for (const matrix of plan.plan.planMatrix) {
              selectedCost = matrix.costs.find(cost => cost.initialUnsharedAmount === iuaPref);
              if (selectedCost) break;
            }
          }
          const signupUrl = selectedCost?.sourceUrl || plan.plan.sourceUrl;
          if (signupUrl) {
            window.location.href = signupUrl;
          } else {
            alert('No affiliate link available for this plan.');
          }
        }}
        label="Sign up now"
        isVisible={true}
      />
    </div>
  )
} 