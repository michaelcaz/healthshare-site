'use client';

import { Plan } from '@/types/plans';

interface PlanCostBreakdownProps {
  plan: Plan;
}

export default function PlanCostBreakdown({ plan }: PlanCostBreakdownProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Monthly Cost</h3>
          <p className="text-3xl font-bold text-blue-700">${plan.monthlyCost}</p>
          <p className="text-sm text-gray-600 mt-1">Per household</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Annual Cost</h3>
          <p className="text-3xl font-bold text-blue-700">${plan.monthlyCost * 12}</p>
          <p className="text-sm text-gray-600 mt-1">Estimated total</p>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-medium mb-4">Initial Unshareable Amount (IUA)</h3>
        <p className="text-2xl font-bold mb-2">${plan.iua || 'N/A'}</p>
        <p className="text-gray-700">
          This is the amount you're responsible for before cost sharing begins for each medical incident.
        </p>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium mb-2">Sharing Percentage</h4>
          <p className="text-lg font-semibold">{plan.sharingPercentage || '100%'}</p>
          <p className="text-gray-700 text-sm mt-1">
            After meeting your IUA, this is the percentage of eligible medical costs that will be shared.
          </p>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium mb-2">Annual Member Responsibility</h4>
          <p className="text-lg font-semibold">${plan.annualMemberResponsibility || 'No maximum'}</p>
          <p className="text-gray-700 text-sm mt-1">
            The maximum amount you're responsible for in a 12-month period, including IUAs.
          </p>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-blue-800 mb-2">Additional Fees</h3>
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span>Application Fee</span>
            <span className="font-medium">${plan.applicationFee || 0}</span>
          </li>
          <li className="flex justify-between">
            <span>Annual Renewal Fee</span>
            <span className="font-medium">${plan.annualRenewalFee || 0}</span>
          </li>
          {plan.otherFees && plan.otherFees.map((fee, index) => (
            <li key={index} className="flex justify-between">
              <span>{fee.name}</span>
              <span className="font-medium">${fee.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 