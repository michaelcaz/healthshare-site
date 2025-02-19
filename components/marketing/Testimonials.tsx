'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    quote: "Switching to Riff was the best healthcare decision I've made. The cost savings are real, and the service is actually better than my old insurance.",
    author: "Sarah Mitchell",
    role: "Small Business Owner",
    image: "/images/testimonials/sarah.jpg",
    rating: 5,
    highlight: "saved $436/month"
  },
  {
    quote: "I was skeptical at first, but after 6 months I'm completely sold. The process is straightforward, and I love having more control over my healthcare choices.",
    author: "Michael Chen",
    role: "Software Engineer",
    image: "/images/testimonials/michael.jpg",
    rating: 5,
    highlight: "better coverage"
  },
  {
    quote: "As a family of five, we were paying a fortune for insurance. Riff cut our monthly costs in half while maintaining great coverage for our kids.",
    author: "Jessica Rodriguez",
    role: "Teacher",
    image: "/images/testimonials/jessica.jpg",
    rating: 5,
    highlight: "50% savings"
  }
];

const decorativeElements = [
  { x: '10%', y: '20%', size: 'w-24 h-24', rotation: 12, delay: 0 },
  { x: '85%', y: '40%', size: 'w-32 h-32', rotation: -8, delay: 0.1 },
  { x: '15%', y: '75%', size: 'w-40 h-40', rotation: 5, delay: 0.2 },
  { x: '80%', y: '85%', size: 'w-28 h-28', rotation: -12, delay: 0.3 }
];

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <section 
      ref={containerRef}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-bg-warm to-white"
    >
      {/* Decorative Elements */}
      {decorativeElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute opacity-20"
          style={{
            left: element.x,
            top: element.y,
            rotate: element.rotation
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ 
            duration: 0.8,
            delay: element.delay,
            ease: "easeOut"
          }}
        >
          <div 
            className={`${element.size} rounded-full bg-gradient-to-br from-primary-light/40 to-accent-light/40 blur-xl`}
          />
        </motion.div>
      ))}

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ opacity, scale }}
      >
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="h2 mb-6">
            Real People, Real Savings
          </h2>
          <p className="subheadline text-gray-600">
            Join thousands of members who've discovered a better way to manage their healthcare costs
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.2
              }}
            >
              <div className="testimonial-card group">
                {/* Quote Marks */}
                <span className="quote-mark quote-mark-open">"</span>
                <span className="quote-mark quote-mark-close">"</span>

                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-primary text-xl">★</span>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg text-gray-600 mb-6">
                  {testimonial.quote}
                </blockquote>

                {/* Highlight */}
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {testimonial.highlight}
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button className="btn-primary btn-arrow">
            Join Our Community
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
} 