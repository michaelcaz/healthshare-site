'use client'

import { ReactNode } from 'react'
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
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="questionnaire-container">
        {showLogo && (
          <div className="flex justify-center mb-8">
            <Link href="/" className="inline-block">
              <Image
                src="/images/sharewizelogofull.svg"
                alt="Sharewize"
                width={140}
                height={40}
                priority
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
            Need help? <a href="mailto:support@sharewize.com" className="text-primary hover:underline">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  )
} 