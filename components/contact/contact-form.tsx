'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(2, 'Subject must be at least 2 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  website: z.string().optional(),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

export function ContactForm() {
  console.log('ContactForm component rendered');
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      website: '',
    },
  })

  async function onSubmit(data: ContactFormValues) {
    console.log('formState.errors before submit:', form.formState.errors);
    console.log('onSubmit called with:', data);

    if (data.website) {
      console.log('Honeypot triggered, aborting.');
      toast({
        title: 'Something went wrong',
        description: 'Your message could not be sent. Please try again later.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      console.log('Sending fetch to Formspree...');
      const response = await fetch('https://formspree.io/f/xjkwlrza', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log('Fetch response:', response);
      const result = await response.json();
      console.log('Fetch result JSON:', result);

      if (response.ok) {
        console.log('Success toast triggered');
        toast({
          title: 'Message sent successfully',
          description: 'Thank you for contacting us. We will get back to you soon.',
          duration: typeof window !== 'undefined' && window.innerWidth < 768 ? 2500 : Infinity,
        });
        form.reset();
      } else {
        console.log('Error toast triggered');
        toast({
          title: 'Something went wrong',
          description: result?.errors?.[0]?.message || 'Your message could not be sent. Please try again later.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Something went wrong',
        description: 'Your message could not be sent. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form form={form} onSubmit={form.handleSubmit(onSubmit, (errors) => {
      console.log('handleSubmit onError called with:', errors);
    })} className="space-y-6">
      {/* Honeypot field for spam protection (controlled) */}
      <FormField
        control={form.control}
        name="website"
        render={({ field }) => (
          <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
            <label htmlFor="website-honeypot">Website</label>
            <input id="website-honeypot" {...field} tabIndex={-1} autoComplete="off" />
          </div>
        )}
      />
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Your name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="your.email@example.com" type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="(555) 123-4567" type="tel" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="subject"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Subject</FormLabel>
            <FormControl>
              <Input placeholder="What is your inquiry about?" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Message</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Please provide details about your inquiry..." 
                className="min-h-[120px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button 
        type="submit" 
        className="w-full text-white" 
        disabled={isSubmitting}
        size="lg"
        onClick={() => console.log('Submit button clicked')}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </Form>
  )
} 