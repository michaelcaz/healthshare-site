'use client';

import { motion } from 'framer-motion';

interface TrustBadge {
  icon: string;
  label: string;
  tooltip?: string;
  type: 'security' | 'social' | 'compliance' | 'rating';
}

// Empty array - no badges
const badges: TrustBadge[] = [];

interface TrustBadgesProps {
  variant?: 'subtle' | 'prominent';
  types?: ('security' | 'social' | 'compliance' | 'rating')[];
}

export function TrustBadges({ variant = 'subtle', types = [] }: TrustBadgesProps) {
  // Empty filtered badges array - will always return null
  const filteredBadges = badges.filter(badge => types.includes(badge.type));

  // No badges, so always return null (renders nothing)
  return null;
} 