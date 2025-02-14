import { getClientInstance } from '@/lib/supabase/client'

interface Plan {
  id: string
  maternity_coverage: boolean
  maternity_waiting_period: number
  monthly_cost: number
  incident_cost: number
  pre_existing_conditions: boolean
  pre_existing_waiting_period: number
} 

export async function getAllPlans(): Promise<Plan[]> {
  const supabase = getClientInstance()
  const { data, error } = await supabase
    .from('plans')
    .select('*')
  
  if (error) throw error
  return data
} 