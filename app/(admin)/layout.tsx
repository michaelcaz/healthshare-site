import Link from 'next/link'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth/login')
  }

  // TODO: Check if user has admin role
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="border-b">
        <div className="container flex h-16 items-center">
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          <nav className="flex items-center space-x-6 ml-6">
            <Link
              href="/admin"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Overview
            </Link>
            <Link
              href="/admin/providers"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Providers
            </Link>
            <Link
              href="/admin/plans"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Plans
            </Link>
            <Link
              href="/admin/content"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Content
            </Link>
            <Link
              href="/admin/analytics"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Analytics
            </Link>
            <Link
              href="/admin/studio"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Studio
            </Link>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
