'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { NotificationCard, StatCard } from '@/components/ui/floating-card';
import { CheckCircle, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Hero() {
  const router = useRouter();
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [zipCode, setZipCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode) {
      // Redirect directly to questionnaire page with zip code as a parameter
      router.push(`/questionnaire?zip=${zipCode}`);
    }
  };

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
    <section className="relative min-h-[calc(100vh-6rem)] flex flex-col justify-between overflow-hidden bg-white">
      <div className="flex-1">
        {/* Decorative Circle */}
        <div className="absolute left-[10%] top-[20%] w-[500px] h-[500px] rounded-full bg-[#FFF1EC] opacity-50 blur-3xl" />

        {/* Main Content */}
        <div className="relative container mx-auto px-4 py-8 md:py-16 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left max-w-xl lg:max-w-none pt-4 md:pt-8"
          >
            <h1 className="text-3xl md:text-[3.5rem] leading-[1.1] font-bold mb-4 md:mb-6 text-gray-warm">
              It's not health insurance.{' '}
              <span className="text-[#6366F1]">That's the point.</span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-gray-warm/80 mb-6 md:mb-10 max-w-xl">
              Hot take: healthier people should pay less for a safety net. Why should you pay sky-high premiums to cover other people's health problems? Join 2M+ Americans saving 30-50% with healthcare plans that reward health-conscious entrepreneurs, freelancers, and independent contractors like you.
            </p>
            <motion.form 
              onSubmit={handleSubmit} 
              className="flex w-full max-w-[600px] h-12 md:h-16 p-1.5 bg-white rounded-full border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <input
                type="text"
                placeholder="Enter zip code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="flex-1 px-4 md:px-6 bg-transparent outline-none text-base md:text-lg text-gray-600 placeholder-gray-400"
                maxLength={5}
                pattern="[0-9]*"
              />
              <motion.button
                type="submit"
                className="px-4 md:px-8 py-2 bg-[#FF4500] hover:bg-[#E03E00] text-white font-semibold rounded-full transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Find my plan
              </motion.button>
            </motion.form>
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
              
              {/* Floating notification cards - only visible on larger screens */}
              <div className="hidden md:block">
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
                  label="Active Healthshare Members"
                  trend={{ direction: 'up', value: '12%' }}
                  position="bottom-right"
                  delay={0.8}
                  className="-right-8 bottom-16 shadow-xl bg-white/95 backdrop-blur-sm"
                />

                <NotificationCard
                  icon={<Users className="w-4 h-4 text-accent" />}
                  title="Healthcare Revolution"
                  subtitle="Pioneers wanted"
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
            </div>
          </motion.div>
        </div>
      </div>

      {/* Social Proof Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full bg-white py-8 mt-8 md:mt-12"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <h2 className="text-base font-medium text-gray-500 tracking-wider mb-4 md:mb-8 text-center">
              Our health share plans have been featured in...
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8 lg:gap-12 items-center justify-items-center w-full max-w-6xl mx-auto">
              <Image
                src="/images/logos/wsj.svg"
                alt="Wall Street Journal"
                width={96}
                height={32}
                className="h-6 md:h-8 w-auto opacity-60 grayscale"
                style={{ width: 'auto' }}
              />
              <Image
                src="/images/logos/pbs.svg"
                alt="PBS"
                width={96}
                height={32}
                className="h-6 md:h-8 w-auto opacity-60 grayscale"
                style={{ width: 'auto' }}
              />
              <Image
                src="/images/logos/forbes.svg"
                alt="Forbes"
                width={96}
                height={32}
                className="h-6 md:h-8 w-auto opacity-60 grayscale"
                style={{ width: 'auto' }}
              />
              <Image
                src="/images/logos/vox.svg"
                alt="Vox"
                width={144}
                height={32}
                className="w-24 md:w-[144px] opacity-70 grayscale"
              />
              <Image
                src="/images/logos/nbcnews.svg"
                alt="NBC News"
                width={200}
                height={32}
                className="w-32 md:w-[200px] opacity-70 grayscale"
              />
              <Image
                src="/images/logos/cbsnews.svg"
                alt="CBS News"
                width={96}
                height={32}
                className="h-6 md:h-8 w-auto opacity-60 grayscale"
                style={{ width: 'auto' }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
} 