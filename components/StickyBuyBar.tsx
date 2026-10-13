'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Product } from '@/types';
import { useStorefront } from '@/context/storefront-context';
import { formatPrice } from '@/lib/format';

interface StickyBuyBarProps {
  product: Product;
}

export function StickyBuyBar({ product }: StickyBuyBarProps) {
  const { addToCart } = useStorefront();

  return (
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-30 border-t border-hairline bg-canvas/95 backdrop-blur-md px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex items-center gap-3">
      <div className="min-w-0">
        <p className="text-caption text-ink-muted truncate">{product.title}</p>
        <p className="text-price-md font-bold text-ink tabular-nums">
          {formatPrice(product.price, product.currency)}
        </p>
      </div>
      <button
        type="button"
        onClick={() => addToCart(product)}
        className="ml-auto inline-flex items-center justify-center gap-2 h-11 px-5 bg-forest hover:bg-forest-hover text-white text-sm font-semibold rounded-sm shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-forest"
      >
        <ShoppingBag size={16} aria-hidden="true" />
        Add to Bag
      </button>
    </div>
  );
}
