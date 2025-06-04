'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';
import { Heading } from '@/components/ui/Heading';

export function FAQ() {
  const router = useRouter();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleFindMyPlan = () => {
    router.push('/questionnaire');
  };

  const faqs = [
    {
      question: "What exactly is a healthshare?",
      answer: "A healthshare is a community of people who share each other's medical costs. Members pay a monthly share amount, and when someone has a medical need, the community's funds are used to pay for it."
    },
    {
      question: "Is it really cheaper than insurance?",
      answer: "Yes, members save 30-50% (and some much more) on their annual medical expenses compared to traditional insurance. This is possible because health shares operate with lower overhead and generally serve a much healthier population. As a health share plan subscriber, you will also usually get astronomically lower costs when you present yourself as a cash pay patient, bringing down the costs for the entire community."
    },
    {
      question: "What's the catch?",
      answer: "No catch, but health shares aren't for everyone. \n\nThere are waiting periods before they will cover anything related to any pre-existing conditions:\n\nYear 1: $0 coverage\nYear 2: Up to $25,000\nYear 3: Up to $50,000\nYear 4+: Up to $125,000\n\nThis graduated coverage structure is one of the reasons health shares can offer such affordable rates—but it also means they're not ideal for people who ALREADY have significant medical expenses.\n\nHealth shares work best for generally healthy individuals who want quality care at lower costs, with solid protection against emergencies, accidents, or unexpected major medical events.\n\nWe'll help you determine if it's the right fit for your specific situation."
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
    },
    {
      question: "How is pregnancy handled?",
      answer: "There's a waiting period of 6-12 months before maternity needs will be covered. This means that if you are already pregnant when you join, or you get pregnant before the waiting period is over (times vary by health share plan), your maternity expenses will not be eligible for sharing.\n\nIn cases where the mother is pregnant or is considering getting pregnant very soon, many families opt for signing up everyone other than the mother. Then signing the mother up after delivery.\n\nAs with any other need, expectant mothers pay a single IUA for all expenses related to their pregnancy. Expenses eligible for sharing are related to miscarriage, prenatal care, postnatal care, and delivery."
    },
    {
      question: "Isn't it required by law that you must have health insurance?",
      answer: "No, there's no longer a federal penalty for being uninsured. However, a few states do require health coverage and impose penalties if you don't have it. As of now, those states are:\n\nCalifornia, Massachusetts, New Jersey, Rhode Island, Vermont, and Washington, D.C.\n\nIf you live in one of these states, check your local tax requirements — otherwise, you're not legally required to have insurance."
    }
  ];

  return (
    <section
      id="faq"
      className="relative py-[var(--section-spacing)]"
      style={{ background: 'var(--color-cream-bg)' }}
    >
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Heading level={2} className="mb-4" style={{ color: 'var(--color-warm-gray)' }}>
            Frequently Asked Questions
          </Heading>
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
                className="w-full text-left bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-100 transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium" style={{ color: 'var(--color-warm-gray)' }}>
                    {faq.question}
                  </h3>
                  <div className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full ml-6 flex-shrink-0",
                    "transition-colors duration-200",
                    openIndex === index 
                      ? "bg-indigo-100 text-indigo-600" 
                      : "bg-gray-100 text-gray-500"
                  )}>
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
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
                      <div className="mt-4 space-y-4" style={{ color: 'var(--color-warm-gray)', opacity: 0.9 }}>
                        {faq.answer.split('\n\n').map((paragraph, i) => (
                          <div key={i} className={i > 0 ? 'mt-4' : ''}>
                            {paragraph.split('\n').map((line, j) => (
                              <React.Fragment key={j}>
                                {line}
                                {j < paragraph.split('\n').length - 1 && <br />}
                              </React.Fragment>
                            ))}
                          </div>
                        ))}
                      </div>
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
          <div className="mt-12 text-center hidden md:block">
            <button 
              onClick={handleFindMyPlan}
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