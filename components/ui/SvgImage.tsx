import { cn } from '@/lib/utils';

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
}

export function SvgImage({
  src,
  alt,
  width,
  height,
  className,
  style,
  onLoad,
  onError
}: SvgImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn('w-auto h-auto', className)}
      style={{
        maxWidth: '100%',
        height: 'auto',
        ...style,
      }}
      onLoad={onLoad}
      onError={onError}
      loading="lazy"
      decoding="async"
    />
  );
} 