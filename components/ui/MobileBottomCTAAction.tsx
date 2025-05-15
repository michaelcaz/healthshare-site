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
    <>
      {/* Mobile (unchanged) */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-[100] md:hidden"
          >
            <div
              className="w-full bg-white border-t border-gray-200 shadow-2xl flex items-center justify-between px-4 py-4 gap-2"
              style={{ position: 'relative' }}
            >
              <div className="flex items-center w-full justify-between">
                {mode === 'signup' ? (
                  <button
                    className="bg-[#6366F1] text-white px-6 py-3 rounded-lg font-medium flex-grow text-base transition-all duration-200 hover:bg-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-primary"
                    onClick={onSignup}
                    aria-label="Sign up now"
                  >
                    {label}
                  </button>
                ) : (
                  <button
                    className="bg-amber-500 text-white px-6 py-3 rounded-lg font-medium flex-grow text-base transition-all duration-200 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    onClick={onCompare}
                    aria-label={`Compare ${compareCount} plans`}
                  >
                    Compare {compareCount} Plan{compareCount !== 1 ? 's' : ''}
                  </button>
                )}
                <a
                  href="tel:2257188977"
                  className="bg-emerald-100 text-emerald-700 p-3 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-emerald-200 ml-2"
                  aria-label="Call support"
                  tabIndex={0}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Desktop (new, world-class) */}
      {isVisible && (
        <div className="hidden md:block fixed left-0 right-0 bottom-0 z-[100] pointer-events-none">
          <div className="w-full flex justify-center pointer-events-none">
            <div className="bg-white border-t border-gray-200 shadow-lg rounded-t-xl px-8 py-5 flex items-center justify-between gap-6 max-w-xl mx-auto pointer-events-auto">
              <button
                className="cta-button w-full max-w-xs flex items-center justify-center gap-2 text-lg font-semibold rounded-full bg-indigo-600 text-white shadow-lg transition-all duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                onClick={onSignup}
                aria-label="Sign up now"
              >
                {label}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <a
                href="tel:2257188977"
                className="ml-6 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-700 p-3 hover:bg-emerald-200 transition"
                aria-label="Call support"
                tabIndex={0}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 