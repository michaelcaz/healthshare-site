import Link from 'next/link';
import { Disclaimers } from '@/components/layout/Disclaimers';

export function Footer() {
  return (
    <footer className="bg-warm border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1 flex flex-col items-start">
            <Link href="/" className="flex items-center">
              <img
                src="/images/sharewizelogofull.svg"
                alt="Sharewize"
                className="h-10 w-auto mb-4"
              />
            </Link>
            <p className="text-sm text-gray-600">
              Helping you find the perfect healthshare plan for your needs.
            </p>
          </div>

          {/* Core Navigation */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-primary hover:underline transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-primary hover:underline transition-colors">About</a></li>
              <li><a href="/contact" className="hover:text-primary hover:underline transition-colors">Contact</a></li>
              <li><a href="/questionnaire" className="hover:text-primary hover:underline transition-colors">See My Savings in 60 Seconds</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900">Policies</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacy-policy" className="hover:text-primary hover:underline transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-primary hover:underline transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900">Connect With Us</h3>
            <ul className="space-y-2 text-sm">

              <li>
                <a href="tel:7372371055" className="hover:text-primary hover:underline transition-colors">(737) 237-1055</a>
              </li>
              <li className="flex items-center gap-2">
                <a
                  href="https://instagram.com/thehealthshareguy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram @thehealthshareguy"
                  className="flex items-center hover:text-primary hover:underline transition-colors"
                >
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block mr-2">
                    <rect width="18" height="18" x="3" y="3" rx="5" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="4" strokeWidth="2"/>
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
                  </svg>
                  <span className="text-sm">@thehealthshareguy</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimers Section */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <Disclaimers variant="footer" className="mb-4" />
          <div className="text-sm text-center text-gray-600">
            © 2025 Sharewize LLC. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
} 