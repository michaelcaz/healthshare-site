'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Info, DollarSign, Building2, Calendar, CheckSquare, Users, Shield, ChevronDown } from 'lucide-react';
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
    Sharewize: '30-50% less',
    insurance: 'Sky-high premiums',
    description: 'Save significantly on your monthly healthcare costs while maintaining quality coverage. Yeah we know it sounds too good to be true (that\'s sincerely what we thought at first too). We explain how this is achieved below in the "Understanding Healthcare Sharing" section.'
  },
  {
    icon: <Shield className="w-9 h-9 text-emerald-500 stroke-[2.5]" />,
    name: 'Personal Responsibility',
    Sharewize: '$500-$5000 IUA',
    insurance: '$500-$18,000 deductible',
    description: 'Initial Unshared Amount (IUA) is the amount you pay before your health share plan kicks in. For example, if you have a $1000 IUA and get an injury that results in $2300 of medical bills, you pay the first $1000, and the health share community pays the other $1300. Healthy people rarely hit their insurance deductible, meaning you pay high premiums for coverage you never use. With healthshares, lower monthly costs mean you save money even if you do pay your IUA occasionally.'
  },
  {
    icon: <Building2 className="w-9 h-9 text-emerald-500 stroke-[2.5]" />,
    name: 'Network Restrictions',
    Sharewize: 'Any provider',
    insurance: 'Restrictive networks',
    description: 'Choose your preferred healthcare providers without network restrictions.'
  },
  {
    icon: <Calendar className="w-9 h-9 text-emerald-500 stroke-[2.5]" />,
    name: 'Enrollment Period',
    Sharewize: 'Join anytime',
    insurance: 'Once yearly',
    description: 'You can cancel your insurance and join any health share plan at any time.'
  },
  {
    icon: <CheckSquare className="w-9 h-9 text-emerald-500 stroke-[2.5]" />,
    name: 'Medical Need Approval',
    Sharewize: '98% approval',
    insurance: '49%-85% approval',
    description: 'Higher likelihood of medical need approval means more peace of mind.'
  },
  {
    icon: <Users className="w-9 h-9 text-emerald-500 stroke-[2.5]" />,
    name: 'Best For',
    Sharewize: 'Healthy folks',
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
    router.push('/questionnaire');
  };

  const handleContinueAsGuest = () => {
    router.push('/questionnaire');
  };

  return (
    <section ref={ref} className="py-[var(--section-spacing)] relative overflow-hidden bg-gradient-to-r from-[#6B5CB3] to-[#4A3C8D]">
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
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100"
          >
            {/* Mobile & Tablet View: Feature List */}
            <div className="lg:hidden flex flex-col gap-3">
              {features.map((feature, index) => (
                <div
                  key={feature.name}
                  className={`w-full space-y-3 p-3 rounded-xl transition-all duration-200 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 active:scale-95 relative ${hoveredFeature === index ? 'bg-gray-50/80 shadow-md' : 'hover:bg-gray-50/40'}`}
                  onClick={() => setHoveredFeature(hoveredFeature === index ? null : index)}
                  tabIndex={0}
                  aria-expanded={hoveredFeature === index}
                >
                  <div className="flex items-center gap-3 justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">{feature.icon}</div>
                      <span className="font-semibold text-base text-gray-900 leading-7">{feature.name}</span>
                    </div>
                    {/* Chevron icon, animated */}
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${hoveredFeature === index ? 'rotate-180' : 'rotate-0'}`}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs font-medium text-emerald-600 mb-1">
                        <img 
                          src="/images/sharewizelogofull.svg" 
                          alt="Sharewize" 
                          loading="lazy"
                          className="comparison-logo-mobile w-auto h-6"
                        />
                      </div>
                      <div className="text-emerald-600 font-bold text-base leading-7">{feature.Sharewize}</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-orange-600 mb-1">Insurance</div>
                      <div className="text-orange-600 text-base leading-7">{feature.insurance}</div>
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
            <div className="hidden lg:block">
              <div className="grid grid-cols-3 gap-6 mb-4">
                <div className="font-bold text-xl text-gray-900 pl-20"></div>
                <div className="flex items-center">
                  <img 
                    src="/images/sharewizelogofull.svg" 
                    alt="Sharewize" 
                    loading="lazy"
                    className="comparison-logo w-auto h-12"
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
                    {feature.Sharewize}
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

          {/* Sticky CTA for mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="block md:hidden"
          >
            <div className="fixed bottom-0 left-0 w-full z-40 px-4 pb-4 pointer-events-none">
              <button 
                onClick={handleFindMyPlan}
                className="w-full h-14 bg-emerald-500 text-white rounded-xl text-lg font-bold shadow-lg border border-emerald-400 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-400 pointer-events-auto"
              >
                Find My Plan →
              </button>
            </div>
          </motion.div>

          {/* Desktop CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden md:block mt-16 text-center px-4 sm:px-0"
          >
            <button 
              onClick={handleFindMyPlan}
              className="w-full sm:w-[200px] h-12 bg-emerald-500 text-white px-8 py-3 rounded-xl text-lg font-bold hover:bg-emerald-600 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-emerald-400"
            >
              Find My Plan →
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