import type { Metadata } from 'next';
import { StorefrontShell } from '@/components/StorefrontShell';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CartView } from '@/components/CartView';

export const metadata: Metadata = {
  title: 'Your Cart | Nuvola',
  description: 'Review the artisan goods in your bag before checkout.',
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <StorefrontShell>
      <section className="bg-canvas-soft border-b border-hairline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Cart' }]}
          />
          <h1 className="mt-6 text-2xl sm:text-3xl lg:text-display-xl font-bold text-ink tracking-tight">
            Your Cart
          </h1>
        </div>
      </section>

      <section aria-label="Cart contents" className="py-10 md:py-14 bg-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CartView />
        </div>
      </section>
    </StorefrontShell>
  );
}
