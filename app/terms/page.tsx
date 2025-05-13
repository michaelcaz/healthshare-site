import Link from 'next/link'

export const metadata = {
  title: 'Terms and Conditions | Sharewize',
  description: 'Terms and conditions for using Sharewize services',
}

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto py-12 px-4 max-w-4xl">
        <div className="mb-8">
          <Link 
            href="/"
            className="text-primary hover:underline flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
        
        <div className="prose max-w-none">
          <h2>1. Introduction</h2>
          <p>
            Welcome to Sharewize. These Terms and Conditions govern your use of our website and services.
            By accessing or using Sharewize, you agree to be bound by these Terms. If you disagree with any part
            of these terms, you may not access our service.
          </p>

          <h2>2. Use of Our Services</h2>
          <p>
            Sharewize provides a platform to help individuals find and compare health insurance plans.
            Our service is intended to provide information and resources to assist in the decision-making
            process, but we do not provide medical advice or insurance recommendations.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            When you create an account with us, you must provide accurate and complete information.
            You are responsible for safeguarding the password and for all activities that occur under your account.
            You agree to notify us immediately of any unauthorized use of your account.
          </p>

          <h2>4. Privacy Policy</h2>
          <p>
            Your use of Sharewize is also governed by our Privacy Policy, which is incorporated by reference into these Terms.
            Please review our Privacy Policy to understand our practices regarding your personal information.
          </p>

          <h2>5. Content and Data</h2>
          <p>
            The information provided on our platform is for general informational purposes only.
            We make no representations or warranties of any kind, express or implied, about the completeness,
            accuracy, reliability, suitability, or availability of the information, products, services, or related graphics
            contained on the platform for any purpose.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            Sharewize will not be liable for any damages arising out of or in connection with the use of our platform.
            This includes, without limitation, damages for loss of data or profit, or due to business interruption.
          </p>

          <h2>7. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. If we make changes, we will provide notice
            by posting the updated terms on this page and updating the "last updated" date.
            Your continued use of the platform after any such changes constitutes your acceptance of the new Terms.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at support@sharewell.com.
          </p>

          <div className="mt-8 text-sm text-gray-500">
            Last updated: March 17, 2024
          </div>
        </div>
      </div>
    </div>
  )
} 