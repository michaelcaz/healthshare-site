'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Scale, Shield, UserPlus, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConcernBlockProps {
  icon: React.ElementType;
  title: string;
  description: string;
  highlight: string;
}

const ConcernBlock = ({ icon: Icon, title, description, highlight }: ConcernBlockProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const firstLine = description.split('\n')[0];

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className={cn(
        "bg-white rounded-xl p-6",
        "hover:bg-gray-50 transition-all duration-300",
        "border border-gray-100"
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="bg-indigo-50 w-12 h-12 rounded-full flex items-center justify-center">
            <Icon className="w-6 h-6 text-indigo-600" />
          </div>
        </div>
        
        <div className="flex-1">
          <button 
            className="w-full text-left group"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
              <div className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-600">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <p className="text-gray-600 mt-2">
              {isExpanded ? description.split('\n')[0] : firstLine}
            </p>
          </button>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-4 space-y-3 overflow-hidden"
              >
                {description.split('\n').slice(1).map((paragraph, index) => (
                  <p key={index} className="text-gray-600">{paragraph}</p>
                ))}
                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mt-4">
                  <p className="text-orange-700 font-medium">{highlight}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const concerns = [
  {
    icon: Zap,
    title: "There's More Manual Work",
    description: "With insurance, you just hand over your card. With healthshares, you'll pay smaller bills directly and submit them for reimbursement through a dashboard.\n\nBut here's the thing: This extra step is why you save 40-50% on costs. Plus, being a cash-pay patient often gets you better service and attention.",
    highlight: "The 2 minutes you spend uploading a receipt saves you hundreds of dollars."
  },
  {
    icon: Scale,
    title: "The Legal Protection Myth",
    description: "Insurance is a legally binding contract. In theory, you can sue if they wrongfully deny claims.\n\nBut let's be real: Insurance companies have mastered the 'Delay, Deny, Defend' system. With a 35% claim denial rate, how protected are you really?",
    highlight: "Would you rather have a 98% approval rate or the right to sue for a denial and spend 2-3 years trying to fight the best attorneys in the WORLD in court?"
  },
  {
    icon: UserPlus,
    title: "Fear of Unknown Risk",
    description: "Your friends might raise eyebrows. 'Sounds like a scam,' they'll say.\n\nRemember Airbnb? 'You're letting strangers sleep in your house?!' Now millions trust it every day. Healthcare's changing—health shares are the next big thing. Early adopters always face skepticism, but with 95%+ member approval ratings, you're joining a trusted crew, not a gamble.",
    highlight: "The rebels always seem crazy before they're considered pioneers."
  }
];

export function RealTalk() {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const [activeSection, setActiveSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <section className="relative py-24 bg-white">
      <div className="absolute right-[10%] top-[20%] w-[375px] h-[375px] rounded-full bg-[#ECF1FF] opacity-50 blur-3xl" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeInUpVariants}
          className="text-center mb-12"
        >
          <h2 className="mb-4 font-bold leading-tight" style={{ 
            fontSize: 'var(--h2)',
            color: 'var(--color-warm-gray)' 
          }}>
            Worried? We Get It—Here's Why Health Shares Beat the Insurance Nightmare
          </h2>
          <div className="w-24 h-1 bg-[#6366F1] mx-auto rounded-full" />
          <p className="text-xl text-gray-600 mt-4">
            We get it. Here's our honest take on the three biggest concerns we hear.
          </p>
        </motion.div>
        
        <div className="space-y-4">
          {concerns.map((concern, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              variants={fadeInUpVariants}
            >
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all">
                <button
                  onClick={() => toggleSection(index)}
                  className={cn(
                    "w-full px-6 py-4 flex items-center justify-between",
                    "text-left transition-colors duration-200",
                    "hover:bg-gray-50",
                    activeSection === index ? "bg-gray-50" : ""
                  )}
                >
                  <div className="flex items-center gap-3">
                    <concern.icon className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-lg font-semibold text-gray-900">{concern.title}</h3>
                  </div>
                  <div className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full",
                    "transition-colors duration-200",
                    activeSection === index 
                      ? "bg-indigo-100 text-indigo-600" 
                      : "bg-gray-100 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600"
                  )}>
                    {activeSection === index ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>
                
                {activeSection === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-6 pb-6"
                  >
                    <div className="mt-4 text-gray-600 whitespace-pre-wrap">
                      {concern.description}
                    </div>
                    <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
                      <p className="text-indigo-700 font-medium">
                        {concern.highlight}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 