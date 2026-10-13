import React from 'react';
import { MapPin, ShieldCheck, Star } from 'lucide-react';
import { Product } from '@/types';

interface MerchantTrustCardProps {
  product: Product;
}

export function MerchantTrustCard({ product }: MerchantTrustCardProps) {
  const { seller } = product;

  return (
    <section
      aria-labelledby="merchant-heading"
      className="rounded-md border border-hairline bg-canvas-soft p-4 space-y-4"
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-hairline bg-canvas text-title-md font-bold text-ink"
        >
          {seller.name.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0">
          <h2 id="merchant-heading" className="text-title-sm font-semibold text-ink truncate">
            {seller.name}
          </h2>
          <p className="flex items-center gap-1 text-caption text-ink-muted">
            <MapPin size={12} aria-hidden="true" />
            <span className="truncate">{seller.location}</span>
          </p>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-3 text-caption">
        <div>
          <dt className="text-ink-muted">Seller rating</dt>
          <dd className="mt-0.5 inline-flex items-center gap-1 font-semibold text-ink tabular-nums">
            <Star size={12} className="fill-ink text-ink" aria-hidden="true" />
            {seller.rating} / 5
          </dd>
        </div>
        <div>
          <dt className="text-ink-muted">Membership</dt>
          <dd className="mt-0.5 font-medium text-ink-body">{seller.tenure}</dd>
        </div>
      </dl>

      <p className="flex items-start gap-2 text-caption text-ink-muted leading-relaxed border-t border-hairline-soft pt-3">
        <ShieldCheck size={14} className="mt-0.5 shrink-0 text-forest" aria-hidden="true" />
        <span>
          Demonstration merchant profile. Verification, reviews, and fulfilment
          details are placeholder content and not a real claim.
        </span>
      </p>
    </section>
  );
}
