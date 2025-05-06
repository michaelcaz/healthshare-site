'use client';

import React, { useEffect, useState } from 'react';

/**
 * A test page for checking CSS consistency between environments
 */
export default function CssTestPage() {
  const [environment, setEnvironment] = useState('');
  
  useEffect(() => {
    setEnvironment(process.env.NODE_ENV || 'unknown');
  }, []);
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">CSS Consistency Test Page</h1>
      <p className="mb-4">Current environment: <strong>{environment}</strong></p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Test basic Tailwind utility classes */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Tailwind Utilities Test</h2>
          <div className="h-16 bg-primary rounded mb-2"></div>
          <div className="h-16 bg-accent rounded mb-2"></div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-12 bg-primary-light rounded"></div>
            <div className="h-12 bg-accent-light rounded"></div>
          </div>
        </div>
        
        {/* Test container behavior */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Container Test</h2>
          <div className="container bg-gray-100 p-4 rounded">
            <p className="text-sm">This is a nested container</p>
          </div>
        </div>
        
        {/* Test typography */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Typography Test</h2>
          <p className="font-sans mb-2">Sans font (Inter)</p>
          <p className="font-display mb-2">Display font (Montserrat)</p>
          <p className="font-handwriting">Handwriting font (Caveat)</p>
        </div>
        
        {/* Test CSS variables */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">CSS Variables Test</h2>
          <div className="space-y-2">
            <div className="h-8" style={{ backgroundColor: 'var(--color-primary)' }}></div>
            <div className="h-8" style={{ backgroundColor: 'var(--color-accent)' }}></div>
            <div className="h-8" style={{ backgroundColor: 'var(--color-bg-warm)' }}></div>
          </div>
        </div>
        
        {/* Test component classes */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Component Classes Test</h2>
          <button className="btn-primary mb-3 w-full">Primary Button</button>
          <button className="btn-secondary w-full">Secondary Button</button>
        </div>
        
        {/* Test layout */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Flexbox Layout Test</h2>
          <div className="flex space-x-2">
            <div className="flex-1 h-12 bg-gray-200 rounded flex items-center justify-center">1</div>
            <div className="flex-1 h-12 bg-gray-300 rounded flex items-center justify-center">2</div>
            <div className="flex-1 h-12 bg-gray-400 rounded flex items-center justify-center">3</div>
          </div>
        </div>
      </div>
      
      {/* Meta information */}
      <div className="bg-gray-100 p-4 rounded">
        <h3 className="font-medium mb-2">Browser Information:</h3>
        <p className="text-sm mb-1">User Agent: <span id="userAgent"></span></p>
        <p className="text-sm mb-1">Window Width: <span id="windowWidth"></span>px</p>
        <p className="text-sm mb-1">Window Height: <span id="windowHeight"></span>px</p>
        <p className="text-sm">Device Pixel Ratio: <span id="pixelRatio"></span></p>
      </div>
      
      <script dangerouslySetInnerHTML={{
        __html: `
          document.getElementById('userAgent').textContent = navigator.userAgent;
          document.getElementById('windowWidth').textContent = window.innerWidth;
          document.getElementById('windowHeight').textContent = window.innerHeight;
          document.getElementById('pixelRatio').textContent = window.devicePixelRatio;
        `
      }} />
    </div>
  );
} 