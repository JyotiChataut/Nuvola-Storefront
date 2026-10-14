'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Info, Lock, ChevronLeft, ShoppingBag } from 'lucide-react';
import { useStorefront } from '@/context/storefront-context';
import { OrderSummary } from './OrderSummary';
import { formatPrice } from '@/lib/format';
import type { CartItem } from '@/types';

function ReviewLine({ item }: { item: CartItem }) {
  return (
    <li className="py-3.5 flex items-center gap-4">
      <span className="relative w-14 h-16 shrink-0 bg-canvas-soft rounded-sm overflow-hidden border border-hairline-soft">
        <Image
          src={item.product.image.src}
          alt={item.product.image.alt}
          fill
          sizes="56px"
          className="object-cover"
        />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-body-sm font-semibold text-ink truncate">
          {item.product.title}
        </span>
        <span className="block mt-0.5 text-caption text-ink-muted tabular-nums">
          Qty {item.quantity} ·{' '}
          {formatPrice(item.product.price, item.product.currency)} each
        </span>
      </span>
      <span className="text-body-sm font-semibold text-ink tabular-nums">
        {formatPrice(
          item.product.price * item.quantity,
          item.product.currency,
        )}
      </span>
    </li>
  );
}

function CheckoutSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-8 lg:gap-10 items-start"
    >
      <div className="space-y-6">
        <div className="h-16 rounded-md border border-hairline bg-canvas-soft motion-safe:animate-pulse" />
        <div className="h-40 rounded-md border border-hairline bg-canvas-soft motion-safe:animate-pulse" />
        <div className="h-28 rounded-md border border-hairline bg-canvas-soft motion-safe:animate-pulse" />
      </div>
      <div className="h-64 rounded-md border border-hairline bg-canvas-soft motion-safe:animate-pulse" />
    </div>
  );
}

export function CheckoutView() {
  const { cart, cartCount, cartSubtotal, isHydrated } = useStorefront();

  if (!isHydrated) {
    return <CheckoutSkeleton />;
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-2 px-6 py-20 border border-dashed border-hairline rounded-md bg-canvas-soft">
        <span className="flex items-center justify-center w-12 h-12 rounded-full bg-canvas border border-hairline text-ink-muted">
          <ShoppingBag size={24} aria-hidden="true" />
        </span>
        <p className="mt-1 text-title-md font-semibold text-ink">
          Your cart is empty
        </p>
        <p className="text-body-sm text-ink-muted max-w-sm">
          Add items to your cart before checking out.
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
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-8 lg:gap-10 items-start">
      <div className="space-y-6">
        <p
          role="note"
          className="flex items-start gap-3 rounded-md border border-amber/40 bg-canvas-soft p-4 text-body-sm text-ink-body leading-relaxed"
        >
          <Info size={18} className="mt-0.5 shrink-0 text-amber" aria-hidden="true" />
          <span>
            <span className="font-semibold text-ink">
              Demonstration checkout.
            </span>{' '}
            No order is placed and no payment is processed.
          </span>
        </p>

        <section aria-labelledby="checkout-items-heading">
          <div className="flex items-baseline justify-between gap-3">
            <h2
              id="checkout-items-heading"
              className="text-title-md font-semibold text-ink"
            >
              Review items
            </h2>
            <Link
              href="/cart"
              className="text-body-sm font-semibold text-forest hover:text-forest-hover rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
            >
              Edit cart
            </Link>
          </div>
          <ul
            role="list"
            className="mt-3 divide-y divide-hairline border-y border-hairline"
          >
            {cart.map((item) => (
              <ReviewLine key={item.product.id} item={item} />
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="checkout-delivery-heading"
          className="rounded-md border border-hairline p-5"
        >
          <h2
            id="checkout-delivery-heading"
            className="text-title-md font-semibold text-ink"
          >
            Delivery
          </h2>
          <p className="mt-2 text-body-sm text-ink-muted leading-relaxed">
            Delivery address and per-workshop shipping rates are not collected in
            this demonstration. The live checkout will collect and price them
            here.
          </p>
        </section>

        <section
          aria-labelledby="checkout-payment-heading"
          className="rounded-md border border-hairline p-5"
        >
          <h2
            id="checkout-payment-heading"
            className="text-title-md font-semibold text-ink"
          >
            Payment
          </h2>
          <p className="mt-2 text-body-sm text-ink-muted leading-relaxed">
            Payment is not connected. No card details are collected, stored, or
            charged.
          </p>
          <p className="mt-3 flex items-center gap-2 text-caption text-ink-muted">
            <Lock size={14} aria-hidden="true" />
            Card, wallet, and bank transfer options arrive with the live
            integration.
          </p>
        </section>
      </div>

      <OrderSummary
        itemCount={cartCount}
        subtotal={cartSubtotal}
        shippingNote="Not collected in this demo"
      >
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="mt-5 w-full py-3.5 bg-forest-disabled text-white text-sm font-semibold rounded-sm cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span>Place order</span>
        </button>
        <p className="mt-2 text-caption text-ink-muted text-center leading-relaxed">
          Order placement is disabled in this demonstration.
        </p>

        <Link
          href="/cart"
          className="mt-4 flex items-center justify-center gap-1.5 text-body-sm font-semibold text-forest hover:text-forest-hover rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
        >
          <ChevronLeft size={15} aria-hidden="true" />
          Back to cart
        </Link>
      </OrderSummary>
    </div>
  );
}
