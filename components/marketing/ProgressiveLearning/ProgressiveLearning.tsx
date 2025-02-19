'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Plus, Minus, Book, Lightbulb, Target, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LearningLevel {
  title: string;
  icon: React.ElementType;
  content: string;
  details: string;
}

const levels: LearningLevel[] = [
  {
    title: "The Basics",
    icon: Book,
    content: "Healthcare sharing is a way for people to share medical costs together.",
    details: "Think of it like a community pool where everyone contributes to help each other."
  },
  {
    title: "Why This Works",
    icon: ShieldCheck,
    content: "Healthshare plans can offer lower costs through a different approach to healthcare financing.",
    details: `Here's how we keep costs lower:

1. Direct Member-to-Member Sharing: Without the overhead of traditional insurance, more of your money goes directly to healthcare.

2. Community Guidelines: Members agree to healthy lifestyle choices and cost-conscious healthcare decisions, reducing overall expenses.

3. Price Transparency: We negotiate directly with providers and empower members to make cost-conscious choices.

4. No Shareholder Profits: As a community-based organization, we don't have to generate profits for shareholders.

5. Efficient Technology: Modern digital platforms reduce administrative costs compared to traditional insurance bureaucracy.`
  },
  {
    title: "How It Works",
    icon: Lightbulb,
    content: "Members contribute monthly and share eligible medical expenses.",
    details: "When someone has a medical need, the community's contributions help cover the costs."
  },
  {
    title: "The Details",
    icon: Target,
    content: "Specific guidelines determine what can be shared.",
    details: "Guidelines typically cover things like accidents, illnesses, and preventive care."
  }
];

export function ProgressiveLearning() {
  const [activeLevel, setActiveLevel] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({});

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const toggleSection = (index: number) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section className="relative py-24 bg-white">
      <div className="absolute right-[10%] top-[20%] w-[375px] h-[375px] rounded-full bg-[#ECF1FF] opacity-50 blur-3xl" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeInUpVariants}
          className="text-center mb-16"
        >
          <h2 className="mb-4 font-bold leading-tight" style={{ 
            fontSize: 'var(--h2)',
            color: 'var(--color-warm-gray)' 
          }}>
            Understanding Healthcare Sharing
          </h2>
          <div className="w-24 h-1 bg-[#6366F1] mx-auto rounded-full" />
        </motion.div>
        
        {/* Level Selection */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          variants={fadeInUpVariants}
          className="flex flex-wrap gap-4 justify-center mb-8"
        >
          {levels.map((level, index) => (
            <motion.button
              key={index}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveLevel(index)}
              className={cn(
                "flex items-center px-6 py-3 rounded-xl transition-colors",
                "text-sm sm:text-base font-medium shadow-sm",
                activeLevel === index 
                  ? "bg-[#6366F1] text-white"
                  : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
              )}
            >
              <level.icon className="w-5 h-5 mr-2" />
              <span>{level.title}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Content Area */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          variants={fadeInUpVariants}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
        >
          <div className="space-y-6">
            {levels.slice(0, activeLevel + 1).map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "transition-all duration-200",
                  index === activeLevel ? "opacity-100" : "opacity-70"
                )}
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className={cn(
                    "flex items-center justify-between cursor-pointer p-5",
                    "border border-gray-200 rounded-xl",
                    "hover:bg-gray-50 hover:border-[#6366F1]/20 transition-all"
                  )}
                  onClick={() => toggleSection(index)}
                >
                  <h3 className="text-xl font-semibold flex items-center">
                    <level.icon className="w-6 h-6 mr-3 text-[#6366F1]" />
                    {level.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    {!expandedSections[index] && <span className="hidden sm:inline">Click to expand</span>}
                    {expandedSections[index] ? (
                      <Minus className="w-5 h-5 text-[#6366F1]" />
                    ) : (
                      <Plus className="w-5 h-5 text-[#6366F1]" />
                    )}
                  </div>
                </motion.div>
                
                <div className="mt-3 text-gray-700 pl-4">
                  {level.content}
                </div>
                
                {expandedSections[index] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pl-9 text-gray-600 bg-gray-50 p-6 rounded-xl whitespace-pre-line"
                  >
                    {level.details}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Next Level Button */}
          {activeLevel < levels.length - 1 && (
            <motion.button
              whileHover={{ x: 4 }}
              onClick={() => setActiveLevel(prev => prev + 1)}
              className="mt-8 flex items-center text-[#6366F1] hover:text-[#6366F1]/80 font-medium"
            >
              Ready for more
              <ArrowRight className="w-4 h-4 ml-2" />
            </motion.button>
          )}
        </motion.div>
      </div>
    </section>
  );
} 