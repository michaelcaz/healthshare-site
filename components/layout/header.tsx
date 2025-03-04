'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            {/* Using direct img tag which works based on the screenshot */}
            <img 
              src="/images/logo.svg" 
              alt="ShareWell" 
              className="h-60 w-auto"
            />
          </Link>

          <div className="hidden md:flex items-center gap-6 ml-auto">
            <Link 
              href="/about"
              className="text-base font-medium text-gray-warm/90 hover:text-gray-warm transition-colors"
            >
              About
            </Link>
            <Link 
              href="/blog"
              className="text-base font-medium text-gray-warm/90 hover:text-gray-warm transition-colors"
            >
              Blog
            </Link>
            <Link 
              href="/what-is-healthshare"
              className="text-base font-medium text-gray-warm/90 hover:text-gray-warm transition-colors"
            >
              What's a Healthshare?
            </Link>
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary btn-arrow py-2 px-6"
            >
              Get Started
            </motion.button>
          </div>
            
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100/80">
            <svg
              className="w-6 h-6 text-gray-warm"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.header>
  )
}