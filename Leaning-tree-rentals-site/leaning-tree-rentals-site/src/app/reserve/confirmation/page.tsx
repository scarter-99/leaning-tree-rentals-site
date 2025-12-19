'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ReservationFormData, TimeSlot, CartType } from '@/types';
import { getTimeSlotLabel, getCartTypeLabel, formatPrice, formatDate, CONTACT_INFO } from '@/lib/utils';

interface StoredReservation extends ReservationFormData {
  id?: string;
  price: number;
}

export default function ConfirmationPage() {
  const [reservation, setReservation] = useState<StoredReservation | null>(null);

  useEffect(() => {
    // Get reservation data from sessionStorage
    const stored = sessionStorage.getItem('lastReservation');
    if (stored) {
      try {
        setReservation(JSON.parse(stored));
      } catch {
        // Invalid data in storage
      }
    }
  }, []);

  if (!reservation) {
    return (
      <>
        {/* Page Header */}
        <section className="bg-[var(--color-primary)] text-white py-16">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">
              Reservation
            </h1>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-[var(--color-cream)]">
          <div className="container max-w-2xl text-center">
            <div className="card bg-white">
              <svg className="w-16 h-16 mx-auto text-[var(--color-gray-400)] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h2 className="text-2xl font-bold mb-4">No Reservation Found</h2>
              <p className="text-[var(--color-gray-600)] mb-6">
                It looks like you haven&apos;t submitted a reservation yet,
                or your session has expired.
              </p>
              <Link href="/reserve" className="btn btn-primary">
                Make a Reservation
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Page Header */}
      <section className="bg-[var(--color-success)] text-white py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-[family-name:var(--font-heading)]">
              Request Submitted!
            </h1>
          </div>
          <p className="text-xl text-white/90 max-w-2xl">
            Thank you for your reservation request. We&apos;ve sent you a confirmation email
            with the details below.
          </p>
        </div>
      </section>

      {/* Confirmation Details */}
      <section className="py-16 md:py-24 bg-[var(--color-cream)]">
        <div className="container max-w-3xl">
          {/* What Happens Next */}
          <div className="card bg-white mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              What Happens Next?
            </h2>
            <ol className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="w-8 h-8 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </span>
                <div>
                  <p className="font-medium">Check Your Email</p>
                  <p className="text-sm text-[var(--color-gray-600)]">
                    You should receive a confirmation email at <strong>{reservation.email}</strong> shortly.
                    Check your spam folder if you don&apos;t see it.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-8 h-8 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </span>
                <div>
                  <p className="font-medium">We Review Your Request</p>
                  <p className="text-sm text-[var(--color-gray-600)]">
                    Our team will review your reservation request and check availability.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-8 h-8 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </span>
                <div>
                  <p className="font-medium">Confirmation Email</p>
                  <p className="text-sm text-[var(--color-gray-600)]">
                    Once approved, you&apos;ll receive a second email confirming your reservation.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-8 h-8 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  4
                </span>
                <div>
                  <p className="font-medium">Pick Up Your Cart</p>
                  <p className="text-sm text-[var(--color-gray-600)]">
                    On your rental day, pick up your cart and pay in person.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          {/* Reservation Summary */}
          <div className="card bg-white mb-8">
            <h2 className="text-xl font-bold mb-4">Reservation Summary</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[var(--color-gray-500)]">Name</p>
                  <p className="font-medium">{reservation.name}</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--color-gray-500)]">Email</p>
                  <p className="font-medium">{reservation.email}</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--color-gray-500)]">Phone</p>
                  <p className="font-medium">{reservation.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--color-gray-500)]">Rental Date</p>
                  <p className="font-medium">{formatDate(reservation.rental_date)}</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--color-gray-500)]">Time Slot</p>
                  <p className="font-medium">{getTimeSlotLabel(reservation.time_slot)}</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--color-gray-500)]">Cart Type</p>
                  <p className="font-medium">{getCartTypeLabel(reservation.cart_type)}</p>
                </div>
              </div>

              {reservation.special_requests && (
                <div>
                  <p className="text-sm text-[var(--color-gray-500)]">Special Requests</p>
                  <p className="font-medium">{reservation.special_requests}</p>
                </div>
              )}

              <div className="pt-4 border-t border-[var(--color-gray-200)]">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold">Total (Pay at Pickup)</p>
                  <p className="text-2xl font-bold text-[var(--color-primary)]">
                    {formatPrice(reservation.price)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Reminders */}
          <div className="card bg-[var(--color-warning)]/10 border border-[var(--color-warning)] mb-8">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--color-warning)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Important Reminders
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-warning)]">•</span>
                <span>Pick up your cart within <strong>1 hour</strong> of your scheduled time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-warning)]">•</span>
                <span><strong>No refunds</strong> - all sales are final</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-warning)]">•</span>
                <span>Payment is due at pickup</span>
              </li>
            </ul>
          </div>

          {/* Contact & Actions */}
          <div className="text-center">
            <p className="text-[var(--color-gray-600)] mb-4">
              Questions about your reservation?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="btn btn-primary"
              >
                Call {CONTACT_INFO.phone}
              </a>
              <Link href="/" className="btn btn-secondary">
                Return Home
              </Link>
            </div>
            <p className="text-xs text-[var(--color-gray-500)] mt-4">
              Text preferred for fastest response
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
