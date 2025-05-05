import Link from 'next/link';

export const metadata = {
  title: 'About Us | ShareWell Health',
  description: 'Learn about our mission to help families find the right healthshare plans for their needs.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">About ShareWell</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-4">
            At ShareWell, our mission is to help individuals and families find healthshare plans that best fit their unique needs and circumstances. 
            We believe healthcare should be affordable, transparent, and accessible to everyone.
          </p>
          <p className="mb-4">
            We've created a platform that simplifies the process of finding and choosing the right healthcare sharing ministry. 
            Through our guided questionnaire, we match you with plans that align with your budget, values, and healthcare needs.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Unbiased recommendations based on your specific needs</li>
            <li>Clear, transparent information about each healthshare plan</li>
            <li>Simple comparison tools to help you understand your options</li>
            <li>Educational resources to help you make informed decisions</li>
            <li>Dedicated support to assist you through the process</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="mb-4">
            ShareWell was founded by healthcare industry professionals who saw a need for better guidance in the healthshare space. 
            With rising healthcare costs and confusing options, we wanted to create a simpler way for families to find affordable healthcare alternatives.
          </p>
          <p className="mb-4">
            We've worked with numerous healthshare ministries to understand their offerings in detail and create a platform that presents this information clearly and honestly.
          </p>
        </div>
        
        <div className="text-center mt-10">
          <Link 
            href="/questionnaire" 
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 inline-block text-lg font-medium"
          >
            Find Your Plan Today
          </Link>
        </div>
      </div>
    </div>
  );
} 