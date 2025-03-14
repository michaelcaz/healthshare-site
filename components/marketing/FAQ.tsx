'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';

export function FAQ() {
  const router = useRouter();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What exactly is a healthshare?",
      answer: "A healthshare is a community of people who share each other's medical costs. Members pay a monthly share amount, and when someone has a medical need, the community's funds are used to pay for it."
    },
    {
      question: "Is it really cheaper than insurance?",
      answer: "Yes, most members save 30-50% compared to traditional insurance premiums. This is possible because healthshares operate with lower overhead and negotiate directly with providers."
    },
    {
      question: "What's the catch?",
      answer: "No catch, but healthshares aren't for everyone. They work best for generally healthy people who want quality care at lower costs. We'll help you decide if it's right for you."
    },
    {
      question: "How is an IUA different from a deductible?",
      answer: "Unlike a traditional insurance deductible, the Initial Unshared Amount (IUA) applies to each separate medical need rather than accumulating throughout the year. For example, if you have a $1,000 IUA and break your arm, you pay the first $1,000, then the plan shares costs above that amount. If you later get pneumonia (a separate need), you pay another $1,000 before sharing begins."
    },
    {
      question: "What counts as a separate 'medical need'?",
      answer: "A medical need typically includes all treatment related to a specific illness, injury, or condition. For example, all visits, tests, and procedures related to treating a broken arm would be considered one medical need."
    },
    {
      question: "How do healthshares handle pre-existing conditions?",
      answer: "Pre-existing conditions are not eligible for cost-sharing during your first year of membership with any healthshare plan. After the first year, coverage for pre-existing conditions will gradually increase based on the specific plan. Most plans offer increasing coverage limits in years 2, 3, and 4 of membership."
    }
  ];

  return (
    <section className="relative py-[var(--section-spacing)]" style={{ background: 'var(--color-cream-bg)' }}>
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium" style={{ color: 'var(--color-warm-gray)' }}>
                    {faq.question}
                  </h3>
                  <span className="ml-6 flex-shrink-0">
                    {openIndex === index ? '−' : '+'}
                  </span>
                </div>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4" style={{ color: 'var(--color-warm-gray)', opacity: 0.9 }}>
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="mt-12 text-center">
            <button 
              onClick={() => router.push('/questionnaire')}
              className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300"
            >
              Find My Plan →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 