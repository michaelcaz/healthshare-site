'use client';

import { useState } from 'react';
import { Scissors, Stethoscope, Activity, ArrowRight, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Helper function to highlight savings amounts
const formatPrices = (text: string) => {
  // First, mark the "bad" prices with a special token
  const markedText = text
    .replace(/\$2,300|\$400|\$32,000/g, '%%$&%%')
    // Then replace all remaining dollar amounts with green
    .replace(/\$[\d,]+/g, match => 
      match.includes('%%') 
        ? `<span class="text-rose-600 font-semibold">${match.replace(/%%/g, '')}</span>`
        : `<span class="text-emerald-600 font-semibold">${match}</span>`
    );
  return markedText;
};

const cards = [
  {
    title: "Emergency Room Visit",
    icon: Activity,
    iconColor: "text-red-600",
    coverage: "Plan covers 100% after your share for eligible needs",
    example: "Hit the ER with belly pain? One member's $2,300 bill shrank to a $1,000 hit—his plan covered $1,300, saving $1,800 vs. insurance's sky-high rates."
  },
  {
    title: "Primary Care Checkup",
    icon: Stethoscope,
    iconColor: "text-blue-600",
    coverage: "Depending on your plan, it's Free",
    example: "Need a checkup? One member paid $185—their plan covered it all, saving $215 vs. insurance's bloated $400 bill."
  },
  {
    title: "Surgery",
    icon: Scissors,
    iconColor: "text-purple-600",
    coverage: "Your plan covers 100% after your share for eligible needs",
    example: "Need knee surgery? One member got a $32,000 bill for the surgery, and the health share team negotiated it down to $14,000. The member paid her initial unshared amount of $1,000, and her plan covered the rest."
  }
];

export function SafetyNet() {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white" />
        <div className="absolute inset-0 bg-[url('/images/happy-family.jpg')] bg-cover bg-center opacity-10" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Ditch Insurance, Build Your Safety Net
          </h2>
          <div className="w-24 h-1 bg-[#6366F1] mx-auto rounded-full" />
          <div className="mt-8 mb-6">
            <p className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-indigo-500 text-transparent bg-clip-text">
              Watch how members slash costs on everyday care
            </p>
          </div>
          <div className="inline-block px-6 py-2 bg-gray-50 rounded-full">
            <p className="text-gray-600 text-sm">
              Pick a plan with <span className="font-semibold text-indigo-600">$1,000</span> Initial Unshared Amount—or customize yours from <span className="font-semibold text-indigo-600">$500</span> to <span className="font-semibold text-indigo-600">$5,000</span>!
            </p>
          </div>
          <div className="mb-12" />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              variants={fadeInUpVariants}
            >
              <div className={cn(
                "bg-white/90 backdrop-blur-sm rounded-xl p-6 transition-all border border-gray-100",
                "hover:shadow-lg hover:border-indigo-100 group"
              )}>
                <div className="mb-4">
                  <card.icon className={cn("w-8 h-8", card.iconColor)} />
                </div>
                
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{card.title}</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      COVERAGE
                      <Info className="w-4 h-4 text-gray-400 hover:text-indigo-600 cursor-help" />
                    </div>
                    <div className="text-indigo-600 font-medium">{card.coverage}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500">REAL EXAMPLE</div>
                    <div 
                      className="text-sm mt-1 text-gray-700"
                      dangerouslySetInnerHTML={{ __html: formatPrices(card.example) }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          variants={fadeInUpVariants}
          className="text-center mt-12"
        >
          <p className="text-xl text-gray-700 font-medium mb-8">
            Join a crew of savvy, healthy folks who've got your back—save more, together!
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "bg-gradient-to-r from-indigo-600 to-indigo-700",
              "text-white px-8 py-3 rounded-lg font-medium",
              "hover:from-indigo-700 hover:to-indigo-800",
              "shadow-md transition-all",
              "flex items-center gap-2 mx-auto"
            )}
          >
            See Your Savings
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
} 