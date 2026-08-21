'use client';

import { useRouter } from 'next/navigation';
import { SHOW_DATES, getShowLabel, buildAdminReservationsUrl } from '@/lib/utils';

interface ShowFilterProps {
  currentStatus: string;
  currentDate: string;
  currentShow: string;
  currentQuery: string;
}

export default function ShowFilter({
  currentStatus,
  currentDate,
  currentShow,
  currentQuery,
}: ShowFilterProps) {
  const router = useRouter();

  // Newest show first in the dropdown.
  const shows = [...SHOW_DATES].sort((a, b) => b.start.localeCompare(a.start));

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(
      buildAdminReservationsUrl({
        status: currentStatus,
        date: currentDate,
        q: currentQuery || undefined,
        show: e.target.value,
      })
    );
  };

  return (
    <select
      value={currentShow}
      onChange={handleChange}
      className="form-input py-2 px-3 text-sm mt-1"
      aria-label="Filter by show"
    >
      {shows.map((show) => (
        <option key={show.start} value={show.start}>
          {getShowLabel(show)}
        </option>
      ))}
      <option value="all">All Shows</option>
    </select>
  );
}
