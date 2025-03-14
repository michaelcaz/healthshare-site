'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export function ExitIntentPopup({
  calendlyLink = "https://calendly.com/michaelcaz/30min",
  phoneNumber = "(225) 718-8977"
}) {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return
    
    // Check if user has seen the popup before
    const hasSeenPopup = localStorage.getItem('exitPopupSeen')
    if (hasSeenPopup) return
    
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse moves to the top of the page
      if (e.clientY <= 5) {
        setIsVisible(true)
        // Set flag so it only shows once per session
        localStorage.setItem('exitPopupSeen', 'true')
      }
    }
    
    // Add a delay so it doesn't trigger immediately on page load
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
    }, 5000)
    
    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])
  
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50"
            onClick={() => setIsVisible(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-8 shadow-2xl z-50 max-w-md w-full"
          >
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close popup"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-2xl font-medium mb-3">Before you go...</h3>
            <p className="mb-6">
              Healthcare decisions can be complex. Our team is ready to answer your questions and help you find the right plan.
            </p>
            <div className="flex flex-col gap-3">
              <Link 
                href={calendlyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center py-3"
                onClick={() => setIsVisible(false)}
              >
                Schedule a Free Consultation
              </Link>
              <Link
                href={`tel:${phoneNumber.replace(/[^0-9]/g, '')}`}
                className="btn-secondary w-full justify-center py-3 flex items-center gap-2"
                onClick={() => setIsVisible(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call {phoneNumber}
              </Link>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-500 hover:text-gray-700 text-sm mt-2"
              >
                No thanks, I'll continue browsing
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 