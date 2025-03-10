import { type PlanRecommendation } from './types'
import { 
  Building, 
  Shield, 
  DollarSign, 
  Info, 
  CheckCircle, 
  Pill, 
  Ambulance, 
  Stethoscope, 
  Baby, 
  CreditCard,
  Globe
} from 'lucide-react'
import React from 'react'
import { getPlanCost } from '@/lib/utils/plan-costs'
import { calculateAnnualCost } from '@/utils/plan-utils'

interface PlanDetailsProps {
  plan: PlanRecommendation
  age?: number
  coverageType?: string
  iuaPreference?: string
}

export const PlanDetails: React.FC<PlanDetailsProps> = ({ 
  plan,
  age = 35, // Default to middle of 30-39 range
  coverageType = 'just_me', // Default to single coverage
  iuaPreference = '2500' // Default to middle IUA tier
}) => {
  console.log('PlanDetails rendering for plan:', plan.plan.id);
  
  // Use the same getPlanCost function that the hero component uses
  const costs = getPlanCost(
    plan.plan.id,
    age,
    coverageType as any,
    iuaPreference
  );
  
  console.log('Costs from getPlanCost:', costs);
  
  // Calculate estimated annual cost
  const monthlyPremium = costs?.monthlyPremium || 0;
  const initialUnsharedAmount = costs?.initialUnsharedAmount || 0;
  const estimatedAnnualCost = monthlyPremium * 12 + initialUnsharedAmount;

  return (
    <div className="space-y-8">
      {/* Why is this plan the best? */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Why Is This Plan The Best?</h3>
        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
          <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-sm text-gray-700 mt-1">
              <ul className="list-disc pl-5 space-y-2">
                {plan.explanation.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
                {plan.factors.slice(0, 3).map((factor, index) => (
                  <li key={`factor-${index}`}>
                    <span className="font-medium">{factor.factor}:</span> {Math.round(factor.impact)}% impact on recommendation
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Included for Free */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Included For Free</h3>
        <div className="grid gap-4">
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium">Preventive Care</div>
              <div className="text-sm text-gray-600">
                Annual check-ups and preventive screenings
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium">Telemedicine</div>
              <div className="text-sm text-gray-600">
                24/7 access to virtual doctor visits
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium">Member Support</div>
              <div className="text-sm text-gray-600">
                Dedicated support team to help navigate your healthcare needs
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Initial Unshared Amount (IUA) */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Initial Unshared Amount (IUA)</h3>
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          <DollarSign className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium">How Your IUA Works</div>
            <div className="text-sm text-gray-600 mt-1">
              <p className="mb-2">Your Initial Unshared Amount is ${initialUnsharedAmount.toLocaleString()} per incident.</p>
              <p className="mb-2">This is the amount you pay before the community begins sharing your eligible medical expenses.</p>
              <p>Annual Unshared Amount Structure: {plan.plan.annualUnsharedAmount}</p>
            </div>
          </div>
        </div>
      </section>

      {/* What's the network? */}
      <section>
        <h3 className="text-xl font-semibold mb-4">What's The Network?</h3>
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          <Globe className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium">{plan.plan.providerName} Network</div>
            <div className="text-sm text-gray-600 mt-1">
              <p className="mb-2">Most healthshare plans allow you to see any provider you choose.</p>
              <p className="mb-2">There are no network restrictions, but you may receive better pricing by using providers experienced with healthshare plans.</p>
              <p>
                <a 
                  href={plan.plan.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Learn more about {plan.plan.providerName}'s provider options
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
              <p className="mb-2">Most healthshare plans include prescription discount programs rather than traditional prescription coverage.</p>
              <p className="mb-2">Maintenance medications are typically not shared, but medications related to eligible medical incidents may be shareable.</p>
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

      {/* Emergency Care */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Emergency Care</h3>
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          <Ambulance className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium">Emergency Services</div>
            <div className="text-sm text-gray-600 mt-1">
              <p className="mb-2">Emergency room visits and ambulance services are typically eligible for sharing after your IUA.</p>
              <p className="mb-2">For true emergencies, seek care immediately. For non-emergencies, urgent care centers are often a more cost-effective option.</p>
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
              <p className="mb-2">Medically necessary surgeries and treatments are typically eligible for sharing after your IUA.</p>
              <p className="mb-2">Pre-existing conditions may have waiting periods or limitations.</p>
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

      {/* Pregnancy */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Pregnancy</h3>
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          <Baby className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium">Maternity Coverage</div>
            <div className="text-sm text-gray-600 mt-1">
              <p className="mb-2">Most healthshare plans have waiting periods for maternity coverage, typically 6-10 months from enrollment.</p>
              <p className="mb-2">Conception must occur after the waiting period for maternity expenses to be eligible for sharing.</p>
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

      {/* Estimated Annual Cost */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Estimated Annual Cost</h3>
        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <CreditCard className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium">Your Estimated Costs</div>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="text-sm text-gray-600">Monthly Premium</div>
                <div className="text-xl font-bold text-blue-600">${monthlyPremium.toLocaleString()}</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="text-sm text-gray-600">Initial Unshared Amount</div>
                <div className="text-xl font-bold text-blue-600">${initialUnsharedAmount.toLocaleString()}</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="text-sm text-gray-600">Estimated Annual Total</div>
                <div className="text-xl font-bold text-blue-600">${estimatedAnnualCost.toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-1">Monthly premium × 12 + IUA</div>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              <p>Based on {age} years old, {coverageType === 'just_me' ? 'individual' : 'family'} coverage with ${initialUnsharedAmount} IUA</p>
            </div>
          </div>
        </div>
      </section>

      {/* Provider Information */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Provider Information</h3>
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          <Building className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium">{plan.plan.providerName}</div>
            <div className="text-sm text-gray-600">
              Plan Name: {plan.plan.planName}
            </div>
            {plan.plan.sourceUrl && (
              <a 
                href={plan.plan.sourceUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline mt-1 inline-block"
              >
                Visit Provider Website
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  )
} 