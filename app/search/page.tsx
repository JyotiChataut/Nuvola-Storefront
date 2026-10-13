import type { Metadata } from 'next';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { getCategories, searchProducts } from '@/lib/data';
import { firstValue, toPage } from '@/lib/search-params';
import { StorefrontShell } from '@/components/StorefrontShell';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ProductGrid } from '@/components/ProductGrid';
import { Pagination } from '@/components/Pagination';

const PAGE_SIZE = 12;

interface SearchPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export const metadata: Metadata = {
  title: 'Search | Nuvola',
  description: 'Search the Nuvola demonstration catalog.',
  robots: { index: false, follow: true },
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const q = firstValue(searchParams?.q).trim();
  const page = toPage(firstValue(searchParams?.page));

  const result = q
    ? await searchProducts({ q, page, pageSize: PAGE_SIZE })
    : null;

  const paginationQuery: Record<string, string> = {};
  if (q) paginationQuery.q = q;

  return (
    <StorefrontShell>
      <section className="bg-canvas-soft border-b border-hairline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Search' }]}
          />

          <div className="mt-6 space-y-3">
            <h1 className="text-2xl sm:text-3xl lg:text-display-xl font-bold text-ink tracking-tight">
              {q ? (
                <>
                  Results for{' '}
                  <span className="text-forest">&ldquo;{q}&rdquo;</span>
                </>
              ) : (
                'Search the catalog'
              )}
            </h1>
            {result && (
              <p
                aria-live="polite"
                className="text-body-sm text-ink-muted tabular-nums"
              >
                {result.total} {result.total === 1 ? 'product' : 'products'} found
                {' · '}demonstration catalog
              </p>
            )}
          </div>
        </div>
      </section>

      <section aria-label="Search results" className="py-10 md:py-14 bg-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {result ? (
            <>
              <ProductGrid
                products={result.items}
                emptyTitle={`No results for “${q}”`}
                emptyMessage="Try a different spelling, a broader term, or browse a category."
                emptyActionHref="/"
                emptyActionLabel="Back to storefront"
              />
              <Pagination
                basePath="/search"
                query={paginationQuery}
                page={result.page}
                totalPages={result.totalPages}
              />
            </>
          ) : (
            <EmptyPrompt />
          )}
        </div>
      </section>
    </StorefrontShell>
  );
}

async function EmptyPrompt() {
  const categories = await getCategories();

  return (
    <div className="flex flex-col items-center justify-center text-center gap-2 px-6 py-16 border border-dashed border-hairline rounded-md bg-canvas-soft">
      <span className="flex items-center justify-center w-11 h-11 rounded-full bg-canvas border border-hairline text-ink-muted">
        <Search size={20} aria-hidden="true" />
      </span>
      <p className="mt-1 text-title-md font-semibold text-ink">
        Search the Nuvola catalog
      </p>
      <p className="text-body-sm text-ink-muted max-w-md">
        Use the search bar above to find products by name, artisan, or craft —
        or start from one of these categories.
      </p>
      <ul role="list" className="mt-4 flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/categories/${category.slug}`}
              className="inline-flex items-center px-3 py-1 rounded-full bg-canvas border border-hairline text-ink-body text-badge font-semibold uppercase hover:border-forest hover:text-forest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
