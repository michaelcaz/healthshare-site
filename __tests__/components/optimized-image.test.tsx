import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { it, expect, describe, vi } from 'vitest';
import { OptimizedImage } from '@/components/ui/optimized-image';

// Mock next/image
vi.mock('next/image', () => ({
  default: vi.fn(({ 
    src, 
    alt, 
    className,
    onLoadingComplete,
    onError,
    ...props 
  }) => {
    // Simulate image loading
    React.useEffect(() => {
      // We're using setTimeout to simulate async loading
      const timer = setTimeout(() => {
        onLoadingComplete && onLoadingComplete();
      }, 10);
      
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <img 
        src={src} 
        alt={alt} 
        className={className}
        data-testid="next-image"
        {...props} 
      />
    );
  }),
}));

describe('OptimizedImage', () => {
  it('renders with correct props', () => {
    render(
      <OptimizedImage
        src="https://example.com/image.jpg"
        alt="Test Image"
        width={300}
        height={200}
        priority={true}
      />
    );
    
    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(image).toHaveAttribute('alt', 'Test Image');
    expect(image).toHaveAttribute('width', '300');
    expect(image).toHaveAttribute('height', '200');
  });
  
  it('shows loading state and then loaded state', async () => {
    render(
      <OptimizedImage
        src="https://example.com/image.jpg"
        alt="Test Image"
        width={300}
        height={200}
      />
    );
    
    // Initially, there should be a loading state (pulse animation element)
    const loadingElement = screen.getByTestId('loading-pulse');
    expect(loadingElement).toBeInTheDocument();
    
    // After the image loads, the loading state should disappear
    await waitFor(() => {
      expect(screen.queryByTestId('loading-pulse')).not.toBeInTheDocument();
    });
  });
  
  it('shows error state when image fails to load', async () => {
    // Override the mock for this specific test to simulate an error
    const ImageMock = require('next/image').default;
    ImageMock.mockImplementationOnce(({ 
      src, 
      alt, 
      onError,
      ...props 
    }: {
      src: string;
      alt: string;
      onError?: (error: Error) => void;
      [key: string]: any;
    }) => {
      // Simulate image error
      React.useEffect(() => {
        const timer = setTimeout(() => {
          onError && onError(new Error('Image load failed'));
        }, 10);
        
        return () => clearTimeout(timer);
      }, []);
      
      return (
        <img 
          src={src} 
          alt={alt} 
          data-testid="next-image" 
          {...props} 
        />
      );
    });
    
    render(
      <OptimizedImage
        src="https://example.com/broken-image.jpg"
        alt="Broken Image"
        width={300}
        height={200}
      />
    );
    
    // After the error occurs, the error element should appear
    await waitFor(() => {
      const errorElement = screen.getByText('Failed to load image');
      expect(errorElement).toBeInTheDocument();
    });
  });
}); 