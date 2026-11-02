'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Info, Lock, ChevronLeft, ShoppingBag, Check, AlertCircle } from 'lucide-react';
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

const inputClasses =
  'w-full h-11 px-3.5 bg-canvas border border-hairline rounded-sm text-body-sm text-ink placeholder:text-ink-soft transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest';

function createCheckoutKey(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
}

interface FormState {
  name: string;
  email: string;
  city: string;
  region: string;
}

export function CheckoutView() {
  const { cart, cartCount, cartSubtotal, isHydrated, clearCart } =
    useStorefront();

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    city: '',
    region: '',
  });
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const idempotency = useRef<{ key: string; fingerprint: string } | null>(
    null,
  );

  if (!isHydrated) {
    return <CheckoutSkeleton />;
  }

  const updateField =
    (key: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setForm((previous) => ({ ...previous, [key]: value }));
      if (status === 'error') setStatus('idle');
    };

  const placeOrder = async (event: React.FormEvent) => {
    event.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    setErrorMessage('');

    try {
      const items = cart.map((item) => ({
        variantId: item.product.variantId ?? '',
        quantity: item.quantity,
      }));

      if (items.some((item) => item.variantId === '')) {
        setStatus('error');
        setErrorMessage(
          'Some items are not linked to the store catalog. Remove them and add them again.',
        );
        return;
      }

      const payload = { customer: form, items };
      const fingerprint = JSON.stringify(payload);
      const current = idempotency.current;
      const attempt =
        current?.fingerprint === fingerprint
          ? current
          : { key: createCheckoutKey(), fingerprint };
      idempotency.current = attempt;

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'idempotency-key': attempt.key,
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => null)) as
        | { error?: string; orderNumber?: string | null }
        | null;

      if (!response.ok) {
        setStatus('error');
        setErrorMessage(
          data?.error ?? 'We could not place your order. Please try again.',
        );
        return;
      }

      idempotency.current = null;
      setOrderNumber(data?.orderNumber ?? null);
      setStatus('success');
      clearCart();
    } catch {
      setStatus('error');
      setErrorMessage('We could not reach the store. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="max-w-xl">
        <div
          role="status"
          className="flex flex-col items-start gap-3 rounded-md border border-sage bg-canvas-soft p-6"
        >
          <span className="flex items-center justify-center w-11 h-11 rounded-full bg-sage-light/60 border border-sage text-forest">
            <Check size={22} aria-hidden="true" />
          </span>
          <h2 className="text-title-md font-semibold text-ink">
            Order placed
          </h2>
          <p className="text-body-sm text-ink-body leading-relaxed">
            Thank you{form.name ? `, ${form.name.split(' ')[0]}` : ''}. Your
            demo order has been recorded
            {orderNumber ? (
              <>
                {' '}
                as <span className="font-semibold text-ink">{orderNumber}</span>
              </>
            ) : null}
            . No payment was processed.
          </p>
          <p className="text-caption text-ink-muted leading-relaxed">
            You can find it in the merchant admin under Orders.
          </p>
          <Link
            href="/"
            className="mt-2 inline-flex items-center justify-center px-5 py-2.5 bg-forest hover:bg-forest-hover text-white text-sm font-semibold rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    );
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
    <form
      onSubmit={placeOrder}
      className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-8 lg:gap-10 items-start"
    >
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
            An order is recorded for the demo store, but no payment is
            processed.
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
          aria-labelledby="checkout-details-heading"
          className="rounded-md border border-hairline p-5"
        >
          <h2
            id="checkout-details-heading"
            className="text-title-md font-semibold text-ink"
          >
            Your details
          </h2>
          <p className="mt-2 text-body-sm text-ink-muted leading-relaxed">
            Collected only to record this demo order.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-caption font-semibold text-ink">Name</span>
              <input
                type="text"
                name="name"
                required
                autoComplete="name"
                value={form.name}
                onChange={updateField('name')}
                placeholder="Ada Lovelace"
                className={inputClasses}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-caption font-semibold text-ink">Email</span>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={updateField('email')}
                placeholder="ada@example.com"
                className={inputClasses}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-caption font-semibold text-ink">City</span>
              <input
                type="text"
                name="city"
                required
                autoComplete="address-level2"
                value={form.city}
                onChange={updateField('city')}
                placeholder="London"
                className={inputClasses}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-caption font-semibold text-ink">Region</span>
              <input
                type="text"
                name="region"
                required
                autoComplete="address-level1"
                value={form.region}
                onChange={updateField('region')}
                placeholder="Greater London"
                className={inputClasses}
              />
            </label>
          </div>
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
            No payment is connected. No card details are collected, stored, or
            charged. The order is recorded as pending.
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
          type="submit"
          disabled={status === 'submitting'}
          className="mt-5 w-full py-3.5 bg-forest hover:bg-forest-hover disabled:bg-forest-disabled text-white text-sm font-semibold rounded-sm transition-colors cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
        >
          <span>{status === 'submitting' ? 'Placing order…' : 'Place order'}</span>
        </button>

        {status === 'error' && (
          <p
            role="alert"
            className="mt-3 flex items-center gap-1.5 text-caption text-vermilion font-medium"
          >
            <AlertCircle size={14} className="shrink-0" aria-hidden="true" />
            <span>{errorMessage}</span>
          </p>
        )}

        <p className="mt-2 text-caption text-ink-muted text-center leading-relaxed">
          No payment is taken. A pending demo order is recorded.
        </p>

        <Link
          href="/cart"
          className="mt-4 flex items-center justify-center gap-1.5 text-body-sm font-semibold text-forest hover:text-forest-hover rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
        >
          <ChevronLeft size={15} aria-hidden="true" />
          Back to cart
        </Link>
      </OrderSummary>
    </form>
  );
}
