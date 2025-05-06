import Image from 'next/image';
import { cn } from '@/lib/utils';

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
  return (
    <div className={cn(
      "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8 lg:gap-12 items-center justify-items-center w-full max-w-6xl mx-auto",
      className
    )}>
      {logos.map((logo, index) => (
        <div key={`${logo.alt}-${index}`} className={cn("flex items-center", logo.containerClassName)}>
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            className={logo.className}
            // Since these are SVGs, we use unoptimized to prevent next/image from 
            // attempting to optimize them as raster images
            unoptimized
            // Prioritize loading visibility by setting priority on the first few logos
            priority={index < 3}
            // Ensure SVG is displayed at correct size regardless of container constraints
            style={{ 
              maxWidth: '100%',
              height: 'auto'
            }}
          />
        </div>
      ))}
    </div>
  );
} 