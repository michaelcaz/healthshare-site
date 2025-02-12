'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SwipeableTestimonials } from '../ui/SwipeableTestimonials';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Self-employed Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    quote: "Switching to healthshare was the best decision for my family. The monthly costs are so much more manageable.",
    savings: "Saved $4,800 annually"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Small Business Owner",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    quote: "The transparency and community aspect really sets this apart from traditional insurance.",
    savings: "Saved $3,600 annually"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Freelance Developer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    quote: "I love how simple everything is. No more confusion about what's covered and what's not.",
    savings: "Saved $5,200 annually"
  }
];

export function SocialProof() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };

  return (
    <section className="relative py-[var(--section-spacing)]" style={{ background: 'var(--color-cream-bg)' }}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Real Members <span style={{ color: 'var(--color-coral-primary)' }}>Real Savings</span>
          </h2>
          <p className="max-w-3xl mx-auto" style={{ 
            fontSize: 'var(--text-xl)',
            color: 'var(--color-warm-gray)',
            opacity: 0.9 
          }}>
            Join thousands who made the switch and never looked back.
          </p>
        </motion.div>

        {/* Desktop Testimonials */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="hidden md:grid grid-cols-3 gap-8 mb-20"
        >
          {testimonials.map((testimonial) => (
            <motion.div 
              key={testimonial.id}
              variants={itemVariants}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="relative">
                  <img 
                    src={testimonial.image} 
                    alt=""
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div className="absolute inset-0 rounded-full shadow-inner" />
                </div>
                <div className="ml-4">
                  <div className="font-semibold" style={{ color: 'var(--color-warm-gray)' }}>
                    {testimonial.name}
                  </div>
                  <div className="text-sm" style={{ color: 'var(--color-warm-gray)', opacity: 0.7 }}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
              
              <blockquote className="mb-4" style={{ color: 'var(--color-warm-gray)', opacity: 0.9 }}>
                "{testimonial.quote}"
              </blockquote>
              
              <div className="font-semibold" style={{ color: 'var(--color-coral-primary)' }}>
                {testimonial.savings}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Testimonials */}
        <div className="md:hidden mb-20">
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-sm border border-gray-100"
          >
            <SwipeableTestimonials testimonials={testimonials} />
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: '96%', label: 'Member Satisfaction' },
            { number: '$12.4M', label: 'Shared Last Month' },
            { number: '4.9/5', label: 'App Store Rating' },
            { number: '10 Yrs', label: 'Trusted Service' },
          ].map((stat, index) => (
            <motion.div 
              key={index}
              variants={statsVariants}
              className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-100 text-center"
            >
              <div 
                className="text-3xl font-bold mb-2"
                style={{ color: 'var(--color-coral-primary)' }}
              >
                {stat.number}
              </div>
              <div style={{ color: 'var(--color-warm-gray)', opacity: 0.9 }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 