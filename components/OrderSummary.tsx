import React from 'react';
import { formatPrice } from '@/lib/format';

interface OrderSummaryProps {
  itemCount: number;
  subtotal: number;
  shippingNote?: string;
  children?: React.ReactNode;
}

export function OrderSummary({
  itemCount,
  subtotal,
  shippingNote = 'Calculated by workshop',
  children,
}: OrderSummaryProps) {
  return (
    <aside
      aria-label="Order summary"
      className="lg:sticky lg:top-24 border border-hairline rounded-md bg-canvas-soft p-5 sm:p-6"
    >
      <h2 className="text-title-md font-semibold text-ink">Order summary</h2>

      <dl className="mt-4 space-y-2.5 text-body-sm">
        <div className="flex items-center justify-between">
          <dt className="text-ink-muted">Items</dt>
          <dd className="text-ink tabular-nums">{itemCount}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-ink-muted">Subtotal</dt>
          <dd className="text-ink font-semibold tabular-nums">
            {formatPrice(subtotal)}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-ink-muted">Shipping</dt>
          <dd className="text-ink-muted">{shippingNote}</dd>
        </div>
      </dl>

      <div className="mt-4 border-t border-hairline pt-4 flex items-center justify-between">
        <span className="text-body-md font-semibold text-ink">
          Estimated total
        </span>
        <span className="text-title-md font-bold text-ink tabular-nums">
          {formatPrice(subtotal)}
        </span>
      </div>

      {children}
    </aside>
  );
}
