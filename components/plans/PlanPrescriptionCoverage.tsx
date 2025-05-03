'use client';

import { Plan } from '@/types/plans';
import { Tablet, CheckCircle2, XCircle, AlertCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface PlanPrescriptionCoverageProps {
  plan: Plan;
}

export default function PlanPrescriptionCoverage({ plan }: PlanPrescriptionCoverageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const getCoverageIcon = () => {
    switch (plan.prescriptionCoverage) {
      case 'Full':
        return <CheckCircle2 className="h-10 w-10 text-green-600" />;
      case 'Limited':
        return <AlertCircle className="h-10 w-10 text-amber-600" />;
      case 'None':
        return <XCircle className="h-10 w-10 text-red-600" />;
      default:
        return <Tablet className="h-10 w-10 text-gray-400" />;
    }
  };
  
  const getCoverageDescription = () => {
    switch (plan.prescriptionCoverage) {
      case 'Full':
        return "This plan includes comprehensive prescription drug coverage for eligible medications.";
      case 'Limited':
        return "This plan offers limited prescription coverage, typically for generic medications or specific situations.";
      case 'None':
        return "This plan does not include prescription drug coverage. You'll need to pay out-of-pocket for medications.";
      default:
        return "Prescription coverage information not available.";
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-start">
          <div className="mr-4">
            {getCoverageIcon()}
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">{plan.prescriptionCoverage} Coverage</h3>
            <p className="text-gray-700">
              {getCoverageDescription()}
            </p>
            {plan.prescriptionDetails && (
              <p className="mt-2 text-gray-700">
                {plan.prescriptionDetails}
              </p>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Medication Search</h3>
        <p className="text-gray-700 mb-4">
          Check if your medication may be covered under this plan.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Enter medication name" 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="button" className="shrink-0">
            Search
          </Button>
        </div>
        
        <div className="text-center p-6 border border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-600">
            Please note that medication coverage may vary. Contact the healthshare directly for the most accurate information about your specific medications.
          </p>
        </div>
      </div>
      
      {plan.prescriptionCoverage !== 'None' && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Common Coverage Rules</h3>
          <div className="space-y-4">
            <div className="flex items-start p-3 border-b">
              <Tablet className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium">Generic Medications</h4>
                <p className="text-sm text-gray-600">
                  Generic medications are typically covered at a higher rate than brand-name drugs.
                </p>
              </div>
            </div>
            
            <div className="flex items-start p-3 border-b">
              <Tablet className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium">Prior Authorization</h4>
                <p className="text-sm text-gray-600">
                  Some medications may require prior authorization from the healthshare before coverage applies.
                </p>
              </div>
            </div>
            
            <div className="flex items-start p-3">
              <Tablet className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium">Maintenance Medications</h4>
                <p className="text-sm text-gray-600">
                  Long-term or maintenance medications often have different coverage rules than medications for acute conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {plan.prescriptionCoverage === 'None' && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-md font-medium text-blue-800 mb-2">Prescription Savings Tips</h3>
          <ul className="space-y-2 text-blue-700">
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 mt-0.5 shrink-0" />
              <span>Ask your doctor about generic alternatives to brand-name medications.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 mt-0.5 shrink-0" />
              <span>Use pharmacy discount cards like GoodRx to find better prices.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 mt-0.5 shrink-0" />
              <span>Compare prices at different pharmacies, as they can vary significantly.</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
} 