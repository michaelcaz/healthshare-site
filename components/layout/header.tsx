'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter, usePathname } from 'next/navigation'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-4' : 'py-6'
      }`}
      style={{ 
        background: 'var(--color-cream-bg)',
        backdropFilter: isScrolled ? 'blur(8px)' : 'none',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="w-1/4">
            <Link href="/" className="flex items-center">
              <span className="font-bold text-2xl" style={{ color: 'var(--color-warm-gray)' }}>
                Healthshare Finder
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center justify-end space-x-8 w-3/4">
            {[
              { name: 'About', href: '/about' },
              { name: 'Blog', href: '/blog' },
              { name: "What's a Healthshare?", href: '/#whats-healthshare' },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-semibold transition-colors hover:-translate-y-0.5 transform transition-transform duration-200"
                style={{ 
                  color: 'var(--color-warm-gray)',
                  fontSize: 'var(--text-base)',
                  opacity: 0.9
                }}
              >
                {item.name}
              </Link>
            ))}
            
            <Link
              href="/questionnaire"
              className="hidden md:inline-flex px-6 py-3 rounded-xl font-semibold transition-all hover:-translate-y-0.5"
              style={{ 
                color: 'white',
                fontSize: 'var(--text-base)',
                background: 'var(--color-coral-primary)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}
            >
              Get Free Quote →
            </Link>
          </div>
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            style={{ color: 'var(--color-warm-gray)' }}
          >
            <svg 
              className="w-6 h-6" 
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