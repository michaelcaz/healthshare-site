'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export function FloatingCTA({ 
  calendlyLink = "https://calendly.com/michaelcaz/30min",
  phoneNumber = "(225) 718-8977"
}) {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      // Show after scrolling down 500px
      setIsVisible(window.scrollY > 500)
    }
    
    // Set initial state
    handleScroll()
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <Link
            href={calendlyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#6366F1] shadow-lg rounded-full py-3 px-5 text-white hover:bg-[#4F46E5] transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span className="font-medium">Holler at us</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 