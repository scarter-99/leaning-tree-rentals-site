import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import ReservationTable from '@/components/admin/ReservationTable';
import DateFilter from '@/components/admin/DateFilter';
import { Reservation } from '@/types';

interface PageProps {
  searchParams: Promise<{ status?: string; date?: string }>;
}

async function getReservations(status?: string, date?: string) {
  const supabase = await createServerClient();

  let query = supabase
    .from('reservations')
    .select('*')
    .order('rental_date', { ascending: true });

  if (status && status !== 'all') {
    query = query.eq('status', status);
  }

  if (date) {
    query = query.eq('rental_date', date);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching reservations:', error);
    return [];
  }

  return data as Reservation[];
}

export default async function AdminReservationsPage({ searchParams }: PageProps) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  const params = await searchParams;
  const reservations = await getReservations(params.status, params.date);
  const currentStatus = params.status || 'all';
  const currentDate = params.date || '';

  const statusOptions: { value: string; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'denied', label: 'Denied' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Reservations</h1>
        <p className="text-[var(--color-gray-600)]">Manage and review all reservation requests</p>
      </div>

      {/* Filters */}
      <div className="card bg-white mb-6">
        <div className="flex flex-wrap gap-6 items-start">
          {/* Status Filter */}
          <div>
            <label className="form-label text-sm font-semibold text-[var(--color-gray-700)]">Filter by Status</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {statusOptions.map((option) => (
                <a
                  key={option.value}
                  href={`/admin/reservations?status=${option.value}${currentDate ? `&date=${currentDate}` : ''}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors no-underline ${
                    currentStatus === option.value
                      ? 'bg-[var(--color-primary)] !text-white'
                      : 'bg-[var(--color-gray-100)] !text-[var(--color-gray-700)] hover:bg-[var(--color-gray-200)]'
                  }`}
                >
                  {option.label}
                </a>
              ))}
            </div>
          </div>

          {/* Date Filter */}
          <div>
            <label className="form-label text-sm font-semibold text-[var(--color-gray-700)]">Filter by Rental Date</label>
            <DateFilter currentStatus={currentStatus} currentDate={currentDate} />
          </div>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm text-[var(--color-gray-600)] mb-4 font-medium">
        Showing {reservations.length} reservation{reservations.length !== 1 ? 's' : ''}
        {currentStatus !== 'all' && ` (${currentStatus})`}
        {currentDate && ` for ${new Date(currentDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}`}
      </p>

      {/* Reservations Table */}
      <div className="card bg-white">
        <ReservationTable reservations={reservations} />
      </div>
    </div>
  );
}
