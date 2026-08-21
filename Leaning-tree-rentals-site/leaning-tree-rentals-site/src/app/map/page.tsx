import type { Metadata } from 'next';
import Link from 'next/link';
import { AREA_MAP_PDF, BUSINESS_ADDRESS, CONTACT_INFO } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Area Map',
  description:
    'Golf-cart route map for the Original Round Top Antiques Fair in Warrenton, Texas. See legal cart routes and key show locations around The Gin at Warrenton.',
};

// Location legend shown on the printed map, kept as real text so it is readable
// on phones with limited cell service during the show.
const MAP_LEGEND: { code: string; name: string }[] = [
  { code: '★', name: 'Leaning Tree Rentals' },
  { code: 'WI', name: 'Warrenton Inn' },
  { code: 'G', name: 'Gin' },
  { code: 'Gas', name: 'Gas Station' },
  { code: 'GM', name: 'Granny McCormick' },
  { code: 'Z', name: 'Zapp Hall' },
  { code: 'BW', name: 'Bar W' },
  { code: 'GI', name: 'Glamp Inn' },
  { code: 'DPS', name: 'Dead People Stuff' },
  { code: 'E1', name: 'Excess 1' },
  { code: 'E2', name: 'Excess 2' },
  { code: 'BO', name: 'Blue Ocean' },
];

export default function MapPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-[var(--color-primary)] text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">
            Area Map
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Your golf-cart guide to the Original Round Top Antiques Fair in Warrenton.
            Approximately 55 acres of shopping within the orange routes.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[var(--color-cream)]">
        <div className="container max-w-5xl">
          {/* Asphalt warning - matches the printed map */}
          <div className="card bg-white border-4 border-[var(--color-warning)] shadow-lg mb-8">
            <div className="text-center py-2">
              <p className="text-lg md:text-xl font-bold text-[var(--color-gray-800)]">
                Approximately 55 acres of shopping within the orange lines on the golf cart!
              </p>
              <p className="text-sm md:text-base text-[var(--color-error)] font-semibold mt-2">
                Remember: if you go on the asphalt and receive a citation — IT WILL BE YOUR OWN ASPHALT!
              </p>
            </div>
          </div>

          {/* Open / Download button - the reliable path on mobile */}
          <div className="text-center mb-8">
            <a
              href={AREA_MAP_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary text-lg px-8 py-4 inline-flex items-center gap-2 !text-white no-underline"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open Full Map (PDF)
            </a>
            <p className="text-sm text-[var(--color-gray-600)] mt-2">
              Tip: open and save the map to your phone before the show — cell service is limited on the grounds.
            </p>
          </div>

          {/* Embedded map preview */}
          <div className="card bg-white overflow-hidden p-0 mb-8">
            <object
              data={AREA_MAP_PDF}
              type="application/pdf"
              className="w-full h-[70vh] min-h-[480px]"
              aria-label="Leaning Tree Rentals golf-cart route map"
            >
              <div className="p-8 text-center">
                <p className="text-[var(--color-gray-700)] mb-4">
                  Your browser can&apos;t display the map inline.
                </p>
                <a
                  href={AREA_MAP_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary !text-white no-underline"
                >
                  Open the Map (PDF)
                </a>
              </div>
            </object>
          </div>

          {/* Legend */}
          <div className="card bg-white">
            <h2 className="text-2xl font-bold mb-4">Map Legend</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
              {MAP_LEGEND.map((item) => (
                <div
                  key={item.code}
                  className="flex items-center gap-3 py-1 border-b border-[var(--color-gray-100)]"
                >
                  <span className="inline-flex items-center justify-center min-w-10 h-7 px-2 rounded bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold text-sm">
                    {item.code}
                  </span>
                  <span className="text-[var(--color-gray-700)]">{item.name}</span>
                </div>
              ))}
            </div>
            <p className="text-[var(--color-gray-600)] mt-6">
              We&apos;re located at <strong>The Gin at Warrenton</strong>, {BUSINESS_ADDRESS}.
              Parking is available at The Gin for $5/day. Questions about routes or pickup?
              Text us at{' '}
              <a href={`sms:${CONTACT_INFO.phone}`} className="text-[var(--color-primary)] font-medium hover:underline">
                {CONTACT_INFO.phone}
              </a>
              .
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 card bg-white border-2 border-[var(--color-primary)] text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Explore the Show?</h2>
            <p className="text-[var(--color-gray-600)] mb-6 max-w-xl mx-auto">
              Reserve a golf cart and get around the grounds in comfort.
            </p>
            <Link href="/reserve" className="btn btn-primary text-lg px-8 py-3 !text-white no-underline">
              Request a Reservation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
