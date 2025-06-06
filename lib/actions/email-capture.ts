'use server';

import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { QuestionnaireResponse } from '@/types/questionnaire';

interface EmailCaptureData {
  firstName: string;
  email: string;
  phone?: string;
  marketingConsent: boolean;
  questionnaireData: QuestionnaireResponse | null;
}

interface EmailCaptureResult {
  success: boolean;
  error?: string;
}

export async function submitEmailCapture(data: EmailCaptureData): Promise<EmailCaptureResult> {
  try {
    console.log('Email capture started with data:', {
      hasFirstName: !!data.firstName,
      hasEmail: !!data.email,
      hasMarketingConsent: data.marketingConsent,
      hasQuestionnaireData: !!data.questionnaireData
    });

    // Only subscribe to ConvertKit if user gave consent and env variables are set
    if (data.marketingConsent) {
      console.log('Checking ConvertKit configuration:', {
        hasApiKey: !!process.env.CONVERTKIT_API_KEY,
        hasFormId: !!process.env.CONVERTKIT_FORM_ID,
        environment: process.env.NODE_ENV
      });

      if (process.env.CONVERTKIT_API_KEY && process.env.CONVERTKIT_FORM_ID) {
        // Real ConvertKit integration
        console.log('Attempting to subscribe to ConvertKit...');
        await subscribeToConvertKit({
          email: data.email,
          firstName: data.firstName,
          phone: data.phone,
          questionnaireInfo: data.questionnaireData
        });
        console.log('ConvertKit subscription completed');
      } else {
        // Log for development without breaking
        console.log('ConvertKit configuration missing:', {
          apiKey: process.env.CONVERTKIT_API_KEY ? 'present' : 'missing',
          formId: process.env.CONVERTKIT_FORM_ID ? 'present' : 'missing'
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
  phone,
  questionnaireInfo
}: {
  email: string;
  firstName: string;
  phone?: string;
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
  
  if (phone) {
    customFields.phone = phone;
  }
  
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
    phone,
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
