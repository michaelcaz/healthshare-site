'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      const scrolled = window.scrollY;
      parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const content = (
    <section className="relative min-h-[75vh] flex items-start mt-[-2rem]">
      {/* Background with grain */}
      <div className="absolute inset-0" style={{ background: 'var(--color-cream-bg)' }}>
        <div className="grain-overlay absolute inset-0" />
      </div>

      {/* Floating shapes for visual interest */}
      <div ref={parallaxRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[15%] w-64 h-64 rounded-full" 
          style={{ background: 'var(--color-coral-primary)', opacity: 0.1 }} />
        <div className="absolute top-40 right-[10%] w-96 h-96 rounded-full" 
          style={{ background: 'var(--color-deep-blue)', opacity: 0.05 }} />
      </div>

      <div className="relative w-full pt-24">
        {/* Trust Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center items-center space-x-12 mb-12"
        >
          <span style={{ color: 'var(--color-warm-gray)' }} className="text-sm font-medium">
            Featured in
          </span>
          {['WSJ', 'Forbes', 'Bloomberg'].map((publication, index) => (
            <motion.span
              key={publication}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: index * 0.2 + 0.6 }}
              className="font-serif"
              style={{ color: 'var(--color-warm-gray)' }}
            >
              {publication}
            </motion.span>
          ))}
        </motion.div>

        {/* Main Hero Content */}
        <div className="text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="mb-4" style={{ color: 'var(--color-warm-gray)' }}>
              <span className="block font-bold leading-[1.1]" 
                style={{ fontSize: 'var(--h1)' }}>
                Save 30-50% on Healthcare
              </span>
              <span className="block mt-2" 
                style={{ 
                  fontSize: 'var(--h3)',
                  color: 'var(--color-coral-primary)'
                }}>
                Without Sacrificing Quality
              </span>
            </h1>

            <p style={{ 
              fontSize: 'calc(var(--h3) * 0.7)', 
              color: 'var(--color-warm-gray)',
              lineHeight: '1.3',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              Join 2M+ Americans who switched to trusted healthshare communities.
            </p>
          </motion.div>

          {/* ZIP Code Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Enter ZIP code"
                className="flex-1 px-6 py-4 rounded-xl text-lg border border-gray-200 focus:outline-none focus:border-gray-300"
                style={{ 
                  background: 'white',
                  color: 'var(--color-warm-gray)'
                }}
              />
              <button
                className="px-8 py-4 rounded-xl font-semibold whitespace-nowrap transition-all hover:-translate-y-0.5"
                style={{ 
                  background: 'var(--color-coral-primary)',
                  color: 'white'
                }}
              >
                Find My Price →
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );

  if (!mounted) {
    return (
      <section className="relative min-h-[75vh] flex items-start mt-[-2rem]">
        <div className="absolute inset-0" style={{ background: 'var(--color-cream-bg)' }}>
          <div className="grain-overlay absolute inset-0" />
        </div>
        {/* Static content for SSR */}
        <div className="relative w-full pt-24">
          <div className="text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="mb-4" style={{ color: 'var(--color-warm-gray)' }}>
              <span className="block font-bold leading-[1.1]" style={{ fontSize: 'var(--h1)' }}>
                Save 30-50% on Healthcare
              </span>
              <span className="block mt-2" style={{ fontSize: 'var(--h3)', color: 'var(--color-coral-primary)' }}>
                Without Sacrificing Quality
              </span>
            </h1>
          </div>
        </div>
      </section>
    );
  }

  return content;
} 