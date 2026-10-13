'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useStorefront } from '@/context/storefront-context';
import { formatPrice } from '@/lib/format';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateQuantity, cartSubtotal } = useStorefront();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Shopping Bag">
      <div
        className="fixed inset-0 bg-ink/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          ref={drawerRef}
          className="w-screen max-w-md bg-canvas border-l border-hairline shadow-overlay flex flex-col justify-between"
        >
          <div className="p-4 sm:p-6 border-b border-hairline flex items-center justify-between">
            <div>
              <h2 className="text-display-md font-bold text-ink">Your Shopping Bag</h2>
              <p className="text-caption text-ink-muted">
                {cart.length === 0 ? '0 items' : (<><span className="tabular-nums">{cart.reduce((t, i) => t + i.quantity, 0)}</span> item(s) selected</>)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-ink-muted hover:text-ink rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
              aria-label="Close cart drawer"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-canvas-soft border border-hairline flex items-center justify-center text-ink-muted">
                  <ShieldCheck size={28} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-ink">Your bag is empty</h3>
                  <p className="text-xs text-ink-muted max-w-xs">
                    Items added from workshops will appear here with transparent shipping estimates.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 bg-forest hover:bg-forest-hover text-white text-xs font-semibold rounded-sm transition-colors"
                >
                  Explore Trending Goods
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-canvas-soft border border-hairline rounded-sm items-center"
                >
                  <div className="relative w-16 h-20 bg-canvas rounded-sm overflow-hidden shrink-0 border border-hairline-soft">
                    <Image
                      src={item.product.image.src}
                      alt={item.product.image.alt}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="text-[11px] text-ink-muted truncate">{item.product.seller.name}</p>
                    <h4 className="text-xs sm:text-sm font-semibold text-ink truncate">
                      {item.product.title}
                    </h4>
                    <p className="text-xs font-bold text-ink tabular-nums">
                      {formatPrice(item.product.price, item.product.currency)}
                    </p>

                    <div className="flex items-center gap-3 pt-1">
                      <div className="flex items-center border border-hairline bg-canvas rounded-sm text-xs">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-ink hover:bg-canvas-soft"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2 font-medium tabular-nums">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-ink hover:bg-canvas-soft"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-ink-muted hover:text-vermilion transition-colors p-1"
                        aria-label={`Remove ${item.product.title}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-hairline bg-canvas-soft space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-muted">Subtotal</span>
                <span className="font-bold text-ink text-base tabular-nums">
                  {formatPrice(cartSubtotal)}
                </span>
              </div>
              <p className="text-[11px] text-ink-muted leading-relaxed">
                Taxes and calculated workshop shipping finalized in checkout. Direct artisan support guaranteed.
              </p>
              <button
                type="button"
                onClick={() => alert('Checkout flow will be implemented in subsequent phase (demonstration).')}
                className="w-full py-3.5 bg-forest hover:bg-forest-hover text-white text-sm font-semibold rounded-sm shadow-sm flex items-center justify-center gap-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
