import React from 'react';
import { Building } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProviderLogoProps {
  providerName: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function ProviderLogo({ providerName, size = 'md', className = '' }: ProviderLogoProps) {
  const dimensions = {
    sm: { width: 40, height: 40 },
    md: { width: 100, height: 60 },
    lg: { width: 120, height: 80 },
    xl: { width: 140, height: 90 },
  };

  const { width, height } = dimensions[size];
  
  // Normalize provider name for logo lookup
  const normalizedName = providerName.toLowerCase();
  
  // Get the correct logo path based on provider name
  const getLogoPath = () => {
    if (normalizedName.includes('zion')) {
      return '/images/logos/zion.svg';
    } else if (normalizedName.includes('sedera')) {
      return '/images/logos/sedera.svg';
    } else if (normalizedName.includes('knew')) {
      return '/images/logos/knew.svg';
    } else if (normalizedName.includes('crowd')) {
      return '/images/logos/crowd-health.svg';
    }
    
    // Fallback to default logo
    return '/images/providers/default-provider.svg';
  };
  
  const logoPath = getLogoPath();

  // Special styling for CrowdHealth logo to ensure it appears visually consistent with Zion logo
  const getLogoStyle = () => {
    if (normalizedName.includes('crowd')) {
      // Adjust scale for CrowdHealth logo based on the size prop
      const scales = {
        sm: 0.9,
        md: 0.95,
        lg: 1.0,
        xl: 1.05
      };
      
      return {
        maxWidth: '85%', 
        maxHeight: '85%',
        transform: `scale(${scales[size]})`, // Scale the CrowdHealth logo
        transformOrigin: 'center',
        padding: '0px'
      };
    }
    
    return { 
      maxWidth: '100%', 
      maxHeight: '100%' 
    };
  };
  
  return (
    <div 
      className={cn(
        "bg-white rounded-md flex items-center justify-center overflow-hidden",
        className
      )}
      style={{ width, height }}
    >
      <Image 
        src={logoPath}
        alt={`${providerName} logo`}
        width={width}
        height={height}
        className="object-contain p-2"
        style={getLogoStyle()}
        onError={(e) => {
          // Fallback to default provider logo if specific logo not found
          (e.target as HTMLImageElement).src = '/images/providers/default-provider.svg';
        }}
      />
    </div>
  );
} 