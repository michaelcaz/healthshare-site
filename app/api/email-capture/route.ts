import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { QuestionnaireResponse } from '@/types/questionnaire';

// Validate the request body
const emailCaptureSchema = z.object({
  firstName: z.string().min(2, "Please enter your first name"),
  email: z.string().email("Please enter a valid email address"),
  marketingConsent: z.boolean().default(true),
  questionnaireData: z.any().nullable()
});

export async function POST(req: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await req.json();
    const result = emailCaptureSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { message: 'Invalid input data', errors: result.error.errors },
        { status: 400 }
      );
    }
    
    const { firstName, email, marketingConsent, questionnaireData } = result.data;
    
    // Log data for development purposes instead of storing
    console.log('Email capture form submitted:', {
      firstName,
      email,
      marketingConsent,
      hasQuestionnaireData: !!questionnaireData
    });
    
    // Return success response
    return NextResponse.json({ 
      success: true,
      message: 'Form submitted successfully (no data stored)',
      debug: 'ConvertKit and Supabase integrations are currently disabled'
    });
  } catch (error) {
    console.error('Error in email capture API:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Keeping the implementation for future use but not used in current code
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