import { createBrowserClient } from '@supabase/ssr'
import { type QuestionnaireResponse } from '@/types/questionnaire'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function saveQuestionnaireResponse(data: Partial<QuestionnaireResponse>) {
  try {
    // Log the user and data
    const user = await supabase.auth.getUser()
    console.log('Current user:', user)
    console.log('Submitting data:', data)

    const {
      data: response,
      error
    } = await supabase
      .from('questionnaire_responses')
      .insert([{
        ...data,
        created_at: new Date().toISOString(),
        user_id: user.data.user?.id,
        selected_plan_id: null
      }])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      throw new Error(`Failed to save questionnaire response: ${error.message}`)
    }

    return response
  } catch (error) {
    console.error('Save error:', error)
    throw error
  }
}
