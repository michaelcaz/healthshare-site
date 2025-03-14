'use server'

import { z } from 'zod'

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(2, 'Subject must be at least 2 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export async function submitContactForm(formData: ContactFormData) {
  try {
    // Validate the form data
    const validatedData = contactFormSchema.parse(formData)
    
    // In a real application, you would:
    // 1. Store the message in your database
    // 2. Send an email notification
    // 3. Possibly integrate with a CRM system
    
    console.log('Contact form submission:', validatedData)
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return { success: true, message: 'Your message has been sent successfully.' }
  } catch (error) {
    console.error('Contact form submission error:', error)
    
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        message: 'Validation failed', 
        errors: error.errors 
      }
    }
    
    return { 
      success: false, 
      message: 'Something went wrong. Please try again later.' 
    }
  }
} 