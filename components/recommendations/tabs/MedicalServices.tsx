import { type PlanRecommendation } from '../types'
import { Ambulance, Stethoscope, Pill } from 'lucide-react'
import React from 'react'
import { planDetailsData } from '@/data/plan-details-data'
import { defaultPlanDetailsData } from '@/types/plan-details'
import { markdownToBold } from '@/lib/utils'
import { getPlanDetailsData } from '@/lib/utils/plan-data'

interface MedicalServicesProps {
  plan: PlanRecommendation
}

export const MedicalServices: React.FC<MedicalServicesProps> = ({ plan }) => {
  // Get plan-specific details using the utility function
  const planData = getPlanDetailsData(plan.plan);
  
  // Add debug logs
  console.log('MedicalServices - Plan ID:', plan.plan.id);
  console.log('MedicalServices - Plan Data Found:', !!planData);

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
              <p className="mb-2" dangerouslySetInnerHTML={{ __html: markdownToBold(planData.medicalServices.emergencyCare) }}></p>
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
              <p className="mb-2" dangerouslySetInnerHTML={{ __html: markdownToBold(planData.medicalServices.surgeryAndTreatment) }}></p>
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
              <p className="mb-2" dangerouslySetInnerHTML={{ __html: markdownToBold(planData.medicalServices.prescriptionDrugs) }}></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 