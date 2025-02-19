'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const coverageExamples = [
  {
    scenario: "Emergency Room Visit",
    coverage: "100% shared after member portion",
    timeframe: "Immediate",
    example: "Recent member paid $500 vs. $2,800 typical cost",
    icon: "🚑"
  },
  {
    scenario: "Primary Care Visit",
    coverage: "Shared in full",
    timeframe: "30 day wait",
    example: "Members average $40-85 per visit",
    icon: "👨‍⚕️"
  },
  {
    scenario: "Specialist Care",
    coverage: "Shared in full",
    timeframe: "30 day wait",
    example: "Recent member paid $125 vs. $280 typical cost",
    icon: "🏥"
  },
  {
    scenario: "Surgery",
    coverage: "100% shared after member portion",
    timeframe: "90 day wait",
    example: "Recent knee surgery: $8,500 vs. $32,000",
    icon: "⚕️"
  }
];

export function SafetyNet() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="section" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="h2 mb-4">
            Your Safety Net
          </h2>
          <p className="subheadline text-gray-600 max-w-2xl mx-auto">
            See how members save on common medical needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coverageExamples.map((example, index) => (
            <motion.div 
              key={index}
              className="safety-card"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="safety-icon text-2xl">
                {example.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-6">
                {example.scenario}
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="safety-label">
                    Coverage
                  </div>
                  <div className="text-lg font-semibold text-primary">
                    {example.coverage}
                  </div>
                </div>
                
                <div>
                  <div className="safety-label">
                    Waiting Period
                  </div>
                  <div className="text-lg">
                    {example.timeframe}
                  </div>
                </div>
                
                <div>
                  <div className="safety-label">
                    Real Example
                  </div>
                  <div className="text-base text-gray-600">
                    {example.example}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 card text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-primary">
            Need to see a doctor tomorrow?
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Members get immediate access to telemedicine, urgent care discounts, and prescription savings.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 