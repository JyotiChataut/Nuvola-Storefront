'use client';

import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useStorefront } from '@/context/storefront-context';
import { ProductGrid } from './ProductGrid';
import type { Product } from '@/types';

function WishlistSkeleton() {
  return (
    <ul
      role="list"
      aria-hidden="true"
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
    >
      {[0, 1, 2, 3].map((index) => (
        <li
          key={index}
          className="rounded-md overflow-hidden border border-hairline bg-canvas motion-safe:animate-pulse"
        >
          <div className="aspect-[4/5] w-full bg-canvas-soft" />
          <div className="p-4 space-y-3">
            <div className="h-3 w-1/2 bg-canvas-soft rounded-full" />
            <div className="h-4 w-3/4 bg-canvas-soft rounded-full" />
            <div className="h-4 w-1/3 bg-canvas-soft rounded-full" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function WishlistView({ products }: { products: Product[] }) {
  const { wishlist, isHydrated } = useStorefront();

  if (!isHydrated) {
    return <WishlistSkeleton />;
  }

  const saved = products.filter((product) => wishlist.includes(product.id));

  if (saved.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-2 px-6 py-20 border border-dashed border-hairline rounded-md bg-canvas-soft">
        <span className="flex items-center justify-center w-12 h-12 rounded-full bg-canvas border border-hairline text-ink-muted">
          <Heart size={24} aria-hidden="true" />
        </span>
        <p className="mt-1 text-title-md font-semibold text-ink">
          No saved items yet
        </p>
        <p className="text-body-sm text-ink-muted max-w-sm">
          Tap the heart on any product to keep it here for later.
        </p>
        <Link
          href="/"
          className="mt-3 inline-flex items-center justify-center px-5 py-2.5 bg-forest hover:bg-forest-hover text-white text-sm font-semibold rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
        >
          Browse the catalog
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p className="text-caption text-ink-muted mb-5 tabular-nums">
        {saved.length} {saved.length === 1 ? 'saved item' : 'saved items'}
      </p>
      <ProductGrid products={saved} />
      <div className="mt-10 text-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-5 py-2.5 bg-canvas border border-hairline-strong hover:border-forest text-ink text-sm font-semibold rounded-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
