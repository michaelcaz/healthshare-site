import Link from 'next/link'

export const metadata = {
  title: 'Terms of Use | Sharewize',
  description: 'Terms of use for Sharewize services',
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

        <h1 className="text-4xl font-bold mb-8">Terms of Use for Sharewize</h1>
        
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-8">
            Last Modified: June 3, 2025
          </p>

          <p className="mb-6">
            Welcome, and thank you for visiting Sharewize LLC ("Sharewize," "we," "our," or "us"). Sharewize is a Texas limited liability company that helps users explore and compare healthshare plans offered by third-party organizations. We're not a healthshare company ourselves, nor do we provide, underwrite, or administer any healthshare plans.
          </p>

          <p className="mb-6">
            This Terms of Use agreement ("Terms") governs your access to and use of the Sharewize website located at https://www.sharewize.com and any related content, tools, features, or communications (collectively, the "Service").
          </p>

          <p className="mb-6">
            By using or accessing the Service, you agree to be bound by these Terms and our Privacy Policy. If you do not agree with these Terms, do not access or use the Service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. The Basics</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>Sharewize is a discovery and comparison platform. We do not sell or administer healthshare memberships.</li>
            <li>We provide content and plan data for informational purposes only.</li>
            <li>Actual sign-up and payment happen on the healthshare provider's site.</li>
            <li>We do not collect or store payment information.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Age and Location Requirements</h2>
          <p className="mb-6">
            You must be at least 18 years old and located in the United States or its territories to use the Service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Information You Provide</h2>
          <p className="mb-6">
            To see plan recommendations, you must submit your email. This info is sent to our email tool (ConvertKit) and used in line with our Privacy Policy. No health information you provide in questionnaires is stored server-side—it's retained only in your browser. We may store notes from consultations in Airtable.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. No Medical or Legal Advice</h2>
          <p className="mb-6">
            Nothing on our site is intended as medical, legal, or financial advice. You should always consult with qualified professionals before making decisions about your health coverage.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. No Guarantees or Endorsements</h2>
          <p className="mb-4">We do our best to provide accurate plan comparisons, but:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Sharewize does not guarantee any outcomes related to pricing, sharing eligibility, or benefits.</li>
            <li>Healthshare companies may update or change their terms without notice.</li>
            <li>We strongly encourage you to read through the healthshare provider's member guidelines before signing up.</li>
            <li>We are not responsible for what happens after you sign up with a third-party provider.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Intellectual Property</h2>
          <p className="mb-6">
            All original content on Sharewize is owned by Sharewize LLC or our licensors. You may use the Service for personal, non-commercial purposes only. Don't reproduce, republish, or alter the materials without our written permission.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Acceptable Use</h2>
          <p className="mb-4">You agree not to:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Misuse the site in ways that disrupt, damage, or interfere with access.</li>
            <li>Use bots, scrapers, or data-mining tools without our permission.</li>
            <li>Reverse engineer any portion of the site.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Links to Third Parties</h2>
          <p className="mb-6">
            We may include links to other sites, including healthshare providers. These links do not imply endorsement, and we are not responsible for the content, terms, or practices of any linked site.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Availability & Changes</h2>
          <p className="mb-6">
            We may change or discontinue any part of the Service at any time without notice. We are not responsible if the Service is unavailable for any reason.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Limitation of Liability</h2>
          <p className="mb-6">
            To the fullest extent permitted by law, Sharewize LLC and its affiliates will not be liable for any indirect, incidental, consequential, or special damages, including lost profits, data, or use. Our total liability for any claim related to these Terms or your use of the Service will not exceed $100.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Disclaimer of Warranties</h2>
          <p className="mb-6">
            The Service is provided "as is" and "as available" without warranties of any kind. We do not warrant that the site will be error-free, uninterrupted, or free of harmful components.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">12. Indemnity</h2>
          <p className="mb-6">
            You agree to defend, indemnify, and hold harmless Sharewize LLC and its agents, affiliates, and service providers from any claims or liabilities arising from your use of the Service or violation of these Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">13. Dispute Resolution & Class Action Waiver</h2>
          <p className="mb-6">
            All disputes will be governed by Texas law. You agree to resolve any disputes through binding arbitration in Hays County, Texas. You waive any right to bring claims as part of a class or representative action.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">14. Time Limit to Bring Claims</h2>
          <p className="mb-6">
            You must bring any claim related to the Service within one year after it arises. After that, it's permanently barred.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">15. Changes to These Terms</h2>
          <p className="mb-6">
            We may update these Terms occasionally. Continued use of the Service means you accept the updated version.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p className="mb-6">
            If you have questions about these Terms, email us at m@sharewize.com.
          </p>

          <div className="mt-8 text-sm text-gray-500">
            © 2025 Sharewize LLC. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
} 