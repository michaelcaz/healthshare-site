import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

interface SvgImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  onLoad?: () => void;
  onError?: (e: any) => void;
  loading?: 'eager' | 'lazy';
}

export function SvgImage({
  src,
  alt,
  width,
  height,
  className,
  style,
  onLoad,
  onError,
  loading = 'eager',
}: SvgImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  // iOS Safari repaint hack
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    img.style.opacity = '0.99';
    setTimeout(() => {
      img.style.opacity = '1';
    }, 10);
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn('w-full h-full object-contain', className)}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        ...style,
      }}
      onLoad={onLoad}
      onError={onError}
      loading={loading}
    />
  );
} 