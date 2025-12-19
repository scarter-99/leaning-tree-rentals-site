import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createServerClient } from '@/lib/supabase/server';
import { formatDate, getTimeSlotLabel, getCartTypeLabel } from '@/lib/utils';
import { Reservation } from '@/types';

async function getStats() {
  const supabase = await createServerClient();

  const { data: reservations, error } = await supabase
    .from('reservations')
    .select('*');

  if (error || !reservations) {
    return {
      total: 0,
      pending: 0,
      confirmed: 0,
      denied: 0,
      recentReservations: [],
    };
  }

  const pending = reservations.filter((r: Reservation) => r.status === 'pending').length;
  const confirmed = reservations.filter((r: Reservation) => r.status === 'confirmed').length;
  const denied = reservations.filter((r: Reservation) => r.status === 'denied').length;

  // Get recent reservations (last 5)
  const recentReservations = reservations
    .sort((a: Reservation, b: Reservation) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  return {
    total: reservations.length,
    pending,
    confirmed,
    denied,
    recentReservations,
  };
}

export default async function AdminDashboard() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  const stats = await getStats();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-[var(--color-gray-600)]">Overview of your rental reservations</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--color-gray-500)]">Total Reservations</p>
              <p className="text-3xl font-bold mt-1">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-[var(--color-gray-100)] rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-[var(--color-gray-600)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--color-gray-500)]">Pending</p>
              <p className="text-3xl font-bold mt-1 text-[var(--color-warning)]">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 bg-[var(--color-warning)]/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-[var(--color-warning)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          {stats.pending > 0 && (
            <Link href="/admin/reservations?status=pending" className="text-sm text-[var(--color-primary)] hover:underline mt-2 inline-block">
              Review pending →
            </Link>
          )}
        </div>

        <div className="card bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--color-gray-500)]">Confirmed</p>
              <p className="text-3xl font-bold mt-1 text-[var(--color-success)]">{stats.confirmed}</p>
            </div>
            <div className="w-12 h-12 bg-[var(--color-success)]/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-[var(--color-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--color-gray-500)]">Denied</p>
              <p className="text-3xl font-bold mt-1 text-[var(--color-error)]">{stats.denied}</p>
            </div>
            <div className="w-12 h-12 bg-[var(--color-error)]/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-[var(--color-error)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reservations */}
      <div className="card bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Reservations</h2>
          <Link href="/admin/reservations" className="text-sm text-[var(--color-primary)] hover:underline">
            View all →
          </Link>
        </div>

        {stats.recentReservations.length === 0 ? (
          <div className="text-center py-8 text-[var(--color-gray-500)]">
            <svg className="w-12 h-12 mx-auto mb-4 text-[var(--color-gray-400)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p>No reservations yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-gray-200)]">
                  <th className="text-left py-3 px-2 text-sm font-medium text-[var(--color-gray-500)]">Name</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-[var(--color-gray-500)]">Date</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-[var(--color-gray-500)]">Cart</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-[var(--color-gray-500)]">Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentReservations.map((reservation: Reservation) => (
                  <tr key={reservation.id} className="border-b border-[var(--color-gray-100)] hover:bg-[var(--color-gray-50)]">
                    <td className="py-3 px-2">
                      <div>
                        <p className="font-medium">{reservation.name}</p>
                        <p className="text-sm text-[var(--color-gray-500)]">{reservation.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div>
                        <p className="font-medium">{formatDate(reservation.rental_date)}</p>
                        <p className="text-sm text-[var(--color-gray-500)]">{getTimeSlotLabel(reservation.time_slot)}</p>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <p>{getCartTypeLabel(reservation.cart_type)}</p>
                    </td>
                    <td className="py-3 px-2">
                      <span className={`badge badge-${reservation.status}`}>
                        {reservation.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {stats.pending > 0 && (
        <div className="mt-6 card bg-[var(--color-primary)]/5 border border-[var(--color-primary)]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-[var(--color-primary)]">
                You have {stats.pending} pending reservation{stats.pending !== 1 ? 's' : ''}
              </h3>
              <p className="text-sm text-[var(--color-gray-600)]">
                Review and confirm or deny these reservations
              </p>
            </div>
            <Link href="/admin/reservations?status=pending" className="btn btn-primary">
              Review Now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
