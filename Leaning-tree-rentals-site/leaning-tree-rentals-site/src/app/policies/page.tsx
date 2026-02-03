import type { Metadata } from 'next';
import Link from 'next/link';
import { POLICIES, CONTACT_INFO, ASPHALT_QUOTE } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Rental Policies',
  description: 'Review our golf cart rental policies including refund policy, pickup requirements, and reservation guidelines.',
};

export default function PoliciesPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-[var(--color-primary)] text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">
            Rental Policies
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Please read and understand our rental policies before making a reservation.
            By booking with us, you agree to these terms.
          </p>
        </div>
      </section>

      {/* Shirley's Asphalt Quote - Prominent Display */}
      <section className="py-12 bg-[var(--color-warning)]/20">
        <div className="container max-w-4xl">
          <div className="card bg-white border-4 border-[var(--color-warning)] shadow-lg">
            <div className="text-center py-4">
              <svg className="w-12 h-12 mx-auto text-[var(--color-warning)] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <blockquote className="text-2xl md:text-3xl font-bold text-[var(--color-gray-800)] italic mb-4 px-4">
                &ldquo;{ASPHALT_QUOTE.text}&rdquo;
              </blockquote>
              <p className="text-xl font-semibold text-[var(--color-primary)]">
                — {ASPHALT_QUOTE.author}
              </p>
              <p className="text-sm text-[var(--color-gray-600)] mt-4">
                It is a violation to drive a golf cart on state highways or state right of way in Fayette County, Texas. You are solely responsible for any citations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Policies Section */}
      <section className="py-16 md:py-24 bg-[var(--color-cream)]">
        <div className="container max-w-4xl">
          <div className="space-y-6">
            {POLICIES.map((policy, index) => (
              <div
                key={index}
                className="card bg-white border-l-4 border-[var(--color-primary)]"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold mb-2">{policy.title}</h2>
                    <p className="text-[var(--color-gray-600)]">{policy.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rental Agreement Download */}
      <section className="py-12 bg-white">
        <div className="container max-w-4xl">
          <div className="card bg-[var(--color-gray-50)] border-2 border-[var(--color-primary)]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--color-primary)] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Official Rental Agreement</h3>
                  <p className="text-[var(--color-gray-600)]">Download and review our complete rental agreement</p>
                </div>
              </div>
              <a
                href="/rental-agreement.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary flex items-center gap-2 !text-white no-underline"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Guidelines */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Reservation Guidelines
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card border border-[var(--color-gray-200)]">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Complete Information Required
              </h3>
              <p className="text-[var(--color-gray-600)]">
                When making a reservation request, please provide:
              </p>
              <ul className="mt-2 space-y-1 text-[var(--color-gray-600)]">
                <li>• Full name</li>
                <li>• Phone number</li>
                <li>• Email address</li>
                <li>• Rental date and time slot</li>
                <li>• Cart type preference</li>
              </ul>
            </div>

            <div className="card border border-[var(--color-gray-200)]">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Pickup Requirements
              </h3>
              <p className="text-[var(--color-gray-600)]">
                You must pick up your cart within <strong>1 hour</strong> of your scheduled
                reservation time. If you do not pick up your cart and we have not heard
                from you, your reservation will be cancelled without refund.
              </p>
            </div>

            <div className="card border border-[var(--color-gray-200)]">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Payment
              </h3>
              <p className="text-[var(--color-gray-600)]">
                Payment is collected <strong>in person</strong> at the time of cart pickup.
                We accept various payment methods. Your reservation request will be
                confirmed before your rental date.
              </p>
            </div>

            <div className="card border border-[var(--color-gray-200)]">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Cart Preassignment
              </h3>
              <p className="text-[var(--color-gray-600)]">
                Carts are preassigned prior to each event. Specific cart requests cannot
                be guaranteed. All carts are maintained and ready for use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Questions Section */}
      <section className="py-16 bg-[var(--color-gray-50)]">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Have Questions?
          </h2>
          <p className="text-lg text-[var(--color-gray-600)] mb-8">
            If you have any questions about our policies, please don&apos;t hesitate to reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="btn btn-primary text-lg px-8 py-3"
            >
              Call {CONTACT_INFO.phone}
            </a>
            <Link
              href="/contact"
              className="btn btn-secondary text-lg px-8 py-3"
            >
              Contact Us
            </Link>
          </div>
          <p className="text-[var(--color-gray-500)] mt-4 text-sm">
            Text preferred for fastest response
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--color-primary)]">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Reserve?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            By making a reservation, you acknowledge that you have read and agree to these policies.
          </p>
          <Link
            href="/reserve"
            className="btn bg-white text-[var(--color-primary)] hover:bg-[var(--color-gray-100)] text-lg px-8 py-4 font-semibold"
          >
            Request a Reservation
          </Link>
        </div>
      </section>
    </>
  );
}
