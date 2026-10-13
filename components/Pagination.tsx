import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { buildPageHref, visiblePages } from '@/lib/pagination';

interface PaginationProps {
  basePath: string;
  query: Record<string, string>;
  page: number;
  totalPages: number;
}

const ITEM =
  'inline-flex h-9 min-w-9 items-center justify-center px-2.5 rounded-sm border text-body-sm tabular-nums focus:outline-none focus-visible:ring-2 focus-visible:ring-forest';

export function Pagination({ basePath, query, page, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;

  const hrefFor = (target: number) => buildPageHref(basePath, query, target);
  const linkClass = `${ITEM} border-hairline text-ink-body hover:border-forest hover:text-forest transition-colors`;
  const currentClass = `${ITEM} border-forest bg-forest text-white font-semibold`;
  const disabledClass = `${ITEM} border-hairline text-ink-soft opacity-40 pointer-events-none`;

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 md:mt-10 flex items-center justify-center gap-1.5"
    >
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} className={linkClass} rel="prev" aria-label="Previous page">
          <ChevronLeft size={16} aria-hidden="true" />
        </Link>
      ) : (
        <span className={disabledClass} aria-hidden="true">
          <ChevronLeft size={16} />
        </span>
      )}

      {visiblePages(page, totalPages).map((target) =>
        target === page ? (
          <span key={target} aria-current="page" className={currentClass}>
            {target}
          </span>
        ) : (
          <Link key={target} href={hrefFor(target)} className={linkClass} aria-label={`Page ${target}`}>
            {target}
          </Link>
        ),
      )}

      {page < totalPages ? (
        <Link href={hrefFor(page + 1)} className={linkClass} rel="next" aria-label="Next page">
          <ChevronRight size={16} aria-hidden="true" />
        </Link>
      ) : (
        <span className={disabledClass} aria-hidden="true">
          <ChevronRight size={16} />
        </span>
      )}
    </nav>
  );
}
