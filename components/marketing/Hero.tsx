'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { NotificationCard, StatCard } from '@/components/ui/floating-card';
import { CheckCircle, Users } from 'lucide-react';

export function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      const scrolled = window.scrollY;
      parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative min-h-[calc(100vh-6rem)] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background-warmer">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-warmer/50 to-background/50" />
      </div>

      {/* Floating Elements */}
      <div ref={parallaxRef} className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-[10%] left-[15%] w-72 h-72 rounded-full bg-primary animate-float"
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.05, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-[20%] right-[10%] w-96 h-96 rounded-full bg-accent animate-float"
          style={{ animationDelay: '2s' }}
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.08, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute bottom-[10%] left-[35%] w-48 h-48 rounded-full bg-primary-light animate-float"
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center gap-16">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center lg:text-left max-w-xl lg:max-w-none pt-8"
        >
          <h1 className="text-[3.5rem] leading-[1.1] font-bold mb-6 text-gray-warm">
            Healthcare,{' '}
            <span className="text-primary">simplified.</span>
          </h1>
          <p className="text-xl leading-relaxed text-gray-warm/80 mb-10 max-w-xl">
            Find the perfect healthcare sharing ministry plan for your needs. 
            Compare options, get quotes, and join a community of like-minded individuals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary text-lg px-8 py-4 rounded-xl"
            >
              Get Your Free Quote
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary text-lg rounded-xl"
            >
              Compare Plans
            </motion.button>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 relative"
        >
          <div className="relative w-full max-w-2xl mx-auto">
            <div className="aspect-[4/3] relative rounded-3xl shadow-xl overflow-hidden bg-gray-100">
              {/* Main Image */}
              <Image
                src="/images/happy-family.jpg"
                alt="Happy family enjoying outdoor activities at sunset"
                width={2100}
                height={1400}
                className="w-full h-full object-cover object-center rounded-3xl"
                priority
              />
              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/5" />
            </div>
            
            {/* Floating notification cards */}
            <NotificationCard
              icon={<CheckCircle className="w-4 h-4 text-primary" />}
              title="New Member Joined"
              subtitle="Just now"
              position="top-left"
              delay={0.6}
              className="-left-8 top-8 shadow-xl bg-white/95 backdrop-blur-sm"
            />

            <StatCard
              value="2M+"
              label="Active Members"
              trend={{ direction: 'up', value: '12%' }}
              position="bottom-right"
              delay={0.8}
              className="-right-8 bottom-16 shadow-xl bg-white/95 backdrop-blur-sm"
            />

            <NotificationCard
              icon={<Users className="w-4 h-4 text-accent" />}
              title="Community Growing"
              subtitle="50k new members this month"
              position="top-right"
              delay={1}
              className="-right-8 top-16 shadow-xl bg-white/95 backdrop-blur-sm"
            />

            <StatCard
              value="$487"
              label="Avg. Monthly Savings"
              trend={{ direction: 'up', value: '8%' }}
              position="bottom-left"
              delay={1.2}
              className="-left-8 bottom-24 shadow-xl bg-white/95 backdrop-blur-sm"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
} 