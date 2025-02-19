'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const comparisonData = [
  {
    feature: "Monthly Cost",
    healthshare: "30-50% lower",
    insurance: "Higher premiums",
    icon: "💰"
  },
  {
    feature: "Network Restrictions",
    healthshare: "See any provider",
    insurance: "Limited networks",
    icon: "🏥"
  },
  {
    feature: "Enrollment Period",
    healthshare: "Join anytime",
    insurance: "Once per year",
    icon: "📅"
  },
  {
    feature: "Claim Approval",
    healthshare: "98% approval rate",
    insurance: "65% approval rate",
    icon: "✅"
  }
];

export function ComparisonTable() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="section" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="h2 mb-4">
            See the Difference
          </h2>
          <p className="subheadline text-gray-600 max-w-3xl mx-auto">
            A side-by-side look at what makes us different.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl overflow-hidden shadow-lg"
        >
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="w-1/3">Feature</th>
                <th className="w-1/3">Riff</th>
                <th className="w-1/3">Insurance</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr key={index}>
                  <td className="flex items-center gap-3">
                    <span className="text-2xl">{row.icon}</span>
                    <span>{row.feature}</span>
                  </td>
                  <td className="font-medium text-primary">
                    {row.healthshare}
                  </td>
                  <td className="text-gray-500">
                    {row.insurance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
} 