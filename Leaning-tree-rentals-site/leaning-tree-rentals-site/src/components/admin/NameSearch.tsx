'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { buildAdminReservationsUrl } from '@/lib/utils';

interface NameSearchProps {
  currentStatus: string;
  currentDate: string;
  currentShow: string;
  currentQuery: string;
}

export default function NameSearch({
  currentStatus,
  currentDate,
  currentShow,
  currentQuery,
}: NameSearchProps) {
  const router = useRouter();
  const [value, setValue] = useState(currentQuery);

  const submit = (q: string) => {
    router.push(
      buildAdminReservationsUrl({
        status: currentStatus,
        date: currentDate,
        show: currentShow,
        q: q.trim() || undefined,
      })
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(value);
  };

  const clear = () => {
    setValue('');
    submit('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-1">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search by name..."
        className="form-input py-2 px-3 text-sm"
        aria-label="Search reservations by customer name"
      />
      <button type="submit" className="btn btn-primary text-sm py-2 px-4 !text-white">
        Search
      </button>
      {currentQuery && (
        <button
          type="button"
          onClick={clear}
          className="px-3 py-2 text-sm font-medium text-[var(--color-gray-600)] hover:text-[var(--color-gray-800)] bg-[var(--color-gray-100)] hover:bg-[var(--color-gray-200)] rounded-md transition-colors"
        >
          Clear
        </button>
      )}
    </form>
  );
}
