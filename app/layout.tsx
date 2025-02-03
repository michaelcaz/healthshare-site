import './globals.css'
import { Inter } from 'next/font/google'
import { Header } from '@/components/layout/header'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen bg-gray-50 pt-4">
          {children}
        </main>
      </body>
    </html>
  )
}
