'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { NotificationCard, StatCard } from '@/components/ui/floating-card';
import { CheckCircle, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SvgImage } from '@/components/ui/SvgImage';

export function Hero() {
  console.log('Hero component mounted');
  const router = useRouter();
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const featuredGridRef = useRef<HTMLDivElement>(null);
  const logoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [logosLoaded, setLogosLoaded] = useState(0);

  const handleCTA = () => {
    router.push('/questionnaire');
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

  // Layout debug logging after mount
  useEffect(() => {
    if (!mounted) return;
    const logLayoutMetrics = () => {
      console.log('[Layout Debug] Starting layout analysis...');
      console.log('[Layout Debug] Viewport:', {
        width: window.innerWidth,
        height: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio,
        breakpoint: window.innerWidth >= 1024 ? 'lg' : window.innerWidth >= 768 ? 'md' : 'sm'
      });
      const mainSection = document.querySelector('section') || 
                         document.querySelector('.relative.min-h-\\[calc\\(100vh-6rem\\)\\]');
      const mainContent = document.querySelector('.flex-1') || 
                         document.querySelector('.flex.flex-col.justify-between > div:first-child');
      const featuredSection = document.querySelector('.w-full.bg-white') || 
                             document.querySelector('section > div:last-child');
      console.log('[Layout Debug] Elements found:', {
        mainSection: !!mainSection,
        mainContent: !!mainContent,
        featuredSection: !!featuredSection
      });
      if (mainSection && mainContent && featuredSection) {
        const mainSectionRect = mainSection.getBoundingClientRect();
        const mainContentRect = mainContent.getBoundingClientRect();
        const featuredSectionRect = featuredSection.getBoundingClientRect();
        console.log('[Layout Debug] Measurements:', {
          mainSection: {
            height: mainSectionRect.height,
            top: mainSectionRect.top,
            bottom: mainSectionRect.bottom
          },
          mainContent: {
            height: mainContentRect.height,
            top: mainContentRect.top,
            bottom: mainContentRect.bottom
          },
          featuredSection: {
            height: featuredSectionRect.height,
            top: featuredSectionRect.top,
            bottom: featuredSectionRect.bottom
          },
          gaps: {
            contentToFeatured: featuredSectionRect.top - mainContentRect.bottom,
            sectionToContent: mainContentRect.top - mainSectionRect.top,
            featuredToBottom: mainSectionRect.bottom - featuredSectionRect.bottom
          }
        });
        const mainSectionStyle = window.getComputedStyle(mainSection);
        const mainContentStyle = window.getComputedStyle(mainContent);
        const featuredSectionStyle = window.getComputedStyle(featuredSection);
        console.log('[Layout Debug] Computed Styles:', {
          mainSection: {
            minHeight: mainSectionStyle.minHeight,
            height: mainSectionStyle.height,
            padding: mainSectionStyle.padding,
            margin: mainSectionStyle.margin
          },
          mainContent: {
            flex: mainContentStyle.flex,
            padding: mainContentStyle.padding,
            margin: mainContentStyle.margin
          },
          featuredSection: {
            padding: featuredSectionStyle.padding,
            margin: featuredSectionStyle.margin
          }
        });
      } else {
        console.log('[Layout Debug] Could not find all required elements');
      }
    };
    setTimeout(logLayoutMetrics, 100);
    window.addEventListener('resize', logLayoutMetrics);
    return () => window.removeEventListener('resize', logLayoutMetrics);
  }, [mounted]);

  useEffect(() => {
    if (logosLoaded === 6) {
      if (featuredGridRef.current) {
        const style = window.getComputedStyle(featuredGridRef.current);
        console.log('[FeaturedLogos] Container gap:', style.gap, 'row-gap:', style.rowGap, 'column-gap:', style.columnGap);
        console.log('[FeaturedLogos] Container padding:', style.padding);
      }
      logoRefs.current.forEach((div, idx) => {
        if (div) {
          const img = div.querySelector('img');
          if (img) {
            const rect = img.getBoundingClientRect();
            console.log(`[FeaturedLogos] Logo ${idx + 1} (${img.alt}) size:`, rect.width, 'x', rect.height, 'src:', img.src);
          }
        }
      });
    }
  }, [logosLoaded]);

  if (!mounted) return null;

  return (
    <>
      <section className="relative min-h-[calc(100vh-6rem)] md:min-h-0 bg-white">
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
              {/* Logo + Brand Row */}
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <Image src="/images/sharewizelogofull.svg" alt="Sharewize Logo" width={40} height={40} className="h-10 w-10" />
                <span className="ml-3 text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Sharewize</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl leading-tight font-bold mb-4 md:mb-6 text-gray-warm break-keep">
                <span className="block">Share your health.</span>
                <span className="block text-[#6366F1]">Save your wealth.</span>
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-gray-warm/80 mb-6 md:mb-10 max-w-xl">
                Hot take: healthier people should pay less for a safety net. Why should you pay sky-high premiums to cover other people's health problems? Join 2M+ Americans saving 30-50% with healthcare plans that reward health-conscious entrepreneurs, freelancers, and independent contractors like you.
              </p>
              <div className="flex w-full justify-center">
                <motion.button
                  type="button"
                  onClick={handleCTA}
                  className="w-full max-w-xs md:max-w-sm py-3 md:py-4 px-6 md:px-8 bg-[#FF4500] hover:bg-[#E03E00] text-white font-bold text-lg md:text-xl rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF4500]"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Find my plan
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
                {/* Floating notification/stat cards - responsive for mobile and desktop */}
                {/* Mobile: only two stat cards, smaller text, custom positions */}
                <div className="block md:hidden">
                  <StatCard
                    value="$487"
                    label="Avg. Monthly Savings"
                    trend={{ direction: 'up', value: '8%' }}
                    position="bottom-left"
                    delay={1.2}
                    className="left-2 bottom-2 shadow-xl bg-white/95 backdrop-blur-sm text-xs px-2 py-1"
                  />
                  <StatCard
                    value="2M+"
                    label={<span className="block md:inline">Active Healthshare<br className="block md:hidden" />Members</span>}
                    trend={{ direction: 'up', value: '12%' }}
                    position="top-right"
                    delay={0.8}
                    className="right-2 top-2 shadow-xl bg-white/95 backdrop-blur-sm text-xs px-2 py-1 min-w-[110px]"
                  />
                </div>
                {/* Desktop: all four cards, original layout */}
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
      </section>

      {/* Social Proof Section - now outside the hero section */}
      <div className="w-full bg-white py-6 md:py-8 mt-6 md:mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <h2 className="text-base font-medium text-gray-500 tracking-wider mb-3 md:mb-6 text-center">
              Our health share plans have been featured in...
            </h2>
            <div className="grid grid-cols-3 gap-x-4 gap-y-4 md:grid-cols-3 lg:grid-cols-6 items-center justify-items-center w-full max-w-6xl mx-auto">
              <img src="/images/logos/wsj.svg" alt="Wall Street Journal" width={140} height={46} />
              <img src="/images/logos/pbs.svg" alt="PBS" width={96} height={32} />
              <img src="/images/logos/forbes.svg" alt="Forbes" width={96} height={32} />
              <img src="/images/logos/vox.svg" alt="Vox" width={144} height={32} />
              <img src="/images/logos/nbcnews.svg" alt="NBC News" width={200} height={32} />
              <img src="/images/logos/cbsnews.svg" alt="CBS News" width={140} height={46} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 