'use client';

import { useState } from 'react';
import { AgeBracket, HouseholdType } from '@/types/provider-plans';
import { getPlanComparison, formatCurrency, getAvailableIUALevels } from '@/utils/plan-utils';

interface PlanComparisonProps {
  initialAgeBracket: AgeBracket;
  initialHouseholdType: HouseholdType;
}

export function PlanComparison({ 
  initialAgeBracket, 
  initialHouseholdType 
}: PlanComparisonProps) {
  const [ageBracket, setAgeBracket] = useState<AgeBracket>(initialAgeBracket);
  const [householdType, setHouseholdType] = useState<HouseholdType>(initialHouseholdType);
  const [maxIUA, setMaxIUA] = useState<number | undefined>(undefined);

  const plans = getPlanComparison(ageBracket, householdType, maxIUA);
  const iuaLevels = getAvailableIUALevels();

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <select
          value={ageBracket}
          onChange={(e) => setAgeBracket(e.target.value as AgeBracket)}
          className="rounded-md border border-gray-300 px-3 py-2"
          aria-label="Age bracket"
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
          aria-label="Household type"
        >
          <option value="Member Only">Individual</option>
          <option value="Member & Spouse">Individual + Spouse</option>
          <option value="Member & Child(ren)">Individual + Children</option>
          <option value="Member & Family">Family</option>
        </select>

        <select
          value={maxIUA || ''}
          onChange={(e) => setMaxIUA(e.target.value ? Number(e.target.value) : undefined)}
          className="rounded-md border border-gray-300 px-3 py-2"
          aria-label="Maximum IUA"
        >
          <option value="">Any IUA</option>
          {iuaLevels.map((level) => (
            <option key={level} value={level}>
              Max {formatCurrency(level)} IUA
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Provider</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Plan</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Monthly Premium</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">IUA</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Annual Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {plans.map((plan, index) => (
              <tr 
                key={`${plan.providerName}-${plan.planName}-${plan.initialUnsharedAmount}`}
                className={index === 0 ? 'bg-green-50' : undefined}
              >
                <td className="px-6 py-4 text-sm text-gray-900">{plan.providerName}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{plan.planName}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {formatCurrency(plan.monthlyPremium)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {formatCurrency(plan.initialUnsharedAmount)}
                </td>
                <td 
                  className="px-6 py-4 text-sm text-gray-900"
                  data-testid="annual-cost"
                >
                  {formatCurrency(plan.annualCost)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 