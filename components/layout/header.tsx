'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { X, User, LogOut } from 'lucide-react'
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

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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

  const handleGetStarted = () => {
    router.push('/account-check?redirectTo=/questionnaire')
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
                href="/#understanding-healthcare-sharing"
                className="text-base font-medium text-gray-warm/90 hover:text-gray-warm transition-colors"
              >
                What's Health Sharing?
              </Link>
              <Link 
                href="/contact"
                className="text-base font-medium text-gray-warm/90 hover:text-gray-warm transition-colors"
              >
                Contact
              </Link>
              
              {!isLoading && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="rounded-full w-10 h-10 border border-gray-200 hover:bg-gray-100 p-0"
                    >
                      <User className="h-5 w-5 text-gray-600" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem 
                      onClick={() => router.push('/questionnaire')}
                      className="cursor-pointer"
                    >
                      <span>My Questionnaire</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={handleSignOut}
                      disabled={isLoggingOut}
                      className="cursor-pointer text-red-600"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{isLoggingOut ? 'Logging out...' : 'Sign Out'}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <motion.button
                  onClick={handleGetStarted}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary btn-arrow py-2 px-6 ml-2"
                >
                  Get Started
                </motion.button>
              )}
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
                  href="/#understanding-healthcare-sharing"
                  className="text-base font-medium text-gray-warm/90 hover:text-gray-warm transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  What's Health Sharing?
                </Link>
                <Link 
                  href="/contact"
                  className="text-base font-medium text-gray-warm/90 hover:text-gray-warm transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                
                {!isLoading && user ? (
                  <>
                    <Link 
                      href="/questionnaire"
                      className="text-base font-medium text-gray-warm/90 hover:text-gray-warm transition-colors py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Questionnaire
                    </Link>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        handleSignOut()
                      }}
                      className="text-base font-medium text-red-600 hover:text-red-700 transition-colors py-2 flex items-center"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <motion.button
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      handleGetStarted()
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary btn-arrow py-2 px-6 self-start"
                  >
                    Get Started
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

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