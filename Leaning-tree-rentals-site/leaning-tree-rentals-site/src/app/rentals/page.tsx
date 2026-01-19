import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PRICING, formatPrice } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Rental Options & Pricing',
  description: 'View our golf cart rental options and pricing. Choose from 4 or 6 passenger carts with all-day, morning, or afternoon time slots.',
};

export default function RentalsPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-[var(--color-primary)] text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">
            Rental Options & Pricing
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Choose the perfect golf cart for your needs. We offer flexible time slots
            and cart sizes to accommodate groups of all sizes.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 md:py-24 bg-[var(--color-cream)]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {PRICING.map((cart) => (
              <div
                key={cart.cart_type}
                className="card border-2 border-[var(--color-gray-200)] overflow-hidden"
              >
                {/* Cart Header */}
                <div className="bg-white p-6 border-b border-[var(--color-gray-200)]">
                  {/* Cart Image */}
                  <div className="w-full h-52 rounded-lg mb-6 overflow-hidden relative">
                    <Image
                      src={cart.cart_type === '6_passenger' ? '/images/6-seater-cart.jpg' : '/images/hero-carts.jpg'}
                      alt={cart.label}
                      fill
                      className={cart.cart_type === '6_passenger' ? 'object-cover object-center' : 'object-cover object-bottom'}
                    />
                  </div>

                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-2">{cart.label}</h2>
                    <div className="flex items-center justify-center gap-2 text-[var(--color-gray-600)]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>Seats {cart.capacity} passengers</span>
                    </div>
                    {cart.limited_availability && (
                      <div className="mt-3">
                        <span className="badge badge-pending">Limited Availability</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Pricing Options */}
                <div className="p-6 bg-white">
                  <h3 className="text-lg font-semibold mb-4 text-[var(--color-gray-700)]">
                    Time Slots & Pricing
                  </h3>
                  <div className="space-y-4">
                    {cart.options.map((option) => (
                      <div
                        key={option.time_slot}
                        className="flex items-center justify-between p-4 bg-[var(--color-gray-50)] rounded-lg"
                      >
                        <div>
                          <p className="font-semibold text-lg">{option.label}</p>
                          <p className="text-[var(--color-gray-500)] text-sm">{option.hours}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-[var(--color-primary)]">
                            {formatPrice(option.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Book Button */}
                  <Link
                    href="/reserve"
                    className="btn btn-primary w-full mt-6 text-lg py-3 !text-white no-underline"
                  >
                    Book This Cart
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Time Slot Info */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Understanding Time Slots
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center border border-[var(--color-gray-200)]">
              <div className="w-12 h-12 mx-auto mb-4 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">All Day</h3>
              <p className="text-[var(--color-gray-600)] mb-2">9:00 AM - 6:00 PM</p>
              <p className="text-sm text-[var(--color-gray-500)]">
                9 hours of full access. Perfect for all-day events.
              </p>
            </div>

            <div className="card text-center border border-[var(--color-gray-200)]">
              <div className="w-12 h-12 mx-auto mb-4 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Morning</h3>
              <p className="text-[var(--color-gray-600)] mb-2">9:00 AM - 1:30 PM</p>
              <p className="text-sm text-[var(--color-gray-500)]">
                4.5 hours in the morning. Great for early activities.
              </p>
            </div>

            <div className="card text-center border border-[var(--color-gray-200)]">
              <div className="w-12 h-12 mx-auto mb-4 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Afternoon</h3>
              <p className="text-[var(--color-gray-600)] mb-2">1:30 PM - 6:00 PM</p>
              <p className="text-sm text-[var(--color-gray-500)]">
                4.5 hours in the afternoon. Ideal for late arrivals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 bg-[var(--color-gray-50)]">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Important Information
          </h2>

          <div className="card bg-white">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>All reservations are first come, first serve. Book early to secure your preferred date and time.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>6 passenger carts have limited availability and may sell out quickly.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Payment is collected in person at the time of pickup.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[var(--color-warning)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="font-medium">No refunds - No exceptions. Please review our <Link href="/policies" className="text-[var(--color-primary)] hover:underline">rental policies</Link> before booking.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--color-primary)]">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Book?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Request your reservation today and we&apos;ll confirm your booking as soon as possible.
          </p>
          <Link
            href="/reserve"
            className="btn bg-white !text-[var(--color-primary)] hover:bg-[var(--color-gray-100)] text-lg px-8 py-4 font-semibold no-underline"
          >
            Request a Reservation
          </Link>
        </div>
      </section>
    </>
  );
}
