import type { Metadata } from 'next';
import { StorefrontShell } from '@/components/StorefrontShell';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CheckoutView } from '@/components/CheckoutView';

export const metadata: Metadata = {
  title: 'Checkout | Nuvola',
  description: 'Demonstration checkout. No payment is processed.',
  robots: { index: false, follow: true },
};

export default function CheckoutPage() {
  return (
    <StorefrontShell>
      <section className="bg-canvas-soft border-b border-hairline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Cart', href: '/cart' },
              { label: 'Checkout' },
            ]}
          />
          <h1 className="mt-6 text-2xl sm:text-3xl lg:text-display-xl font-bold text-ink tracking-tight">
            Checkout
          </h1>
        </div>
      </section>

      <section aria-label="Checkout" className="py-10 md:py-14 bg-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CheckoutView />
        </div>
      </section>
    </StorefrontShell>
  );
}
