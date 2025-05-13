"use client";
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import { SvgImage } from './SvgImage';

// Define specific logo data for better maintainability
type Logo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  containerClassName?: string;
};

// Define the component props
interface LogoGridProps {
  className?: string;
  logos?: Logo[]; // Allow custom logos to be passed
}

// Default logos for marketing purposes
const defaultLogos: Logo[] = [
  {
    src: '/images/logos/wsj.svg',
    alt: 'Wall Street Journal',
    width: 96,
    height: 32,
    className: 'opacity-60 grayscale',
    containerClassName: 'h-6 md:h-8'
  },
  {
    src: '/images/logos/pbs.svg',
    alt: 'PBS',
    width: 96,
    height: 32,
    className: 'opacity-60 grayscale',
    containerClassName: 'h-6 md:h-8'
  },
  {
    src: '/images/logos/forbes.svg',
    alt: 'Forbes',
    width: 96,
    height: 32,
    className: 'opacity-60 grayscale',
    containerClassName: 'h-6 md:h-8'
  },
  {
    src: '/images/logos/vox.svg',
    alt: 'Vox',
    width: 144,
    height: 32,
    className: 'opacity-70 grayscale',
    containerClassName: 'w-24 md:w-36'
  },
  {
    src: '/images/logos/nbcnews.svg',
    alt: 'NBC News',
    width: 200,
    height: 32,
    className: 'opacity-70 grayscale',
    containerClassName: 'w-32 md:w-40'
  },
  {
    src: '/images/logos/cbsnews.svg',
    alt: 'CBS News',
    width: 96,
    height: 32,
    className: 'opacity-60 grayscale',
    containerClassName: 'h-6 md:h-8'
  },
];

export function LogoGrid({ className, logos = defaultLogos }: LogoGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (containerRef.current) {
      const style = window.getComputedStyle(containerRef.current);
      // Log grid gap and padding
      console.log('[LogoGrid] Container gap:', style.gap, 'row-gap:', style.rowGap, 'column-gap:', style.columnGap);
      console.log('[LogoGrid] Container padding:', style.padding);
    }
    logoRefs.current.forEach((div, idx) => {
      if (div) {
        const img = div.querySelector('img');
        if (img) {
          const rect = img.getBoundingClientRect();
          console.log(`[LogoGrid] Logo ${idx + 1} (${img.alt}) size:`, rect.width, 'x', rect.height, 'src:', img.src);
        }
      }
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8 lg:gap-12 items-center justify-items-center w-full max-w-6xl mx-auto",
        className
      )}
    >
      {logos.map((logo, index) => (
        <div
          key={`${logo.alt}-${index}`}
          className={cn("flex items-center", logo.containerClassName)}
          ref={el => {
            logoRefs.current[index] = el;
          }}
        >
          <SvgImage
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            className={logo.className}
            priority={index < 3}
          />
        </div>
      ))}
    </div>
  );
} 