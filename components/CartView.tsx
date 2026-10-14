'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { useStorefront } from '@/context/storefront-context';
import { formatPrice } from '@/lib/format';
import { OrderSummary } from './OrderSummary';
import type { CartItem } from '@/types';

function CartLine({ item }: { item: CartItem }) {
  const { removeFromCart, updateQuantity } = useStorefront();
  const lineTotal = item.product.price * item.quantity;

  return (
    <li className="py-5 flex gap-4 sm:gap-6">
      <Link
        href={`/products/${item.product.slug}`}
        className="relative w-20 h-24 sm:w-24 sm:h-28 shrink-0 bg-canvas-soft rounded-sm overflow-hidden border border-hairline-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
      >
        <Image
          src={item.product.image.src}
          alt={item.product.image.alt}
          fill
          sizes="96px"
          className="object-cover"
        />
      </Link>

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-caption text-ink-muted truncate">
              {item.product.seller.name}
            </p>
            <h3 className="text-title-sm font-semibold text-ink">
              <Link
                href={`/products/${item.product.slug}`}
                className="rounded-sm hover:text-forest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
              >
                {item.product.title}
              </Link>
            </h3>
            <p className="mt-1 text-caption text-ink-muted tabular-nums">
              {formatPrice(item.product.price, item.product.currency)} each
            </p>
          </div>

          <button
            type="button"
            onClick={() => removeFromCart(item.product.id)}
            aria-label={`Remove ${item.product.title} from cart`}
            className="shrink-0 p-2 text-ink-muted hover:text-vermilion rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
          >
            <Trash2 size={16} aria-hidden="true" />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center border border-hairline bg-canvas rounded-sm text-sm">
            <button
              type="button"
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              aria-label={`Decrease quantity of ${item.product.title}`}
              className="px-3 py-2 text-ink hover:bg-canvas-soft rounded-l-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
            >
              <Minus size={14} aria-hidden="true" />
            </button>
            <span
              className="px-3 font-medium tabular-nums min-w-8 text-center"
              aria-live="polite"
            >
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              aria-label={`Increase quantity of ${item.product.title}`}
              className="px-3 py-2 text-ink hover:bg-canvas-soft rounded-r-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
            >
              <Plus size={14} aria-hidden="true" />
            </button>
          </div>

          <p className="text-body-md font-bold text-ink tabular-nums">
            {formatPrice(lineTotal, item.product.currency)}
          </p>
        </div>
      </div>
    </li>
  );
}

function CartSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-8 lg:gap-10 items-start"
    >
      <ul role="list" className="divide-y divide-hairline border-y border-hairline">
        {[0, 1].map((index) => (
          <li key={index} className="py-5 flex gap-4 motion-safe:animate-pulse">
            <div className="w-20 h-24 sm:w-24 sm:h-28 shrink-0 bg-canvas-soft rounded-sm border border-hairline-soft" />
            <div className="flex-1 space-y-3">
              <div className="h-3 w-24 bg-canvas-soft rounded-full" />
              <div className="h-4 w-3/4 bg-canvas-soft rounded-full" />
              <div className="h-3 w-16 bg-canvas-soft rounded-full" />
            </div>
          </li>
        ))}
      </ul>
      <div className="h-56 bg-canvas-soft rounded-md border border-hairline motion-safe:animate-pulse" />
    </div>
  );
}

export function CartView() {
  const { cart, cartCount, cartSubtotal, isHydrated } = useStorefront();

  if (!isHydrated) {
    return <CartSkeleton />;
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-2 px-6 py-20 border border-dashed border-hairline rounded-md bg-canvas-soft">
        <span className="flex items-center justify-center w-12 h-12 rounded-full bg-canvas border border-hairline text-ink-muted">
          <ShieldCheck size={24} aria-hidden="true" />
        </span>
        <p className="mt-1 text-title-md font-semibold text-ink">
          Your cart is empty
        </p>
        <p className="text-body-sm text-ink-muted max-w-sm">
          Items added from independent workshops will appear here with
          transparent shipping estimates.
        </p>
        <Link
          href="/"
          className="mt-3 inline-flex items-center justify-center px-5 py-2.5 bg-forest hover:bg-forest-hover text-white text-sm font-semibold rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
        >
          Explore the catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-8 lg:gap-10 items-start">
      <div>
        <p className="text-caption text-ink-muted mb-3 tabular-nums">
          {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
        </p>
        <ul role="list" className="divide-y divide-hairline border-y border-hairline">
          {cart.map((item) => (
            <CartLine key={item.product.id} item={item} />
          ))}
        </ul>
      </div>

      <OrderSummary
        itemCount={cartCount}
        subtotal={cartSubtotal}
        shippingNote="Calculated at checkout"
      >
        <Link
          href="/checkout"
          className="mt-5 w-full py-3.5 bg-forest hover:bg-forest-hover text-white text-sm font-semibold rounded-sm flex items-center justify-center gap-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
        >
          <span>Proceed to checkout</span>
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <p className="mt-2 text-caption text-ink-muted text-center leading-relaxed">
          Continue to a demonstration checkout. No payment is processed.
        </p>

        <Link
          href="/"
          className="mt-4 block text-center text-body-sm font-semibold text-forest hover:text-forest-hover rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
        >
          Continue shopping
        </Link>

        <p className="mt-5 pt-4 border-t border-hairline flex items-start gap-2 text-caption text-ink-muted leading-relaxed">
          <Truck size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
          Carbon-neutral delivery on artisan orders over $75.
        </p>
      </OrderSummary>
    </div>
  );
}
