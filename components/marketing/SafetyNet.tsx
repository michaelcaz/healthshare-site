'use client';

import { useState, useEffect } from 'react';
import { Scissors, Stethoscope, Activity, ArrowRight, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

// Helper function to highlight savings amounts
const formatPrices = (text: string) => {
  // Replace all dollar amounts with appropriate styling
  return text
    .replace(/\$2,300|\$400|\$32,000/g, match => 
      `<span class="text-rose-600 font-semibold">${match}</span>`
    )
    .replace(/\$[\d,]+/g, match => 
      match.includes('class="text-rose-600') 
        ? match
        : `<span class="text-emerald-600 font-semibold">${match}</span>`
    );
};

const cards = [
  {
    title: "Emergency Room Visit",
    icon: Activity,
    iconColor: "text-red-600",
    coverage: "Plan covers 100% after your share for eligible needs",
    example: "Struck by a sudden stroke with an initial $90,000 hospital bill? Your health share provider would first negotiate it down to a fair market rate of, say, $55,000, then cover $54,000 (after your IUA of $1,000) and any follow up visits or therapy you need since it's part of the same \"need.\""
  },
  {
    title: "Accident",
    icon: Stethoscope,
    iconColor: "text-blue-600",
    coverage: "Plan covers 100% after your share for eligible needs",
    example: "Picture this: you fall off a ladder while painting your home, breaking your leg. You rack up $16,000 in bills for urgent care, a cast, follow-up visits, and physical therapy. Again, your health share plan steps in, negotiates the costs down to $6500, then covers the $5500 over your IUA."
  },
  {
    title: "Planned Surgery",
    icon: Scissors,
    iconColor: "text-purple-600",
    coverage: "Your plan covers 100% after your share for eligible needs",
    example: "Let's say you need a hip replacement. Your health share plan helps you find a high quality, trusted outpatient center. The cash pay market cost for the procedure is ~$22,000—a bundled rate covering the surgeon, facility, and follow-up care. After negotiation, your health share provider sends you $21,000 (you still cover your IUA), ensuring you can pay upfront at the time of service."
  }
];

export function SafetyNet() {
  const router = useRouter();
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  // State for expanded card (mobile/tablet)
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // Responsive desktop state
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

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
          <h2 className="mb-4 font-bold leading-tight text-4xl md:text-6xl text-center" style={{ color: 'var(--color-warm-gray)', wordBreak: 'keep-all', hyphens: 'none' }}>
            <span className="block">Ditch Insurance,</span>
            <span className="block">Build Your</span>
            <span className="block">Safety Net</span>
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
          {cards.map((card, index) => {
            // Determine if this card is open (expanded)
            const isOpen = isDesktop || openIndex === index;
            return (
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
                  !isOpen && 'cursor-pointer'
                )}
                  onClick={() => {
                    if (!isDesktop) {
                      setOpenIndex(openIndex === index ? null : index);
                    }
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <card.icon className={cn("w-8 h-8", card.iconColor)} />
                      <h3 className="text-xl font-semibold text-gray-900">{card.title}</h3>
                    </div>
                    {/* Show arrow on mobile/tablet only */}
                    {!isDesktop && (
                      <div className="ml-2">
                        {isOpen ? (
                          <ChevronUp className="w-6 h-6 text-indigo-600" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-gray-500" />
                        )}
                      </div>
                    )}
                  </div>
                  {/* Expandable content */}
                  {(isOpen || isDesktop) && (
                    <div className="space-y-4">
                      <div>
                        <div className="text-indigo-600 font-medium">{card.coverage}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">IMAGINED EXAMPLE</div>
                        <div
                          className="text-sm mt-1 text-gray-700"
                          dangerouslySetInnerHTML={{ __html: formatPrices(card.example) }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
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
            onClick={() => router.push('/questionnaire')}
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