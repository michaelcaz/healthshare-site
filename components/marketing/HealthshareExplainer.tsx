'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function HealthshareExplainer() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };

  return (
    <section className="relative py-[var(--section-spacing)]" style={{ background: 'var(--color-cream-bg)' }}>
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
            What's a Healthshare? Think Insurance's <span style={{ color: 'var(--color-coral-primary)' }}>Smarter Alternative</span>
          </h2>
          <p className="max-w-3xl mx-auto" style={{ 
            fontSize: 'var(--text-xl)',
            color: 'var(--color-warm-gray)',
            opacity: 0.9 
          }}>
            It's healthcare cost-sharing that just makes sense. Like insurance, but without 
            the corporate overhead (and attitude).
          </p>
        </motion.div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "How it Works",
              description: "Members contribute monthly. When someone needs care, the community shares the cost. Simple as that.",
              icon: "⚡️"
            },
            {
              title: "Who It's For",
              description: "Ideal for healthy individuals and families looking for quality healthcare without the premium price tag.",
              icon: "👥"
            },
            {
              title: "Why It Works",
              description: "By cutting out middlemen and sharing costs directly, members save 30-50% compared to traditional insurance.",
              icon: "💡"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="group"
            >
              <div className="h-full bg-white/80 backdrop-blur-sm rounded-xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-warm-gray)' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--color-warm-gray)', opacity: 0.9 }}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <button 
            className="inline-flex items-center text-lg font-semibold transition-all hover:-translate-y-0.5"
            style={{ color: 'var(--color-coral-primary)' }}
          >
            Check if you qualify →
          </button>
        </motion.div>
      </div>
    </section>
  );
} 