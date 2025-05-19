'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Testimonial {
  name: string;
  role: string;
  planName: string;
  quote: string;
  photoPath: string;
  logoPath: string;
}

interface TestimonialCardProps {
  title: string;
  description: string;
  highlight: string;
  testimonial: Testimonial;
}

const TestimonialCard = ({
  title,
  description,
  highlight,
  testimonial
}: TestimonialCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isQuoteExpanded, setIsQuoteExpanded] = useState(false);
  
  // Split description into paragraphs
  const paragraphs = description.split('\n');
  
  // Truncate quote if longer than 150 characters
  const shouldTruncateQuote = testimonial.quote.length > 150;
  const truncatedQuote = shouldTruncateQuote 
    ? `${testimonial.quote.substring(0, 150)}...` 
    : testimonial.quote;

  // Custom styling for Knew Health logo
  const isKnewHealth = testimonial.planName === "Knew Health";
  
  return (
    <motion.div 
      className={cn(
        "bg-white rounded-xl p-8 mb-12",
        "shadow-md transition-all duration-300",
        "border border-indigo-100"
      )}
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side - Concern and explanation */}
        <div className="flex-1">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h3>
            
            <div className="space-y-4">
              {paragraphs.map((paragraph, idx) => (
                <p key={idx} className="text-gray-700">{paragraph}</p>
              ))}
            </div>
          </div>
          
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mb-6">
            <p className="text-indigo-900 font-medium">{highlight}</p>
          </div>
        </div>
        
        {/* Right side - Testimonial */}
        <div className="flex-1">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-white shadow-sm">
                <Image 
                  src={testimonial.photoPath} 
                  alt={testimonial.name}
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
            
            <div className="mb-4">
              {isQuoteExpanded ? (
                <p className="text-gray-700">{testimonial.quote}</p>
              ) : (
                <p className="text-gray-700">{truncatedQuote}</p>
              )}
              
              {shouldTruncateQuote && (
                <button 
                  onClick={() => setIsQuoteExpanded(!isQuoteExpanded)}
                  className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors mt-2"
                >
                  {isQuoteExpanded ? 'Read less' : 'Read more'}
                </button>
              )}
            </div>
            
            <div className="mt-4">
              <div className="relative h-8 w-28">
                <Image 
                  src={testimonial.logoPath} 
                  alt={`${testimonial.planName} logo`}
                  fill
                  className={cn(
                    "object-contain object-left",
                    isKnewHealth && "scale-110"
                  )}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const testimonials = [
  {
    title: "Will they really cover me if 💩 hits the fan?",
    description: "Traditional insurance offers a legal contract. In theory, this means protection if they deny your claim.\n\nReality tells a different story. Insurance companies excel at what industry insiders call the \"Delay, Deny, Defend\" strategy. With denial rates reaching 35%-51% for some insurers, that legal protection often means years of fighting against massive corporate legal teams.\n\nThere are thousands of examples of people that have gotten cancer diagnoses, needed heart surgery, been in major accidents, etc. that have been entirely covered by their health share plan (after hitting their IUA).",
    highlight: "Would you rather have the 98%+ needs approval rating of health share companies on this marketplace or the right to sue for a denial and spend 2-3 years trying to fight the best attorneys in the WORLD in court?",
    testimonial: {
      name: "Taylor Chamness",
      role: "Financial Advisor, Father of two",
      planName: "Sedera",
      quote: "Sedera has been fantastic for me and my family. We save over $700 per month as a family compared to our old insurance plan. My wife had to have knee surgery soon after we enrolled and everyone was really helpful, the process was straightforward and the community kicked in the funds for the needs of surgery. Sedera is a great solution to the frustrations many people have faced trying to insure a family through traditional health insurance.",
      photoPath: "/images/testimonials/Taylor-Chamness.png",
      logoPath: "/images/logos/sedera.svg"
    }
  },
  {
    title: "Is this just some sketchy, untested idea?",
    description: "No - it's a proven concept with decades of success.\n\nYour friends might raise eyebrows. 'Sounds like a scam,' they'll say.\n\nRemember Airbnb? 'You're letting strangers sleep in your house?!' Now millions trust it every day. Healthcare's changing—health shares are the next big thing. Early adopters always face skepticism, but with 98%+ needs approval ratings for plans on this marketplace, you're joining a trusted crew, not a gamble.\n\nHealth sharing communities have been operating successfully since the 1980s, with over 2 million Americans currently participating. These are established organizations with long track records of paying eligible medical needs and supporting their members through health crises.",
    highlight: "The rebels always seem crazy before they're considered pioneers.",
    testimonial: {
      name: "Josie Fickell",
      role: "Counselor, Mother",
      planName: "Zion",
      quote: "I've had an amazing experience with Zion HealthShare! I just had my first child and had Zion throughout my whole pregnancy. They have awesome customer service and everyone I worked with was so kind. The maternity team was easy to get a hold of and made the process simple. I am so thankful for them and would definitely recommend them!",
      photoPath: "/images/testimonials/Josie-Fickell.png",
      logoPath: "/images/logos/zion.svg"
    }
  },
  {
    title: "Do I have to handle my own medical bills?",
    description: "With insurance, you just hand over your card. With health shares, you'll pay smaller bills directly. For larger bills (such as an emergency room visit, accident or other large medical need), you'll submit the need on your health share plan's online portal, and if it's eligible they'll either reimburse you or pay the provider directly.\n\nIt's an extra step. But here's the thing: This step is one of the reasons why you save 30-50% on costs. You're also less likely to have a need above your IUA if you're healthy. Plus, being a cash-pay patient often gets you better service and attention.",
    highlight: "The 2 minutes you spend uploading a receipt can save you thousands of dollars per year.",
    testimonial: {
      name: "Karielle Silk",
      role: "Director, Playwright, Mother of three",
      planName: "Knew Health",
      quote: "The single greatest healthcare coverage experience my husband and I have ever had, combined! Not only is the plan affordable, the coverage makes sense and is fair - but the greatest thing of all is the opportunity to actually talk to a real person when things come up. Whenever information needs to be shared or a follow up needs to happen, I always get an email and am able to reply right there as well. As a mom of three young children, I don't have time to wait on hold or play phone tag with agents. Knew Health makes it easy to understand and easy to manage! 10/10 recommend.",
      photoPath: "/images/testimonials/Karielle-Silk.png",
      logoPath: "/images/logos/knew.svg"
    }
  }
];

export function RealTalk() {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-indigo-50/30 to-white">
      <div className="absolute right-[10%] top-[20%] w-[375px] h-[375px] rounded-full bg-[#ECF1FF] opacity-50 blur-3xl" />
      <div className="absolute left-[5%] bottom-[10%] w-[300px] h-[300px] rounded-full bg-[#ECF1FF] opacity-30 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4" style={{ wordBreak: 'keep-all', hyphens: 'none' }}>
            Real Talk About Health Sharing
          </h2>
          <div className="w-24 h-1 bg-[#6366F1] mx-auto rounded-full mb-6" />
          <p className="text-lg text-gray-600">
            Let's address the common concerns about health sharing and see how our members feel about their experience.
          </p>
        </motion.div>
        
        <div className="space-y-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TestimonialCard 
                title={item.title}
                description={item.description}
                highlight={item.highlight}
                testimonial={item.testimonial}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 