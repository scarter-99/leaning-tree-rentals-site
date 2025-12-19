import Link from 'next/link';
import { BUSINESS_NAME, BUSINESS_TAGLINE, PRICING, CONTACT_INFO, formatPrice } from '@/lib/utils';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[var(--color-primary)] text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-[family-name:var(--font-heading)]">
              {BUSINESS_NAME}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              {BUSINESS_TAGLINE}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/reserve"
                className="btn bg-white text-[var(--color-primary)] hover:bg-[var(--color-gray-100)] font-semibold text-lg px-8 py-4"
              >
                Book Your Cart
              </Link>
              <Link
                href="/rentals"
                className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-[var(--color-primary)] font-semibold text-lg px-8 py-4"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative element */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[var(--color-cream)]" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}></div>
      </section>

      {/* Quick Info Section */}
      <section className="py-16 md:py-24 bg-[var(--color-cream)]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Golf Cart Rentals Made Easy
            </h2>
            <p className="text-lg text-[var(--color-gray-600)] max-w-2xl mx-auto">
              Whether you&apos;re attending a show, event, or just need a reliable way to get around,
              we have the perfect golf cart for you.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="card text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Time Slots</h3>
              <p className="text-[var(--color-gray-600)]">
                Choose from all-day, morning, or afternoon rentals to fit your schedule.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">4 or 6 Passengers</h3>
              <p className="text-[var(--color-gray-600)]">
                Select the cart size that works best for your group.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Reservations</h3>
              <p className="text-[var(--color-gray-600)]">
                Simple online booking with quick confirmation from our team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Rental Options
            </h2>
            <p className="text-lg text-[var(--color-gray-600)]">
              Competitive pricing for quality golf carts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {PRICING.map((cart) => (
              <div key={cart.cart_type} className="card border-2 border-[var(--color-gray-200)] hover:border-[var(--color-primary)] transition-colors">
                <div className="text-center pb-4 border-b border-[var(--color-gray-200)] mb-4">
                  {/* Placeholder for cart image */}
                  <div className="w-full h-40 bg-[var(--color-gray-100)] rounded-lg mb-4 flex items-center justify-center">
                    <svg className="w-16 h-16 text-[var(--color-gray-400)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold">{cart.label}</h3>
                  <p className="text-[var(--color-gray-500)]">{cart.capacity} passengers</p>
                  {cart.limited_availability && (
                    <span className="badge badge-pending mt-2">Limited Availability</span>
                  )}
                </div>
                <div className="space-y-3">
                  {cart.options.map((option) => (
                    <div key={option.time_slot} className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{option.label}</span>
                        <span className="text-[var(--color-gray-500)] text-sm ml-2">({option.hours})</span>
                      </div>
                      <span className="text-xl font-bold text-[var(--color-primary)]">
                        {formatPrice(option.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/rentals" className="btn btn-primary text-lg px-8 py-3">
              View Full Details
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-[var(--color-gray-900)] text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Reserve Your Cart?
          </h2>
          <p className="text-xl text-[var(--color-gray-300)] mb-8 max-w-2xl mx-auto">
            Book your golf cart today and enjoy a convenient, comfortable ride at your next event.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/reserve"
              className="btn btn-primary text-lg px-8 py-4"
            >
              Request a Reservation
            </Link>
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-[var(--color-gray-900)] text-lg px-8 py-4"
            >
              Call {CONTACT_INFO.phone}
            </a>
          </div>
          <p className="text-[var(--color-gray-400)] mt-4 text-sm">
            Text preferred for fastest response
          </p>
        </div>
      </section>
    </>
  );
}
