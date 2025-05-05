'use client';

import { useState } from 'react';

const BREAKPOINTS = [
  { name: 'Mobile S', width: 320 },
  { name: 'Mobile M', width: 375 },
  { name: 'Mobile L', width: 425 },
  { name: 'Tablet', width: 768 },
  { name: 'Laptop', width: 1024 },
  { name: 'Desktop', width: 1440 },
];

export function ResponsiveDebugger() {
  const [isOpen, setIsOpen] = useState(false);
  
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  
  const resizeViewport = (width: number) => {
    if (typeof window !== 'undefined') {
      window.open(window.location.href, '_blank', `width=${width},height=800`);
    }
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-800 text-white p-2 rounded-full shadow-lg"
        title="Responsive Testing"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute bottom-12 right-0 bg-white rounded-lg shadow-xl p-4 w-64">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Responsive Testing</h3>
          <div className="space-y-2">
            {BREAKPOINTS.map((breakpoint) => (
              <button
                key={breakpoint.name}
                onClick={() => resizeViewport(breakpoint.width)}
                className="w-full text-left px-3 py-1.5 text-sm rounded hover:bg-gray-100 flex justify-between items-center"
              >
                <span>{breakpoint.name}</span>
                <span className="text-gray-500">{breakpoint.width}px</span>
              </button>
            ))}
          </div>
          <div className="mt-3 pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-500">Current viewport: {typeof window !== 'undefined' ? window.innerWidth : 0}px</p>
          </div>
        </div>
      )}
    </div>
  );
} 