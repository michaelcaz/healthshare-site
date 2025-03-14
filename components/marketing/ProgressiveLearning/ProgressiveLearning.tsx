'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Plus, Minus, Book, Lightbulb, Target, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LearningLevel {
  title: string;
  icon: React.ElementType;
  content: string;
  details: string;
}

const levels: LearningLevel[] = [
  {
    title: "The Basics",
    icon: Book,
    content: "Health Sharing: Healthcare That Doesn't Suck",
    details: `Health share plans aren't insurance—they're better for people like you. Think of it as a community-powered way to cover medical costs without the soul-crushing premiums, deductibles, and fine print of traditional insurance. Here's the gist:

1. You're Part of a Crew, Not a Corporation
Instead of feeding a faceless insurance machine, you join a group of like-minded people who pool their money to help each other out. Your contribution helps real people—not corporate profits.

2. Way Cheaper for the Healthy
If you're a young, healthy individual or family, this is built for you. Way lower costs than insurance—why pay for a system designed for the sick when you're not?

3. Skip the Insurance Hassle
Pay providers directly and save big—no insurance nonsense jacking up prices. It's straightforward, the way healthcare should be.

4. Freedom to Choose Your Doc
Forget "in-network" headaches. See who you want, when you want—your go-to doctor or someone new. No restrictive networks here.

5. It's a Lifestyle Match
These plans ask you to live smart, stay active, and keep costs fair for everyone. You take care of yourself; the community's got your back.

The Catch? It's not for everyone. Pre-existing conditions might have waiting periods or limits, and it's not a government-backed safety net like insurance. But if you're healthy and hate overpaying, this could be your game-changer.`
  },
  {
    title: "Why This Works",
    icon: ShieldCheck,
    content: "Why you end up paying more with insurance and how health share plans flip the script",
    details: `Why Traditional Insurance Costs Are a Horror Show

1. Profit Over Patients
Insurance companies aren't charities; they're businesses built to maximize profits. Back in the '90s, McKinsey handed them the playbook: pay out less, pocket more. The result? The 'Delay, Deny, Defend' strategy—now an industry standard. Ever had a claim stuck in limbo for months or denied over a technicality? That's not a glitch; it's the system working exactly as designed—to protect their bottom line, not your health.

2. The In-Network Price Gouging Game
"In-network" sounds like a VIP perk, but it's a rigged game. Insurers haggle discounts with providers (think doctors and hospitals), who jack up rates to compensate. It's a vicious cycle: insurers push for more discounts, providers hike prices again, and the dance continues—leaving you paying Ferrari prices for a flu shot that should cost peanuts.

3. Your Health Doesn't Affect Your Premium
The Affordable Care Act aimed to make healthcare accessible, but it flattened the playing field, sometimes too flat. Insurers can't tweak premiums based on your health, so if you're a fitness buff, you're still paying the same as someone with a laundry list of ailments. Got a high-deductible plan? You might shell out more out-of-pocket than the guy with three specialists on speed dial. It's like splitting a bar tab with a friend who ordered the lobster while you stuck to water.

4. Corporate Bloat Costs You Big
Health insurance giants are like massive cruise ships—thousands of employees, layers of middle management, and executive bonuses that could fund a small country. The bigger they get, the more crew they need to run the ship. Coverage doesn't improve, but your premiums keep climbing—because you're the one paying for the crew's salaries.

How Health Share Plans Flip the Script (and Save Your Wallet)

1. Direct Sharing, No Middleman
Health share plans are like a community piggy bank: your money goes straight to helping members with their medical bills. Imagine your contribution covering a neighbor's surgery instead of padding a CEO's bonus—no corporate fat cats skimming the top, just pure member-to-member cost sharing. Less overhead, more healthcare.

2. Healthy Vibes, Lower Costs
Members sign up for a deal: live smart, spend wisely by finding providers with fair prices, keep costs down for everyone. Think of it as a health-conscious squad rooting for each other. Waiting periods for pre-existing conditions make these plans perfect for healthy folks.

3. Cash Is King (and Cheaper)
With health share plans, you pay providers in cold, hard cash. Providers can slash their prices without the insurance red tape, no billing department nightmares—think farmers' market prices instead of department store markups.

4. Incentives Aligned With Members' Health
Most health share plans non-profit orgs. They're community-driven, not shareholder-driven. Your money stays focused on care, not Wall Street. The exception? Crowd Health—they charge a modest $55/month per member to help you negotiate down big bills, claims processing, and whatever is left over is their profit. They charge a second fee per month that is locked in a claims-only vault.`
  },
  {
    title: "How It Works",
    icon: Lightbulb,
    content: "From Signup to Safety Net: Here's the Playbook",
    details: `From Signup to Safety Net: Here's the Playbook

Health share plans are simple to use—here's how it all works, step-by-step, so you know exactly what to expect.

1. Join the Community
Choose a plan through our marketplace (we'll compare options for you)—a bare-bones catastrophic plan or a premium one with preventative care included. Costs depend on your age, family size, and needs. Sign up, and you're in.

2. Small Stuff's on You
For routine stuff like a sprained wrist from pickup basketball or a kid's runny nose, you cover the first chunk—your Initial Unshared Amount, set between $500 and $5,000. Then the community steps in for anything over that.

3. Big Bills? The Crowd Steps Up
Need surgery or hit the ER? You pay your Initial Unshared Amount, submit the rest for reimbursement, and get paid back in 7-14 days or less.

4. Shop Like a Pro
Pay providers with cash. Use our discount tools—get 25-85% off X-rays, surgeries, whatever. Your advocate can even negotiate big bills down before the community chips in.

5. No Fine Print Traps
It's clear-cut: emergencies, surgeries, even virtual therapy are in. Pre-existing stuff might wait a year or two. You'll know what's covered—no "denied claim" surprises.

Real-World Example:
You're 30, twist your ankle hiking. Virtual doc says "sprain" (free w/ most health share plans), ortho visit ($300), four sessions of physical therapy ($800) and you're back to normal. Total: $1100. Your IUA is $500, so you pay the first $500, submit $600, and are reimbursed in days. Insurance? You'd be stuck with sky high premiums and an $8500 deductible—you'd have to sprain it another 7.5x before they'd help.

The Bottom Line:
It's healthcare your way—fast, fair, and wallet-friendly. You're not just saving cash; you're part of a smarter system.`
  }
];

export function ProgressiveLearning() {
  // Removing the activeLevel state since we're no longer using it
  // const [activeLevel, setActiveLevel] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({});

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const toggleSection = (index: number) => {
    setExpandedSections(prev => {
      // Close all other sections when opening a new one
      const newState = Object.keys(prev).reduce((acc, key) => {
        acc[parseInt(key)] = false;
        return acc;
      }, {} as Record<number, boolean>);
      
      // Toggle the clicked section
      newState[index] = !prev[index];
      
      // If we're opening this section, scroll to it
      if (newState[index]) {
        setTimeout(() => {
          document.getElementById(`section-${index}`)?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
      
      return newState;
    });
  };

  return (
    <section className="relative py-24 bg-white">
      <div className="absolute right-[10%] top-[20%] w-[375px] h-[375px] rounded-full bg-[#ECF1FF] opacity-50 blur-3xl" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeInUpVariants}
          className="text-center mb-12"
        >
          <h2 className="mb-4 font-bold leading-tight" style={{ 
            fontSize: 'var(--h2)',
            color: 'var(--color-warm-gray)' 
          }}>
            Understanding Healthcare Sharing
          </h2>
          <div className="w-24 h-1 bg-[#6366F1] mx-auto rounded-full" />
        </motion.div>
        
        {/* Content Area */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          variants={fadeInUpVariants}
        >
          <div className="space-y-4">
            {levels.map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="opacity-100"
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className={cn(
                    "flex items-center justify-between cursor-pointer p-5",
                    "border border-gray-200 rounded-xl",
                    "hover:bg-gray-50 hover:border-[#6366F1]/20 transition-all"
                  )}
                  onClick={() => toggleSection(index)}
                  id={`section-${index}`}
                >
                  <h3 className="text-xl font-semibold flex items-center">
                    <level.icon className="w-6 h-6 mr-3 text-[#6366F1]" />
                    {level.title}
                  </h3>
                  <div className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full",
                    "transition-colors duration-200",
                    expandedSections[index] 
                      ? "bg-indigo-100 text-indigo-600" 
                      : "bg-gray-100 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600"
                  )}>
                    {expandedSections[index] ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </motion.div>
                
                {expandedSections[index] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 px-5 py-6 text-gray-600 bg-gray-50/50 rounded-xl"
                  >
                    <div className="prose prose-gray max-w-none">
                      {level.details.split('\n\n').map((paragraph, idx) => {
                        // Check if this is a heading
                        if (paragraph.startsWith('Why Traditional') || 
                            paragraph.startsWith('How Health Share') ||
                            paragraph.startsWith('From Signup to Safety Net')) {
                          return (
                            <h3 key={idx} className="text-xl font-semibold text-gray-800 mb-6 mt-8 first:mt-0">
                              {paragraph}
                            </h3>
                          );
                        }
                        // Check if this is a numbered point
                        if (/^\d+\./.test(paragraph)) {
                          const [title, ...content] = paragraph.split('\n');
                          return (
                            <div key={idx} className="mb-6">
                              <h4 className="text-lg font-medium text-gray-800 mb-2">{title}</h4>
                              <div className="text-gray-600 leading-relaxed">
                                {content.join('\n')}
                              </div>
                            </div>
                          );
                        }
                        // Check if this is a section header (Real-World Example or The Bottom Line)
                        if (paragraph.startsWith('Real-World Example:') || paragraph.startsWith('The Bottom Line:')) {
                          const [title, ...content] = paragraph.split('\n');
                          return (
                            <div key={idx} className="mb-6">
                              <h4 className="text-lg font-semibold text-gray-800 mb-2">{title}</h4>
                              <div className="text-gray-600 leading-relaxed">
                                {content.join('\n')}
                              </div>
                            </div>
                          );
                        }
                        // Regular paragraph
                        return (
                          <p key={idx} className="text-gray-600 mb-4 leading-relaxed">
                            {paragraph}
                          </p>
                        );
                      })}
                    </div>
                    
                    {/* Minimize Button */}
                    <div className="mt-6 flex justify-center">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSection(index);
                          // Scroll to the section header
                          document.getElementById(`section-${index}`)?.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'center'
                          });
                        }}
                        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
                      >
                        <ChevronUp className="w-4 h-4" />
                        <span>Minimize section</span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 