import React from 'react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface TrendingProductsProps {
  products: Product[];
}

export const TrendingProducts: React.FC<TrendingProductsProps> = ({ products }) => {
  return (
    <section id="trending" aria-labelledby="trending-heading" className="py-14 md:py-20 bg-canvas-soft border-y border-hairline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-badge font-semibold tracking-wider uppercase text-forest">Small Batch</span>
            <h2 id="trending-heading" className="text-xl sm:text-2xl lg:text-display-lg font-bold text-ink mt-1">
              Trending Workshop Releases
            </h2>
          </div>
          <p className="text-body-sm text-ink-muted max-w-md">
            Recent kiln openings, loom completions, and hand-carved tableware from guild members worldwide.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
