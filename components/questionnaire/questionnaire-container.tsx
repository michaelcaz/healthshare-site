'use client'

import { ReactNode } from 'react'
import { BackgroundPattern } from '@/components/ui/background-pattern'
import Image from 'next/image'
import Link from 'next/link'

interface QuestionnaireContainerProps {
  children: ReactNode
  showLogo?: boolean
}

export function QuestionnaireContainer({
  children,
  showLogo = true
}: QuestionnaireContainerProps) {
  return (
    <BackgroundPattern pattern="dots" intensity="light" className="min-h-screen py-8">
      <div className="questionnaire-container">
        {showLogo && (
          <div className="flex justify-center mb-8">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.svg"
                alt="ShareWell"
                width={180}
                height={48}
                className="h-12 w-auto"
              />
            </Link>
          </div>
        )}
        
        <div className="questionnaire-card">
          {children}
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Need help? <a href="mailto:support@sharewell.com" className="text-primary hover:underline">Contact support</a>
          </p>
        </div>
      </div>
    </BackgroundPattern>
  )
} 