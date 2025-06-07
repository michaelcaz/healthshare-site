'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Info, DollarSign, Building2, Calendar, CheckSquare, Users, Shield, ChevronDown, Check, X, ChevronUp } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LoginModal } from '@/components/auth/login-modal';
import { Tooltip } from '../ui/tooltip';

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

// Helper to determine icon and color for each value
const getCellIcon = (value: string, column: 'Sharewize' | 'Traditional Insurance') => {
  if (column === 'Sharewize' && /yes|any|join|98%|healthy|less|included|none|high|rich|supports|emerald|approval|provider|\$/i.test(value)) {
    return <Check className="w-5 h-5 text-emerald-500 inline-block mr-1 align-middle" />;
  }
  if (column === 'Traditional Insurance' && /no|restrictive|once|sick|not|x|artificial|high|denied|absent|\-|\$/i.test(value)) {
    return <X className="w-5 h-5 text-orange-500 inline-block mr-1 align-middle" />;
  }
  return null;
};

export function ComparisonTable() {
  const router = useRouter();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

  const handleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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
          <h2 className="text-5xl font-bold text-white mb-4 font-display break-keep">
            See the Difference
          </h2>
          <p className="text-xl text-gray-200 italic font-light break-keep">
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
            {/* Desktop View: Grid Layout */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-3 gap-0 mb-2">
                <div className=""></div>
                <div className="flex flex-col items-center justify-center bg-emerald-50 border-2 border-emerald-300 rounded-t-2xl shadow-sm py-4">
                  <img 
                    src="/images/sharewizelogofull.svg" 
                    alt="Sharewize" 
                    loading="lazy"
                    className="w-auto h-10 mb-1"
                  />
                </div>
                <div className="flex flex-col items-center justify-center py-4 border-l border-gray-200">
                  <span className="font-bold text-2xl text-orange-600">Traditional Insurance</span>
                </div>
              </div>
              {features.map((feature, index) => (
                <div
                  key={feature.name}
                  className={`grid grid-cols-3 gap-0 items-center border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50/60' : 'bg-white'}`}
                  style={{ minHeight: 72 }}
                >
                  <div className="flex items-center justify-between px-6 py-4 w-full">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">{feature.icon}</div>
                      <span className="font-bold uppercase text-base text-gray-900 leading-8">{feature.name}</span>
                    </div>
                    <button
                      onClick={() => handleDropdown(index)}
                      className="flex items-center justify-center ml-4 focus:outline-none"
                      aria-expanded={openIndex === index}
                      aria-controls={`feature-desc-${index}`}
                    >
                      <span className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 ${openIndex === index ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-500'}`}>{openIndex === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-center px-5 py-4 border-l-2 border-emerald-300 bg-emerald-50 font-semibold text-emerald-700 text-lg shadow-sm text-center">
                    {feature.Sharewize}
                  </div>
                  <div className="flex items-center justify-center px-5 py-4 font-semibold text-orange-600 text-lg border-l border-gray-200 text-center">
                    {feature.insurance}
                  </div>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="col-span-3 overflow-hidden"
                        id={`feature-desc-${index}`}
                      >
                        <div className="px-8 py-4 text-gray-700 text-center text-base bg-indigo-50/60 border-t border-indigo-100">
                          {feature.description}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Mobile & Tablet View: Stacked Columns */}
            <div className="lg:hidden flex flex-col gap-3">
              {features.map((feature, index) => (
                <div
                  key={feature.name}
                  className={`rounded-xl border border-gray-100 bg-white/90 shadow-sm transition-all duration-200 ${openIndex === index ? 'ring-2 ring-indigo-200' : ''}`}
                >
                  <button
                    onClick={() => handleDropdown(index)}
                    className="flex items-center w-full justify-between px-4 py-3 focus:outline-none"
                    aria-expanded={openIndex === index}
                    aria-controls={`feature-desc-mobile-${index}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">{feature.icon}</div>
                      <span className="font-bold uppercase text-sm text-gray-900 leading-6">{feature.name}</span>
                    </div>
                    <span className={`flex items-center justify-center w-7 h-7 rounded-full transition-colors duration-200 ${openIndex === index ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-500'}`}>{openIndex === index ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}</span>
                  </button>
                  <div className="grid grid-cols-2">
                    <div className="flex flex-col items-center justify-center px-3 py-3 border-t border-emerald-100 bg-emerald-50 font-semibold text-emerald-700 text-sm text-center">
                      <div className="font-medium text-xs text-emerald-500 mb-1">Sharewize</div>
                      {feature.Sharewize}
                    </div>
                    <div className="flex flex-col items-center justify-center px-3 py-3 border-t border-orange-100 font-semibold text-orange-600 text-sm text-center">
                      <div className="font-medium text-xs text-orange-500 mb-1">Traditional Insurance</div>
                      {feature.insurance}
                    </div>
                  </div>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                        id={`feature-desc-mobile-${index}`}
                      >
                        <div className="px-4 py-3 text-gray-700 text-center text-sm bg-indigo-50/60 border-t border-indigo-100">
                          {feature.description}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
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