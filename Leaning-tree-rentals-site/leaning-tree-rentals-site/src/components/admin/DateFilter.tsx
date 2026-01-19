'use client';

import { useRouter } from 'next/navigation';

interface DateFilterProps {
  currentStatus: string;
  currentDate: string;
}

export default function DateFilter({ currentStatus, currentDate }: DateFilterProps) {
  const router = useRouter();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    const statusParam = currentStatus !== 'all' ? `status=${currentStatus}` : 'status=all';
    const dateParam = date ? `&date=${date}` : '';
    router.push(`/admin/reservations?${statusParam}${dateParam}`);
  };

  const clearDate = () => {
    const statusParam = currentStatus !== 'all' ? `status=${currentStatus}` : 'status=all';
    router.push(`/admin/reservations?${statusParam}`);
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
