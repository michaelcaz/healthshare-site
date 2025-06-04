'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export function ExitIntentPopup({
  calendlyLink = "https://calendly.com/michaelcaz/30min",
  phoneNumber = "(737) 237-1055"
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShownThisSession, setHasShownThisSession] = useState(false)
  
  // Helper function to set the expiration date in localStorage
  const setExpirationDate = () => {
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + 30) // 30 days from now
    localStorage.setItem('exitPopupSeen', expirationDate.toISOString())
  }
  
  // Handle closing the popup
  const handleClose = () => {
    setIsVisible(false)
  }
  
  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return
    
    // Check if user has seen the popup before and if the stored date is still valid
    const storedValue = localStorage.getItem('exitPopupSeen')
    if (storedValue) {
      try {
        const expirationDate = new Date(storedValue)
        const now = new Date()
        // If the stored date is in the future, don't show the popup
        if (expirationDate > now) return
      } catch (e) {
        // If there's an error parsing the date, assume it's the old format
        // and keep the popup hidden for backward compatibility
        return
      }
    }
    
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse moves to the top of the page and hasn't shown this session
      if (e.clientY <= 5 && !hasShownThisSession) {
        // Set the flag immediately when showing the popup
        setExpirationDate()
        setIsVisible(true)
        setHasShownThisSession(true)
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
  }, [hasShownThisSession])
  
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-8 shadow-2xl z-50 max-w-md w-full"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close popup"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-2xl font-medium mb-3">Before you go...</h3>
            <p className="mb-6">
              Healthcare decisions can be complex. Our team is ready to answer your questions and help guide you in the right direction.
            </p>
            <div className="flex flex-col gap-3">
              <Link 
                href={calendlyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center py-3"
                onClick={handleClose}
              >
                Schedule a Free Consultation
              </Link>
              <div className="w-full py-3 flex items-center justify-center gap-2 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                or call us at {phoneNumber}
              </div>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 text-sm mt-2"
              >
                No thanks, I'm outta here
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 