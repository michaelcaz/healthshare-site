import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FloatingCardProps {
  children?: ReactNode;
  className?: string;
  delay?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const positionClasses = {
  'top-left': '-left-8 top-1/4',
  'top-right': '-right-8 top-1/4',
  'bottom-left': '-left-8 bottom-1/4',
  'bottom-right': '-right-8 bottom-1/4',
};

export function FloatingCard({ 
  children, 
  className = '', 
  delay = 0,
  position = 'top-left'
}: FloatingCardProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay }}
      className={`
        absolute ${positionClasses[position]} 
        bg-white p-4 rounded-xl shadow-lg 
        animate-float ${className}
      `}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </motion.div>
  );
}

interface NotificationCardProps extends Omit<FloatingCardProps, 'children'> {
  icon?: ReactNode;
  title: string;
  subtitle: string;
}

export function NotificationCard({ 
  icon, 
  title, 
  subtitle,
  ...props 
}: NotificationCardProps) {
  return (
    <FloatingCard {...props}>
      <div className="flex items-center gap-3">
        {icon ? (
          <div className="w-8 h-8 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
            {icon}
          </div>
        ) : null}
        <div>
          <h4 className="text-sm font-medium">{title}</h4>
          <p className="text-xs text-gray-warm text-opacity-60">{subtitle}</p>
        </div>
      </div>
    </FloatingCard>
  );
}

interface StatCardProps extends Omit<FloatingCardProps, 'children'> {
  value: string;
  label: string;
  trend?: {
    direction: 'up' | 'down';
    value: string;
  };
}

export function StatCard({ 
  value, 
  label,
  trend,
  ...props 
}: StatCardProps) {
  return (
    <FloatingCard {...props}>
      <div className="text-2xl font-bold flex items-center">
        {value}
        {trend && (
          <span className={`ml-2 text-sm ${trend.direction === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {trend.direction === 'up' ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
      <p className="text-xs text-gray-warm text-opacity-60">{label}</p>
    </FloatingCard>
  );
} 