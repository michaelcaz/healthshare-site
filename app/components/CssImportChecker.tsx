'use client';

import React, { useState, useEffect } from 'react';
import '../globals.css'; // Direct import to test if CSS imports work in client components

export function CssImportChecker() {
  const [info, setInfo] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    // Check which CSS files are loaded
    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    const styleElements = Array.from(document.querySelectorAll('style'));
    
    setInfo({
      stylesheetCount: `${links.length}`,
      styleElementCount: `${styleElements.length}`,
      buildId: process.env.NEXT_PUBLIC_BUILD_ID || 'not available',
      environment: process.env.NODE_ENV || 'not available',
      globalCssImported: 'Testing if globals.css import works - This text should be small and blue',
    });
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bg-white p-4 border-b border-gray-200 z-50 css-import-test" style={{ maxHeight: '200px', overflowY: 'auto' }}>
      <h2 className="text-base font-medium mb-2">CSS Import Checker</h2>
      
      <ul className="text-xs space-y-1">
        {Object.entries(info).map(([key, value]) => (
          <li key={key} className="flex">
            <span className="font-medium mr-2">{key}:</span>
            <span>{value}</span>
          </li>
        ))}
      </ul>
      
      {/* Test if direct CSS import in this component works */}
      <p className="globals-css-test mt-2">This text should use styles from globals.css</p>
      
      <style jsx>{`
        .css-import-test {
          opacity: 0.9;
        }
        .globals-css-test {
          font-size: 12px;
          color: blue;
        }
      `}</style>
    </div>
  );
}

export default CssImportChecker; 