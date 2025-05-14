'use client'

import { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { EnhancedButton } from '@/components/ui/enhanced-button'

interface ResultsLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
  showBackButton?: boolean
  onBack?: () => void
}

export function ResultsLayout({
  children,
  title,
  subtitle,
  showBackButton = false,
  onBack
}: ResultsLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="inline-block">
            <Image
              src="/images/sharewizelogofull.svg"
              alt="Sharewize"
              width={140}
              height={40}
              priority
              className="h-10 w-auto"
            />
          </Link>
          
          {showBackButton && onBack && (
            <EnhancedButton
              variant="outline"
              onClick={onBack}
              className="text-sm"
            >
              Back to Questionnaire
            </EnhancedButton>
          )}
        </div>
      </header>
      
      {/* Main Content */}
      <main>
        {/* Page Header */}
        <div className="py-12 border-b border-gray-100 bg-gray-50">
          <div className="results-header">
            <h1 className="results-title">{title}</h1>
            {subtitle && (
              <p className="results-subtitle">{subtitle}</p>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className="results-container">
          {children}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-50 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            Have questions about your recommendations? <a href="mailto:support@sharewize.com" className="text-primary hover:underline">Contact our team</a>
          </p>
        </div>
      </footer>
    </div>
  )
} 