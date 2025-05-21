import React, { useRef, useEffect } from 'react';
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
  // Standardize container dimensions for all sizes
  const dimensions = {
    sm: { width: 120, height: 40 },  // Wider for wide logos
    md: { width: 180, height: 60 },  // Wider for wide logos
    lg: { width: 240, height: 80 },  // Wider for wide logos
    xl: { width: 300, height: 90 },  // Wider for wide logos
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
  
  // Unified scaling approach for all logos
  const logoStyle: React.CSSProperties = {
    maxWidth: '100%',
    maxHeight: '100%',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain',
    display: 'block',
    margin: '0 auto',
    ...style,
  };

  // Add specific adjustments for wide logos
  if (normalizedName.includes('crowd') || normalizedName.includes('knew')) {
    logoStyle.width = '85%';  // Slightly smaller width for wide logos
    logoStyle.height = '85%'; // Maintain aspect ratio
  }
  
  // LOGGING: Rendered size and SVG viewBox
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (imgRef.current) {
      const rect = imgRef.current.getBoundingClientRect();
      console.log(`[ProviderLogo] ${providerName} rendered size:`, rect.width, 'x', rect.height, 'container:', width, 'x', height);
    }
  }, [providerName, width, height]);
  useEffect(() => {
    if (src.endsWith('.svg')) {
      fetch(src)
        .then(res => res.text())
        .then(svgText => {
          const match = svgText.match(/viewBox=\"([^\"]+)\"/);
          const viewBox = match ? match[1] : 'none';
          console.log(`[ProviderLogo] ${providerName} SVG viewBox:`, viewBox);
        });
    }
  }, [src, providerName]);

  return (
    <div 
      className={cn(
        'flex items-center justify-center',
        className
      )}
      style={{ width, height }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={`${providerName} logo`}
        style={logoStyle}
        className="transition-all duration-200"
      />
    </div>
  );
} 