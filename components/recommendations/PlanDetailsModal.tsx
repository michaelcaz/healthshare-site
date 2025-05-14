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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 h-screen">
      {/* Modal */}
      <div className="relative z-50 w-full max-w-4xl bg-white rounded-lg shadow-xl max-h-[100dvh] flex flex-col h-full mt-10 sm:mt-0">
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center gap-4">
            {/* For Knew Health and Crowd Health plans, don't show plan name */}
            {(plan.plan.id?.toLowerCase().includes('knew') || plan.plan.id?.toLowerCase().includes('crowd')) ? (
              <h2 className="text-2xl font-bold">{plan.plan.providerName}</h2>
            ) : (
              <h2 className="text-2xl font-bold">{plan.plan.planName}</h2>
            )}
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Rating Section - Updated to use new components */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-3 bg-gray-50 gap-4 sm:gap-0">
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
                {/* Hard-code rating values for Knew Health */}
                {isKnewHealthPlan ? (
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
        
        <div className="flex border-b px-6 sticky top-[131px] bg-white z-10">
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
        
        <div className="p-6 flex-1 min-h-0 overflow-y-auto pb-20 sm:pb-8">
          {activeTab === 'overview' && <Overview plan={plan} age={age} coverageType={coverageType} iuaPreference={iuaPreference} visitFrequency={visitFrequency} questionnaire={questionnaire} />}
          {activeTab === 'coverage' && <CoverageDetails plan={plan} age={age} coverageType={coverageType} iuaPreference={iuaPreference} visitFrequency={visitFrequency} />}
          {activeTab === 'medical' && <MedicalServices plan={plan} />}
        </div>
      </div>
    </div>
  )
} 