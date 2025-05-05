'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Phone } from 'lucide-react';

export function MobileBottomCTA() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleFindMyPlan = () => {
    router.push('/questionnaire');
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Show CTA when scrolled down at least 300px, and when scrolling up
      setIsVisible(currentScrollY > 300 && currentScrollY <= lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t shadow-lg z-50"
      style={{ 
        transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.3s ease-in-out'
      }}
      data-testid="mobile-bottom-cta"
    >
      <div className="flex items-center justify-between p-4">
        <button 
          className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium flex-grow mr-2"
          onClick={handleFindMyPlan}
          data-testid="mobile-cta-find-plan"
        >
          Find My Plan
        </button>
        <a 
          href="tel:225-718-8977"
          className="bg-emerald-100 text-emerald-700 p-3 rounded-md flex items-center justify-center"
          aria-label="Call us"
          data-testid="mobile-cta-call"
        >
          <Phone size={20} />
        </a>
      </div>
    </div>
  );
} 