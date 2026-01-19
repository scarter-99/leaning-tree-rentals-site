'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Reservation, ReservationStatus } from '@/types';
import { formatDate, getTimeSlotLabel, getCartTypeLabel, getPriceForReservation, formatPrice } from '@/lib/utils';

interface ReservationTableProps {
  reservations: Reservation[];
}

export default function ReservationTable({ reservations }: ReservationTableProps) {
  const router = useRouter();
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');

  const openModal = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setAdminNotes(reservation.admin_notes || '');
    setIsModalOpen(true);
    setShowDeleteConfirm(false);
  };

  const closeModal = () => {
    setSelectedReservation(null);
    setIsModalOpen(false);
    setAdminNotes('');
    setShowDeleteConfirm(false);
  };

  const handleStatusUpdate = async (newStatus: ReservationStatus) => {
    if (!selectedReservation) return;

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/reservations/${selectedReservation.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          admin_notes: adminNotes,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update reservation');
      }

      closeModal();
      router.refresh();
    } catch (error) {
      console.error('Error updating reservation:', error);
      alert('Failed to update reservation. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedReservation) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/reservations/${selectedReservation.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete reservation');
      }

      closeModal();
      router.refresh();
    } catch (error) {
      console.error('Error deleting reservation:', error);
      alert('Failed to delete reservation. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusColor = (status: ReservationStatus) => {
    switch (status) {
      case 'pending':
        return 'badge-pending';
      case 'confirmed':
        return 'badge-confirmed';
      case 'denied':
      case 'cancelled':
        return 'badge-denied';
      default:
        return '';
    }
  };

  if (reservations.length === 0) {
    return (
      <div className="text-center py-12 text-[var(--color-gray-500)]">
        <svg className="w-16 h-16 mx-auto mb-4 text-[var(--color-gray-400)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p className="text-lg font-medium">No reservations found</p>
        <p className="text-sm mt-1">Try adjusting your filters or check back later.</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--color-gray-200)]">
              <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-gray-500)]">Customer</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-gray-500)]">Rental Date</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-gray-500)]">Cart</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-gray-500)]">Price</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-gray-500)]">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-gray-500)]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id} className="border-b border-[var(--color-gray-100)] hover:bg-[var(--color-gray-50)]">
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium">{reservation.name}</p>
                    <p className="text-sm text-[var(--color-gray-500)]">{reservation.email}</p>
                    <p className="text-sm text-[var(--color-gray-500)]">{reservation.phone}</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium">{formatDate(reservation.rental_date)}</p>
                    <p className="text-sm text-[var(--color-gray-500)]">{getTimeSlotLabel(reservation.time_slot)}</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <p>{getCartTypeLabel(reservation.cart_type)}</p>
                </td>
                <td className="py-4 px-4">
                  <p className="font-semibold text-[var(--color-primary)]">
                    {formatPrice(getPriceForReservation(reservation.cart_type, reservation.time_slot))}
                  </p>
                </td>
                <td className="py-4 px-4">
                  <span className={`badge ${getStatusColor(reservation.status)}`}>
                    {reservation.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => openModal(reservation)}
                    className="btn btn-secondary text-sm py-2 px-4"
                  >
                    {reservation.status === 'pending' ? 'Review' : 'View'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && selectedReservation && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--color-gray-200)]">
              <h2 className="text-xl font-bold">Reservation Details</h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-[var(--color-gray-100)] rounded-full"
                disabled={isUpdating}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 space-y-6">
              {/* Status Badge */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--color-gray-500)]">Current Status</span>
                <span className={`badge ${getStatusColor(selectedReservation.status)}`}>
                  {selectedReservation.status}
                </span>
              </div>

              {/* Customer Info */}
              <div>
                <h3 className="font-semibold mb-2">Customer Information</h3>
                <div className="bg-[var(--color-gray-50)] rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[var(--color-gray-500)]">Name</span>
                    <span className="font-medium">{selectedReservation.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-gray-500)]">Email</span>
                    <a href={`mailto:${selectedReservation.email}`} className="text-[var(--color-primary)] hover:underline">
                      {selectedReservation.email}
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-gray-500)]">Phone</span>
                    <a href={`tel:${selectedReservation.phone}`} className="text-[var(--color-primary)] hover:underline">
                      {selectedReservation.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Reservation Details */}
              <div>
                <h3 className="font-semibold mb-2">Reservation Details</h3>
                <div className="bg-[var(--color-gray-50)] rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[var(--color-gray-500)]">Rental Date</span>
                    <span className="font-medium">{formatDate(selectedReservation.rental_date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-gray-500)]">Time Slot</span>
                    <span>{getTimeSlotLabel(selectedReservation.time_slot)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-gray-500)]">Cart Type</span>
                    <span>{getCartTypeLabel(selectedReservation.cart_type)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-gray-500)]">Price</span>
                    <span className="font-bold text-[var(--color-primary)]">
                      {formatPrice(getPriceForReservation(selectedReservation.cart_type, selectedReservation.time_slot))}
                    </span>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              {selectedReservation.special_requests && (
                <div>
                  <h3 className="font-semibold mb-2">Special Requests</h3>
                  <div className="bg-[var(--color-gray-50)] rounded-lg p-4">
                    <p>{selectedReservation.special_requests}</p>
                  </div>
                </div>
              )}

              {/* Admin Notes */}
              <div>
                <h3 className="font-semibold mb-2">Admin Notes</h3>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="form-input"
                  rows={3}
                  placeholder="Add notes for this reservation..."
                  disabled={isUpdating}
                />
              </div>

              {/* Submission Info */}
              <div className="text-sm text-[var(--color-gray-500)]">
                <p>Submitted: {new Date(selectedReservation.created_at).toLocaleString()}</p>
                {selectedReservation.confirmed_at && (
                  <p>Confirmed: {new Date(selectedReservation.confirmed_at).toLocaleString()}</p>
                )}
              </div>
            </div>

            {/* Modal Footer - Actions */}
            <div className="p-4 border-t border-[var(--color-gray-200)]">
              {/* Delete Confirmation */}
              {showDeleteConfirm ? (
                <div className="bg-[var(--color-error)]/10 border border-[var(--color-error)] rounded-lg p-4 mb-4">
                  <p className="text-[var(--color-error)] font-semibold mb-3">Are you sure you want to delete this reservation?</p>
                  <p className="text-sm text-[var(--color-gray-600)] mb-4">This action cannot be undone.</p>
                  <div className="flex gap-3">
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="btn bg-[var(--color-error)] text-white hover:bg-[var(--color-error)]/90 disabled:opacity-50"
                    >
                      {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      disabled={isDeleting}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : null}

              {/* Change Status Section */}
              <div className="mb-4">
                <p className="text-sm font-semibold text-[var(--color-gray-700)] mb-2">Change Status</p>
                <div className="flex flex-wrap gap-2">
                  {selectedReservation.status !== 'pending' && (
                    <button
                      onClick={() => handleStatusUpdate('pending')}
                      disabled={isUpdating || isDeleting}
                      className="btn text-sm py-2 px-4 bg-[var(--color-warning)]/10 text-[var(--color-warning)] border border-[var(--color-warning)] hover:bg-[var(--color-warning)] hover:text-white disabled:opacity-50"
                    >
                      {isUpdating ? 'Updating...' : 'Set Pending'}
                    </button>
                  )}
                  {selectedReservation.status !== 'confirmed' && (
                    <button
                      onClick={() => handleStatusUpdate('confirmed')}
                      disabled={isUpdating || isDeleting}
                      className="btn text-sm py-2 px-4 bg-[var(--color-success)]/10 text-[var(--color-success)] border border-[var(--color-success)] hover:bg-[var(--color-success)] hover:text-white disabled:opacity-50"
                    >
                      {isUpdating ? 'Updating...' : 'Confirm'}
                    </button>
                  )}
                  {selectedReservation.status !== 'denied' && (
                    <button
                      onClick={() => handleStatusUpdate('denied')}
                      disabled={isUpdating || isDeleting}
                      className="btn text-sm py-2 px-4 bg-[var(--color-error)]/10 text-[var(--color-error)] border border-[var(--color-error)] hover:bg-[var(--color-error)] hover:text-white disabled:opacity-50"
                    >
                      {isUpdating ? 'Updating...' : 'Deny'}
                    </button>
                  )}
                  {selectedReservation.status !== 'cancelled' && (
                    <button
                      onClick={() => handleStatusUpdate('cancelled')}
                      disabled={isUpdating || isDeleting}
                      className="btn text-sm py-2 px-4 bg-[var(--color-gray-500)]/10 text-[var(--color-gray-600)] border border-[var(--color-gray-400)] hover:bg-[var(--color-gray-500)] hover:text-white disabled:opacity-50"
                    >
                      {isUpdating ? 'Updating...' : 'Cancel'}
                    </button>
                  )}
                </div>
              </div>

              {/* Delete and Close Buttons */}
              <div className="flex justify-between items-center pt-3 border-t border-[var(--color-gray-200)]">
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={isUpdating || isDeleting || showDeleteConfirm}
                  className="btn text-sm py-2 px-4 bg-white text-[var(--color-error)] border border-[var(--color-error)] hover:bg-[var(--color-error)] hover:text-white disabled:opacity-50"
                >
                  Delete Reservation
                </button>
                <button onClick={closeModal} className="btn btn-secondary" disabled={isUpdating || isDeleting}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
