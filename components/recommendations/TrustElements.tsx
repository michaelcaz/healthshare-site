'use client'

import { Card } from '../ui/card'
import { Progress } from '../ui/progress'
import { type PlanRecommendation } from './types'
import { CheckCircle, Star, Shield, Clock, Users, Award, Calendar, TrendingUp } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
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
  
  // Get provider details and testimonials from planDetails or use defaults
  const providerDetails = planDetails?.providerDetails || defaultPlanDetailsData.providerDetails!;
  const planTestimonials = planDetails?.testimonials || defaultPlanDetailsData.testimonials!;

  return (
    <TooltipProvider>
      <div className="space-y-10">
        <h2 className="text-2xl font-bold text-gray-900">Why Members Trust {plan.providerName}</h2>
        
        {/* Trust Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* BBB Rating Card */}
          <Card className="p-6 border border-blue-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">BBB Rating</h3>
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold" dangerouslySetInnerHTML={{ __html: providerDetails.ratings.bbbRating }} />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">BBB Accredited Business</p>
              <p className="text-sm text-gray-600">Member since {providerDetails.yearEstablished}</p>
              <p className="text-sm text-gray-600">Zero unresolved complaints</p>
            </div>
          </Card>

          {/* Processing Time Card */}
          <Card className="p-6 border border-green-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Fast Processing</h3>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: providerDetails.processingTime }} />
              <p className="text-sm text-gray-600">Online submission portal</p>
              <p className="text-sm text-gray-600">Real-time status tracking</p>
            </div>
          </Card>

          {/* Member Stats Card */}
          <Card className="p-6 border border-purple-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Member Stats</h3>
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: `${providerDetails.memberCount} Active Members` }} />
                <TrendingUp className="h-3 w-3 text-green-500" />
              </div>
              <p className="text-sm text-gray-600">{providerDetails.memberSatisfaction} Member Satisfaction</p>
              <p className="text-sm text-gray-600">Average tenure: {providerDetails.averageTenure}</p>
            </div>
          </Card>
        </div>

        {/* Cost Transparency Section */}
        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-semibold mb-8 text-gray-900">Cost Transparency</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h4 className="font-medium text-lg mb-5 text-gray-800">How Your Money Is Used</h4>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Medical Cost Sharing</span>
                    <span className="text-sm font-semibold">84%</span>
                  </div>
                  <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full w-full flex-1 bg-gradient-to-r from-green-400 to-green-600 transition-all"
                      style={{ transform: `translateX(-${100 - 84}%)` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Administrative Costs</span>
                    <span className="text-sm font-semibold">12%</span>
                  </div>
                  <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full w-full flex-1 bg-gradient-to-r from-blue-400 to-blue-600 transition-all"
                      style={{ transform: `translateX(-${100 - 12}%)` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Operational Reserves</span>
                    <span className="text-sm font-semibold">4%</span>
                  </div>
                  <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full w-full flex-1 bg-gradient-to-r from-purple-400 to-purple-600 transition-all"
                      style={{ transform: `translateX(-${100 - 4}%)` }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-5 text-sm text-gray-600">
                <p>Unlike insurance companies, healthshares are non-profit organizations that allocate the majority of funds directly to member medical expenses.</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-lg mb-5 text-gray-800">Savings vs. Traditional Insurance</h4>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md">
                    <span className="text-white font-semibold">30%</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Average Monthly Savings</p>
                    <p className="text-sm text-gray-600">Compared to ACA plans with similar coverage</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md">
                    <span className="text-white font-semibold">$0</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">No Network Restrictions</p>
                    <p className="text-sm text-gray-600">Freedom to choose your own providers</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md">
                    <span className="text-white font-semibold">100%</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Transparency</p>
                    <p className="text-sm text-gray-600">Clear guidelines on what is eligible for sharing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div>
          <h3 className="text-xl font-semibold mb-8 text-gray-900">Member Testimonials</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {planTestimonials.map((testimonial, i) => (
              <div key={i} className="testimonial-card">
                <div className="flex items-center gap-4 mb-5">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                    {testimonial.avatar ? (
                      <div className="h-full w-full text-center flex items-center justify-center">
                        {testimonial.avatar.startsWith('/') ? (
                          <Image 
                            src={testimonial.avatar} 
                            alt={testimonial.author}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-blue-700 font-medium">{testimonial.avatar}</span>
                        )}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.author}</p>
                    <p className="text-sm text-primary">{testimonial.highlight}</p>
                    <p className="text-xs text-gray-500">{testimonial.tenure}</p>
                  </div>
                </div>
                <div className="mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      className="inline-block h-4 w-4 text-yellow-400 mr-0.5"
                      fill="currentColor"
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: testimonial.text }} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Educational Section */}
        <div className="bg-blue-50 p-8 rounded-xl border border-blue-100">
          <h3 className="text-xl font-semibold mb-8 text-gray-900">Understanding Healthshares</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-white font-medium">1</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800 mb-1">Not Insurance</p>
                  <p className="text-sm text-gray-600">Healthshares are not insurance companies but non-profit organizations where members voluntarily share each other's medical expenses.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1 h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-white font-medium">2</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800 mb-1">Faith-Based Community</p>
                  <p className="text-sm text-gray-600">Most healthshares are built around faith-based communities with shared values and commitments to supporting each other.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-white font-medium">3</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800 mb-1">Cost Sharing</p>
                  <p className="text-sm text-gray-600">Members contribute monthly shares that are matched with other members' eligible medical expenses according to plan guidelines.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1 h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-white font-medium">4</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800 mb-1">Flexibility & Savings</p>
                  <p className="text-sm text-gray-600">Healthshares typically offer more flexibility in provider choice and lower monthly costs compared to traditional insurance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
} 