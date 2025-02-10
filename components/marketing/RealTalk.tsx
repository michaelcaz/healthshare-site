'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const considerations = [
  {
    title: "Yes, There's More Manual Work",
    icon: "📝",
    pro: "With insurance, you just hand over your card. With healthshares, you'll pay smaller bills directly and submit them for reimbursement through a dashboard.",
    perspective: "But here's the thing: This extra step is why you save 40-50% on costs. Plus, being a cash-pay patient often gets you better service and attention.",
    callout: "The 10 minutes you spend uploading a receipt saves you hundreds of dollars."
  },
  {
    title: "The Legal Protection Myth",
    icon: "⚖️",
    pro: "Yes, insurance is a legally binding contract. In theory, you can sue if they wrongfully deny claims.",
    perspective: "But let's be real: Insurance companies have mastered the 'Delay, Deny, Defend' system. With a 35% claim denial rate, how protected are you really? Most people can't afford years of litigation.",
    callout: "Would you rather have a 98% approval rate or the right to sue for a denial?"
  },
  {
    title: "The Bankruptcy Question",
    icon: "🏦",
    pro: "A few healthshares have gone bankrupt. This is a real concern and we won't sugarcoat it.",
    perspective: "However, more insurance companies have actually gone bankrupt. At Zion, we maintain 3 YEARS of claims expenses in reserve - that's more than most insurance companies.",
    callout: "Ask your insurance company about their reserve ratio. We'll wait."
  },
  {
    title: "The Social Pressure",
    icon: "🤨",
    pro: "Yes, your friends might raise eyebrows. 'Sounds like a scam,' they'll say.",
    perspective: "Remember Airbnb? 'You're letting strangers sleep in your house?!' Now it's worth billions. Healthcare is changing, and early adopters always face skepticism.",
    callout: "The rebels always seem crazy before they're considered heroes."
  }
];

export function RealTalk() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="relative py-24" style={{ background: 'var(--color-cream-bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-16 text-center" style={{ color: 'var(--color-warm-gray)' }}>
          Let's Talk About The Hard Parts
        </h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Manual Work Card */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-center" style={{ color: 'var(--color-warm-gray)' }}>
              Yes, There's More Manual Work
            </h3>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm space-y-3 min-h-[320px]">
              <div className="bg-[#e9e9eb] text-black p-3 rounded-[22px] rounded-tl-md max-w-[85%] text-sm">
                With insurance, you just hand over your card. With healthshares, you'll pay smaller bills directly and submit them for reimbursement through a dashboard.
              </div>

              <div className="bg-[#0b93f6] text-white p-3 rounded-[22px] rounded-tr-md ml-auto max-w-[85%] text-sm">
                But here's the thing: This extra step is why you save 40-50% on costs. Plus, being a cash-pay patient often gets you better service and attention.
              </div>

              <div className="bg-[#0b93f6] text-white p-3 rounded-[22px] rounded-tr-md ml-auto max-w-[85%] text-sm">
                The 10 minutes you spend uploading a receipt saves you hundreds of dollars.
              </div>
            </div>
          </div>

          {/* Pre-existing Conditions Card */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-center" style={{ color: 'var(--color-warm-gray)' }}>
              Pre-existing Conditions
            </h3>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm space-y-3 min-h-[320px]">
              <div className="bg-[#e9e9eb] text-black p-3 rounded-[22px] rounded-tl-md max-w-[85%] text-sm">
                Most healthshares have waiting periods for pre-existing conditions. Some conditions might not be eligible for sharing right away.
              </div>

              <div className="bg-[#0b93f6] text-white p-3 rounded-[22px] rounded-tr-md ml-auto max-w-[85%] text-sm">
                But new conditions are covered from day one. And many pre-existing conditions become eligible after 1-2 years of membership.
              </div>
            </div>
          </div>

          {/* Not Insurance Card */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-center" style={{ color: 'var(--color-warm-gray)' }}>
              Not Insurance
            </h3>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm space-y-3 min-h-[320px]">
              <div className="bg-[#e9e9eb] text-black p-3 rounded-[22px] rounded-tl-md max-w-[85%] text-sm">
                Healthshares aren't insurance. They're not regulated the same way and don't have the same guarantees.
              </div>

              <div className="bg-[#0b93f6] text-white p-3 rounded-[22px] rounded-tr-md ml-auto max-w-[85%] text-sm">
                But they've been around for 30+ years, and the best ones have excellent track records of sharing medical costs.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 