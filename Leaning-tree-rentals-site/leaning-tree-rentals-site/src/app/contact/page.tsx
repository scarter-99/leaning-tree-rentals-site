import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
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
              <p className="text-xl text-[var(--color-gray-700)]">Round Top, Texas</p>
              <p className="text-[var(--color-gray-600)] mt-4">
                We serve the Original Round Top Antiques Fair and other events in the Round Top, Texas area.
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

      {/* Meet the Team Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Meet the Team
          </h2>
          <div className="card bg-[var(--color-cream)] overflow-hidden">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2 relative h-64 md:h-80">
                <Image
                  src="/images/golf-cart-event.jpg"
                  alt="The Leaning Tree Rentals family team"
                  fill
                  className="object-cover object-top rounded-lg"
                />
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-4">Family Owned & Operated</h3>
                <p className="text-[var(--color-gray-600)] mb-4">
                  Leaning Tree Rentals is a family-owned business proudly serving the Round Top, Texas area.
                  We&apos;re passionate about making your experience at the Original Round Top Antiques Fair
                  as enjoyable as possible.
                </p>
                <p className="text-[var(--color-gray-600)]">
                  With our reliable golf carts and friendly service, we&apos;re here to help you
                  navigate the shows in comfort and style.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[var(--color-gray-50)]">
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
      <section className="py-16 bg-white">
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

      {/* Show Dates Section */}
      <section className="py-16 bg-[var(--color-cream)]">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Original Round Top Antiques Fair Dates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="card bg-white text-center border-2 border-[var(--color-primary)]">
              <div className="w-12 h-12 mx-auto mb-4 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-2">Spring Show</h3>
              <p className="text-xl font-semibold">March 12th - 28th</p>
              <p className="text-[var(--color-gray-600)] mt-2">Book early for best availability!</p>
            </div>
            <div className="card bg-white text-center border-2 border-[var(--color-primary)]">
              <div className="w-12 h-12 mx-auto mb-4 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-2">Fall Show</h3>
              <p className="text-xl font-semibold">October 15th - 31st</p>
              <p className="text-[var(--color-gray-600)] mt-2">Our busiest season - reserve now!</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/reserve" className="btn btn-primary text-lg px-8 py-3 !text-white no-underline">
              Reserve Your Cart
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
