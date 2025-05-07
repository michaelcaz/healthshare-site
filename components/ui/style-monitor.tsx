'use client';

import React, { useEffect, useState } from 'react';

type StyleIssue = {
  component: string;
  type: 'animation' | 'responsive' | 'dynamic' | 'timing' | 'hydration';
  description: string;
  severity: 'low' | 'medium' | 'high';
};

export function StyleMonitor({ enable = false }: { enable?: boolean }) {
  const [issues, setIssues] = useState<StyleIssue[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (!enable) return;
    setIsClient(true);
    
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    
    const foundIssues: StyleIssue[] = [];
    
    // Check for animation issues
    document.querySelectorAll('[class*="animate-"], [class*="transition-"]').forEach((el) => {
      foundIssues.push({
        component: el.tagName + (el.className ? ` (${el.className})` : ''),
        type: 'animation',
        description: 'Element using animations or transitions may render differently in production',
        severity: 'medium'
      });
    });
    
    // Check for responsive issues
    const mediaQueryLists = [
      window.matchMedia('(max-width: 640px)'), 
      window.matchMedia('(max-width: 768px)'),
      window.matchMedia('(max-width: 1024px)'),
      window.matchMedia('(max-width: 1280px)')
    ];
    
    const checkResponsiveLayouts = () => {
      document.querySelectorAll('[class*="md:"], [class*="lg:"], [class*="xl:"]').forEach((el) => {
        foundIssues.push({
          component: el.tagName + (el.className ? ` (${el.className})` : ''),
          type: 'responsive',
          description: 'Element using responsive classes may need additional testing',
          severity: 'medium'
        });
      });
    };
    
    // Run once and then observe media queries
    checkResponsiveLayouts();
    mediaQueryLists.forEach(mql => {
      mql.addEventListener('change', checkResponsiveLayouts);
    });
    
    // Check for dynamic styling
    document.querySelectorAll('[style]').forEach((el) => {
      foundIssues.push({
        component: el.tagName + (el.className ? ` (${el.className})` : ''),
        type: 'dynamic',
        description: 'Element using inline styles may indicate dynamic styling',
        severity: 'high'
      });
    });
    
    // Check for timing-dependent layouts (approximation)
    setTimeout(() => {
      const initialClientRects = new Map();
      
      // Record initial positions
      document.querySelectorAll('div, section, header, main').forEach((el) => {
        initialClientRects.set(el, el.getBoundingClientRect());
      });
      
      // Check for layout shifts after a delay
      setTimeout(() => {
        initialClientRects.forEach((rect, el) => {
          const newRect = el.getBoundingClientRect();
          if (
            Math.abs(rect.top - newRect.top) > 1 || 
            Math.abs(rect.left - newRect.left) > 1 ||
            Math.abs(rect.width - newRect.width) > 1 ||
            Math.abs(rect.height - newRect.height) > 1
          ) {
            foundIssues.push({
              component: el.tagName + (el.className ? ` (${el.className})` : ''),
              type: 'timing',
              description: 'Element position shifted after initial render, may indicate layout timing issues',
              severity: 'high'
            });
          }
        });
        
        // Deduplicate issues
        const uniqueIssues = foundIssues.filter((issue, index, self) => 
          index === self.findIndex((i) => i.component === issue.component && i.type === issue.type)
        );
        
        // Limit to most severe issues
        setIssues(uniqueIssues.slice(0, 10));
      }, 1000);
    }, 500);
    
    // Cleanup
    return () => {
      mediaQueryLists.forEach(mql => {
        mql.removeEventListener('change', checkResponsiveLayouts);
      });
    };
  }, [enable]);
  
  if (!enable || !isClient) return null;
  
  return (
    <div className="fixed top-0 left-0 p-4 bg-white shadow-lg rounded-br-md z-50 text-xs font-mono opacity-75 hover:opacity-100 transition-opacity overflow-auto" style={{ maxHeight: '300px' }}>
      <h5 className="font-bold mb-2">Potential Style Issues ({issues.length})</h5>
      {issues.length === 0 ? (
        <p>No critical style issues detected yet...</p>
      ) : (
        <ul className="space-y-2">
          {issues.map((issue, idx) => (
            <li key={idx} className="border-l-2 pl-2" style={{ borderColor: issue.severity === 'high' ? 'red' : issue.severity === 'medium' ? 'orange' : 'yellow' }}>
              <div className="font-medium">{issue.component}</div>
              <div className="text-gray-700">{issue.type}: {issue.description}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 