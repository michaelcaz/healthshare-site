import { Metadata } from 'next'
import { ContactForm } from '@/components/contact/contact-form'

export const metadata: Metadata = {
  title: 'Contact Us | Sharewize',
  description: 'Get in touch with our team for questions about healthshare plans or support with your membership.',
}

export default function ContactPage() {
  return (
    <div className="container max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 pt-[120px] md:pt-[140px] scroll-mt-[120px] md:scroll-mt-[140px]">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Have questions about healthshare plans or need support with your membership? 
          Our team is here to help you find the right healthcare solution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
          <ContactForm />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-medium text-gray-900">Email</h3>
                <p className="mt-1 text-gray-600">m@sharewize.com</p>
              </div>
              
              <div>
                <h3 className="text-base font-medium text-gray-900">Phone</h3>
                <p className="mt-1 text-gray-600">(737) 237-1055</p>
                <p className="mt-1 text-sm text-gray-500">Monday-Friday, 9am-5pm EST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 