'use client';

import { useState } from 'react';
import { PricingPlan, AgeBracket, HouseholdType } from '@/types/provider-plans';
import { findPlanCosts, formatCurrency } from '@/utils/plan-utils';

interface PlanDetailsProps {
  plan: PricingPlan;
}

export function PlanDetails({ plan }: PlanDetailsProps) {
  const [ageBracket, setAgeBracket] = useState<AgeBracket>('30-39');
  const [householdType, setHouseholdType] = useState<HouseholdType>('Member Only');

  const costs = findPlanCosts(plan, ageBracket, householdType);

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">{plan.planName}</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Provider</label>
            <p className="mt-1">{plan.providerName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Maximum Coverage</label>
            <p className="mt-1">{plan.maxCoverage}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Annual Unshared Amount</label>
            <p className="mt-1">{plan.annualUnsharedAmount}</p>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <select
            value={ageBracket}
            onChange={(e) => setAgeBracket(e.target.value as AgeBracket)}
            className="rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="18-29">18-29</option>
            <option value="30-39">30-39</option>
            <option value="40-49">40-49</option>
            <option value="50-64">50-64</option>
          </select>

          <select
            value={householdType}
            onChange={(e) => setHouseholdType(e.target.value as HouseholdType)}
            className="rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="Member Only">Individual</option>
            <option value="Member & Spouse">Individual + Spouse</option>
            <option value="Member & Child(ren)">Individual + Children</option>
            <option value="Member & Family">Family</option>
          </select>
        </div>

        {costs ? (
          <div className="space-y-4">
            {costs.map((cost) => (
              <div 
                key={cost.initialUnsharedAmount}
                className="border rounded-lg p-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Monthly Premium
                    </label>
                    <p className="mt-1 text-2xl font-bold">
                      {formatCurrency(cost.monthlyPremium)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Initial Unshared Amount
                    </label>
                    <p className="mt-1 text-2xl font-bold">
                      {formatCurrency(cost.initialUnsharedAmount)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No pricing available for selected criteria</p>
        )}
      </div>
    </div>
  );
} 