'use client';

import { useEffect } from 'react';

export function CssDebugger() {
  useEffect(() => {
    // Log environment information
    console.log('CSS Debugger - Environment:', {
      isProduction: process.env.NODE_ENV === 'production',
      isProd: process.env.NEXT_PUBLIC_VERCEL_ENV === 'production',
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.NEXT_PUBLIC_VERCEL_ENV,
    });

    // Examine all loaded stylesheets
    const styleSheets = Array.from(document.styleSheets);
    console.log(`CSS Debugger - Found ${styleSheets.length} stylesheets`);
    
    // Map of origins to count
    const originMap: Record<string, number> = {};
    
    styleSheets.forEach((sheet, index) => {
      try {
        const origin = new URL(sheet.href || 'inline').origin;
        originMap[origin] = (originMap[origin] || 0) + 1;
        
        console.log(`CSS Debugger - Sheet #${index}:`, {
          href: sheet.href || 'inline',
          disabled: sheet.disabled,
          media: sheet.media.mediaText,
          origin,
        });
        
        // Try to access rules to check if CORS is blocking
        let ruleCount = 0;
        try {
          ruleCount = sheet.cssRules.length;
          // Log sample rules for important sheets
          if (sheet.href && (sheet.href.includes('globals.css') || sheet.href.includes('components.css'))) {
            console.log(`CSS Debugger - Rules sample for ${sheet.href}:`, {
              ruleCount,
              firstFewRules: Array.from(sheet.cssRules)
                .slice(0, 5)
                .map(rule => rule.cssText)
            });
          }
        } catch (e) {
          console.log(`CSS Debugger - Cannot access rules for sheet #${index}:`, {
            href: sheet.href || 'inline',
            error: (e as Error).message
          });
        }
      } catch (e) {
        console.log(`CSS Debugger - Error examining sheet #${index}:`, {
          href: sheet.href || 'inline',
          error: (e as Error).message
        });
      }
    });
    
    console.log('CSS Debugger - Origins summary:', originMap);
    
    // Check for specific Tailwind classes
    const tailwindClasses = [
      'container', 'flex', 'grid', 'hidden', 'block', 'absolute', 'relative',
      'text-sm', 'text-lg', 'p-4', 'm-4', 'bg-white', 'rounded', 'shadow'
    ];
    
    // Test if these classes are working
    const testDiv = document.createElement('div');
    testDiv.style.position = 'absolute';
    testDiv.style.left = '-9999px';
    testDiv.style.top = '-9999px';
    document.body.appendChild(testDiv);
    
    const classToCssMap = tailwindClasses.map(className => {
      testDiv.className = className;
      const styles = window.getComputedStyle(testDiv);
      return {
        className,
        display: styles.display,
        position: styles.position,
        padding: styles.padding,
        margin: styles.margin,
        working: className === 'hidden' ? styles.display === 'none' : true
      };
    });
    
    document.body.removeChild(testDiv);
    console.log('CSS Debugger - Tailwind classes test:', classToCssMap);
    
    // Check specific page layout elements
    setTimeout(() => {
      const mainElement = document.querySelector('main');
      if (mainElement) {
        console.log('CSS Debugger - Main element styles:', {
          display: window.getComputedStyle(mainElement).display,
          position: window.getComputedStyle(mainElement).position,
          margin: window.getComputedStyle(mainElement).margin,
          padding: window.getComputedStyle(mainElement).padding,
          width: window.getComputedStyle(mainElement).width,
          maxWidth: window.getComputedStyle(mainElement).maxWidth
        });
      } else {
        console.log('CSS Debugger - No main element found');
      }
      
      // Check common layout containers
      ['container', 'mx-auto', 'px-4', 'wrapper'].forEach(className => {
        const elements = document.querySelectorAll(`.${className}`);
        console.log(`CSS Debugger - Found ${elements.length} elements with class .${className}`);
        
        if (elements.length > 0) {
          const firstElement = elements[0];
          console.log(`CSS Debugger - First .${className} element styles:`, {
            display: window.getComputedStyle(firstElement).display,
            position: window.getComputedStyle(firstElement).position,
            margin: window.getComputedStyle(firstElement).margin,
            padding: window.getComputedStyle(firstElement).padding,
            width: window.getComputedStyle(firstElement).width,
            maxWidth: window.getComputedStyle(firstElement).maxWidth
          });
        }
      });
    }, 1000);
  }, []);

  return null;
}

export default CssDebugger; 