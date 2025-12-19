'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BUSINESS_NAME, NAV_LINKS, cn } from '@/lib/utils';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Business Name */}
          <Link
            href="/"
            className="flex items-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
            onClick={closeMobileMenu}
          >
            <span className="text-xl md:text-2xl font-bold font-[family-name:var(--font-heading)]">
              {BUSINESS_NAME}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-[var(--color-gray-600)] hover:text-[var(--color-primary)] font-medium transition-colors',
                  pathname === link.href && 'text-[var(--color-primary)] font-semibold'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/reserve"
              className="btn btn-primary"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-[var(--color-gray-600)] hover:text-[var(--color-primary)]"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-[var(--color-gray-200)]">
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-[var(--color-gray-600)] hover:text-[var(--color-primary)] font-medium py-2 transition-colors',
                    pathname === link.href && 'text-[var(--color-primary)] font-semibold'
                  )}
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/reserve"
                className="btn btn-primary w-full mt-2"
                onClick={closeMobileMenu}
              >
                Book Now
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
