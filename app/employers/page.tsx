import { Metadata } from 'next'
import { HeroSection } from '@/components/employers/hero-section'
import { PressSection } from '@/components/employers/press-section'
import { BenefitsSection } from '@/components/employers/benefits-section'
import { ApproachSection } from '@/components/employers/approach-section'
import { BoardApprovalSection } from '@/components/employers/board-approval-section'
import { ProcessSection } from '@/components/employers/process-section'

export const metadata: Metadata = {
  title: 'Employers | Reduce Healthcare Costs 20–50%.',
  description: 'Help your employees save thousands on healthcare while reducing your benefits spend by up to 40%. Layer smarter healthshare options alongside traditional insurance.',
  openGraph: {
    title: 'Employers | Reduce Healthcare Costs 20–50%.',
    description: 'Help your employees save thousands on healthcare while reducing your benefits spend by up to 40%. Layer smarter healthshare options alongside traditional insurance.',
  }
}

export default function LargeEmployersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <PressSection />
      <BenefitsSection />
      <ApproachSection />
      <BoardApprovalSection />
      <ProcessSection />
    </div>
  )
}
