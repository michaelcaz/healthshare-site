'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  title: string;
  description: string;
  highlight: string;
  testimonial: {
    name: string;
    role: string;
    planName: string;
    quote: string;
    photoPath: string;
    logoPath: string;
  };
}

const TestimonialCard = ({ 
  title, 
  description, 
  highlight, 
  testimonial 
}: TestimonialCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isQuoteExpanded, setIsQuoteExpanded] = useState(false);
  
  // Get first paragraph of description
  const firstParagraph = description.split('\n')[0];
  const remainingParagraphs = description.split('\n').slice(1);
  
  // Truncate quote if longer than 150 characters
  const shouldTruncateQuote = testimonial.quote.length > 150;
  const truncatedQuote = shouldTruncateQuote 
    ? `${testimonial.quote.substring(0, 150)}...` 
    : testimonial.quote;

  // Custom styling for Knew Health logo
  const isKnewHealth = testimonial.planName === "Knew Health";
  
  // Custom styling for Taylor's photo (no border)
  const isTaylor = testimonial.name === "Taylor Chamness";
  
  return (
    <motion.div 
      className={cn(
        "bg-white rounded-xl p-6",
        "shadow-md transition-all duration-300",
        "border border-indigo-100"
      )}
    >
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>

      <div className="bg-gray-50 rounded-lg p-5 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className={cn(
            "relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0",
            !isTaylor && "border-2 border-white shadow-sm"
          )}>
            <Image 
              src={testimonial.photoPath} 
              alt={testimonial.name}
              fill
              className="object-cover object-center"
              style={isTaylor ? { transform: 'scale(1.15)' } : undefined}
              priority
            />
          </div>
          
          <div className="flex-1">
            <p className="font-medium text-gray-900">{testimonial.name}</p>
            <p className="text-sm text-gray-600">{testimonial.role}</p>
            <div className="flex items-center mt-1">
              <div className={cn(
                "relative h-6 w-28",
                isKnewHealth && "h-7 w-32"
              )}>
                <Image 
                  src={testimonial.logoPath} 
                  alt={testimonial.planName}
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
        
        <blockquote className="text-gray-700 italic">
          "{isQuoteExpanded ? testimonial.quote : truncatedQuote}"
          {shouldTruncateQuote && !isQuoteExpanded && (
            <button 
              onClick={() => setIsQuoteExpanded(true)}
              className="text-indigo-600 hover:text-indigo-700 font-medium ml-1 inline-block"
            >
              Read full quote
            </button>
          )}
          {isQuoteExpanded && (
            <button 
              onClick={() => setIsQuoteExpanded(false)}
              className="text-indigo-600 hover:text-indigo-700 font-medium ml-1 inline-block"
            >
              Show less
            </button>
          )}
        </blockquote>
      </div>

      <div className="mb-4">
        <p className="text-gray-700">{firstParagraph}</p>
      </div>

      {!isExpanded && (
        <button 
          onClick={() => setIsExpanded(true)}
          className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
        >
          Read more
        </button>
      )}

      {isExpanded && (
        <div className="mt-4 space-y-3">
          {remainingParagraphs.map((paragraph, idx) => (
            <p key={idx} className="text-gray-700">{paragraph}</p>
          ))}
          
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mt-4">
            <p className="text-indigo-700 font-medium">{highlight}</p>
          </div>
          
          <button 
            onClick={() => setIsExpanded(false)}
            className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors mt-2 block"
          >
            Read less
          </button>
        </div>
      )}
    </motion.div>
  );
};

const testimonials = [
  {
    title: "There's More Manual Work",
    description: "With insurance, you just hand over your card. With healthshares, you'll pay smaller bills directly and submit them for reimbursement through a dashboard.\n\nBut here's the thing: This extra step is why you save 40-50% on costs. Plus, being a cash-pay patient often gets you better service and attention.",
    highlight: "The 2 minutes you spend uploading a receipt saves you hundreds of dollars.",
    testimonial: {
      name: "Karielle Silk",
      role: "Director, Playwright, Mother of three",
      planName: "Knew Health",
      quote: "The single greatest healthcare coverage experience my husband and I have ever had, combined! Not only is the plan affordable, the coverage makes sense and is fair - but the greatest thing of all is the opportunity to actually talk to a real person when things come up. Whenever information needs to be shared or a follow up needs to happen, I always get an email and am able to reply right there as well. As a mom of three young children, I don't have time to wait on hold or play phone tag with agents. Knew Health makes it easy to understand and easy to manage! 10/10 recommend.",
      photoPath: "/images/testimonials/Karielle-Silk.png",
      logoPath: "/images/logos/knew.svg"
    }
  },
  {
    title: "The Legal Protection Myth",
    description: "Insurance is a legally binding contract. In theory, you can sue if they wrongfully deny claims.\n\nBut let's be real: Insurance companies have mastered the 'Delay, Deny, Defend' system. With a 35% claim denial rate, how protected are you really?",
    highlight: "Would you rather have a 98% approval rate or the right to sue for a denial and spend 2-3 years trying to fight the best attorneys in the WORLD in court?",
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
    title: "Fear of Unknown Risk",
    description: "Your friends might raise eyebrows. 'Sounds like a scam,' they'll say.\n\nRemember Airbnb? 'You're letting strangers sleep in your house?!' Now millions trust it every day. Healthcare's changing—health shares are the next big thing. Early adopters always face skepticism, but with 95%+ member approval ratings, you're joining a trusted crew, not a gamble.",
    highlight: "The rebels always seem crazy before they're considered pioneers.",
    testimonial: {
      name: "Josie Fickell",
      role: "Counselor, Mother",
      planName: "Zion",
      quote: "I've had an amazing experience with Zion HealthShare! I just had my first child and had Zion throughout my whole pregnancy. They have awesome customer service and everyone I worked with was so kind. The maternity team was easy to get a hold of and made the process simple. I am so thankful for them and would definitely recommend them!",
      photoPath: "/images/testimonials/Josie-Fickell .png",
      logoPath: "/images/logos/zion.svg"
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
          transition={{ duration: 0.5 }}
          variants={fadeInUpVariants}
          className="text-center mb-16"
        >
          <h2 className="mb-4 font-bold leading-tight" style={{ 
            fontSize: 'var(--h2)',
            color: 'var(--color-warm-gray)' 
          }}>
            Worried? We Get It—Here's Why Health Shares Beat the Insurance Nightmare
          </h2>
          <div className="w-24 h-1 bg-[#6366F1] mx-auto rounded-full" />
          <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
            We get it. Here's our honest take on the three biggest concerns we hear.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              variants={fadeInUpVariants}
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