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
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-gray-200 shadow-2xl"
        >
          <div className="flex items-center justify-between px-4 py-4 md:px-8 md:py-6 gap-2">
            {mode === 'signup' ? (
              <button
                className="bg-[#6366F1] text-white px-6 py-3 md:px-10 md:py-4 rounded-lg font-medium flex-grow mr-2 text-base md:text-lg transition-all duration-200 hover:bg-[#4F46E5]"
                onClick={onSignup}
                aria-label="Sign up now"
              >
                {label}
              </button>
            ) : (
              <button
                className="bg-amber-500 text-white px-6 py-3 md:px-10 md:py-4 rounded-lg font-medium flex-grow mr-2 text-base md:text-lg transition-all duration-200 hover:bg-amber-600"
                onClick={onCompare}
                aria-label={`Compare ${compareCount} plans`}
              >
                Compare {compareCount} Plan{compareCount !== 1 ? 's' : ''}
              </button>
            )}
            <a
              href="tel:2257188977"
              className="bg-emerald-100 text-emerald-700 p-3 md:p-4 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-emerald-200"
              aria-label="Call support"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 