'use client';

import { Plan } from '@/types/plans';
import { CheckCircle2, XCircle, AlertCircle, Clock, InfoIcon } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';

interface PlanCoverageDetailsProps {
  plan: Plan;
}

export default function PlanCoverageDetails({ plan }: PlanCoverageDetailsProps) {
  const renderCoverageStatus = (isIncluded: boolean, details?: string) => {
    if (isIncluded) {
      return (
        <div className="flex items-center">
          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
          <span className="font-medium">Included</span>
          {details && (
            <Tooltip content={details}>
              <InfoIcon className="h-4 w-4 text-gray-400 ml-2 cursor-help" />
            </Tooltip>
          )}
        </div>
      );
    }
    
    return (
      <div className="flex items-center">
        <XCircle className="h-5 w-5 text-red-500 mr-2" />
        <span className="font-medium">Not included</span>
        {details && (
          <Tooltip content={details}>
            <InfoIcon className="h-4 w-4 text-gray-400 ml-2 cursor-help" />
          </Tooltip>
        )}
      </div>
    );
  };

  const renderPreExistingConditions = () => {
    const statusMap = {
      'Eligible': { icon: CheckCircle2, color: 'text-green-500', label: 'Eligible' },
      'Limited': { icon: AlertCircle, color: 'text-amber-500', label: 'Limited' },
      'Not Eligible': { icon: XCircle, color: 'text-red-500', label: 'Not eligible' }
    };
    
    const status = statusMap[plan.preExistingConditions];
    const Icon = status.icon;
    
    return (
      <div className="flex items-center">
        <Icon className={`h-5 w-5 ${status.color} mr-2`} />
        <span className="font-medium">{status.label}</span>
        {plan.preExistingConditionsDetails && (
          <Tooltip content={plan.preExistingConditionsDetails}>
            <InfoIcon className="h-4 w-4 text-gray-400 ml-2 cursor-help" />
          </Tooltip>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Waiting Periods</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <span className="text-gray-700">Accident:</span>
              <span className="font-medium">{plan.waitingPeriods?.accident || 'None'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <span className="text-gray-700">Illness:</span>
              <span className="font-medium">{plan.waitingPeriods?.illness || 'None'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <span className="text-gray-700">Maternity:</span>
              <span className="font-medium">{plan.waitingPeriods?.maternity || 'Not covered'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <span className="text-gray-700">Preventive:</span>
              <span className="font-medium">{plan.waitingPeriods?.preventive || 'None'}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Coverage Details</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 border-b">
            <span className="font-medium">Maternity</span>
            {renderCoverageStatus(plan.maternity, plan.maternityDetails)}
          </div>
          
          <div className="flex justify-between items-center p-3 border-b">
            <span className="font-medium">Preventive Care</span>
            {renderCoverageStatus(plan.preventiveCare, plan.preventiveCareDetails)}
          </div>
          
          <div className="flex justify-between items-center p-3 border-b">
            <span className="font-medium">Specialist Care</span>
            {renderCoverageStatus(plan.specialistCare, plan.specialistCareDetails)}
          </div>
          
          <div className="flex justify-between items-center p-3 border-b">
            <span className="font-medium">Mental Health</span>
            {renderCoverageStatus(plan.mentalHealth, plan.mentalHealthDetails)}
          </div>
          
          <div className="flex justify-between items-center p-3">
            <span className="font-medium">Pre-existing Conditions</span>
            {renderPreExistingConditions()}
          </div>
        </div>
      </div>
      
      {plan.eligibilityRestrictions && plan.eligibilityRestrictions.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Eligibility Restrictions</h3>
          <div className="bg-amber-50 p-4 rounded-lg">
            <ul className="list-disc list-inside space-y-2 text-amber-800">
              {plan.eligibilityRestrictions.map((restriction, index) => (
                <li key={index}>{restriction}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
} 