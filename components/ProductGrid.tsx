import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  emptyTitle?: string;
  emptyMessage?: string;
  emptyActionHref?: string;
  emptyActionLabel?: string;
}

export function ProductGrid({
  products,
  emptyTitle = 'No products to show',
  emptyMessage = 'There are no products in this collection yet.',
  emptyActionHref = '/',
  emptyActionLabel = 'Back to storefront',
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-2 px-6 py-16 border border-dashed border-hairline rounded-md bg-canvas-soft">
        <p className="text-title-md font-semibold text-ink">{emptyTitle}</p>
        <p className="text-body-sm text-ink-muted max-w-sm">{emptyMessage}</p>
        <Link
          href={emptyActionHref}
          className="mt-3 inline-flex items-center justify-center px-5 py-2.5 bg-canvas border border-hairline-strong hover:border-forest text-ink text-sm font-semibold rounded-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
        >
          {emptyActionLabel}
        </Link>
      </div>
    );
  }

  return (
    <ul
      role="list"
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
    >
      {products.map((product) => (
        <li key={product.id} className="flex">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
