'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ReservationFormData, TimeSlot, CartType } from '@/types';
import { PRICING, getTimeSlotLabel, getCartTypeLabel, getPriceForReservation, formatPrice, SHOW_DATES, isShowDate, CONTACT_INFO } from '@/lib/utils';

const initialFormData: ReservationFormData = {
  name: '',
  email: '',
  phone: '',
  rental_date: '',
  time_slot: 'all_day',
  cart_type: '6_passenger',
  special_requests: '',
  policy_acknowledged: false,
};

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  rental_date?: string;
  time_slot?: string;
  cart_type?: string;
  policy_acknowledged?: string;
  general?: string;
}

export default function ReservationForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<ReservationFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-\(\)]+$/.test(formData.phone) || formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Date validation - must be a show date
    if (!formData.rental_date) {
      newErrors.rental_date = 'Rental date is required';
    } else {
      const selectedDate = new Date(formData.rental_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.rental_date = 'Please select a future date';
      } else if (!isShowDate(formData.rental_date)) {
        newErrors.rental_date = 'Online reservations are only available for antique show dates. Text us at ' + CONTACT_INFO.phone + ' to reserve for other dates.';
      }
    }

    // Policy acknowledgment
    if (!formData.policy_acknowledged) {
      newErrors.policy_acknowledged = 'You must acknowledge the rental policies';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit reservation');
      }

      // Store reservation data in sessionStorage for confirmation page
      sessionStorage.setItem('lastReservation', JSON.stringify({
        ...formData,
        id: data.id,
        price: getPriceForReservation(formData.cart_type, formData.time_slot),
      }));

      // Redirect to confirmation page
      router.push('/reserve/confirmation');
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : 'An error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedPrice = getPriceForReservation(formData.cart_type, formData.time_slot);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* General Error */}
      {errors.general && (
        <div className="p-4 bg-[var(--color-error)]/10 border border-[var(--color-error)] rounded-lg">
          <p className="text-[var(--color-error)] font-medium">{errors.general}</p>
        </div>
      )}

      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b border-[var(--color-gray-200)] pb-2">
          Contact Information
        </h3>

        {/* Name */}
        <div>
          <label htmlFor="name" className="form-label">
            Full Name <span className="text-[var(--color-error)]">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`form-input ${errors.name ? 'border-[var(--color-error)]' : ''}`}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-[var(--color-error)] text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="form-label">
            Email Address <span className="text-[var(--color-error)]">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-input ${errors.email ? 'border-[var(--color-error)]' : ''}`}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-[var(--color-error)] text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="form-label">
            Phone Number <span className="text-[var(--color-error)]">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`form-input ${errors.phone ? 'border-[var(--color-error)]' : ''}`}
            placeholder="(555) 123-4567"
          />
          {errors.phone && (
            <p className="text-[var(--color-error)] text-sm mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Rental Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b border-[var(--color-gray-200)] pb-2">
          Rental Details
        </h3>

        {/* Date */}
        <div>
          <label htmlFor="rental_date" className="form-label">
            Rental Date <span className="text-[var(--color-error)]">*</span>
          </label>
          <div className="mb-2 p-3 bg-[var(--color-primary)]/10 border border-[var(--color-primary)] rounded-lg">
            <p className="text-sm font-semibold text-[var(--color-primary)] mb-1">
              Online reservations available for show dates only:
            </p>
            <ul className="text-sm text-[var(--color-gray-700)] space-y-1">
              {SHOW_DATES.map((show) => (
                <li key={show.name}>
                  {show.name}: {new Date(show.start + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {new Date(show.end + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </li>
              ))}
            </ul>
            <p className="text-xs text-[var(--color-gray-600)] mt-1">
              For non-show dates, text us at {CONTACT_INFO.phone}
            </p>
          </div>
          <input
            type="date"
            id="rental_date"
            name="rental_date"
            value={formData.rental_date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className={`form-input ${errors.rental_date ? 'border-[var(--color-error)]' : ''}`}
          />
          {errors.rental_date && (
            <p className="text-[var(--color-error)] text-sm mt-1">{errors.rental_date}</p>
          )}
        </div>

        {/* Time Slot */}
        <div>
          <label htmlFor="time_slot" className="form-label">
            Time Slot <span className="text-[var(--color-error)]">*</span>
          </label>
          <select
            id="time_slot"
            name="time_slot"
            value={formData.time_slot}
            onChange={handleChange}
            className={`form-input ${errors.time_slot ? 'border-[var(--color-error)]' : ''}`}
          >
            <option value="all_day">All Day (9am - 6pm)</option>
            <option value="morning">Morning (9am - 1:30pm)</option>
            <option value="afternoon">Afternoon (1:30pm - 6pm)</option>
          </select>
          {errors.time_slot && (
            <p className="text-[var(--color-error)] text-sm mt-1">{errors.time_slot}</p>
          )}
        </div>

        {/* Cart Type */}
        <div>
          <label htmlFor="cart_type" className="form-label">
            Cart Type <span className="text-[var(--color-error)]">*</span>
          </label>
          <select
            id="cart_type"
            name="cart_type"
            value={formData.cart_type}
            onChange={handleChange}
            className={`form-input ${errors.cart_type ? 'border-[var(--color-error)]' : ''}`}
          >
            <option value="4_passenger">4 Passenger Cart</option>
            <option value="6_passenger">6 Passenger Cart (Limited Availability)</option>
          </select>
          {errors.cart_type && (
            <p className="text-[var(--color-error)] text-sm mt-1">{errors.cart_type}</p>
          )}
        </div>

        {/* Special Requests */}
        <div>
          <label htmlFor="special_requests" className="form-label">
            Special Requests (Optional)
          </label>
          <textarea
            id="special_requests"
            name="special_requests"
            value={formData.special_requests}
            onChange={handleChange}
            rows={3}
            className="form-input"
            placeholder="Any special requests or notes..."
          />
        </div>
      </div>

      {/* Price Summary */}
      <div className="bg-[var(--color-gray-50)] rounded-lg p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">{getCartTypeLabel(formData.cart_type)}</p>
            <p className="text-sm text-[var(--color-gray-600)]">
              {getTimeSlotLabel(formData.time_slot)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[var(--color-primary)]">
              {formatPrice(selectedPrice)}
            </p>
            <p className="text-xs text-[var(--color-gray-500)]">Pay at pickup</p>
          </div>
        </div>
      </div>

      {/* Policy Acknowledgment */}
      <div className="space-y-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="policy_acknowledged"
            checked={formData.policy_acknowledged}
            onChange={handleChange}
            className="mt-1 w-5 h-5 rounded border-[var(--color-gray-300)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
          />
          <span className="text-sm text-[var(--color-gray-700)]">
            I have read and agree to the{' '}
            <a
              href="/policies"
              target="_blank"
              className="text-[var(--color-primary)] hover:underline"
            >
              rental policies
            </a>
            , including the no refund policy. I understand that all sales are final.{' '}
            <span className="text-[var(--color-error)]">*</span>
          </span>
        </label>
        {errors.policy_acknowledged && (
          <p className="text-[var(--color-error)] text-sm ml-8">{errors.policy_acknowledged}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Submitting...
          </span>
        ) : (
          'Submit Reservation Request'
        )}
      </button>

      <p className="text-sm text-center text-[var(--color-gray-500)]">
        You will receive a confirmation email once your reservation is reviewed and approved.
      </p>
    </form>
  );
}
