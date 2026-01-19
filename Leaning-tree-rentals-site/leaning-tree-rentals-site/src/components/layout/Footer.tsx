import Link from 'next/link';
import { BUSINESS_NAME, NAV_LINKS, CONTACT_INFO } from '@/lib/utils';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-gray-900)] text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Business Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">
              {BUSINESS_NAME}
            </h3>
            <p className="text-[var(--color-gray-300)] mb-4">
              Your trusted golf cart rental service in Texas. Quality carts, reliable service, and competitive prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="!text-[var(--color-gray-300)] hover:!text-white transition-colors no-underline"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/reserve"
                className="!text-white hover:!text-[var(--color-gray-200)] font-semibold transition-colors no-underline"
              >
                Book a Reservation
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="!text-white hover:!text-[var(--color-gray-200)] font-medium transition-colors no-underline"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                  {CONTACT_INFO.preferText && (
                    <p className="text-[var(--color-gray-300)] text-sm mt-1">
                      Text preferred
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-[var(--color-gray-300)]">
                  Round Top, Texas
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--color-gray-700)] mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[var(--color-gray-300)] text-sm">
              &copy; {currentYear} {BUSINESS_NAME}. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="/policies"
                className="!text-[var(--color-gray-300)] hover:!text-white transition-colors no-underline"
              >
                Rental Policies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
