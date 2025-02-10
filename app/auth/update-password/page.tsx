import { Card } from '@/components/ui/card'
import { UpdatePasswordForm } from '../../../components/auth/update-password-form'

export default function UpdatePasswordPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col space-y-2 text-center mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">
            Update your password
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your new password below
          </p>
        </div>
        <UpdatePasswordForm />
      </Card>
    </div>
  )
} 