'use client'

import { Card } from '../ui/card'
import { Progress } from '../ui/progress'
import { type PlanRecommendation } from './types'
import { CheckCircle, Star } from 'lucide-react'
import { Badge } from '../ui/badge'

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

  // Sample testimonials - would come from API in production
  const testimonials = [
    {
      text: "This plan has been perfect for my family. The monthly costs are manageable and we've had great experiences with sharing medical expenses.",
      author: "Sarah M.",
      highlight: "Perfect for families"
    },
    {
      text: "I was skeptical at first, but after being a member for 2 years, I'm convinced this was the right choice. Their customer service is excellent.",
      author: "John D.", 
      highlight: "Excellent service"
    },
    {
      text: "The prescription program alone has saved me thousands. Very happy with my decision to join.",
      author: "Michael R.",
      highlight: "Great savings"
    }
  ]

  return (
    <div className="space-y-8">
      {/* BBB Rating Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">BBB Accredited Business</h3>
            <p className="text-blue-100">Member since 2010</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-1">A+</div>
            <div className="text-blue-100">Rating</div>
          </div>
        </div>
      </div>
      
      <div className="space-y-8 mt-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Trust Score Card */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Trust Score</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Overall Rating</span>
                  <span className="font-medium">{Math.round(score)}%</span>
                </div>
                <Progress value={score} className="h-2" />
              </div>
              <div className="space-y-2">
                {factors.slice(0, 3).map((factor, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{factor.factor}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Provider Info Card */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">About {plan.providerName}</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {/* Provider logo would go here */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      className={`h-4 w-4 ${star <= 4.5 ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill={star <= 4.5 ? 'currentColor' : 'none'}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">4.5/5</span>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Established in 2010</p>
                <p>• 100,000+ active members</p>
                <p>• 98% member satisfaction rate</p>
                <p>• BBB Accredited Business</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Testimonials Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Member Testimonials</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-700 font-medium">{testimonial.author[0]}</span>
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-blue-600">{testimonial.highlight}</p>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 