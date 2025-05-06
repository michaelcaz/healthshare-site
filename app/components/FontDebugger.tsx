'use client';

import { useEffect } from 'react';

// Extend PerformanceEntry with CSP violation specific properties
interface CSPViolationEntry extends PerformanceEntry {
  type: string;
  blockedURI: string;
  violatedDirective: string;
  documentURI: string;
}

export function FontDebugger() {
  useEffect(() => {
    // Log initial font loading state
    console.log('Font loading debug - Initial document fonts:', 
      document.fonts.status,
      'Ready fonts:', document.fonts.ready);

    // Log all available font faces
    const fontFaces = Array.from(document.fonts);
    console.log('Font loading debug - Available font faces:', 
      fontFaces.map(font => ({
        family: font.family,
        style: font.style,
        weight: font.weight,
        status: font.status,
        loaded: font.loaded
      })));

    // Log if Satoshi font is present
    const hasSatoshi = fontFaces.some(font => 
      font.family.toLowerCase().includes('satoshi'));
    console.log('Font loading debug - Satoshi font detected:', hasSatoshi);

    // Check for CSP violations
    const cspViolations: CSPViolationEntry[] = [];
    
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const cspEntry = entry as CSPViolationEntry;
        if (cspEntry.type === 'securitypolicyviolation') {
          cspViolations.push(cspEntry);
          console.log('Font loading debug - CSP violation detected:', {
            blockedURI: cspEntry.blockedURI,
            violatedDirective: cspEntry.violatedDirective
          });
        }
      }
    });
    
    try {
      observer.observe({ type: 'securitypolicyviolation' });
    } catch (e) {
      console.log('Font loading debug - CSP observer error:', e);
    }

    // Monitor network requests related to fonts
    const fontRequests: PerformanceResourceTiming[] = [];
    
    try {
      const perfObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fontEntries = entries.filter(entry => 
          entry.name.includes('font') || 
          entry.name.includes('woff') || 
          entry.name.includes('satoshi')) as PerformanceResourceTiming[];
        
        if (fontEntries.length > 0) {
          fontRequests.push(...fontEntries);
          console.log('Font loading debug - Font network requests:', 
            fontEntries.map(entry => ({
              url: entry.name,
              duration: entry.duration,
              startTime: entry.startTime,
              transferSize: entry.transferSize
            })));
        }
      });
      
      perfObserver.observe({ entryTypes: ['resource'] });
    } catch (e) {
      console.log('Font loading debug - Performance observer error:', e);
    }

    // Check CSS issues by looking for all loaded stylesheets
    console.log('Font loading debug - Loaded stylesheets:', 
      Array.from(document.styleSheets).map(sheet => {
        try {
          return {
            href: sheet.href,
            disabled: sheet.disabled,
            media: sheet.media.mediaText,
            rules: sheet.cssRules ? sheet.cssRules.length : 'Cannot access rules (CORS)'
          };
        } catch (e) {
          return {
            href: sheet.href,
            disabled: sheet.disabled,
            media: sheet.media.mediaText,
            error: 'Cannot access cssRules: ' + (e as Error).message
          };
        }
      })
    );

    // Check computed styles to see if Satoshi is actually applied
    setTimeout(() => {
      const bodyFontFamily = window.getComputedStyle(document.body).fontFamily;
      console.log('Font loading debug - Body computed font-family:', bodyFontFamily);
      
      const h1Elements = document.querySelectorAll('h1, .h1');
      if (h1Elements.length > 0) {
        console.log('Font loading debug - H1 computed font-family:', 
          window.getComputedStyle(h1Elements[0]).fontFamily);
      }
      
      // Create a test element with explicit Satoshi font
      const testElement = document.createElement('span');
      testElement.style.fontFamily = '"Satoshi", Arial, sans-serif';
      testElement.style.visibility = 'hidden';
      testElement.textContent = 'Test';
      document.body.appendChild(testElement);
      
      console.log('Font loading debug - Test element computed font-family:', 
        window.getComputedStyle(testElement).fontFamily);
      
      document.body.removeChild(testElement);
      
      // Final summary log
      console.log('Font loading debug - Summary:', {
        satoshiDetected: hasSatoshi,
        cspViolations: cspViolations.length > 0 ? cspViolations : 'None',
        fontRequests: fontRequests.length,
        bodyUsingFallbackFonts: !bodyFontFamily.toLowerCase().includes('satoshi')
      });

      // Also log important body styles to check layout issues
      const body = document.body;
      const bodyStyles = window.getComputedStyle(body);
      console.log('Layout debug - Body styles:', {
        margin: bodyStyles.margin,
        padding: bodyStyles.padding,
        display: bodyStyles.display,
        width: bodyStyles.width,
        height: bodyStyles.height,
        boxSizing: bodyStyles.boxSizing,
        overflow: bodyStyles.overflow
      });

      // Check if Tailwind classes are applied
      const tailwindContainer = document.querySelector('.container');
      console.log('Layout debug - Tailwind container present:', !!tailwindContainer);
      
      if (tailwindContainer) {
        const containerStyles = window.getComputedStyle(tailwindContainer as Element);
        console.log('Layout debug - Container styles:', {
          width: containerStyles.width,
          maxWidth: containerStyles.maxWidth,
          margin: containerStyles.margin,
          padding: containerStyles.padding
        });
      }
    }, 3000);

    return () => {
      try {
        observer.disconnect();
      } catch (e) {}
    };
  }, []);

  // This component doesn't render anything visible
  return null;
}

export default FontDebugger; 