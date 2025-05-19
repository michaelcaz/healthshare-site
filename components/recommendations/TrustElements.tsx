'use client'

import { Card } from '../ui/card'
import { Progress } from '../ui/progress'
import { type PlanRecommendation } from './types'
import { CheckCircle, Star, Shield, Clock, Users, Award, Calendar, TrendingUp, DollarSign, Unlock, Headset, Heart, Info, Search, Lock, Users2 } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Tooltip } from '@/components/ui/tooltip'
import Image from 'next/image'
import { PlanDetailsData, defaultPlanDetailsData } from '@/types/plan-details'

interface TrustElementsProps {
  recommendation: {
    plan: {
      id: string;
      providerName: string;
      planName: string;
    };
    score: number;
    factors: Array<{
      factor: string;
      impact: number;
    }>;
  }
  planDetails?: PlanDetailsData;
}

export function TrustElements({ recommendation, planDetails = defaultPlanDetailsData }: TrustElementsProps) {
  const { plan, score, factors } = recommendation
  
  // Get provider details from planDetails or use defaults
  const providerDetails = planDetails?.providerDetails || defaultPlanDetailsData.providerDetails!;

  return (
    <>
      <div className="space-y-10">
        <h2 className="text-2xl font-bold text-gray-900" style={{ wordBreak: 'keep-all', hyphens: 'none' }}>
          Why Members Love {plan.providerName}
        </h2>
        
        {/* Trust Elements Grid - Updated with new benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cost Transparency Card */}
          <Card className="p-6 border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="mb-3">
              <p className="font-medium text-blue-700 text-lg">Clear, Predictable Costs</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">Average monthly savings of 30-50% compared to traditional insurance</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">No hidden fees or surprise bills</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">Published price lists for common procedures</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">Real member examples of cost savings for specific conditions</p>
              </div>
            </div>
          </Card>

          {/* Flexibility & Freedom Card */}
          <Card className="p-6 border border-green-100">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <Unlock className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="mb-3">
              <p className="font-medium text-green-700 text-lg">Healthcare on Your Terms</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">No network restrictions - choose any provider</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">Coverage that moves with you across states</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">No enrollment period limitations</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">Tailored plans for entrepreneurial lifestyles</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">Telemedicine options included</p>
              </div>
            </div>
          </Card>

          {/* Stellar Customer Service Card */}
          <Card className="p-6 border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Headset className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div className="mb-3">
              <p className="font-medium text-purple-700 text-lg">Real People, Real Support</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">Average call wait time under 2 minutes</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">Dedicated personal advisor for complex cases</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">No automated phone trees or overseas call centers</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">Proactive communication on claim status</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
} 