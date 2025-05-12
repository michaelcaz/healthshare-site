'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { X, User, LogOut, Menu } from 'lucide-react'
import { LoginModal } from '@/components/auth/login-modal'
import { createBrowserClient } from '@supabase/ssr'
import { useToast } from '@/components/ui/toast'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

export function Header() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { toast } = useToast()
  const [mobileOpen, setMobileOpen] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10)
      }

      // Set initial scroll state
      handleScroll()

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    async function getUser() {
      try {
        setIsLoading(true)
        const { data: { session } } = await supabase.auth.getSession()
        console.log('Auth session:', session)
        
        if (session) {
          console.log('User is logged in:', session.user)
          setUser(session.user)
        } else {
          console.log('No active session found')
          setUser(null)
        }
      } catch (error) {
        console.error('Error getting session:', error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed - Event:', event)
        console.log('Auth state changed - Session:', session)
        
        if (session) {
          setUser(session.user)
        } else {
          setUser(null)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase.auth])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const header = document.querySelector('header');
        if (header) {
          const headerRect = header.getBoundingClientRect();
          const headerStyles = window.getComputedStyle(header);
          console.log('[Header DEBUG] Header height:', headerRect.height, 'padding:', headerStyles.paddingTop, headerStyles.paddingBottom, 'margin:', headerStyles.marginTop, headerStyles.marginBottom);

          const logo = header.querySelector('img');
          if (logo) {
            const logoRect = logo.getBoundingClientRect();
            const logoStyles = window.getComputedStyle(logo);
            console.log('[Header DEBUG] Logo height:', logoRect.height, 'padding:', logoStyles.paddingTop, logoStyles.paddingBottom, 'margin:', logoStyles.marginTop, logoStyles.marginBottom);
          }

          const link = header.querySelector('a[href="/about"]');
          if (link) {
            const linkRect = link.getBoundingClientRect();
            const linkStyles = window.getComputedStyle(link);
            console.log('[Header DEBUG] About link height:', linkRect.height, 'padding:', linkStyles.paddingTop, linkStyles.paddingBottom, 'margin:', linkStyles.marginTop, linkStyles.marginBottom);
          }
        }
      }, 100); // Delay to ensure DOM is painted
    }
  }, []);

  const handleGetStarted = () => {
    router.push('/questionnaire')
  }

  const handleContinueAsGuest = () => {
    router.push('/questionnaire')
  }

  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true)
      await supabase.auth.signOut()
      
      toast({
        title: 'Logged out successfully',
        description: 'You have been logged out of your account.',
        variant: 'default'
      })
      
      router.refresh()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
      toast({
        title: 'Error logging out',
        description: 'There was a problem logging you out. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm transition-all" style={{ top: 'var(--announcement-bar-height, 0px)' }}>
        <nav className="container mx-auto flex items-center justify-between px-4 py-2 md:py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center h-10 md:h-12 lg:h-14">
            <Image
              src="/images/logo.svg"
              alt="ShareWell"
              width={160}
              height={56}
              priority
              className="h-full w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/about" className="nav-link">
              About
            </Link>
            <Link href="/what-is-healthshare" className="nav-link">
              What's Health Sharing?
            </Link>
            <Link href="/contact" className="nav-link">
              Contact
            </Link>
            <Link href="/questionnaire">
              <button className="btn-primary ml-2">Get Started</button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Open menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white shadow-lg border-t">
            <div className="flex flex-col gap-2 px-4 py-4">
              <Link href="/about" className="nav-link" onClick={() => setMobileOpen(false)}>
                About
              </Link>
              <Link href="/what-is-healthshare" className="nav-link" onClick={() => setMobileOpen(false)}>
                What's Health Sharing?
              </Link>
              <Link href="/contact" className="nav-link" onClick={() => setMobileOpen(false)}>
                Contact
              </Link>
              <Link href="/questionnaire" onClick={() => setMobileOpen(false)}>
                <button className="btn-primary w-full mt-2">Get Started</button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
        redirectTo="/questionnaire"
        onContinueAsGuest={handleContinueAsGuest}
      />
    </>
  )
}

// Tailwind styles (add to your global CSS or use with className)
// .nav-link { @apply text-base font-medium text-gray-700 hover:text-primary transition-colors; }
// .btn-primary { @apply bg-primary text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-primary-dark transition; }