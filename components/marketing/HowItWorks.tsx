'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const steps = [
  {
    title: "How it Works",
    description: "Members contribute monthly. When someone needs care, the community shares the cost.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800&h=400",
    details: [
      "Simple monthly contributions",
      "Transparent cost sharing",
      "Direct member-to-member sharing"
    ]
  },
  {
    title: "Who It's For",
    description: "Ideal for healthy individuals and families looking for quality healthcare without the premium price tag.",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800&h=400",
    details: [
      "Self-employed professionals",
      "Health-conscious families",
      "Budget-minded individuals"
    ]
  },
  {
    title: "Why It Works",
    description: "By cutting out middlemen and sharing costs directly, members save 30-50% compared to traditional insurance.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800&h=400",
    details: [
      "Lower administrative costs",
      "Direct cost sharing",
      "Community-driven model"
    ]
  }
];

export function HowItWorks() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

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
            How Healthsharing Works <span style={{ color: 'var(--color-coral-primary)' }}>in 3 Simple Steps</span>
          </h2>
          <p className="max-w-3xl mx-auto" style={{ 
            fontSize: 'var(--text-xl)',
            color: 'var(--color-warm-gray)',
            opacity: 0.9 
          }}>
            Simple, transparent, and effective. Here's exactly what happens when you join.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="relative"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-6 h-full border border-gray-100 transition-all duration-300 hover:shadow-lg">
                <div className="relative mb-6 rounded-lg overflow-hidden group">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-warm-gray)' }}>
                  {step.title}
                </h3>
                <p className="mb-4" style={{ color: 'var(--color-warm-gray)', opacity: 0.9 }}>
                  {step.description}
                </p>
                <ul className="space-y-2">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-center text-sm" style={{ color: 'var(--color-warm-gray)' }}>
                      <span className="mr-2">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 