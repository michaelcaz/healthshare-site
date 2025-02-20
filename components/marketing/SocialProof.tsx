'use client';

import { motion } from 'framer-motion';
import { Star, Users, Clock, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  image: string;
  name: string;
  role: string;
  quote: string;
  savings: string;
}

const TestimonialCard = ({ image, name, role, quote, savings }: TestimonialCardProps) => (
  <motion.div 
    whileHover={{ y: -4 }}
    className={cn(
      "p-6 rounded-xl border border-gray-100",
      "hover:shadow-lg hover:border-indigo-100 transition-all"
    )}
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" 
        />
        <div className="absolute inset-0 rounded-full shadow-inner" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{name}</h3>
        <p className="text-gray-500 text-sm">{role}</p>
      </div>
    </div>
    <p className="text-gray-700 mb-4">"{quote}"</p>
    <p className="text-indigo-600 font-semibold">Saved {savings} annually</p>
  </motion.div>
);

interface StatisticProps {
  value: string;
  label: string;
  icon: React.ElementType;
}

const Statistic = ({ value, label, icon: Icon }: StatisticProps) => (
  <motion.div 
    whileHover={{ y: -2 }}
    className="text-center p-6 rounded-xl border border-gray-100 bg-white/80 backdrop-blur-sm hover:shadow-md transition-all"
  >
    <div className="flex items-center justify-center gap-2 mb-1">
      <Icon className="w-5 h-5 text-indigo-600" />
      <span className="text-4xl font-bold text-gray-900">{value}</span>
    </div>
    <p className="text-gray-600">{label}</p>
  </motion.div>
);

const testimonials = [
  {
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Sarah Johnson",
    role: "Self-employed Designer",
    quote: "Switching to healthshare was the best decision for my family. The monthly costs are so much more manageable.",
    savings: "$4,800"
  },
  {
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Michael Chen",
    role: "Small Business Owner",
    quote: "The transparency and community aspect really sets this apart from traditional insurance.",
    savings: "$3,600"
  },
  {
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Emily Rodriguez",
    role: "Freelance Developer",
    quote: "I love how simple everything is. No more confusion about what's covered and what's not.",
    savings: "$5,200"
  }
];

export function SocialProof() {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative py-24 bg-white">
      <div className="absolute left-[10%] top-[20%] w-[500px] h-[500px] rounded-full bg-[#FFF1EC] opacity-50 blur-3xl" />
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
            Real Members <span style={{ color: 'var(--color-coral-primary)' }}>Real Savings</span>
          </h2>
          <div className="w-24 h-1 bg-[#6366F1] mx-auto rounded-full" />
          <p className="text-xl text-gray-600 mt-4 mb-12">
            Join thousands who made the switch and never looked back.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              variants={fadeInUpVariants}
            >
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 