'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Star, CheckCircle } from 'lucide-react';
import { Product } from '@/types';
import { useStorefront } from '@/context/storefront-context';
import { SafeImage } from './SafeImage';
import { formatPrice } from '@/lib/format';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist } = useStorefront();
  const isWishlisted = wishlist.includes(product.id);
  const productHref = `/products/${product.slug}`;

  return (
    <article className="group relative flex flex-col rounded-md overflow-hidden bg-canvas border border-hairline transition-[transform,box-shadow,border-color] duration-[250ms] ease-out hover:border-hairline-strong focus-within:border-hairline-strong hover:shadow-lift-lg focus-within:shadow-lift-lg motion-safe:hover:-translate-y-1.5 motion-safe:focus-within:-translate-y-1.5">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-canvas-soft">
        <SafeImage
          src={product.image.src}
          alt={product.image.alt}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-[250ms] ease-out motion-safe:group-hover:scale-[1.04]"
          fallbackLabel={product.title}
        />

        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.originalPrice && (
            <span className="px-2 py-0.5 bg-terracotta text-white text-badge font-bold rounded-sm tracking-wide uppercase">
              Sale ·{' '}
              <span className="tabular-nums">
                {formatPrice(product.originalPrice - product.price, product.currency)} off
              </span>
            </span>
          )}
          {product.isNew && (
            <span className="px-2 py-0.5 bg-ink text-white text-badge font-bold rounded-sm tracking-wide uppercase">
              New Batch
            </span>
          )}
          {product.craftTag && !product.isNew && !product.originalPrice && (
            <span className="px-2 py-0.5 bg-sage-light text-ink text-badge font-semibold rounded-sm">
              {product.craftTag}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-2.5 right-2.5 w-9 h-9 rounded-sm bg-canvas/80 backdrop-blur-sm border border-hairline/60 flex items-center justify-center text-ink hover:text-terracotta transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
          aria-label={
            isWishlisted
              ? `Remove ${product.title} from saved goods`
              : `Save ${product.title} to wishlist`
          }
        >
          <Heart
            size={18}
            className={isWishlisted ? 'fill-terracotta text-terracotta' : ''}
            aria-hidden="true"
          />
        </button>

        <div className="absolute inset-x-2.5 bottom-2.5 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block z-10">
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="w-full py-2.5 bg-forest hover:bg-forest-hover text-white text-xs font-semibold rounded-sm shadow-sm flex items-center justify-center gap-1.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-forest"
          >
            <ShoppingBag size={14} aria-hidden="true" />
            Quick Bag
          </button>
        </div>
      </div>

      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-2 text-caption text-ink-muted">
            <span className="truncate font-medium text-ink-body flex items-center gap-1">
              {product.seller.name}
              {product.seller.verified && (
                <CheckCircle
                  size={12}
                  className="text-forest inline shrink-0"
                  aria-label="Verified artisan"
                />
              )}
            </span>
            <span className="text-[11px] uppercase tracking-wider shrink-0">
              {product.categoryName}
            </span>
          </div>

          <h3 className="font-semibold text-title-md text-ink line-clamp-2 leading-snug group-hover:text-forest transition-colors">
            <Link
              href={productHref}
              className="rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-forest after:absolute after:inset-0 after:z-0 after:rounded-md after:content-['']"
            >
              {product.title}
            </Link>
          </h3>
        </div>

        {product.reviewCount > 0 && (
          <div className="flex items-center gap-1.5 text-caption text-ink-muted">
            <div className="flex items-center text-ink" aria-hidden="true">
              <Star size={13} className="fill-ink text-ink" />
            </div>
            <span className="font-semibold text-ink tabular-nums">{product.rating}</span>
            <span className="tabular-nums">({product.reviewCount} verified)</span>
          </div>
        )}

        <div className="pt-2 border-t border-hairline-soft flex items-end justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-price-md font-bold text-ink tabular-nums">
                {formatPrice(product.price, product.currency)}
              </span>
              {product.originalPrice && (
                <span className="text-caption text-ink-muted line-through tabular-nums">
                  {formatPrice(product.originalPrice, product.currency)}
                </span>
              )}
            </div>

            {product.stockCount <= 5 ? (
              <p className="text-caption font-medium text-amber mt-0.5">
                Only <span className="tabular-nums">{product.stockCount}</span> made in this run
              </p>
            ) : (
              <p className="text-caption text-forest font-medium mt-0.5">
                In stock · Ready to ship
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => addToCart(product)}
            className="relative z-10 sm:hidden p-2 bg-canvas-soft border border-hairline hover:border-forest text-ink rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
            aria-label={`Add ${product.title} to shopping bag`}
          >
            <ShoppingBag size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
};
