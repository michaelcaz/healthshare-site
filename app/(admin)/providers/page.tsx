import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { DataTable } from './data-table'
import { columns } from './columns'
import { Button } from '../../../components/ui/button'
import Link from 'next/link'

export default async function ProvidersPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth/login')
  }

  const { data: providers } = await supabase
    .from('providers')
    .select('*')
    .order('name')

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Providers</h1>
        <Button asChild>
          <Link href="/providers/new">Add Provider</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={providers || []} />
    </div>
  )
}
