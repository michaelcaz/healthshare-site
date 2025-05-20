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
  
  // Custom scaling for Crowd Health and Knew Health
  let logoStyle: React.CSSProperties = svgStyle || style || { maxWidth: '100%', maxHeight: '100%' };
  if (normalizedName.includes('crowd')) {
    logoStyle = {
      maxWidth: '100%',
      maxHeight: '85%',
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      display: 'block',
      margin: '0 auto',
      transform: 'scaleX(0.4)',
      transformOrigin: 'center',
      ...logoStyle,
    };
  } else if (normalizedName.includes('knew')) {
    const scales = { sm: 0.9, md: 0.95, lg: 1.0, xl: 1.05 };
    logoStyle = {
      maxWidth: '85%',
      maxHeight: '85%',
      transform: `scale(${scales[size]})`,
      transformOrigin: 'center',
      padding: 0,
      ...logoStyle,
    };
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
        "bg-white rounded-md flex items-center justify-center overflow-hidden",
        className
      )}
      style={{ width, height, ...style }}
    >
      <Image
        ref={imgRef}
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