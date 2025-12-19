import type { Metadata } from 'next';
import Link from 'next/link';
import { BUSINESS_NAME, CONTACT_INFO } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Leaning Tree Rentals. Call or text us for questions about golf cart rentals.',
};

export default function ContactPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-[var(--color-primary)] text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">
            Contact Us
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Have questions about our golf cart rentals? We&apos;re here to help.
            Reach out to us and we&apos;ll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 md:py-24 bg-[var(--color-cream)]">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Phone Contact */}
            <div className="card bg-white text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Call or Text</h2>
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="text-3xl font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors"
              >
                {CONTACT_INFO.phone}
              </a>
              <div className="mt-4 inline-flex items-center gap-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-4 py-2 rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="font-medium">Text Preferred</span>
              </div>
              <p className="text-[var(--color-gray-600)] mt-4">
                For the fastest response, please text us. We&apos;ll get back to you as soon as possible.
              </p>
            </div>

            {/* Location */}
            <div className="card bg-white text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Location</h2>
              <p className="text-xl text-[var(--color-gray-700)]">Texas</p>
              <p className="text-[var(--color-gray-600)] mt-4">
                We serve various events and shows throughout Texas.
                Contact us for specific pickup locations.
              </p>
            </div>
          </div>

          {/* Reservation CTA */}
          <div className="mt-12 card bg-white border-2 border-[var(--color-primary)]">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">
                Ready to Reserve a Cart?
              </h2>
              <p className="text-[var(--color-gray-600)] mb-6 max-w-xl mx-auto">
                Skip the phone and book online! Our reservation form makes it easy
                to request your rental. We&apos;ll confirm your reservation via email.
              </p>
              <Link
                href="/reserve"
                className="btn btn-primary text-lg px-8 py-3"
              >
                Request a Reservation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <div className="card border border-[var(--color-gray-200)]">
              <h3 className="text-lg font-semibold mb-2">How do I make a reservation?</h3>
              <p className="text-[var(--color-gray-600)]">
                You can request a reservation through our <Link href="/reserve" className="text-[var(--color-primary)] hover:underline">online form</Link> or
                by texting us at {CONTACT_INFO.phone}. We&apos;ll confirm your reservation via email.
              </p>
            </div>

            <div className="card border border-[var(--color-gray-200)]">
              <h3 className="text-lg font-semibold mb-2">When do I pay?</h3>
              <p className="text-[var(--color-gray-600)]">
                Payment is collected in person at the time of cart pickup. We accept various payment methods.
              </p>
            </div>

            <div className="card border border-[var(--color-gray-200)]">
              <h3 className="text-lg font-semibold mb-2">Can I cancel my reservation?</h3>
              <p className="text-[var(--color-gray-600)]">
                Please review our <Link href="/policies" className="text-[var(--color-primary)] hover:underline">rental policies</Link>.
                All sales are final - no refunds are issued once a reservation is confirmed.
              </p>
            </div>

            <div className="card border border-[var(--color-gray-200)]">
              <h3 className="text-lg font-semibold mb-2">What if I&apos;m running late?</h3>
              <p className="text-[var(--color-gray-600)]">
                Please contact us immediately if you&apos;re running late. Reservations must be picked up within
                1 hour of your scheduled time, or they may be cancelled.
              </p>
            </div>

            <div className="card border border-[var(--color-gray-200)]">
              <h3 className="text-lg font-semibold mb-2">How far in advance should I book?</h3>
              <p className="text-[var(--color-gray-600)]">
                We recommend booking as early as possible, especially for popular events.
                Reservations are first come, first serve, and carts can sell out quickly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours Info */}
      <section className="py-16 bg-[var(--color-gray-50)]">
        <div className="container max-w-4xl">
          <div className="card bg-white text-center">
            <h2 className="text-2xl font-bold mb-4">Response Times</h2>
            <p className="text-[var(--color-gray-600)] max-w-xl mx-auto">
              We strive to respond to all inquiries within 24 hours.
              For urgent matters, texting is the fastest way to reach us.
            </p>
            <div className="mt-6 flex justify-center">
              <a
                href={`sms:${CONTACT_INFO.phone}`}
                className="btn btn-primary"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Text Us Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-16 bg-[var(--color-cream)]">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Serving Texas
          </h2>
          {/* Placeholder for map */}
          <div className="w-full h-64 md:h-96 bg-[var(--color-gray-200)] rounded-lg flex items-center justify-center">
            <div className="text-center text-[var(--color-gray-500)]">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <p className="text-lg font-medium">{BUSINESS_NAME}</p>
              <p>Serving events throughout Texas</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
