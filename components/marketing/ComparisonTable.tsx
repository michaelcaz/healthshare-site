'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function ComparisonTable() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="relative py-[var(--section-spacing)]" style={{ background: 'var(--color-cream-bg)' }}>
      <div className="grain-overlay" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 font-bold leading-tight" style={{ 
            fontSize: 'var(--h2)',
            color: 'var(--color-warm-gray)' 
          }}>
            Healthshare vs Insurance <span style={{ color: 'var(--color-coral-primary)' }}>See the Difference</span>
          </h2>
          <p className="max-w-3xl mx-auto" style={{ 
            fontSize: 'var(--text-xl)',
            color: 'var(--color-warm-gray)',
            opacity: 0.9 
          }}>
            A side-by-side look at what makes healthshares different.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 overflow-hidden"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-4 px-6 text-left" style={{ color: 'var(--color-warm-gray)' }}>Feature</th>
                <th className="py-4 px-6 text-left" style={{ color: 'var(--color-coral-primary)' }}>Healthshare</th>
                <th className="py-4 px-6 text-left" style={{ color: 'var(--color-warm-gray)' }}>Insurance</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  feature: "Monthly Cost",
                  healthshare: "30-50% lower",
                  insurance: "Higher premiums"
                },
                {
                  feature: "Network Restrictions",
                  healthshare: "See any provider",
                  insurance: "Limited networks"
                },
                {
                  feature: "Enrollment Period",
                  healthshare: "Join anytime",
                  insurance: "Once per year"
                }
              ].map((row, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-4 px-6" style={{ color: 'var(--color-warm-gray)' }}>{row.feature}</td>
                  <td className="py-4 px-6" style={{ color: 'var(--color-warm-gray)' }}>{row.healthshare}</td>
                  <td className="py-4 px-6" style={{ color: 'var(--color-warm-gray)' }}>{row.insurance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
} 