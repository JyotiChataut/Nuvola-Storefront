'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Heart,
  ShoppingBag,
  Star,
  Check,
  Minus,
  Plus,
} from 'lucide-react';
import { Product } from '@/types';
import { useStorefront } from '@/context/storefront-context';
import { formatPrice } from '@/lib/format';

interface ProductPurchasePanelProps {
  product: Product;
}

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const { addToCart, toggleWishlist, wishlist } = useStorefront();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const isWishlisted = wishlist.includes(product.id);

  const decrease = () => setQuantity((q) => Math.max(1, q - 1));
  const increase = () => setQuantity((q) => Math.min(10, q + 1));

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Link
          href={`/categories/${product.categorySlug}`}
          className="inline-block text-badge font-semibold uppercase tracking-wider text-forest hover:text-forest-hover rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
        >
          {product.categoryName}
        </Link>

        <h1
          id="product-heading"
          className="text-2xl sm:text-3xl lg:text-display-lg font-bold text-ink tracking-tight"
        >
          {product.title}
        </h1>

        <p className="text-caption text-ink-muted">
          Demonstration listing · {product.seller.name}, {product.seller.location}
        </p>
      </div>

      {product.reviewCount > 0 ? (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-body-sm text-ink-body">
          <span className="inline-flex items-center gap-1 text-ink">
            <Star size={15} className="fill-ink text-ink" aria-hidden="true" />
            <span className="font-semibold tabular-nums">{product.rating}</span>
          </span>
          <span className="text-ink-muted">
            {product.reviewCount} verified reviews
          </span>
        </div>
      ) : (
        <p className="text-body-sm text-ink-muted">No reviews yet.</p>
      )}

      <div className="border-t border-hairline-soft pt-5">
        <div className="flex items-baseline gap-3">
          <span className="text-price-lg font-bold text-ink tabular-nums">
            {formatPrice(product.price, product.currency)}
          </span>
          {product.originalPrice && (
            <span className="text-body-sm text-ink-muted line-through tabular-nums">
              {formatPrice(product.originalPrice, product.currency)}
            </span>
          )}
        </div>
        {product.stockCount <= 5 ? (
          <p className="mt-1 text-caption font-medium text-amber">
            Only <span className="tabular-nums">{product.stockCount}</span> made in this run
          </p>
        ) : (
          <p className="mt-1 text-caption font-medium text-forest">
            In stock · Ready to ship
          </p>
        )}
      </div>

      <p className="text-body-sm text-ink-body leading-relaxed">
        {product.description}
      </p>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-hairline bg-canvas rounded-sm">
            <button
              type="button"
              onClick={decrease}
              disabled={quantity <= 1}
              className="flex h-11 w-11 items-center justify-center text-ink hover:bg-canvas-soft disabled:opacity-40 disabled:hover:bg-transparent rounded-l-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
              aria-label="Decrease quantity"
            >
              <Minus size={16} aria-hidden="true" />
            </button>
            <span
              className="flex h-11 w-10 items-center justify-center text-body-md font-semibold tabular-nums"
              aria-live="polite"
            >
              {quantity}
            </span>
            <button
              type="button"
              onClick={increase}
              disabled={quantity >= 10}
              className="flex h-11 w-11 items-center justify-center text-ink hover:bg-canvas-soft disabled:opacity-40 disabled:hover:bg-transparent rounded-r-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
              aria-label="Increase quantity"
            >
              <Plus size={16} aria-hidden="true" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 inline-flex items-center justify-center gap-2 h-11 px-6 bg-forest hover:bg-forest-hover text-white text-sm font-semibold rounded-sm shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-forest"
          >
            {justAdded ? (
              <>
                <Check size={16} aria-hidden="true" />
                Added
              </>
            ) : (
              <>
                <ShoppingBag size={16} aria-hidden="true" />
                Add to Bag
              </>
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={isWishlisted}
          className="inline-flex items-center justify-center gap-2 w-full h-11 px-6 bg-canvas border border-hairline-strong hover:border-forest text-ink text-sm font-semibold rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
        >
          <Heart
            size={16}
            className={isWishlisted ? 'fill-terracotta text-terracotta' : ''}
            aria-hidden="true"
          />
          {isWishlisted ? 'Saved to wishlist' : 'Save to wishlist'}
        </button>
      </div>
    </div>
  );
}
