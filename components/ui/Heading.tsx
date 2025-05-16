import { FC, ReactNode, CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface HeadingProps {
  level?: 1 | 2 | 3;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const Heading: FC<HeadingProps> = ({ level = 1, children, className, style }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const base =
    level === 1
      ? 'text-3xl sm:text-4xl md:text-5xl font-bold'
      : level === 2
      ? 'text-2xl sm:text-3xl md:text-4xl font-semibold'
      : 'text-xl sm:text-2xl md:text-3xl font-semibold';
  return (
    <Tag
      className={cn(
        base,
        'leading-tight whitespace-normal mb-4 text-balance',
        className
      )}
      style={{ textWrap: 'balance', ...style }}
    >
      {children}
    </Tag>
  );
};

export default Heading; 