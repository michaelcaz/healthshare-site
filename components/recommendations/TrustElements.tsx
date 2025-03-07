'use client'

import { Card } from '../ui/card'
import { Progress } from '../ui/progress'
import { type PlanRecommendation } from './types'
import { CheckCircle, Star, Shield, Clock, Users, Award, Calendar, TrendingUp } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

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
}

export function TrustElements({ recommendation }: TrustElementsProps) {
  const { plan, score, factors } = recommendation

  // Sample testimonials with membership tenure
  const testimonials = [
    {
      text: "This plan has been perfect for my family. The monthly costs are manageable and we've had great experiences with sharing medical expenses.",
      author: "Sarah M.",
      highlight: "Perfect for families",
      tenure: "Member for 3 years",
      avatar: "S"
    },
    {
      text: "I was skeptical at first, but after being a member for 2 years, I'm convinced this was the right choice. Their customer service is excellent.",
      author: "John D.", 
      highlight: "Excellent service",
      tenure: "Member for 2 years",
      avatar: "J"
    },
    {
      text: "The prescription program alone has saved me thousands. Very happy with my decision to join.",
      author: "Michael R.",
      highlight: "Great savings",
      tenure: "Member for 4 years",
      avatar: "M"
    }
  ]

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
                <span className="text-white font-bold">A+</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">BBB Accredited Business</p>
              <p className="text-sm text-gray-600">Member since 2010</p>
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
              <p className="text-sm text-gray-600">3-5 business days average</p>
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
                <span className="text-sm text-gray-600">2M+ Active Members</span>
                <TrendingUp className="h-3 w-3 text-green-500" />
              </div>
              <p className="text-sm text-gray-600">98% Member Satisfaction</p>
              <p className="text-sm text-gray-600">Average tenure: 4.2 years</p>
            </div>
          </Card>
        </div>

        {/* Cost Transparency Section */}
        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-semibold mb-6 text-gray-900">Cost Transparency</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-lg mb-4 text-gray-800">How Your Money Is Used</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Medical Cost Sharing</span>
                    <span className="text-sm font-medium">84%</span>
                  </div>
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full w-full flex-1 bg-green-500 transition-all"
                      style={{ transform: `translateX(-${100 - 84}%)` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Administrative Costs</span>
                    <span className="text-sm font-medium">12%</span>
                  </div>
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full w-full flex-1 bg-blue-500 transition-all"
                      style={{ transform: `translateX(-${100 - 12}%)` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Operational Reserves</span>
                    <span className="text-sm font-medium">4%</span>
                  </div>
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full w-full flex-1 bg-purple-500 transition-all"
                      style={{ transform: `translateX(-${100 - 4}%)` }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                <p>Unlike insurance companies, healthshares are non-profit organizations that allocate the majority of funds directly to member medical expenses.</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-lg mb-4 text-gray-800">Savings vs. Traditional Insurance</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 font-medium">30%</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Average Monthly Savings</p>
                    <p className="text-sm text-gray-600">Compared to ACA plans with similar coverage</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 font-medium">$0</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">No Network Restrictions</p>
                    <p className="text-sm text-gray-600">Freedom to choose your own providers</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 font-medium">100%</span>
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
          <h3 className="text-xl font-semibold mb-6 text-gray-900">Member Testimonials</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="p-6 hover:shadow-md transition-shadow border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-700 font-medium">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{testimonial.author}</p>
                    <p className="text-sm text-blue-600">{testimonial.highlight}</p>
                    <p className="text-xs text-gray-500">{testimonial.tenure}</p>
                  </div>
                </div>
                <div className="mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      className="inline-block h-4 w-4 text-yellow-400 mr-0.5"
                      fill="currentColor"
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-sm">{testimonial.text}</p>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Educational Section */}
        <div className="bg-blue-50 p-8 rounded-xl border border-blue-100">
          <h3 className="text-xl font-semibold mb-6 text-gray-900">Understanding Healthshares</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-700 font-medium">1</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Not Insurance</p>
                  <p className="text-sm text-gray-600">Healthshares are not insurance companies but non-profit organizations where members voluntarily share each other's medical expenses.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-700 font-medium">2</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Initial Unshared Amount (IUA)</p>
                  <p className="text-sm text-gray-600">Similar to a deductible, this is the amount you pay before the community begins sharing your eligible medical expenses.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-700 font-medium">3</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Eligible Expenses</p>
                  <p className="text-sm text-gray-600">Each healthshare has guidelines outlining which medical expenses are eligible for sharing among members.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-700 font-medium">4</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Community Support</p>
                  <p className="text-sm text-gray-600">Beyond financial sharing, many healthshares offer prayer support, notes of encouragement, and a community of like-minded individuals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
} 