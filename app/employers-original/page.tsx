import { Metadata } from 'next'
import { HeroSection } from '@/components/employers-original/hero-section'
import { PressSection } from '@/components/employers-original/press-section'
import { ProblemSection } from '@/components/employers-original/problem-section'
import { MarketShiftSection } from '@/components/employers-original/market-shift-section'
import { ComparisonTable } from '@/components/employers-original/comparison-table'

import { BoardApprovalSection } from '@/components/employers-original/board-approval-section'
import { ProcessSection } from '@/components/employers-original/process-section'

export const metadata: Metadata = {
  title: 'Large Employers | Sharewize - Cut Healthcare Costs by 40%',
  description: 'Help your employees save thousands on healthcare while reducing your benefits spend by up to 40%. Layer smarter healthshare options alongside traditional insurance.',
  openGraph: {
    title: 'Large Employers | Sharewize - Cut Healthcare Costs by 40%',
    description: 'Help your employees save thousands on healthcare while reducing your benefits spend by up to 40%. Layer smarter healthshare options alongside traditional insurance.',
  }
}

export default function LargeEmployersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <PressSection />
      <ProblemSection />
      <MarketShiftSection />
      <ComparisonTable />
      <BoardApprovalSection />
      <ProcessSection />
    </div>
  )
}
