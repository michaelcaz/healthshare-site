import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ProviderForm } from '../[id]/provider-form'

export default async function NewProviderPage() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <div className="container max-w-2xl py-8">
      <div className="flex flex-col space-y-2 mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          New Provider
        </h1>
        <p className="text-sm text-muted-foreground">
          Create a new provider.
        </p>
      </div>
      <ProviderForm />
    </div>
  )
} 