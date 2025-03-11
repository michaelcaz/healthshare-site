import React from 'react';
import { Building } from 'lucide-react';
import Image from 'next/image';

interface ProviderLogoProps {
  providerName: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ProviderLogo({ providerName, size = 'md' }: ProviderLogoProps) {
  const dimensions = {
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 },
    lg: { width: 64, height: 64 },
  };

  const { width, height } = dimensions[size];
  
  // Normalize provider name for logo lookup
  const normalizedName = providerName.toLowerCase().replace(/\s+/g, '-');
  
  // For now, we'll use a placeholder. In production, you would have actual logos
  // and use something like:
  // const logoPath = `/images/providers/${normalizedName}.png`;
  
  return (
    <div 
      className="bg-gray-100 rounded-md flex items-center justify-center"
      style={{ width, height }}
    >
      {/* In production, replace this with:
      <Image 
        src={logoPath}
        alt={`${providerName} logo`}
        width={width}
        height={height}
        className="object-contain"
      /> */}
      <Building className={`text-gray-400 ${size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-6 w-6' : 'h-8 w-8'}`} />
    </div>
  );
} 