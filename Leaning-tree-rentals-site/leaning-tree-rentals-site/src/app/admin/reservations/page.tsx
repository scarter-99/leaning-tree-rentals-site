import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import ReservationTable from '@/components/admin/ReservationTable';
import DateFilter from '@/components/admin/DateFilter';
import ShowFilter from '@/components/admin/ShowFilter';
import NameSearch from '@/components/admin/NameSearch';
import {
  getDefaultShow,
  getShowByStart,
  getShowLabel,
  buildAdminReservationsUrl,
  type Show,
} from '@/lib/utils';
import { Reservation } from '@/types';

interface PageProps {
  searchParams: Promise<{ status?: string; date?: string; q?: string; show?: string }>;
}

async function getReservations(opts: {
  status?: string;
  date?: string;
  q?: string;
  show?: Show | null;
}) {
  const supabase = await createServerClient();

  let query = supabase
    .from('reservations')
    .select('*')
    .order('rental_date', { ascending: true });

  if (opts.status && opts.status !== 'all') {
    query = query.eq('status', opts.status);
  }

  // Limit to the selected show's date range (unless viewing all shows).
  if (opts.show) {
    query = query.gte('rental_date', opts.show.start).lte('rental_date', opts.show.end);
  }

  if (opts.date) {
    query = query.eq('rental_date', opts.date);
  }

  // Case-insensitive name search.
  if (opts.q) {
    query = query.ilike('name', `%${opts.q}%`);
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
  const currentStatus = params.status || 'all';
  const currentDate = params.date || '';
  const currentQuery = params.q || '';

  // Resolve the selected show. No param -> default to the current/upcoming show.
  // "all" -> no show restriction. Otherwise match the show by its start date.
  let selectedShow: Show | null;
  let currentShow: string;
  if (params.show === 'all') {
    selectedShow = null;
    currentShow = 'all';
  } else {
    selectedShow = (params.show && getShowByStart(params.show)) || getDefaultShow();
    currentShow = selectedShow.start;
  }

  const reservations = await getReservations({
    status: currentStatus,
    date: currentDate,
    q: currentQuery,
    show: selectedShow,
  });

  const statusOptions: { value: string; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'denied', label: 'Denied' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const showScopeLabel = selectedShow ? getShowLabel(selectedShow) : 'All Shows';

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Reservations</h1>
        <p className="text-[var(--color-gray-600)]">
          Manage and review all reservation requests
        </p>
      </div>

      {/* Filters */}
      <div className="card bg-white mb-6">
        <div className="flex flex-wrap gap-6 items-start">
          {/* Show Filter */}
          <div>
            <label className="form-label text-sm font-semibold text-[var(--color-gray-700)]">
              Show
            </label>
            <ShowFilter
              currentStatus={currentStatus}
              currentDate={currentDate}
              currentShow={currentShow}
              currentQuery={currentQuery}
            />
          </div>

          {/* Search by Name */}
          <div>
            <label className="form-label text-sm font-semibold text-[var(--color-gray-700)]">
              Search by Name
            </label>
            <NameSearch
              currentStatus={currentStatus}
              currentDate={currentDate}
              currentShow={currentShow}
              currentQuery={currentQuery}
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="form-label text-sm font-semibold text-[var(--color-gray-700)]">
              Filter by Status
            </label>
            <div className="flex flex-wrap gap-2 mt-1">
              {statusOptions.map((option) => (
                <a
                  key={option.value}
                  href={buildAdminReservationsUrl({
                    status: option.value,
                    date: currentDate,
                    q: currentQuery || undefined,
                    show: currentShow,
                  })}
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
            <label className="form-label text-sm font-semibold text-[var(--color-gray-700)]">
              Filter by Rental Date
            </label>
            <DateFilter
              currentStatus={currentStatus}
              currentDate={currentDate}
              currentShow={currentShow}
              currentQuery={currentQuery}
            />
          </div>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm text-[var(--color-gray-600)] mb-4 font-medium">
        Showing {reservations.length} reservation{reservations.length !== 1 ? 's' : ''}
        {` — ${showScopeLabel}`}
        {currentStatus !== 'all' && ` (${currentStatus})`}
        {currentQuery && ` matching "${currentQuery}"`}
        {currentDate &&
          ` for ${new Date(currentDate + 'T00:00:00').toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}`}
      </p>

      {/* Reservations Table */}
      <div className="card bg-white">
        <ReservationTable reservations={reservations} />
      </div>
    </div>
  );
}
