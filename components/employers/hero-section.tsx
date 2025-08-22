'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-20 pb-12 lg:pt-24 lg:pb-16 overflow-hidden min-h-[85vh] flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-gray-100/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="lg:pr-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-6">
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              For Teams of 50+
            </div>
            
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl mb-4 leading-tight">
              How Innovative Employers Are Cutting Healthcare Spend by{' '}
              <span className="text-primary font-extrabold">
                Up to 40%
              </span>{' '}
              Without Cutting Benefits
            </h1>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Your employees aren't one-size-fits-all. Your healthcare strategy shouldn't be either.
            </p>
            
            <div className="mb-6">
              <p className="text-base text-gray-700 mb-4 font-medium">
                Sharewize helps you layer smarter options into your benefits package:
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start space-x-3 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200/50 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      Traditional insurance
                    </h3>
                    <p className="text-sm text-gray-600">
                      for employees with ongoing or complex medical needs
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-primary/5 backdrop-blur-sm rounded-lg border border-primary/20 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      Healthshare memberships
                    </h3>
                    <p className="text-sm text-gray-600">
                      for employees who rarely use care but still want protection and flexibility
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="bg-primary text-white hover:bg-primary-dark px-6 py-3 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.open('https://calendly.com/michaelcaz/sharewize-enterprise-consultation', '_blank')
                }
              }}
            >
              See If This Fits Your Workforce
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </div>
          
          {/* Right Image */}
          <div className="relative lg:pl-8">
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-3xl blur-2xl opacity-30"></div>
              
              {/* Main image container */}
              <div className="relative bg-white p-2 rounded-2xl shadow-2xl">
                <Image
                  src="/images/standing-team-meeting.jpg"
                  alt="Professional team collaborating in modern office environment"
                  width={600}
                  height={400}
                  className="rounded-xl object-cover w-full h-[300px] lg:h-[380px]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
