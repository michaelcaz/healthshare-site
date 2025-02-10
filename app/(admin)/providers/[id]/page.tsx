import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ProviderForm } from './provider-form'

export default async function EditProviderPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth/login')
  }

  const { data: provider } = await supabase
    .from('providers')
    .select('*')
    .eq('id', params.id)
    .single()

  return (
    <div className="container max-w-2xl py-8">
      <div className="flex flex-col space-y-2 mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          {provider ? 'Edit Provider' : 'New Provider'}
        </h1>
        <p className="text-sm text-muted-foreground">
          {provider ? 'Update provider information.' : 'Create a new provider.'}
        </p>
      </div>
      <ProviderForm provider={provider} />
    </div>
  )
} 