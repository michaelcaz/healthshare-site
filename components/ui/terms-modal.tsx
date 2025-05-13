'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface TermsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
  // State to track if component is mounted (for SSR compatibility)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Terms and Conditions</DialogTitle>
          <DialogDescription>
            Please read our terms and conditions carefully before using our services.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 space-y-4 text-sm">
          <section>
            <h3 className="font-semibold text-base mb-2">1. Introduction</h3>
            <p>
              Welcome to Sharewize. These Terms and Conditions govern your use of our website and services.
              By accessing or using Sharewize, you agree to be bound by these Terms. If you disagree with any part
              of these terms, you may not access our service.
            </p>
          </section>
          
          <section>
            <h3 className="font-semibold text-base mb-2">2. Use of Our Services</h3>
            <p>
              Sharewize provides a platform to help individuals find and compare health insurance plans.
              Our service is intended to provide information and resources to assist in the decision-making
              process, but we do not provide medical advice or insurance recommendations.
            </p>
          </section>
          
          <section>
            <h3 className="font-semibold text-base mb-2">3. User Accounts</h3>
            <p>
              When you create an account with us, you must provide accurate and complete information.
              You are responsible for safeguarding the password and for all activities that occur under your account.
              You agree to notify us immediately of any unauthorized use of your account.
            </p>
          </section>
          
          <div className="pt-2 text-center">
            <Link
              href="/terms"
              className="text-primary hover:underline"
              target="_blank"
            >
              View complete Terms and Conditions
            </Link>
          </div>
        </div>
        
        <DialogFooter className="pt-4">
          <Button onClick={onClose}>I Accept</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 