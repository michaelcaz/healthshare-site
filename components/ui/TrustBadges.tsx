'use client';

import { motion } from 'framer-motion';

interface TrustBadge {
  icon: string;
  label: string;
  tooltip?: string;
  type: 'security' | 'social' | 'compliance' | 'rating';
}

const badges: TrustBadge[] = [
  {
    icon: '🔒',
    label: 'SSL Secure',
    tooltip: 'Your data is encrypted and secure',
    type: 'security'
  },
  {
    icon: '⭐️',
    label: 'A+ BBB Rating',
    tooltip: '10+ years of excellent service',
    type: 'rating'
  },
  {
    icon: '✓',
    label: 'HIPAA Compliant',
    tooltip: 'Medical information is protected',
    type: 'compliance'
  },
  {
    icon: '👥',
    label: '2M+ Members',
    tooltip: 'Join our trusted community',
    type: 'social'
  }
];

interface TrustBadgesProps {
  variant?: 'subtle' | 'prominent';
  types?: ('security' | 'social' | 'compliance' | 'rating')[];
}

export function TrustBadges({ variant = 'subtle', types = ['security', 'rating'] }: TrustBadgesProps) {
  const filteredBadges = badges.filter(badge => types.includes(badge.type));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex items-center gap-4 ${
        variant === 'subtle' 
          ? 'text-sm text-gray-500' 
          : 'text-base text-gray-700'
      }`}
    >
      {filteredBadges.map((badge, index) => (
        <div 
          key={index}
          className="flex items-center group relative"
        >
          <span className="mr-1">{badge.icon}</span>
          <span>{badge.label}</span>
          
          {badge.tooltip && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {badge.tooltip}
            </div>
          )}
        </div>
      ))}
    </motion.div>
  );
} 