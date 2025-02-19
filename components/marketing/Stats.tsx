'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const stats = [
  {
    number: "96%",
    label: "Member Satisfaction",
    description: "Based on our latest member survey",
    gradient: "from-primary-light to-accent-light"
  },
  {
    number: "40%",
    label: "Average Savings",
    description: "Compared to traditional insurance",
    gradient: "from-accent-light to-primary-light"
  },
  {
    number: "24/7",
    label: "Support Access",
    description: "Always here when you need us",
    gradient: "from-primary-light to-accent-light"
  },
  {
    number: "30+",
    label: "Years of Trust",
    description: "Serving members since 1993",
    gradient: "from-accent-light to-primary-light"
  }
];

export function Stats() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="section" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stats-card"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6,
                delay: index * 0.1
              }}
            >
              <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${stat.gradient}`} />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1 + 0.3
                }}
              >
                <div className="stats-number text-primary">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold mb-2">
                  {stat.label}
                </div>
                <div className="text-gray-600">
                  {stat.description}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 