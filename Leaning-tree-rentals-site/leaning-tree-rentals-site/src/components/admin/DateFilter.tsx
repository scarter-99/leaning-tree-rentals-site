'use client';

import { useRouter } from 'next/navigation';
import { buildAdminReservationsUrl } from '@/lib/utils';

interface DateFilterProps {
  currentStatus: string;
  currentDate: string;
  currentShow: string;
  currentQuery: string;
}

export default function DateFilter({
  currentStatus,
  currentDate,
  currentShow,
  currentQuery,
}: DateFilterProps) {
  const router = useRouter();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(
      buildAdminReservationsUrl({
        status: currentStatus,
        show: currentShow,
        q: currentQuery || undefined,
        date: e.target.value || undefined,
      })
    );
  };

  const clearDate = () => {
    router.push(
      buildAdminReservationsUrl({
        status: currentStatus,
        show: currentShow,
        q: currentQuery || undefined,
      })
    );
  };

  return (
    <div className="flex items-center gap-2 mt-1">
      <input
        type="date"
        value={currentDate}
        onChange={handleDateChange}
        className="form-input py-2 px-3 text-sm"
      />
      {currentDate && (
        <button
          onClick={clearDate}
          className="px-3 py-2 text-sm font-medium text-[var(--color-gray-600)] hover:text-[var(--color-gray-800)] bg-[var(--color-gray-100)] hover:bg-[var(--color-gray-200)] rounded-md transition-colors"
        >
          Clear
        </button>
      )}
    </div>
  );
}
