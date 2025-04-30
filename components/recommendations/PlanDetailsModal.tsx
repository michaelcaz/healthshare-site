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
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto pt-10 pb-10">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-50 w-full max-w-4xl bg-white rounded-lg shadow-xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">{plan.plan.planName}</h2>
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
        <div className="flex items-center justify-between px-6 py-3 bg-gray-50">
          <div className="flex items-center space-x-6">
            <div className="flex flex-col">
              <div className="flex items-center">
                <MatchScore score={plan.score} size="lg" showLabel={true} />
              </div>
              <span className="text-xs text-gray-500 mt-1">Based on your preferences</span>
            </div>

            <div className="h-10 border-l border-gray-300"></div>
            
            <div className="flex flex-col">
              <div className="flex items-center">
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
              <span className="text-xs text-gray-500 mt-1">Member rating</span>
            </div>

            <div className="h-10 border-l border-gray-300"></div>
            
            <div className="flex flex-col">
              <div className="flex items-center">
                <Building className="h-5 w-5 text-blue-600 mr-1.5" />
                <span className="font-medium text-lg">
                  {planData && planData.providerDetails ? 
                    new Date().getFullYear() - planData.providerDetails.yearEstablished : 
                    "5+"} Years
                </span>
              </div>
              <span className="text-xs text-gray-500 mt-1">In operation</span>
            </div>

            <div className="h-10 border-l border-gray-300"></div>
            
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="font-medium">BBB Rating:</span>
                <span className="ml-2 font-bold text-green-600">
                  {(() => {
                    const rating = planData && planData.providerDetails 
                      ? planData.providerDetails.ratings?.bbbRating 
                      : "A";
                    return rating.replace(/\*\*/g, '');
                  })()}
                </span>
              </div>
              <span className="text-xs text-gray-500 mt-1">
                {planData && planData.providerDetails && planData.providerDetails.memberSatisfaction 
                  ? `${planData.providerDetails.memberSatisfaction} member satisfaction`
                  : "Member satisfaction rating"}
              </span>
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
        
        <div className="p-6 overflow-y-auto">
          {activeTab === 'overview' && <Overview plan={plan} age={age} coverageType={coverageType} iuaPreference={iuaPreference} visitFrequency={visitFrequency} questionnaire={questionnaire} />}
          {activeTab === 'coverage' && <CoverageDetails plan={plan} age={age} coverageType={coverageType} iuaPreference={iuaPreference} visitFrequency={visitFrequency} />}
          {activeTab === 'medical' && <MedicalServices plan={plan} />}
        </div>
      </div>
    </div>
  )
} 