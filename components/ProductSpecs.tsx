import React from 'react';
import { Product } from '@/types';

interface ProductSpecsProps {
  product: Product;
}

export function ProductSpecs({ product }: ProductSpecsProps) {
  const rows: Array<[string, string]> = [
    ['Category', product.categoryName],
    ['Artisan', product.seller.name],
    ['Origin', product.seller.location],
  ];

  if (product.craftTag) {
    rows.push(['Finish', product.craftTag]);
  }

  rows.push(['Edition size', `${product.stockCount} units (demo)`]);
  rows.push(['Product ID', product.id]);

  return (
    <section
      aria-labelledby="product-specs-heading"
      className="rounded-md border border-hairline p-4 space-y-3"
    >
      <h2
        id="product-specs-heading"
        className="text-badge font-semibold uppercase tracking-wider text-ink-muted"
      >
        Demonstration details
      </h2>
      <dl className="divide-y divide-hairline-soft text-body-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-start justify-between gap-4 py-2.5">
            <dt className="text-ink-muted">{label}</dt>
            <dd className="text-right font-medium text-ink-body break-words">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
