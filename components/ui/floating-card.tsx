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
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            {icon}
          </div>
        ) : null}
        <div>
          <p className="text-sm font-medium text-gray-warm">{title}</p>
          <p className="text-xs text-gray-warm/60">{subtitle}</p>
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
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-warm">{value}</span>
          {trend && (
            <span className={`text-xs font-medium ${
              trend.direction === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
              {trend.direction === 'up' ? '↑' : '↓'} {trend.value}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-warm/60">{label}</p>
      </div>
    </FloatingCard>
  );
} 