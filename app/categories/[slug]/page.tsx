import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getCategories,
  getCategoryBySlug,
  getProductsByCategory,
} from '@/lib/data';
import { StorefrontShell } from '@/components/StorefrontShell';
import { CategoryHeader } from '@/components/CategoryHeader';
import { ProductGrid } from '@/components/ProductGrid';

interface CategoryPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(params.slug);

  return (
    <StorefrontShell>
      <CategoryHeader category={category} productCount={products.length} />

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
            <p className="text-body-sm text-ink-muted tabular-nums">
              {products.length} {products.length === 1 ? 'item' : 'items'} · demonstration catalog
            </p>
          </div>

          <ProductGrid
            products={products}
            emptyTitle={`No ${category.name} products yet`}
            emptyMessage="This demonstration collection is still being curated. Check back soon."
          />
        </div>
      </section>
    </StorefrontShell>
  );
}
