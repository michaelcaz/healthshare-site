'use client';

import { motion } from 'framer-motion';

interface HoverCardProps {
  children: React.ReactNode;
}

export function HoverCard({ children }: HoverCardProps) {
  return (
    <motion.div
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="relative"
    >
      <motion.div
        initial={{ boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
        whileHover={{ 
          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
          transition: { duration: 0.2 }
        }}
        className="bg-white rounded-xl p-6"
      >
        {children}
      </motion.div>
    </motion.div>
  );
} 