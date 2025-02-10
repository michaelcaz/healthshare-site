import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ProfileForm } from '@/components/profile/profile-form'
import { Card } from '@/components/ui/card'

export default async function ProfilePage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single()

  return (
    <div className="container max-w-2xl py-8">
      <Card className="p-8">
        <div className="flex flex-col space-y-2 mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
          <p className="text-sm text-muted-foreground">
            Manage your profile information and preferences
          </p>
        </div>
        <ProfileForm user={session.user} profile={profile} />
      </Card>
    </div>
  )
} 