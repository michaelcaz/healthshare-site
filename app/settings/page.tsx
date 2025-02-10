import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SettingsForm } from '@/components/settings/settings-form'
import { Card } from '@/components/ui/card'

export default async function SettingsPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth/login')
  }

  const { data: settings } = await supabase
    .from('user_settings')
    .select('*')
    .eq('user_id', session.user.id)
    .single()

  return (
    <div className="container max-w-2xl py-8">
      <Card className="p-8">
        <div className="flex flex-col space-y-2 mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">Account Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your account settings and notification preferences
          </p>
        </div>
        <SettingsForm user={session.user} settings={settings} />
      </Card>
    </div>
  )
} 