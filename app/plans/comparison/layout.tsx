import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Plan Comparison | HealthShare',
  description: 'Compare your selected healthshare plans side by side to find the best option for your needs.',
}

export default function PlanComparisonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-white">
      {children}
    </main>
  )
} 