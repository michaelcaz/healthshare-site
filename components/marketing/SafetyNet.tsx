'use client';

import { useState } from 'react';
import { Ambulance, User, Hospital, Stethoscope, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CareCardProps {
  title: string;
  icon: React.ElementType;
  coverage: string;
  waitingPeriod: string;
  example: string;
}

const CareCard = ({ title, icon: Icon, coverage, waitingPeriod, example }: CareCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const previewText = example.split('. ')[0] + '...';
  
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        "bg-white rounded-xl p-6 transition-all border border-gray-100",
        "hover:shadow-lg hover:border-indigo-100"
      )}
    >
      <div className="mb-4">
        <Icon className="w-8 h-8 text-indigo-600" />
      </div>
      
      <h3 className="text-xl font-semibold mb-4 text-gray-900">{title}</h3>
      
      <div className="space-y-4">
        <div>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            COVERAGE
            <Info className="w-4 h-4 text-gray-400 hover:text-indigo-600 cursor-help" />
          </div>
          <div className="text-indigo-600 font-medium">{coverage}</div>
        </div>
        
        <div>
          <div className="text-sm text-gray-500">WAITING PERIOD</div>
          <div className="text-gray-900">{waitingPeriod}</div>
        </div>
        
        <div>
          <div className="text-sm text-gray-500">REAL EXAMPLE</div>
          <div className="text-sm mt-1 text-gray-700">
            {isExpanded ? example : previewText}
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "text-indigo-600 text-sm mt-2 flex items-center gap-1",
              "hover:text-indigo-700 transition-colors"
            )}
          >
            {isExpanded ? (
              <>Show less <ChevronUp className="w-4 h-4" /></>
            ) : (
              <>Read more <ChevronDown className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const cards = [
  {
    title: "Emergency Room Visit",
    icon: Ambulance,
    coverage: "100% shared after member portion",
    waitingPeriod: "Immediate",
    example: "A member recently visited the ER for severe abdominal pain. The total bill was $2,800. They paid their $1,000 IUA, and the remaining $1,800 was shared by the community, saving them $1,800 compared to paying out of pocket."
  },
  {
    title: "Primary Care Visit",
    icon: User,
    coverage: "Shared in full",
    waitingPeriod: "30 day wait",
    example: "Through our preferred provider network, members typically pay $40-85 per visit with no need to meet their IUA first. A recent member paid $45 for their check-up that would have cost $180 through traditional insurance."
  },
  {
    title: "Specialist Care",
    icon: Stethoscope,
    coverage: "Shared in full",
    waitingPeriod: "30 day wait",
    example: "A member recently saw a cardiologist through our network. Instead of the typical $280 specialist visit cost, they paid only $125. Since this was a single visit, their IUA didn't apply, resulting in direct savings."
  },
  {
    title: "Surgery",
    icon: Hospital,
    coverage: "100% shared after member portion",
    waitingPeriod: "90 day wait",
    example: "A member needed knee surgery that typically costs $32,000. They paid their $1,000 IUA, and the community shared the remaining $31,000. Through our negotiated rates, the total cost was reduced to $8,500, saving the community over $23,500."
  }
];

export function SafetyNet() {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative py-24 bg-white">
      <div className="absolute right-[10%] top-[20%] w-[375px] h-[375px] rounded-full bg-[#ECF1FF] opacity-50 blur-3xl" />
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
            Your New Safety Net
          </h2>
          <div className="w-24 h-1 bg-[#6366F1] mx-auto rounded-full" />
          <p className="text-xl text-gray-600 mt-4 mb-4">
            See how members save on common medical needs
          </p>
          <p className="text-gray-600 mb-12">
            Let's assume you select a plan with a $1,000 Initial Unshared Amount (IUA).
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              variants={fadeInUpVariants}
            >
              <CareCard {...card} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 