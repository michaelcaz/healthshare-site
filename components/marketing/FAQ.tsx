'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function FAQ() {
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
    }
  ];

  return (
    <section className="relative py-[var(--section-spacing)]" style={{ background: 'var(--color-cream-bg)' }}>
      <div className="grain-overlay" />

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
      </div>
    </section>
  );
} 