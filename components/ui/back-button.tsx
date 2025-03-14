'use client'

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

interface BackButtonProps {
  href: string
  label?: string
}

export function BackButton({ href, label = 'Back' }: BackButtonProps) {
  return (
    <Link 
      href={href}
      className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
    >
      <ChevronLeft className="h-4 w-4 mr-1" />
      <span>{label}</span>
    </Link>
  )
} 