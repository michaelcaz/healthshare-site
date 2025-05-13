'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { X, Menu } from 'lucide-react';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white border-b transition-all duration-200 ${
      isScrolled ? 'shadow-sm py-2' : 'py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center">
            <img 
              src="/images/sharewizelogo.svg" 
              alt="Sharewize" 
              className="h-10 w-auto"
            />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/about" className="hover:text-gray-600">About</Link>
          <Link href="/#what-is-healthshare" className="hover:text-gray-600">What's a Healthshare?</Link>
          <Link href="/contact" className="hover:text-gray-600">Contact</Link>
          <Link 
            href="/questionnaire" 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Get Free Quote
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-gray-100/80"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          data-testid="mobile-menu-button"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden bg-white shadow-lg border-t px-4 py-4"
          data-testid="mobile-menu"
        >
          <div className="flex flex-col space-y-4">
            <Link 
              href="/about" 
              className="text-base font-medium text-gray-700 hover:text-gray-900 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/#what-is-healthshare" 
              className="text-base font-medium text-gray-700 hover:text-gray-900 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              What's a Healthshare?
            </Link>
            <Link 
              href="/contact" 
              className="text-base font-medium text-gray-700 hover:text-gray-900 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              href="/questionnaire" 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 inline-block text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
} 