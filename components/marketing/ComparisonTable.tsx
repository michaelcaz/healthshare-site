'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Info, DollarSign, Building2, Calendar, CheckSquare, Users, Shield } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LoginModal } from '@/components/auth/login-modal';

const features = [
  {
    icon: <DollarSign className="w-9 h-9 text-emerald-500 stroke-[2.5]" />,
    name: 'Monthly Cost',
    riff: '30-50% less',
    insurance: 'Sky-high premiums',
    description: 'Save significantly on your monthly healthcare costs while maintaining quality coverage.'
  },
  {
    icon: <Shield className="w-9 h-9 text-emerald-500 stroke-[2.5]" />,
    name: 'Deductible',
    riff: '$500-$5000 IUA',
    insurance: '$500-$18,000',
    description: 'Initial Unshared Amount (IUA) is similar to a deductible, but applies per incident rather than annually. For example, if you have a $1000 IUA and two separate medical needs in a year, you\'d pay $1000 for each. The key difference? Healthy people rarely hit their insurance deductible, meaning you pay high premiums for coverage you never use. With healthshares, lower monthly costs mean you save money even if you do pay your IUA occasionally.'
  },
  {
    icon: <Building2 className="w-9 h-9 text-emerald-500 stroke-[2.5]" />,
    name: 'Network Restrictions',
    riff: 'Any provider',
    insurance: 'Restrictive networks',
    description: 'Choose your preferred healthcare providers without network restrictions.'
  },
  {
    icon: <Calendar className="w-9 h-9 text-emerald-500 stroke-[2.5]" />,
    name: 'Enrollment Period',
    riff: 'Join anytime',
    insurance: 'Once yearly',
    description: 'You can cancel your insurance and join any health share plan at any time.'
  },
  {
    icon: <CheckSquare className="w-9 h-9 text-emerald-500 stroke-[2.5]" />,
    name: 'Claim Approval',
    riff: '98% approved',
    insurance: '49%-85%',
    description: 'Higher likelihood of claim approval means more peace of mind.'
  },
  {
    icon: <Users className="w-9 h-9 text-emerald-500 stroke-[2.5]" />,
    name: 'Best For',
    riff: 'Healthy folks',
    insurance: 'Sick folks',
    description: 'Healthshare plans are ideal for generally healthy individuals looking for affordable coverage.'
  }
];

export function ComparisonTable() {
  const router = useRouter();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const ctaRef = useRef<HTMLDivElement>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleFindMyPlan = () => {
    router.push('/account-check?redirectTo=/questionnaire');
  };

  const handleContinueAsGuest = () => {
    router.push('/questionnaire');
  };

  return (
    <section ref={ref} className="py-[var(--section-spacing)] relative overflow-hidden bg-gradient-to-r from-[#4A3C8D] to-[#2B1F6B]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-4 font-display">
            See the Difference
          </h2>
          <p className="text-xl text-gray-200 italic font-light">
            A side-by-side look at what makes us different.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100"
          >
            {/* Mobile View: Feature List */}
            <div className="md:hidden space-y-6">
              {features.map((feature, index) => (
                <div
                  key={feature.name}
                  className={`space-y-5 p-5 rounded-xl transition-all duration-300 min-w-[320px] border border-gray-100
                    ${hoveredFeature === index ? 'bg-gray-50/80 shadow-md' : 'hover:bg-gray-50/40'}`}
                  onClick={() => setHoveredFeature(hoveredFeature === index ? null : index)}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <span className="font-bold text-base text-gray-900 leading-8">{feature.name}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm font-medium text-emerald-600 mb-2">
                        <img 
                          src="/images/logo.svg" 
                          alt="ShareWell" 
                          className="comparison-logo-mobile w-auto h-6"
                        />
                      </div>
                      <div className="text-emerald-600 font-bold text-lg leading-8">{feature.riff}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-orange-600 mb-2">Insurance</div>
                      <div className="text-orange-600 text-lg leading-8">{feature.insurance}</div>
                    </div>
                  </div>
                  
                  {hoveredFeature === index && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <Alert variant="info" className="bg-indigo-50/50 border border-indigo-100">
                        <Info className="h-5 w-5 text-indigo-600" />
                        <AlertDescription className="text-indigo-900">
                          {feature.description}
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop View: Grid Layout */}
            <div className="hidden md:block">
              <div className="grid grid-cols-3 gap-6 mb-4">
                <div className="font-bold text-xl text-gray-900 pl-20"></div>
                <div className="flex items-center">
                  <img 
                    src="/images/logo.svg" 
                    alt="ShareWell" 
                    className="comparison-logo w-auto h-10"
                  />
                </div>
                <div className="font-bold text-2xl text-orange-600 pl-5 flex items-center">Insurance</div>
              </div>

              {features.map((feature, index) => (
                <div
                  key={feature.name}
                  className={`grid grid-cols-3 gap-6 p-4 rounded-xl transition-all duration-300 border border-gray-100 mb-3
                    ${hoveredFeature === index ? 'bg-gray-50/80 shadow-md' : 'hover:bg-gray-50/40'}`}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <span className="font-bold text-base text-gray-900 leading-8">{feature.name}</span>
                  </div>
                  <div className="text-emerald-600 font-bold text-lg flex items-center px-5 leading-8">
                    {feature.riff}
                  </div>
                  <div className="text-orange-600 text-lg flex items-center px-5 leading-8">{feature.insurance}</div>
                  
                  {hoveredFeature === index && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="col-span-3 mt-4"
                    >
                      <Alert variant="info" className="bg-indigo-50/50 border border-indigo-100">
                        <Info className="h-5 w-5 text-indigo-600" />
                        <AlertDescription className="text-indigo-900">
                          {feature.description}
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center px-4 sm:px-0"
          >
            <button 
              onClick={handleFindMyPlan}
              className="group relative w-full sm:w-[200px] h-12 bg-emerald-500 text-white px-8 py-3 rounded-xl 
                       text-lg font-bold hover:bg-emerald-600 transition-all duration-300 
                       hover:scale-105 hover:shadow-lg border border-emerald-400"
            >
              Find My Plan →
              <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-emerald-700 text-white 
                             px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                             text-sm whitespace-nowrap shadow-lg">
                Save 30-50% today!
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
        redirectTo="/questionnaire"
        onContinueAsGuest={handleContinueAsGuest}
      />
    </section>
  );
} 