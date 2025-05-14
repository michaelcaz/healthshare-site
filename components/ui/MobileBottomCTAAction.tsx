'use client';

import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BottomCTAActionProps {
  mode: 'signup' | 'compare';
  onSignup?: () => void;
  onCompare?: () => void;
  compareCount?: number;
  label?: string;
  isVisible?: boolean;
}

export const BottomCTAAction: FC<BottomCTAActionProps> = ({
  mode,
  onSignup,
  onCompare,
  compareCount = 0,
  label = 'Sign up now',
  isVisible = true,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[100]"
        >
          {/* Desktop floating card */}
          <div
            className="w-full md:max-w-2xl md:left-1/2 md:-translate-x-1/2 md:mx-auto md:rounded-t-2xl md:shadow-xl md:border md:border-gray-200 md:bg-white/95 md:pb-2 md:pt-2 md:px-6
              bg-white border-t border-gray-200 shadow-2xl flex items-center justify-between px-4 py-4 gap-2
              md:fixed md:bottom-0 md:flex md:items-center md:justify-between"
            style={{ position: 'relative' }}
          >
            <div className="flex items-center w-full justify-between md:justify-center md:gap-6">
              {mode === 'signup' ? (
                <button
                  className="bg-[#6366F1] text-white px-6 py-3 md:px-8 md:py-2 rounded-lg font-medium flex-grow md:flex-grow-0 md:w-auto text-base md:text-base transition-all duration-200 hover:bg-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={onSignup}
                  aria-label="Sign up now"
                >
                  {label}
                </button>
              ) : (
                <button
                  className="bg-amber-500 text-white px-6 py-3 md:px-8 md:py-2 rounded-lg font-medium flex-grow md:flex-grow-0 md:w-auto text-base md:text-base transition-all duration-200 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  onClick={onCompare}
                  aria-label={`Compare ${compareCount} plans`}
                >
                  Compare {compareCount} Plan{compareCount !== 1 ? 's' : ''}
                </button>
              )}
              <a
                href="tel:2257188977"
                className="bg-emerald-100 text-emerald-700 p-3 md:p-2 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-emerald-200 ml-2 md:ml-4"
                aria-label="Call support"
                tabIndex={0}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-4 md:h-4">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 