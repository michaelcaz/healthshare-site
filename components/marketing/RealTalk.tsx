'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const considerations = [
  {
    title: "Yes, There's More Manual Work",
    icon: "⚡️",
    pro: "With insurance, you just hand over your card. With healthshares, you'll pay smaller bills directly and submit them for reimbursement through a dashboard.",
    perspective: "But here's the thing: This extra step is why you save 40-50% on costs. Plus, being a cash-pay patient often gets you better service and attention.",
    callout: "The 10 minutes you spend uploading a receipt saves you hundreds of dollars."
  },
  {
    title: "The Legal Protection Myth",
    icon: "⚖️",
    pro: "Yes, insurance is a legally binding contract. In theory, you can sue if they wrongfully deny claims.",
    perspective: "But let's be real: Insurance companies have mastered the 'Delay, Deny, Defend' system. With a 35% claim denial rate, how protected are you really?",
    callout: "Would you rather have a 98% approval rate or the right to sue for a denial?"
  },
  {
    title: "The Bankruptcy Question",
    icon: "🛡️",
    pro: "A few healthshares have gone bankrupt. This is a real concern and we won't sugarcoat it.",
    perspective: "However, more insurance companies have actually gone bankrupt. At Zion, we maintain 3 YEARS of claims expenses in reserve - that's more than most insurance companies.",
    callout: "Ask your insurance company about their reserve ratio. We'll wait."
  },
  {
    title: "The Social Pressure",
    icon: "🤨",
    pro: "Yes, your friends might raise eyebrows. 'Sounds like a scam,' they'll say.",
    perspective: "Remember Airbnb? 'You're letting strangers sleep in your house?!' Now it's worth billions. Healthcare is changing, and early adopters always face skepticism.",
    callout: "The rebels always seem crazy before they're considered heroes."
  }
];

export function RealTalk() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="relative py-24 section" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="h2 text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Let's Talk About The Hard Parts
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-8 relative">
          {considerations.map((item, index) => (
            <motion.div
              key={item.title}
              className="hard-parts-card"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              style={{
                marginTop: index % 2 === 1 ? '2rem' : '0',
                zIndex: considerations.length - index
              }}
            >
              <div className="hard-parts-icon">
                <span className="text-2xl">{item.icon}</span>
              </div>
              
              <h3 className="text-xl font-semibold mb-4">
                {item.title}
              </h3>
              
              <div className="space-y-4">
                <p className="text-gray-600">
                  {item.pro}
                </p>
                <p className="text-gray-800">
                  {item.perspective}
                </p>
                <p className="text-primary font-medium">
                  {item.callout}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 