'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  fill?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 80,
  sizes,
  fill = false,
  objectFit = 'cover',
  objectPosition = 'center',
  placeholder = 'empty',
  blurDataURL,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div
      className={cn(
        'overflow-hidden',
        fill ? 'relative w-full h-full' : '',
        className
      )}
    >
      {!error ? (
        <Image
          src={src}
          alt={alt}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          className={cn(
            'transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100',
            objectFit === 'contain' ? 'object-contain' : '',
            objectFit === 'cover' ? 'object-cover' : '',
            objectFit === 'fill' ? 'object-fill' : '',
            objectFit === 'none' ? 'object-none' : '',
            objectFit === 'scale-down' ? 'object-scale-down' : '',
          )}
          style={{ objectPosition }}
          quality={quality}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes={sizes}
          fill={fill}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => setError(true)}
          {...props}
        />
      ) : (
        <div 
          className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm"
          data-testid="error-state"
          style={{ 
            width: !fill ? width : '100%', 
            height: !fill ? height : '100%' 
          }}
        >
          Failed to load image
        </div>
      )}
      
      {isLoading && !error && (
        <div 
          className="absolute inset-0 bg-gray-100 animate-pulse"
          data-testid="loading-pulse"
          style={{ 
            width: !fill ? width : '100%', 
            height: !fill ? height : '100%' 
          }}
        />
      )}
    </div>
  );
} 