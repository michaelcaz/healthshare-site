'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export function HeroCta({
  calendlyLink = "https://calendly.com/michaelcaz/30min",
  phoneNumber = "(225) 718-8977"
}) {
  const router = useRouter()
  
  const handleGetStarted = () => {
    router.push('/questionnaire')
  }
  
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
      <motion.button
        onClick={handleGetStarted}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
        className="btn-primary btn-arrow py-3 px-6 w-full sm:w-auto"
      >
        Get Started
      </motion.button>
      <motion.button
        onClick={() => window.open(calendlyLink, '_blank')}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
        className="btn-secondary flex items-center justify-center gap-2 py-3 px-6 w-full sm:w-auto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
        Holler at us
      </motion.button>
    </div>
  )
} 