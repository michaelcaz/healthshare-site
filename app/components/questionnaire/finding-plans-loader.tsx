'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface FindingPlansLoaderProps {
  totalPlans: number;
  onComplete?: () => void;
  durationMs?: number;
}

export const FindingPlansLoader = ({
  totalPlans,
  onComplete,
  durationMs = 3000,
}: FindingPlansLoaderProps) => {
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
      {/* Custom illustration of person on paper airplane with telescope */}
      <div className="mb-8 w-48 h-48 relative">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Paper airplane */}
          <polygon 
            points="20,140 180,80 100,160" 
            fill="#FFEB3B" 
            stroke="#333" 
            strokeWidth="2"
          />
          
          {/* Person */}
          <g transform="translate(90, 90) scale(0.8)">
            {/* Body */}
            <rect x="-10" y="-20" width="20" height="40" fill="#333" rx="5" />
            
            {/* Head */}
            <circle cx="0" cy="-30" r="12" fill="#333" />
            
            {/* Arms */}
            <rect x="-30" y="-15" width="20" height="8" fill="#333" rx="4" transform="rotate(-20)" />
            <rect x="10" y="-15" width="25" height="8" fill="#333" rx="4" transform="rotate(30)" />
            
            {/* Telescope */}
            <rect x="25" y="-25" width="20" height="6" fill="#555" rx="2" transform="rotate(30)" />
            
            {/* Flag */}
            <rect x="-5" y="-60" width="2" height="30" fill="#333" />
            <polygon points="-3,-60 -3,-45 12,-52.5" fill="#4F46E5" />
            <text x="-2" y="-50" fontSize="6" fill="white" transform="rotate(-15)">SHAREWELL</text>
          </g>
        </svg>
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