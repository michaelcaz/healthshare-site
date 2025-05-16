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

    // Optionally, set a cookie to indicate email capture (if needed)
    // cookies().set('email-capture-complete', 'true', { path: '/', httpOnly: true });

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
  // Log environment variables for debugging
  console.log('ENV CHECK', {
    apiKey: process.env.CONVERTKIT_API_KEY,
    formId: process.env.CONVERTKIT_FORM_ID,
  });
  
  // Get these from ConvertKit
  const formId = process.env.CONVERTKIT_FORM_ID;
  const apiKey = process.env.CONVERTKIT_API_KEY;
  
  if (!formId || !apiKey) {
    console.error('Missing ConvertKit configuration:', { formId: !!formId, apiKey: !!apiKey });
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
  }
  
  const requestBody = {
    api_key: apiKey,
    email,
    first_name: firstName,
    fields: customFields,
    tags: tags
  };

  console.log('Attempting to subscribe to ConvertKit:', {
    formId,
    email,
    firstName,
    tags,
    customFields
  });
  
  try {
    // Make API request to ConvertKit
    const response = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    
    const responseData = await response.json();
    
    if (!response.ok) {
      console.error('ConvertKit API error:', {
        status: response.status,
        statusText: response.statusText,
        response: responseData
      });
      throw new Error(`ConvertKit API error: ${response.status} - ${JSON.stringify(responseData)}`);
    }
    
    console.log('Successfully subscribed to ConvertKit:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error in ConvertKit subscription:', error);
    // Don't throw the error, just log it and return null
    // This way the form submission can still succeed even if ConvertKit fails
    return null;
  }
}
