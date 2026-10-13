import React from 'react';
import Link from 'next/link';
import { StorefrontShell } from '@/components/StorefrontShell';

export default function NotFound() {
  return (
    <StorefrontShell>
      <section
        aria-labelledby="not-found-heading"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center"
      >
        <p className="text-badge font-semibold uppercase tracking-wider text-forest">
          404 — Not found
        </p>
        <h1
          id="not-found-heading"
          className="mt-2 text-2xl sm:text-3xl lg:text-display-xl font-bold text-ink tracking-tight"
        >
          This page could not be found.
        </h1>
        <p className="mt-3 text-body-sm sm:text-body-md text-ink-body max-w-md mx-auto">
          The page, category, or product you are looking for does not exist or
          may have been moved.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex justify-center items-center px-6 py-3 bg-forest hover:bg-forest-hover text-white text-sm font-semibold rounded-sm shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-forest"
          >
            Back to storefront
          </Link>
          <Link
            href="/#categories"
            className="inline-flex justify-center items-center px-5 py-3 bg-canvas border border-hairline-strong hover:border-forest text-ink text-sm font-semibold rounded-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
          >
            Browse categories
          </Link>
        </div>
      </section>
    </StorefrontShell>
  );
}
