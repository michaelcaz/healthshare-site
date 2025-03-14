'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface PlansLoaderProps {
  totalPlans: number;
  onComplete?: () => void;
  durationMs?: number;
}

export const PlansLoader = ({
  totalPlans,
  onComplete,
  durationMs = 3000,
}: PlansLoaderProps) => {
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Calculate the increment step for the counter
    const counterStep = Math.ceil(totalPlans / 20); // Divide the animation into 20 steps
    const counterInterval = durationMs / 20;
    
    // Calculate the increment step for the progress bar
    const progressStep = 100 / 20; // 100% divided by 20 steps
    
    let currentCount = 0;
    let currentProgress = 0;
    
    const interval = setInterval(() => {
      // Increment counter
      currentCount = Math.min(currentCount + counterStep, totalPlans);
      setCount(currentCount);
      
      // Increment progress
      currentProgress = Math.min(currentProgress + progressStep, 100);
      setProgress(currentProgress);
      
      // Check if we've reached the end
      if (currentCount >= totalPlans && currentProgress >= 100) {
        clearInterval(interval);
        if (onComplete) {
          setTimeout(() => {
            onComplete();
          }, 500); // Small delay before completion
        }
      }
    }, counterInterval);
    
    return () => clearInterval(interval);
  }, [totalPlans, durationMs, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center p-8 max-w-md mx-auto">
      {/* Custom loading state image */}
      <div className="mb-8 w-64 h-64 relative">
        <Image 
          src="/images/illustrations/Loading state image.svg"
          alt="Person searching for health plans"
          width={256}
          height={256}
          className="w-full h-auto"
          priority
        />
      </div>
      
      <h2 className="text-2xl font-bold mb-2 text-center">Finding Plans</h2>
      
      <div className="text-5xl font-bold mb-6 text-indigo-600">
        {count}
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div 
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <p className="text-gray-600 text-center">
        Did you know? Every plan is required to provide some health care services for free. Check out plan details to see what each plan offers.
      </p>
    </div>
  );
}; 