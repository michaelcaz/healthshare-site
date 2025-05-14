'use client'

import { ReactNode, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface OnboardingLayoutProps {
  children: ReactNode
  title: string
  description?: string
}

export function OnboardingLayout({ children, title, description }: OnboardingLayoutProps) {
  const [imageError, setImageError] = useState(false)
  
  useEffect(() => {
    console.log('OnboardingLayout component rendered');
    console.log('OnboardingLayout title:', title);
    
    // Add a class to the body to indicate we're in onboarding mode
    document.body.classList.add('onboarding-mode');
    
    return () => {
      document.body.classList.remove('onboarding-mode');
    };
  }, [title]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <Link href="/" className="block">
            <Image 
              src="/images/sharewizelogofull.svg" 
              alt="Sharewize Logo" 
              width={140}
              height={40}
              className="h-10 w-auto"
              priority
              onLoad={(e) => {
                console.log('Onboarding Logo loaded, element:', e.currentTarget);
                const headerElement = document.querySelector('.bg-white.border-b.border-gray-200');
                if (headerElement) {
                  console.log('Onboarding header height:', headerElement.clientHeight);
                }
              }}
            />
          </Link>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-12 flex justify-center">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center space-y-6 text-center mb-8">
            {/* Profile image in a circle */}
            <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-indigo-100 flex items-center justify-center">
              {!imageError ? (
                <Image 
                  src="/images/illustrations/headshot-for-sharewell-site.JPG" 
                  alt="Michael" 
                  width={400} 
                  height={400}
                  className="object-cover object-[center_top] scale-[3.0] translate-y-10"
                  priority
                  onError={() => setImageError(true)}
                />
              ) : (
                <span className="text-indigo-500 font-semibold text-xl">M</span>
              )}
            </div>
            
            <div className="space-y-3">
              <h1 className="text-3xl font-normal tracking-tight text-gray-800">
                {title}
              </h1>
              {description && (
                <p className="text-2xl text-gray-600">
                  {description}
                </p>
              )}
            </div>
          </div>
          
          {children}
        </div>
      </main>
    </div>
  )
} 