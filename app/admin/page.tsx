import { permanentRedirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function AdminPage() {
  permanentRedirect('/admin/dashboard')
}
