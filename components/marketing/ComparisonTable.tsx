'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Info, DollarSign, Building2, Calendar, CheckSquare } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

const features = [
  {
    icon: <DollarSign className="w-5 h-5 text-green-600" />,
    name: 'Monthly Cost',
    riff: '30-50% lower',
    insurance: 'Higher premiums',
    description: 'Save significantly on your monthly healthcare costs while maintaining quality coverage.'
  },
  {
    icon: <Building2 className="w-5 h-5 text-blue-600" />,
    name: 'Network Restrictions',
    riff: 'See any provider',
    insurance: 'Limited networks',
    description: 'Choose your preferred healthcare providers without network restrictions.'
  },
  {
    icon: <Calendar className="w-5 h-5 text-orange-600" />,
    name: 'Enrollment Period',
    riff: 'Join anytime',
    insurance: 'Once per year',
    description: 'No need to wait for open enrollment - join whenever you need coverage.'
  },
  {
    icon: <CheckSquare className="w-5 h-5 text-green-600" />,
    name: 'Claim Approval',
    riff: '98% approval rate',
    insurance: '65% approval rate',
    description: 'Higher likelihood of claim approval means more peace of mind.'
  }
];

export function ComparisonTable() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="section" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            See the Difference
          </h2>
          <p className="text-xl text-gray-600">
            A side-by-side look at what makes us different.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="font-semibold text-lg text-gray-600">Feature</div>
            <div className="font-semibold text-lg text-indigo-600">Riff</div>
            <div className="font-semibold text-lg text-gray-600">Insurance</div>
          </div>

          {features.map((feature, index) => (
            <div
              key={feature.name}
              className={`grid grid-cols-3 gap-4 p-4 rounded-lg transition-colors duration-200 ${
                hoveredFeature === index ? 'bg-gray-50' : ''
              }`}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className="flex items-center gap-3">
                {feature.icon}
                <span className="font-medium text-gray-700">{feature.name}</span>
              </div>
              <div className="text-coral-500 font-medium">{feature.riff}</div>
              <div className="text-gray-600">{feature.insurance}</div>
              
              {hoveredFeature === index && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="col-span-3 mt-2"
                >
                  <Alert variant="info">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      {feature.description}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200">
            Get Started →
          </button>
          <p className="mt-4 text-sm text-gray-600">
            Calculate your potential savings with Riff
          </p>
        </motion.div>
      </div>
    </section>
  );
} 