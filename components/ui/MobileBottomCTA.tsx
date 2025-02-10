'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function MobileBottomCTA() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY > 300 && currentScrollY <= lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t shadow-lg z-50"
        >
          <div className="flex items-center justify-between p-4">
            <button className="bg-blue-900 text-white px-6 py-3 rounded-lg font-medium flex-grow mr-2">
              Find My Plan
            </button>
            <button 
              className="bg-emerald-100 text-emerald-700 p-3 rounded-lg"
              onClick={() => window.location.href = 'tel:1234567890'}
            >
              📞
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 