import { Card } from '@/components/ui/card'
import { ResetPasswordForm } from '../../../components/auth/reset-password-form'

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Card className="w-full p-8">
          <div className="flex flex-col space-y-2 text-center mb-8">
            <h1 className="text-2xl font-semibold tracking-tight">
              Reset your password
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>
          <ResetPasswordForm />
        </Card>
      </div>
    </div>
  )
} 