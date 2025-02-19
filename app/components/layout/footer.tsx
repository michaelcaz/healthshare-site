import Image from 'next/image';

export function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Image 
                src="/images/logo.svg" 
                alt="Riff" 
                width={96} 
                height={32} 
                priority
              />
            </div>
            <p className="text-sm text-gray-600">
              Helping you find the perfect healthshare plan for your needs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="hover:text-gray-600">About</a></li>
              <li><a href="/blog" className="hover:text-gray-600">Blog</a></li>
              <li><a href="/questionnaire" className="hover:text-gray-600">Get Free Quote</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/faq" className="hover:text-gray-600">FAQ</a></li>
              <li><a href="/providers" className="hover:text-gray-600">Providers</a></li>
              <li><a href="/contact" className="hover:text-gray-600">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacy" className="hover:text-gray-600">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-gray-600">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-sm text-center text-gray-600">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
} 