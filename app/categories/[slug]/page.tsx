import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, searchProducts } from '@/lib/data';
import { firstValue, toPage, toPrice, toSort } from '@/lib/search-params';
import { StorefrontShell } from '@/components/StorefrontShell';
import { CategoryHeader } from '@/components/CategoryHeader';
import { CategoryControls } from '@/components/CategoryControls';
import { ProductGrid } from '@/components/ProductGrid';
import { Pagination } from '@/components/Pagination';

const PAGE_SIZE = 12;

interface CategoryPageProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    return {
      title: 'Category not found | Nuvola',
      description: 'The requested category could not be found.',
    };
  }

  return {
    title: `${category.name} | Nuvola`,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const q = firstValue(searchParams?.q).trim();
  const sort = toSort(firstValue(searchParams?.sort));
  const minPrice = toPrice(firstValue(searchParams?.min));
  const maxPrice = toPrice(firstValue(searchParams?.max));
  const page = toPage(firstValue(searchParams?.page));

  const [allInCategory, result] = await Promise.all([
    searchProducts({ categorySlug: params.slug }),
    searchProducts({
      categorySlug: params.slug,
      q,
      minPrice,
      maxPrice,
      sort,
      page,
      pageSize: PAGE_SIZE,
    }),
  ]);

  const prices = allInCategory.items.map((product) => product.price);
  const priceBounds = prices.length
    ? { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) }
    : { min: 0, max: 0 };

  const totalCount = allInCategory.total;
  const isFiltered =
    q !== '' ||
    minPrice !== undefined ||
    maxPrice !== undefined ||
    sort !== 'relevance';
  const isEmptyCategory = totalCount === 0;

  const paginationQuery: Record<string, string> = {};
  if (q) paginationQuery.q = q;
  if (sort !== 'relevance') paginationQuery.sort = sort;
  if (minPrice !== undefined) paginationQuery.min = String(minPrice);
  if (maxPrice !== undefined) paginationQuery.max = String(maxPrice);

  return (
    <StorefrontShell>
      <CategoryHeader category={category} productCount={totalCount} />

      <section
        aria-labelledby="category-products-heading"
        className="py-10 md:py-14 bg-canvas"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 mb-6 md:mb-8">
            <h2
              id="category-products-heading"
              className="text-display-md font-bold text-ink"
            >
              Products
            </h2>
            <p
              aria-live="polite"
              className="text-body-sm text-ink-muted tabular-nums"
            >
              {isFiltered
                ? `${result.total} of ${totalCount} items · demonstration catalog`
                : `${totalCount} ${totalCount === 1 ? 'item' : 'items'} · demonstration catalog`}
            </p>
          </div>

          <CategoryControls
            categoryName={category.name}
            q={q}
            sort={sort}
            minPrice={minPrice !== undefined ? String(minPrice) : ''}
            maxPrice={maxPrice !== undefined ? String(maxPrice) : ''}
            priceBounds={priceBounds}
            isFiltered={isFiltered}
          />

          <ProductGrid
            products={result.items}
            emptyTitle={
              isEmptyCategory
                ? `No ${category.name} products yet`
                : 'No products match your filters'
            }
            emptyMessage={
              isEmptyCategory
                ? 'This demonstration collection is still being curated. Check back soon.'
                : 'Try removing a filter or searching a different term.'
            }
            emptyActionHref={
              isEmptyCategory ? '/' : `/categories/${category.slug}`
            }
            emptyActionLabel={isEmptyCategory ? 'Back to storefront' : 'Clear filters'}
          />

          <Pagination
            basePath={`/categories/${category.slug}`}
            query={paginationQuery}
            page={result.page}
            totalPages={result.totalPages}
          />
        </div>
      </section>
    </StorefrontShell>
  );
}
