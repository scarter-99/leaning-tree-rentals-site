import Link from 'next/link';
import Image from 'next/image';
import { BUSINESS_NAME, BUSINESS_TAGLINE, PRICING, CONTACT_INFO, formatPrice } from '@/lib/utils';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[var(--color-gray-900)] text-white min-h-[500px] md:min-h-[600px]">
        {/* Background Image */}
        <Image
          src="/images/golf-carts-the-gin.jpg"
          alt="Golf carts lined up at The Gin in Round Top (Warrenton), Texas"
          fill
          className="object-contain object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        <div className="container relative pt-48 md:pt-64 pb-36 md:pb-48 z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold !text-white mb-4 font-[family-name:var(--font-heading)]" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
              {BUSINESS_NAME}
            </h1>
            <p className="text-xl md:text-2xl !text-white mb-8" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
              {BUSINESS_TAGLINE}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 relative z-20">
              <Link
                href="/reserve"
                className="btn bg-[var(--color-primary)] !text-white hover:bg-[var(--color-primary-dark)] font-semibold text-lg px-8 py-4 no-underline shadow-lg"
              >
                Book Your Cart
              </Link>
              <Link
                href="/rentals"
                className="btn bg-white !text-[var(--color-gray-900)] hover:bg-[var(--color-gray-100)] font-semibold text-lg px-8 py-4 no-underline shadow-lg"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative element */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-[var(--color-cream)] z-0" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}></div>
      </section>

      {/* Show Dates Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Original Round Top Antiques Fair
            </h2>
            <p className="text-lg text-[var(--color-gray-600)]">
              Book your golf cart for the biggest antiques shows in Texas
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="card bg-[var(--color-cream)] text-center border-2 border-[var(--color-primary)]">
              <div className="w-12 h-12 mx-auto mb-3 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-primary)]">Spring Show</h3>
              <p className="text-xl font-semibold mt-2">March 12th - 28th</p>
            </div>
            <div className="card bg-[var(--color-cream)] text-center border-2 border-[var(--color-primary)]">
              <div className="w-12 h-12 mx-auto mb-3 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-primary)]">Fall Show</h3>
              <p className="text-xl font-semibold mt-2">October 15th - 31st</p>
            </div>
          </div>
        </div>
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

          {/* Fleet Showcase */}
          <div className="mt-16">
            <div className="relative h-64 md:h-72 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/fleet-overview.jpg"
                alt="Our fleet of golf carts ready for rental"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Large Fleet Ready to Go</h3>
                <p className="text-white/90 text-lg">We have plenty of quality carts to meet your needs at every Round Top (Warrenton) event</p>
              </div>
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
                  {/* Cart image */}
                  <div className="w-full h-48 rounded-lg mb-4 overflow-hidden relative">
                    <Image
                      src={cart.cart_type === '6_passenger' ? '/images/6-seater-cart.jpg' : '/images/golf-carts-the-gin.jpg'}
                      alt={cart.label}
                      fill
                      className={cart.cart_type === '6_passenger' ? 'object-cover object-center' : 'object-cover object-bottom'}
                    />
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
            <Link href="/rentals" className="btn btn-primary text-lg px-8 py-3 !text-white no-underline">
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
              className="btn btn-primary text-lg px-8 py-4 !text-white no-underline"
            >
              Request a Reservation
            </Link>
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="btn bg-transparent border-2 border-white !text-white hover:bg-white hover:!text-[var(--color-gray-900)] text-lg px-8 py-4 no-underline"
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
