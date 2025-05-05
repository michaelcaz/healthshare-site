'use client';

import { useEffect } from 'react';

/**
 * MobileFixes - A utility component that applies emergency fixes for mobile responsiveness
 * 
 * This component applies runtime fixes to elements that might have responsive issues.
 * It should only be used as a temporary solution until proper CSS fixes can be implemented.
 * 
 * Usage:
 * Add to your layout/page: <MobileFixes />
 */
export function MobileFixes() {
  // Only run in browser
  if (typeof window === 'undefined') return null;

  useEffect(() => {
    // Apply fixes only on mobile devices
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    console.log('Applying mobile emergency fixes...');

    // 1. Fix horizontal overflow
    const fixOverflow = () => {
      // Find elements that are causing overflow
      document.querySelectorAll('*').forEach(el => {
        const element = el as HTMLElement;
        
        // Check if element is wider than viewport and not part of a scrollable container
        if (element.offsetWidth > window.innerWidth) {
          // Skip certain elements like code blocks that should scroll
          if (
            element.tagName === 'PRE' || 
            element.classList.contains('overflow-x-auto') ||
            element.classList.contains('scrollable')
          ) {
            return;
          }

          console.log('Fixed overflowing element:', element);
          
          // Apply max-width to fix overflow
          element.style.maxWidth = '100%';
          element.style.overflowX = 'hidden';
          element.style.wordWrap = 'break-word';
        }
      });
    };

    // 2. Ensure minimum tap targets
    const fixTapTargets = () => {
      // Target interactive elements that might be too small
      const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
      
      interactiveElements.forEach(el => {
        const element = el as HTMLElement;
        const rect = element.getBoundingClientRect();
        
        // Check if tap target is too small (44px is recommended minimum)
        if (rect.width < 44 || rect.height < 44) {
          // Only fix if not an inline element in text
          if (
            element.tagName === 'BUTTON' || 
            element.tagName === 'INPUT' ||
            element.tagName === 'SELECT' ||
            element.tagName === 'TEXTAREA' ||
            // For links, only fix those that aren't within paragraphs
            (element.tagName === 'A' && !element.closest('p, li, td'))
          ) {
            console.log('Fixed small tap target:', element);
            
            if (element.tagName === 'BUTTON' || element.tagName === 'A') {
              element.style.minHeight = '44px';
              element.style.minWidth = '44px';
              
              // Only add padding if element doesn't have specific sizing
              if (!element.style.width && !element.style.height) {
                element.style.padding = '10px';
              }
            }
          }
        }
      });
    };

    // 3. Fix any tables
    const fixTables = () => {
      document.querySelectorAll('table').forEach(table => {
        // Skip tables already in properly handled containers
        if (
          table.parentElement?.classList.contains('overflow-x-auto') ||
          table.parentElement?.classList.contains('table-container')
        ) {
          return;
        }
        
        // Create wrapper if not already wrapped
        const wrapper = document.createElement('div');
        wrapper.className = 'table-container overflow-x-auto -webkit-overflow-scrolling-touch';
        table.parentNode?.insertBefore(wrapper, table);
        wrapper.appendChild(table);
        
        console.log('Fixed table for mobile scrolling');
      });
    };

    // Run the fixes
    fixOverflow();
    fixTapTargets();
    fixTables();
    
    // Re-run on orientation change
    const handleOrientationChange = () => {
      setTimeout(() => {
        fixOverflow();
        fixTapTargets();
        fixTables();
      }, 300);
    };
    
    window.addEventListener('orientationchange', handleOrientationChange);
    
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  // This component doesn't render anything
  return null;
} 