import type { Metadata } from 'next';
import { getAllProducts } from '@/lib/data';
import { StorefrontShell } from '@/components/StorefrontShell';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { WishlistView } from '@/components/WishlistView';

export const metadata: Metadata = {
  title: 'Saved Items | Nuvola',
  description: 'Products you have saved from independent workshops.',
  robots: { index: false, follow: true },
};

export default async function WishlistPage() {
  const products = await getAllProducts();

  return (
    <StorefrontShell>
      <section className="bg-canvas-soft border-b border-hairline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Saved Items' }]}
          />
          <h1 className="mt-6 text-2xl sm:text-3xl lg:text-display-xl font-bold text-ink tracking-tight">
            Saved Items
          </h1>
        </div>
      </section>

      <section aria-label="Saved items" className="py-10 md:py-14 bg-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WishlistView products={products} />
        </div>
      </section>
    </StorefrontShell>
  );
}
