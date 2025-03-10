import { type PlanRecommendation } from '../types'
import { Ambulance, Stethoscope, Pill, Baby } from 'lucide-react'
import React from 'react'
import { planDetailsData } from '@/data/plan-details-data'
import { defaultPlanDetailsData } from '@/types/plan-details'

interface MedicalServicesProps {
  plan: PlanRecommendation
}

export const MedicalServices: React.FC<MedicalServicesProps> = ({ plan }) => {
  // Get plan-specific details or fall back to default data
  const planData = planDetailsData[plan.plan.id] || defaultPlanDetailsData;

  return (
    <div className="space-y-8">
      {/* Emergency Care */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Emergency Care</h3>
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          <Ambulance className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium">Emergency Services</div>
            <div className="text-sm text-gray-600 mt-1">
              <p className="mb-2">{planData.medicalServices.emergencyCare}</p>
              <p>Maximum Coverage: {plan.plan.maxCoverage}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Surgery & Treatment */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Surgery & Treatment</h3>
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          <Stethoscope className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium">Surgical Procedures & Treatments</div>
            <div className="text-sm text-gray-600 mt-1">
              <p className="mb-2">{planData.medicalServices.surgeryAndTreatment}</p>
              <p>
                <a 
                  href={plan.plan.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View full medical guidelines
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prescription Drugs */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Prescription Drugs</h3>
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          <Pill className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium">Prescription Coverage</div>
            <div className="text-sm text-gray-600 mt-1">
              <p className="mb-2">{planData.medicalServices.prescriptionDrugs}</p>
              <p>
                <a 
                  href={plan.plan.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View {plan.plan.providerName}'s prescription details
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pregnancy */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Pregnancy</h3>
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          <Baby className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium">Maternity Coverage</div>
            <div className="text-sm text-gray-600 mt-1">
              <p className="mb-2">{planData.medicalServices.pregnancy}</p>
              <p>
                <a 
                  href={plan.plan.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View {plan.plan.providerName}'s maternity guidelines
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 