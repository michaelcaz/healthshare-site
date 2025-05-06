'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { createBrowserClient } from '@supabase/ssr';
import { SignOutButton } from '@/components/auth/sign-out-button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

// Add a global flag to track if NavBar has been rendered
if (typeof window !== 'undefined') {
  (window as any).__navBarRendered = (window as any).__navBarRendered || 0;
}

export function NavBar() {
  console.log('🔍 NavBar component function called');
  
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { toast } = useToast();
  const renderCount = useRef(0);
  
  // Increment render count
  renderCount.current += 1;
  
  // Increment global render count
  if (typeof window !== 'undefined') {
    (window as any).__navBarRendered = ((window as any).__navBarRendered || 0) + 1;
    console.log(`🔍 NavBar global render count: ${(window as any).__navBarRendered}`);
  }

  console.log(`🔍 NavBar instance render count: ${renderCount.current}`);
  console.log(`🔍 Current pathname: ${pathname}`);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    console.log('🔍 NavBar scroll effect setup');
    
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
      };
      
      // Set initial state
      handleScroll();

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    console.log('🔍 NavBar auth effect starting');
    
    async function getUser() {
      try {
        console.log('🔍 getUser function called');
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        console.log('🔍 Auth session:', session);
        
        if (session) {
          console.log('🔍 User is logged in:', session.user);
          setUser(session.user);
        } else {
          console.log('🔍 No active session found');
          setUser(null);
        }
      } catch (error) {
        console.error('🔍 Error getting session:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
        console.log('🔍 Finished loading user state');
      }
    }

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('🔍 Auth state changed - Event:', event);
        console.log('🔍 Auth state changed - Session:', session);
        
        if (session) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      console.log('🔍 NavBar auth effect cleanup');
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  // Debug render
  console.log('🔍 NavBar rendering with user:', user);
  console.log('🔍 isLoading:', isLoading);

  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true);
      await supabase.auth.signOut();
      
      toast({
        title: 'Logged out successfully',
        description: 'You have been logged out of your account.',
        variant: 'default'
      });
      
      router.refresh();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: 'Error logging out',
        description: 'There was a problem logging you out. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Force the user icon to appear for testing
  const forceShowUserIcon = true;
  console.log('🔍 forceShowUserIcon:', forceShowUserIcon);
  console.log('🔍 Will show user icon:', (!isLoading && (user || forceShowUserIcon)));

  // Add a visible element to the DOM to confirm the component is rendering
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const debugElement = document.createElement('div');
      debugElement.id = 'navbar-debug-element';
      debugElement.style.position = 'fixed';
      debugElement.style.bottom = '10px';
      debugElement.style.right = '10px';
      debugElement.style.backgroundColor = 'rgba(0,0,0,0.7)';
      debugElement.style.color = 'white';
      debugElement.style.padding = '5px 10px';
      debugElement.style.borderRadius = '5px';
      debugElement.style.fontSize = '12px';
      debugElement.style.zIndex = '9999';
      debugElement.textContent = `NavBar Rendered: ${renderCount.current} | Path: ${pathname}`;
      
      // Remove any existing debug element
      const existingDebug = document.getElementById('navbar-debug-element');
      if (existingDebug) {
        existingDebug.remove();
      }
      
      document.body.appendChild(debugElement);
      
      return () => {
        if (document.getElementById('navbar-debug-element')) {
          document.getElementById('navbar-debug-element')?.remove();
        }
      };
    }
  }, [pathname]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      id="main-navbar"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.svg?v=2"
              alt="Riff"
              width={216}
              height={72}
              priority
              className="max-h-18"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8 ml-auto">
            <Link 
              href="/about"
              className="text-lg font-medium text-gray-warm/90 hover:text-gray-warm transition-colors"
            >
              About
            </Link>
            <Link 
              href="/what-is-healthshare"
              className="text-lg font-medium text-gray-warm/90 hover:text-gray-warm transition-colors"
            >
              What's a Healthshare?
            </Link>
            
            {/* Debug output - visible for testing */}
            <div className="text-xs text-gray-400">
              {isLoading ? 'Loading...' : (user ? 'Logged In' : 'Not Logged In')} | Force: {forceShowUserIcon ? 'Yes' : 'No'}
            </div>
            
            {(!isLoading && (user || forceShowUserIcon)) ? (
              <div className="flex items-center gap-4">
                <Link 
                  href="/questionnaire"
                  className="text-lg font-medium text-gray-warm/90 hover:text-gray-warm transition-colors"
                >
                  My Questionnaire
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="rounded-full w-10 h-10 border border-gray-200 hover:bg-gray-100 p-0"
                      id="user-icon-button"
                    >
                      <User className="h-5 w-5 text-gray-600" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem 
                      onClick={handleSignOut}
                      disabled={isLoggingOut}
                      className="cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{isLoggingOut ? 'Logging out...' : 'Sign Out'}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={() => router.push('/questionnaire')}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "bg-gradient-to-r from-indigo-600 to-indigo-700",
                    "text-white px-6 py-2 rounded-lg font-medium",
                    "hover:from-indigo-700 hover:to-indigo-800",
                    "shadow-md transition-all",
                    "flex items-center gap-2",
                    "relative group"
                  )}
                >
                  Get Started
                  <svg 
                    className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.button>
              </div>
            )}
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
  );
} 