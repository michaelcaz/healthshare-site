'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface AnnouncementBarProps {
  phoneNumber: string;
  calendlyLink: string;
}

export function AnnouncementBar({ 
  phoneNumber = "(737) 237-1055", 
  calendlyLink = "https://calendly.com/michaelcaz/30min" 
}: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true)
  
  // Check if the announcement was previously dismissed
  useEffect(() => {
    // Temporarily disabled to make announcement bar visible again
    // const isDismissed = localStorage.getItem('announcementDismissed')
    // if (isDismissed) {
    //   setIsVisible(false)
    // }
  }, [])

  // Set CSS variable for the announcement bar height
  useEffect(() => {
    if (isVisible) {
      document.documentElement.style.setProperty('--announcement-bar-height', '40px')
    } else {
      document.documentElement.style.setProperty('--announcement-bar-height', '0px')
    }
  }, [isVisible])

  const handleDismiss = () => {
    setIsVisible(false)
    // Store the dismissal in localStorage
    localStorage.setItem('announcementDismissed', 'true')
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-primary text-white text-sm md:text-base w-full fixed top-0 left-0 right-0 z-[60]"
        >
          <div className="container mx-auto px-4 py-2 flex items-center justify-between">
            <div className="flex-1 text-center">
              <p>
                Interested? Hop on the phone with a team member now - call us at {phoneNumber} or{' '}
                <Link 
                  href={calendlyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-medium hover:text-white/90 transition-colors"
                >
                  book a time here
                </Link>
              </p>
            </div>
            <button 
              onClick={handleDismiss}
              className="ml-4 p-1 hover:bg-primary-dark rounded-full transition-colors"
              aria-label="Dismiss announcement"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 