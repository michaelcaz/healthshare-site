'use client';

import { motion } from 'framer-motion';

interface TransparencyCardProps {
  icon: string;
  title: string;
  subtitle: string;
  body: string;
}

function TransparencyCard({ icon, title, subtitle, body }: TransparencyCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm font-bold uppercase text-red-600 mb-3">{subtitle}</p>
      <p className="text-gray-600">{body}</p>
    </div>
  );
}

export function TransparencySection() {
  const cards = [
    {
      icon: "🏥",
      title: "Not Insurance",
      subtitle: "No legal guarantee, but read this",
      body: "Insurance companies legally promise to pay your claims. Then they deny 15-51% of them and force you to fight billion dollar legal teams in court. Health share providers make no legal promises yet pay 98%+ of eligible claims and have stellar track records (each plan on this site has a 4.5/5 or higher avg. with hundreds of reviews on Google and Trustpilot). Which would you choose?"
    },
    {
      icon: "💰",
      title: "You Pay Cash, Get Reimbursed",
      subtitle: "This alone saves you thousands",
      body: "Here's a secret hospitals don't advertise: Cash prices can be 60-80% cheaper than insurance rates. A $10,000 insurance procedure could cost $2,000 cash. You pay upfront, submit your receipt, get reimbursed. This is how Healthcare Pioneers slash their medical costs."
    },
    {
      icon: "⏰",
      title: "Waiting Periods Apply",
      subtitle: "Why healthy people save the most",
      body: "New medical issues? Eligible immediately. But if you've seen a doctor for something in the past 2-5 years, you'll wait 1-2 years for sharing on related issues. This isn't a flaw, it's the feature that keeps your costs low."
    },
    {
      icon: "🎯",
      title: "Major Medical Only",
      subtitle: "Your safety net, not your maintenance plan",
      body: "The best health shares work like car insurance. They handle your accidents and emergencies, not your oil changes. You pay cash for the small stuff (at those 60-80% lower prices). Result? Your total healthcare costs plummet."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-r from-[#6B5CB3] to-[#4A3C8D] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
            What's the catch? We'll tell you up front.
          </h2>
          <p className="text-lg md:text-xl text-gray-200 italic font-light max-w-3xl mx-auto">
            The model is simple: Monthly membership fees go into a community pot. Medical bills get paid from that pot. No insurance company profits, no shareholder dividends, no CEO bonuses. Here's why this costs 30-50% less than traditional insurance and what catches exist:
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <TransparencyCard {...card} />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100"
            >
              <p className="text-lg font-semibold text-gray-900 text-center">
                The bottom line: These aren't perfect for everyone. But for healthy people tired of sky high premiums? They're a revolution.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 