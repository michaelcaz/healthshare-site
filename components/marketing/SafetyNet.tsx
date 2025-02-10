'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const coverageExamples = [
  {
    scenario: "Emergency Room Visit",
    coverage: "100% shared after member portion",
    timeframe: "Immediate",
    example: "Recent member paid $500 vs. $2,800 typical cost"
  },
  {
    scenario: "Primary Care Visit",
    coverage: "Shared in full",
    timeframe: "30 day wait",
    example: "Members average $40-85 per visit"
  },
  {
    scenario: "Specialist Care",
    coverage: "Shared in full",
    timeframe: "30 day wait",
    example: "Recent member paid $125 vs. $280 typical cost"
  },
  {
    scenario: "Surgery",
    coverage: "100% shared after member portion",
    timeframe: "90 day wait",
    example: "Recent knee surgery: $8,500 vs. $32,000"
  }
];

export function SafetyNet() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };

  return (
    <section className="py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-warm-gray)' }}>
            Your Safety Net
          </h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--color-warm-gray)', opacity: 0.9 }}>
            See how members save on common medical needs
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coverageExamples.map((example, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-warm-gray)' }}>
                {example.scenario}
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="text-sm uppercase tracking-wider mb-1" style={{ color: 'var(--color-warm-gray)', opacity: 0.7 }}>
                    Coverage
                  </div>
                  <div className="text-lg font-semibold" style={{ color: 'var(--color-coral-primary)' }}>
                    {example.coverage}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm uppercase tracking-wider mb-1" style={{ color: 'var(--color-warm-gray)', opacity: 0.7 }}>
                    Waiting Period
                  </div>
                  <div className="text-lg font-medium" style={{ color: 'var(--color-warm-gray)' }}>
                    {example.timeframe}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm uppercase tracking-wider mb-1" style={{ color: 'var(--color-warm-gray)', opacity: 0.7 }}>
                    Real Example
                  </div>
                  <div className="text-base" style={{ color: 'var(--color-warm-gray)' }}>
                    {example.example}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-coral-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-coral-primary)' }}>
            Need to see a doctor tomorrow?
          </h3>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: 'var(--color-warm-gray)' }}>
            Members get immediate access to telemedicine, urgent care discounts, and prescription savings.
          </p>
        </div>
      </div>
    </section>
  );
} 