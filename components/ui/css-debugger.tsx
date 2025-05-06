'use client';

import React, { useEffect, useState } from 'react';

export function CssDebugger({ enable = false }: { enable?: boolean }) {
  const [styles, setStyles] = useState<Record<string, string>>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (!enable) return;
    setIsClient(true);
    
    // Create a test element
    const testDiv = document.createElement('div');
    testDiv.className = 'container mx-auto p-4';
    testDiv.style.position = 'absolute';
    testDiv.style.visibility = 'hidden';
    document.body.appendChild(testDiv);
    
    // Get computed styles
    const computedStyles = window.getComputedStyle(testDiv);
    
    // Collect core styles
    const stylesObj: Record<string, string> = {
      environment: process.env.NODE_ENV || 'unknown',
      containerWidth: computedStyles.width,
      containerMaxWidth: computedStyles.maxWidth,
      containerPadding: computedStyles.padding,
      fontFamily: computedStyles.fontFamily,
      primaryColor: getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim(),
      cssVariablesAvailable: Boolean(getComputedStyle(document.documentElement).getPropertyValue('--color-primary')).toString(),
    };
    
    // Check if tailwind is applied
    testDiv.className = 'bg-primary text-white p-4 rounded-md';
    const tailwindStyles = window.getComputedStyle(testDiv);
    stylesObj.tailwindClassesWorking = (tailwindStyles.backgroundColor !== 'rgba(0, 0, 0, 0)').toString();
    
    setStyles(stylesObj);
    
    // Clean up
    document.body.removeChild(testDiv);
  }, [enable]);
  
  if (!enable || !isClient) return null;
  
  return (
    <div className="fixed bottom-0 right-0 p-4 bg-white shadow-lg rounded-tl-md z-50 text-xs font-mono opacity-75 hover:opacity-100 transition-opacity">
      <h5 className="font-bold mb-2">CSS Diagnostics</h5>
      <ul className="space-y-1">
        {Object.entries(styles).map(([key, value]) => (
          <li key={key} className="flex">
            <span className="mr-2 font-medium">{key}:</span>
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
} 