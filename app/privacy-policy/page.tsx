import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Sharewize",
  description: "Learn about how Sharewize collects, uses, and protects your personal information.",
}

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy for Sharewize</h1>
      <p className="text-gray-600 mb-8">Last Modified: June 3, 2025</p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Commitment to Privacy</h2>
        <p className="text-gray-700 mb-4">
          Sharewize LLC ("Sharewize," "we," "our," or "us") values your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it when you interact with our website ("Website") and services.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Scope of this Policy</h2>
        <p className="text-gray-700 mb-4">This Privacy Policy applies to:</p>
        <ul className="list-disc pl-6 mb-4 text-gray-700">
          <li>Interactions with our Website.</li>
          <li>Communications via email, webforms, and customer support.</li>
          <li>Marketing platforms and operational tools used to manage our business.</li>
        </ul>
        <p className="text-gray-700 mb-4">It does not apply to:</p>
        <ul className="list-disc pl-6 mb-4 text-gray-700">
          <li>Information collected offline or through platforms we do not own or control.</li>
        </ul>
        <p className="text-gray-700">By accessing our Website, you agree to this Privacy Policy.</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-700">
          For questions or data-related requests, email{" "}
          <a href="mailto:m@sharewize.com" className="text-blue-600 hover:underline">
            m@sharewize.com
          </a>
          .
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">What Information We Collect</h2>
        
        <h3 className="text-xl font-medium mb-3">Information You Provide Directly</h3>
        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li>Name, email address, and any other contact details submitted via forms or email.</li>
          <li>Notes from consultations or calls, stored in Airtable.</li>
        </ul>

        <h3 className="text-xl font-medium mb-3">Information Collected Automatically</h3>
        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li>Cookies and LocalStorage data for personalization.</li>
          <li>IP addresses, browser/device data, referral paths, and interaction timestamps.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Technologies We Use</h2>
        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li className="mb-4">
            <strong>Cookies:</strong> Used to personalize your experience and store preferences. Some cookies are also used to track referrals to third-party healthshare providers. If you click one of these links, tracking data may be used to ensure Sharewize is credited if you sign up.
          </li>
          <li className="mb-4">
            <strong>LocalStorage:</strong> Saves state or preferences on your browser.
          </li>
          <li className="mb-4">
            <strong>Tracking Scripts:</strong> These may be used for measuring user behavior and supporting affiliate relationships with healthshare providers.
          </li>
        </ul>
        <p className="text-gray-700">
          You can control cookies via your browser settings. Disabling them may impact the functionality of the Website.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
        <p className="text-gray-700 mb-4">We use your data to:</p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Operate and maintain the Website.</li>
          <li>Provide personalized content and recommendations.</li>
          <li>Respond to inquiries and improve customer support.</li>
          <li>Send relevant updates or marketing communications via platforms like ConvertKit.</li>
          <li>Maintain internal analytics and user insights via tools such as Airtable.</li>
        </ul>
        <p className="text-gray-700 mt-4">
          All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Disclosure of Information</h2>
        <p className="text-gray-700 mb-4">We may share your data with:</p>
        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li>Email marketing providers (e.g., ConvertKit).</li>
          <li>CRM and customer service platforms (e.g., Airtable).</li>
          <li>Web hosting and analytics partners.</li>
          <li>Legal entities when required to comply with law or regulation.</li>
          <li>Healthshare partners for referral tracking, but only to the extent necessary to confirm that Sharewize should be credited for a signup.</li>
        </ul>
        <p className="text-gray-700">
          We do not sell your personal information. Any data shared is done for the purpose of operating or improving Sharewize.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
        <p className="text-gray-700">
          You can request to access, modify, or delete your information by contacting{" "}
          <a href="mailto:m@sharewize.com" className="text-blue-600 hover:underline">
            m@sharewize.com
          </a>
          .
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
        <p className="text-gray-700">
          We do not knowingly collect information from anyone under 18. If you are a parent or guardian and believe your child has provided us data, please contact us.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
        <p className="text-gray-700">
          We implement standard technical measures to protect your information. However, no method of internet transmission is 100% secure.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Do Not Track</h2>
        <p className="text-gray-700">
          We currently do not respond to DNT browser signals.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
        <p className="text-gray-700">
          We may update this Privacy Policy from time to time. The most recent version will always be available on our Website.
        </p>
      </section>
    </div>
  )
} 