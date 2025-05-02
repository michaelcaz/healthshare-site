'use server';

import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { QuestionnaireResponse } from '@/types/questionnaire';

interface EmailCaptureData {
  firstName: string;
  email: string;
  marketingConsent: boolean;
  questionnaireData: QuestionnaireResponse | null;
}

interface EmailCaptureResult {
  success: boolean;
  error?: string;
}

export async function submitEmailCapture(data: EmailCaptureData): Promise<EmailCaptureResult> {
  try {
    // Save questionnaire response with email in Supabase
    if (data.questionnaireData) {
      const cookieStore = cookies();
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) {
              return cookieStore.get(name)?.value;
            },
          },
        }
      );
      
      // Insert anonymous questionnaire response with email
      const { error } = await supabase
        .from('questionnaire_responses')
        .insert([{
          ...data.questionnaireData,
          email: data.email,
          first_name: data.firstName,
          marketing_consent: data.marketingConsent,
          created_at: new Date().toISOString(),
          user_id: null // Anonymous submission
        }]);
        
      if (error) {
        console.error('Supabase error:', error);
        throw new Error(`Failed to save response: ${error.message}`);
      }
    }
    
    // Only subscribe to ConvertKit if user gave consent and env variables are set
    if (data.marketingConsent) {
      if (process.env.CONVERTKIT_API_KEY && process.env.CONVERTKIT_FORM_ID) {
        // Real ConvertKit integration
        await subscribeToConvertKit({
          email: data.email,
          firstName: data.firstName,
          questionnaireInfo: data.questionnaireData
        });
      } else {
        // Log for development without breaking
        console.log('ConvertKit would receive:', {
          email: data.email,
          firstName: data.firstName,
          questionnaireData: data.questionnaireData
        });
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error in email capture:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

async function subscribeToConvertKit({
  email,
  firstName,
  questionnaireInfo
}: {
  email: string;
  firstName: string;
  questionnaireInfo: QuestionnaireResponse | null;
}) {
  // Get these from ConvertKit
  const formId = process.env.CONVERTKIT_FORM_ID;
  const apiKey = process.env.CONVERTKIT_API_KEY;
  
  if (!formId || !apiKey) {
    throw new Error('Missing ConvertKit configuration');
  }
  
  // Extract relevant questionnaire data for tags
  const tags: string[] = [];
  if (questionnaireInfo) {
    if (questionnaireInfo.pre_existing === 'true') tags.push('has_pre_existing');
    if (questionnaireInfo.pregnancy === 'true') tags.push('is_pregnant');
    tags.push(`coverage_${questionnaireInfo.coverage_type}`);
  }
  
  // Prepare custom fields for ConvertKit
  const customFields: Record<string, string> = {
    signup_date: new Date().toISOString(),
  };
  
  if (questionnaireInfo) {
    customFields.age = questionnaireInfo.age.toString();
    customFields.coverage_type = questionnaireInfo.coverage_type;
    customFields.zip_code = questionnaireInfo.zip_code;
    // Add other fields as needed
  }
  
  // Make API request to ConvertKit
  const response = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      api_key: apiKey,
      email,
      first_name: firstName,
      fields: customFields,
      tags: tags
    })
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`ConvertKit API error: ${response.status} - ${JSON.stringify(errorData)}`);
  }
  
  return await response.json();
}
