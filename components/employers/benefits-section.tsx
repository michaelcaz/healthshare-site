'use client'

import { useState, useEffect } from 'react'

export function BenefitsSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  
  const employeeTypes = [
    "Who can't afford high deductibles but need reliable care access",
    "Who are healthy and rarely use their benefits", 
    "With ongoing or complex medical conditions",
    "Frustrated with narrow networks and high out-of-pocket costs"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % employeeTypes.length)
    }, 3500) // Extended timing - 3.5s for better readability

    return () => clearInterval(interval)
  }, [employeeTypes.length])

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Subtle grid pattern - Adds texture without distraction */}
      <div className="absolute inset-0 bg-grid-gray-100/30 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none opacity-40" />
      
      {/* Gradient overlay - Creates depth behind the main content card */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl blur-xl opacity-50"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          {/* Visual Hierarchy & Typography - Larger, more impactful headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-12 leading-tight max-w-5xl mx-auto">
            Sharewize helps you cut costs by{' '}
            <span className="text-primary">layering smarter options</span>{' '}
            into your benefits package for employees:
          </h2>
          
          {/* Enhanced revolving text section */}
          <div className="relative">
            {/* Fluid typography - Scales beautifully across all devices */}
            <div className="text-xl md:text-2xl lg:text-3xl text-gray-800 min-h-[3rem] md:min-h-[4rem] flex items-center justify-center font-medium leading-relaxed max-w-4xl mx-auto">
              <span 
                key={currentTextIndex}
                className="animate-fade-in-up text-primary font-semibold"
              >
                {employeeTypes[currentTextIndex]}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </section>
  )
}