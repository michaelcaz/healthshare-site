'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react';

export function Header() {
  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center">
          {/* Logo/Brand */}
          <a href="/" className="flex items-center">
            {/* Using direct img tag which works based on the screenshot */}
            <img 
              src="/images/logo.svg" 
              alt="ShareWell" 
              className="h-60 w-auto"
            />
          </a>
        </div>
        
        <nav className="hidden sm:flex space-x-8">
          <a href="/about" className="hover:text-gray-600">About</a>
          <a href="/blog" className="hover:text-gray-600">Blog</a>
          <a href="/#what-is-healthshare" className="hover:text-gray-600">What's a Healthshare?</a>
          <a href="/contact" className="hover:text-gray-600">Contact</a>
          <a href="/questionnaire" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Get Free Quote
          </a>
        </nav>
      </div>
    </header>
  );
} 