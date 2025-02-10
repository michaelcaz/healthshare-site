'use client';

import { motion } from 'framer-motion';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  backgroundColor?: string;
}

export function Feature() {
  return (
    <section className="relative py-[var(--section-spacing)]" style={{ background: 'var(--color-cream-bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "⚡️",
              title: "Lower Costs",
              description: "Save 30-50% compared to traditional insurance premiums"
            },
            {
              icon: "🏥",
              title: "Quality Care",
              description: "Access the same doctors and hospitals you trust"
            },
            {
              icon: "🤝",
              title: "Community Support",
              description: "Join a community that shares your healthcare costs"
            }
          ].map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-warm-gray)' }}>{feature.title}</h3>
              <p style={{ color: 'var(--color-warm-gray)', opacity: 0.9 }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 