import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // Test query
    const { data, error } = await supabase
      .from('questionnaire_responses')
      .select('count')
      .single()

    if (error) {
      console.error('Supabase connection error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully connected to Supabase',
      count: data?.count || 0
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ 
      error: 'Failed to connect to database'
    }, { status: 500 })
  }
} 