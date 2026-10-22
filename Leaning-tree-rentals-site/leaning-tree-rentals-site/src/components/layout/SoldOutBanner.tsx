'use client';

import { useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { CONTACT_INFO, getTodayString, getUpcomingSoldOutDates } from '@/lib/utils';

const subscribe = () => () => {};

export default function SoldOutBanner() {
  const pathname = usePathname();
  // Read today's date in the browser, not at build time, so past dates drop
  // off the banner without a redeploy. The server snapshot is null, so the
  // banner renders only on the client.
  const today = useSyncExternalStore(subscribe, getTodayString, () => null);

  if (!today || pathname.startsWith('/admin')) {
    return null;
  }

  const dates = getUpcomingSoldOutDates(today);
  if (dates.length === 0) {
    return null;
  }

  const labels = dates.map((d) =>
    new Date(d + 'T12:00:00').toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    })
  );

  return (
    <div className="bg-[var(--color-primary)] text-white text-center px-4 py-3">
      <p className="font-bold text-lg uppercase tracking-wide">Sold Out</p>
      <p className="text-sm md:text-base">
        All golf carts are sold out for {labels.join(' • ')}.
      </p>
      <p className="text-xs md:text-sm text-white/90 mt-1">
        Questions? Text us at {CONTACT_INFO.phone}
      </p>
    </div>
  );
}
