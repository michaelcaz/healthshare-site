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
  
  // Use SVG placeholder logos
  const logoPath = `/images/providers/${normalizedName}.svg`;
  
  return (
    <div 
      className="bg-gray-100 rounded-md flex items-center justify-center overflow-hidden"
      style={{ width, height }}
    >
      <Image 
        src={logoPath}
        alt={`${providerName} logo`}
        width={width}
        height={height}
        className="object-contain"
        onError={(e) => {
          // Fallback to default provider logo if specific logo not found
          (e.target as HTMLImageElement).src = '/images/providers/default-provider.svg';
        }}
      />
    </div>
  );
} 