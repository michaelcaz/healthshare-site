'use client';

import { motion } from 'framer-motion';
import { IconShare, IconGlobe, IconShield } from '@/components/ui/icons';

interface ValuePropositionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ValueProposition = ({ icon, title, description }: ValuePropositionProps) => (
  <motion.div
    className="relative p-6 rounded-2xl bg-white shadow-sm border border-gray-100"
  >
    <div className="flex flex-col gap-4">
      <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

export const WhyHealthshare = () => {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const valueProps = [
    {
      icon: <IconShare className="w-6 h-6" />,
      title: "Share Don't Insure",
      description: "Stop padding corporate pockets. Pay 30-50% less by sharing costs directly with other members. Your monthly fees go into the community pot – when you have a big bill, your plan sends you everything above your IUA, and you pay your provider directly. Simple.",
    },
    {
      icon: <IconGlobe className="w-6 h-6" />,
      title: "Choose Anyone, Save Big",
      description: "See any provider you want and pay cash – instantly saving HUGE on care. You cover the small stuff, and in the event of \"big\" stuff your plan gets everything over your IUA for eligible needs. No networks, no referrals, no BS.",
    },
    {
      icon: <IconShield className="w-6 h-6" />,
      title: "Yes, It's 100% Legal",
      description: "Health share plans have been around for decades and are trusted by over 2 million Americans – from independent contractors to entrepreneurs, freelancers, and even doctors themselves.",
    },
  ];

  return (
    <section id="healthshare-explainer" className="relative py-24 bg-white">
      <div className="absolute left-[10%] top-[20%] w-[500px] h-[500px] rounded-full bg-[#FFF1EC] opacity-50 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Why Choose Healthshare?
          </h2>
          <div className="w-24 h-1 bg-[#6366F1] mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {valueProps.map((prop, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              variants={fadeInUpVariants}
            >
              <ValueProposition {...prop} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 