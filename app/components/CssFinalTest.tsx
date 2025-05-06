'use client';

import { useEffect, useState } from 'react';

export default function CssFinalTest() {
  const [styleStatus, setStyleStatus] = useState<Record<string, {passed: boolean, actual: string, expected: string}>>({});
  const [isClient, setIsClient] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Create a test element outside the DOM to check CSS
    const testDiv = document.createElement('div');
    testDiv.style.position = 'absolute';
    testDiv.style.left = '-9999px';
    document.body.appendChild(testDiv);
    
    // Check these core styles
    const stylesToCheck = [
      { name: 'container', className: 'container', property: 'maxWidth', expectedPattern: /\d+px/, expectedValue: '1280px' },
      { name: 'flex', className: 'flex', property: 'display', expected: 'flex' },
      { name: 'hidden', className: 'hidden', property: 'display', expected: 'none' },
      { name: 'p-4', className: 'p-4', property: 'padding', expected: '1rem' },
      { name: 'mx-auto', className: 'mx-auto', property: 'marginLeft', expected: 'auto' },
      { name: 'rounded', className: 'rounded', property: 'borderRadius', expected: '0.25rem' },
      { name: 'bg-white', className: 'bg-white', property: 'backgroundColor', expected: 'rgb(255, 255, 255)' },
    ];
    
    const results: Record<string, {passed: boolean, actual: string, expected: string}> = {};
    
    // Test each style
    stylesToCheck.forEach(style => {
      testDiv.className = style.className;
      const computedStyle = window.getComputedStyle(testDiv);
      const actual = computedStyle[style.property as any];
      
      let passed = false;
      if (style.expectedPattern) {
        // Test against a pattern
        passed = style.expectedPattern.test(actual);
      } else {
        // Test against an exact value
        passed = actual === style.expected;
      }
      
      results[style.name] = {
        passed,
        actual: String(actual), 
        expected: style.expectedValue || style.expected || style.expectedPattern?.toString() || ''
      };
      
      console.log(`CSS Test - ${style.name}:`, {
        expected: style.expected || style.expectedPattern?.toString(),
        actual: actual,
        passed: passed
      });
    });
    
    setStyleStatus(results);
    
    // Clean up
    document.body.removeChild(testDiv);
    
    // Add test for loading real elements
    setTimeout(() => {
      const mainElement = document.querySelector('main');
      if (mainElement) {
        const mainStyles = window.getComputedStyle(mainElement);
        console.log('Main element actual styles:', {
          display: mainStyles.display,
          padding: mainStyles.padding,
          margin: mainStyles.margin,
          width: mainStyles.width,
          maxWidth: mainStyles.maxWidth
        });
      }
      
      // Test container
      const container = document.querySelector('.container');
      if (container) {
        const containerStyles = window.getComputedStyle(container);
        console.log('Container element actual styles:', {
          display: containerStyles.display,
          padding: containerStyles.padding,
          margin: containerStyles.margin,
          width: containerStyles.width,
          maxWidth: containerStyles.maxWidth
        });
      }
    }, 1000);
    
    // Log environment info
    console.log('CSS Test Environment:', {
      isDev: process.env.NODE_ENV === 'development',
      isProd: process.env.NODE_ENV === 'production',
      nodeEnv: process.env.NODE_ENV,
    });
  }, []);

  if (!isClient) return null;
  
  const allPassed = Object.values(styleStatus).every(val => val.passed);
  
  return (
    <div className="fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg bg-white border border-gray-200" style={{ maxWidth: '300px' }}>
      <h3 className="text-lg font-bold mb-2">CSS Diagnostics</h3>
      <div className="mb-2">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${allPassed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {allPassed ? 'All Tests Passed' : 'Some Tests Failed'}
        </span>
        <button 
          className="ml-2 text-xs underline text-blue-600"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>
      <ul className="text-sm">
        {Object.entries(styleStatus).map(([name, data]) => (
          <li key={name} className="flex items-center mb-1">
            <span className={`w-2 h-2 rounded-full mr-2 ${data.passed ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span>{name}</span>
            {showDetails && !data.passed && (
              <div className="ml-4 text-xs text-gray-600 mt-1">
                <div>Expected: {data.expected}</div>
                <div>Actual: {data.actual}</div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-3 text-xs text-gray-500">
        {process.env.NODE_ENV === 'production' ? 'Production' : 'Development'} Mode
      </div>
    </div>
  );
} 