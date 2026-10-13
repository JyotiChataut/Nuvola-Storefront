'use client';

import React, { useEffect, useRef, useState, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Search, X, ChevronDown } from 'lucide-react';
import type { ProductSort } from '@/types';

interface CategoryControlsProps {
  categoryName: string;
  q: string;
  sort: ProductSort;
  minPrice: string;
  maxPrice: string;
  priceBounds: { min: number; max: number };
  isFiltered: boolean;
}

type Fields = { q: string; sort: ProductSort; min: string; max: string };

const SORT_OPTIONS: { value: ProductSort; label: string }[] = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Top rated' },
];

const FIELD =
  'w-full h-10 rounded-sm border border-hairline bg-canvas px-3 text-body-sm text-ink placeholder:text-ink-soft focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest transition-colors';

const LABEL =
  'block text-badge font-semibold uppercase tracking-wide text-ink-muted mb-1.5';

const BUTTON =
  'inline-flex items-center justify-center h-10 px-4 rounded-sm border border-hairline-strong bg-canvas text-body-sm font-semibold text-ink hover:border-forest hover:text-forest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest';

export function CategoryControls({
  categoryName,
  q,
  sort,
  minPrice,
  maxPrice,
  priceBounds,
  isFiltered,
}: CategoryControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(q);
  const [min, setMin] = useState(minPrice);
  const [max, setMax] = useState(maxPrice);
  const [sortValue, setSortValue] = useState<ProductSort>(sort);

  useEffect(() => {
    setSearch(q);
  }, [q]);
  useEffect(() => {
    setMin(minPrice);
  }, [minPrice]);
  useEffect(() => {
    setMax(maxPrice);
  }, [maxPrice]);
  useEffect(() => {
    setSortValue(sort);
  }, [sort]);

  const commit = (overrides: Partial<Fields>) => {
    const next: Fields = { q: search, sort: sortValue, min, max, ...overrides };
    const params = new URLSearchParams();
    if (next.q.trim()) params.set('q', next.q.trim());
    if (next.sort !== 'relevance') params.set('sort', next.sort);
    if (next.min.trim()) params.set('min', next.min.trim());
    if (next.max.trim()) params.set('max', next.max.trim());
    const query = params.toString();
    startTransition(() => {
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    });
  };

  const commitRef = useRef(commit);
  useEffect(() => {
    commitRef.current = commit;
  });

  useEffect(() => {
    if (search.trim() === q.trim()) return;
    const timer = setTimeout(() => commitRef.current({ q: search }), 350);
    return () => clearTimeout(timer);
  }, [search, q]);

  const clearAll = () => {
    setSearch('');
    setMin('');
    setMax('');
    setSortValue('relevance');
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  const removeChip = (field: 'q' | 'min' | 'max' | 'sort') => {
    if (field === 'q') {
      setSearch('');
      commit({ q: '' });
    } else if (field === 'min') {
      setMin('');
      commit({ min: '' });
    } else if (field === 'max') {
      setMax('');
      commit({ max: '' });
    } else {
      setSortValue('relevance');
      commit({ sort: 'relevance' });
    }
  };

  const sortLabel =
    SORT_OPTIONS.find((option) => option.value === sort)?.label ?? 'Relevance';

  return (
    <div
      className="mb-6 md:mb-8 rounded-md border border-hairline bg-canvas-soft p-3.5 sm:p-4"
      aria-busy={isPending}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 lg:gap-4 lg:items-end">
        <div className="lg:col-span-5 min-w-0">
          <label htmlFor="category-search" className={LABEL}>
            Search in {categoryName}
          </label>
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="category-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Try a product, artisan, or craft"
              autoComplete="off"
              className={`${FIELD} pl-9 pr-9 [&::-webkit-search-cancel-button]:hidden`}
            />
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  commit({ q: '' });
                }}
                aria-label="Clear search"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-sm text-ink-muted hover:text-forest focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
              >
                <X size={15} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        <form
          className="lg:col-span-4 grid grid-cols-2 gap-2.5"
          onSubmit={(event) => {
            event.preventDefault();
            commit({ min, max });
          }}
        >
          <div>
            <label htmlFor="price-min" className={LABEL}>
              Min price
            </label>
            <input
              id="price-min"
              type="number"
              min={0}
              inputMode="numeric"
              value={min}
              onChange={(event) => setMin(event.target.value)}
              placeholder={priceBounds.max > 0 ? String(priceBounds.min) : '0'}
              className={FIELD}
            />
          </div>
          <div>
            <label htmlFor="price-max" className={LABEL}>
              Max price
            </label>
            <input
              id="price-max"
              type="number"
              min={0}
              inputMode="numeric"
              value={max}
              onChange={(event) => setMax(event.target.value)}
              placeholder={priceBounds.max > 0 ? String(priceBounds.max) : '0'}
              className={FIELD}
            />
          </div>
          <button type="submit" className={`${BUTTON} col-span-2`}>
            Apply price
          </button>
        </form>

        <div className="lg:col-span-3">
          <label htmlFor="category-sort" className={LABEL}>
            Sort by
          </label>
          <div className="relative">
            <select
              id="category-sort"
              value={sortValue}
              onChange={(event) => {
                const value = event.target.value as ProductSort;
                setSortValue(value);
                commit({ sort: value });
              }}
              className={`${FIELD} appearance-none pr-9`}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {(isFiltered || isPending) && (
        <div className="mt-3.5 pt-3.5 border-t border-hairline-soft flex flex-wrap items-center gap-2">
          {isPending && (
            <span className="text-caption text-ink-muted" aria-live="polite">
              Updating…
            </span>
          )}

          {q && <Chip label={`Search: “${q}”`} onRemove={() => removeChip('q')} />}
          {minPrice && <Chip label={`Min ${minPrice}`} onRemove={() => removeChip('min')} />}
          {maxPrice && <Chip label={`Max ${maxPrice}`} onRemove={() => removeChip('max')} />}
          {sort !== 'relevance' && (
            <Chip label={`Sort: ${sortLabel}`} onRemove={() => removeChip('sort')} />
          )}

          {isFiltered && (
            <button
              type="button"
              onClick={clearAll}
              className="ml-auto text-caption font-semibold text-forest hover:text-forest-hover underline underline-offset-4 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
            >
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 pl-2.5 pr-1 py-0.5 rounded-full bg-canvas-strong text-ink text-badge font-medium border border-hairline-soft">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove filter: ${label}`}
        className="p-1 rounded-full text-ink-muted hover:text-forest focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
      >
        <X size={12} aria-hidden="true" />
      </button>
    </span>
  );
}
