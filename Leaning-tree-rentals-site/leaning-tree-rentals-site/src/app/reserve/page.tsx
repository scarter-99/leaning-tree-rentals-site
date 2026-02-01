import type { Metadata } from 'next';
import Link from 'next/link';
import ReservationForm from '@/components/forms/ReservationForm';
import { CONTACT_INFO } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Request a Reservation',
  description: 'Request a golf cart rental reservation. Fill out our simple form and we will confirm your booking.',
};

export default function ReservePage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-[var(--color-primary)] text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">
            Request a Reservation
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Fill out the form below to request your golf cart rental.
            We&apos;ll review your request and send you a confirmation email.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-24 bg-[var(--color-cream)]">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="card bg-white">
                <h2 className="text-2xl font-bold mb-6">Reservation Details</h2>
                <ReservationForm />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* How It Works */}
              <div className="card bg-white">
                <h3 className="text-lg font-semibold mb-4">How It Works</h3>
                <ol className="space-y-4">
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="font-medium">Submit Request</p>
                      <p className="text-sm text-[var(--color-gray-600)]">
                        Fill out the form with your details
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="font-medium">Receive Confirmation</p>
                      <p className="text-sm text-[var(--color-gray-600)]">
                        We&apos;ll email you once approved
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="font-medium">Pick Up & Pay</p>
                      <p className="text-sm text-[var(--color-gray-600)]">
                        Collect your cart and pay in person
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              {/* Important Info */}
              <div className="card bg-[var(--color-warning)]/10 border border-[var(--color-warning)]">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--color-warning)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Important
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-warning)]">•</span>
                    <span>No refunds - No exceptions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-warning)]">•</span>
                    <span>First come, first serve</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-warning)]">•</span>
                    <span>Pick up within 1 hour of reservation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-warning)]">•</span>
                    <span>Bring completed rental agreement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-warning)]">•</span>
                    <span>Wifi/cell limited during show</span>
                  </li>
                </ul>
                <Link
                  href="/policies"
                  className="inline-block mt-3 text-sm text-[var(--color-primary)] hover:underline"
                >
                  View all policies →
                </Link>
              </div>

              {/* Need Help */}
              <div className="card bg-white">
                <h3 className="text-lg font-semibold mb-3">Need Help?</h3>
                <p className="text-sm text-[var(--color-gray-600)] mb-3">
                  Questions about your reservation? Contact us:
                </p>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex items-center gap-2 text-[var(--color-primary)] font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {CONTACT_INFO.phone}
                </a>
                <p className="text-xs text-[var(--color-gray-500)] mt-1">
                  Text preferred
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
