'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function Header() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        className={`fixed left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-4'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ top: 'var(--announcement-bar-height, 0)' }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              {/* Using direct img tag which works based on the screenshot */}
              <img 
                src="/images/logo.svg" 
                alt="ShareWell" 
                className="h-[13.125rem] w-auto"
              />
            </Link>

            <div className="hidden md:flex items-center gap-8 ml-auto">
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
              <Link 
                href="/contact"
                className="text-base font-medium text-gray-warm/90 hover:text-gray-warm transition-colors"
              >
                Contact
              </Link>
              <motion.button
                onClick={() => router.push('/questionnaire')}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary btn-arrow py-2 px-6 ml-2"
              >
                Get Started
              </motion.button>
            </div>
              
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100/80"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
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
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white shadow-lg"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                <Link 
                  href="/about"
                  className="text-base font-medium text-gray-warm/90 hover:text-gray-warm transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  href="/blog"
                  className="text-base font-medium text-gray-warm/90 hover:text-gray-warm transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link 
                  href="/what-is-healthshare"
                  className="text-base font-medium text-gray-warm/90 hover:text-gray-warm transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  What's a Healthshare?
                </Link>
                <Link 
                  href="/contact"
                  className="text-base font-medium text-gray-warm/90 hover:text-gray-warm transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <motion.button
                  onClick={() => {
                    router.push('/questionnaire')
                    setIsMobileMenuOpen(false)
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary btn-arrow py-2 px-6 self-start"
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}