import React from 'react';
import { Building } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface ProviderLogoProps {
  providerName: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  style?: React.CSSProperties;
  svgStyle?: React.CSSProperties;
}

export function ProviderLogo({ providerName, size = 'md', className = '', style, svgStyle }: ProviderLogoProps) {
  const dimensions = {
    sm: { width: 40, height: 40 },
    md: { width: 100, height: 60 },
    lg: { width: 120, height: 80 },
    xl: { width: 140, height: 90 },
  };

  const { width, height } = dimensions[size];
  
  // Normalize provider name for logo lookup
  const normalizedName = providerName.toLowerCase();
  
  let src = '/images/providers/default-provider.svg';
  if (normalizedName.includes('zion')) {
    src = '/images/logos/zion.svg';
  } else if (normalizedName.includes('sedera')) {
    src = '/images/logos/sedera.svg';
  } else if (normalizedName.includes('knew')) {
    src = '/images/logos/knew.svg';
  } else if (normalizedName.includes('crowd')) {
    src = '/images/logos/crowd-health.svg';
  }
  
  // Style logic as before
  const logoStyle = svgStyle || style || { maxWidth: '100%', maxHeight: '100%' };
  
  return (
    <div 
      className={cn(
        "bg-white rounded-md flex items-center justify-center overflow-hidden",
        className
      )}
      style={{ width, height, ...style }}
    >
      <Image
        src={src}
        alt={`${providerName} logo`}
        width={width}
        height={height}
        className="object-contain p-0"
        style={logoStyle}
        priority
      />
    </div>
  );
} 