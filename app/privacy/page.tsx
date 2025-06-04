import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy | Sharewize',
  description: 'Privacy policy for using Sharewize services',
}

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto py-12 px-5 max-w-4xl">
        <div className="mb-10">
          <Link 
            href="/"
            className="text-primary hover:text-primary/80 transition-colors inline-flex items-center font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-8 text-gray-900">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
            <p className="leading-relaxed">
              At Sharewize, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, 
              and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. 
              If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Collection of Your Information</h2>
            <p className="leading-relaxed">
              We may collect information about you in a variety of ways. The information we may collect on the website includes:
            </p>
            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Personal Data</h3>
            <p className="leading-relaxed">
              Personally identifiable information, such as your name, email address, telephone number, and demographic information 
              that you voluntarily give to us when you register with the website or when you choose to participate in various 
              activities related to the website. You are under no obligation to provide us with personal information of any kind, 
              however your refusal to do so may prevent you from using certain features of the website.
            </p>
            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Derivative Data</h3>
            <p className="leading-relaxed">
              Information our servers automatically collect when you access the website, such as your IP address, your browser type, 
              your operating system, your access times, and the pages you have viewed directly before and after accessing the website.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Use of Your Information</h2>
            <p className="leading-relaxed">
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. 
              Specifically, we may use information collected about you via the website to:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Create and manage your account.</li>
              <li>Deliver targeted advertising, newsletters, and other information regarding promotions and the website to you.</li>
              <li>Email you regarding your account or order.</li>
              <li>Fulfill and manage purchases, orders, payments, and other transactions related to the website.</li>
              <li>Generate a personal profile about you to make future visits to the website more personalized.</li>
              <li>Increase the efficiency and operation of the website.</li>
              <li>Monitor and analyze usage and trends to improve your experience with the website.</li>
              <li>Notify you of updates to the website.</li>
              <li>Offer new products, services, and/or recommendations to you.</li>
              <li>Perform other business activities as needed.</li>
              <li>Request feedback and contact you about your use of the website.</li>
              <li>Resolve disputes and troubleshoot problems.</li>
              <li>Respond to product and customer service requests.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Disclosure of Your Information</h2>
            <p className="leading-relaxed">
              We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
            </p>
            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">By Law or to Protect Rights</h3>
            <p className="leading-relaxed">
              If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy 
              potential violations of our policies, or to protect the rights, property, and safety of others, we may share your 
              information as permitted or required by any applicable law, rule, or regulation.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Security of Your Information</h2>
            <p className="leading-relaxed">
              We use administrative, technical, and physical security measures to help protect your personal information. 
              While we have taken reasonable steps to secure the personal information you provide to us, please be aware that 
              despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be 
              guaranteed against any interception or other type of misuse.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Contact Us</h2>
            <p className="leading-relaxed">
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-4">
              <strong>Sharewize</strong><br />
              Email: privacy@sharewize.com<br />
              Phone: (737) 237-1055
            </p>
          </section>

          <div className="mt-16 text-sm text-gray-500 border-t pt-6">
            Last updated: March 17, 2024
          </div>
        </div>
      </div>
    </div>
  )
} 