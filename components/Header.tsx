'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react';
import { useStorefront } from '@/context/storefront-context';

export const Header: React.FC = () => {
  const { cartCount, wishlist, setIsCartOpen } = useStorefront();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { label: 'Ceramics', href: '#categories' },
    { label: 'Textiles', href: '#categories' },
    { label: 'Woodwork', href: '#categories' },
    { label: 'Glassware', href: '#categories' },
    { label: 'Our Standards', href: '#editorial' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-canvas/95 backdrop-blur-md border-b border-hairline transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-ink hover:text-forest focus:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded-sm"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link
          href="/"
          className="text-2xl tracking-tight font-bold text-ink hover:text-forest transition-colors flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-forest inline-block"></span>
          Nuvola
        </Link>

        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search wheel-thrown ceramics, linen throws..."
              className="w-full h-10.5 pl-10 pr-4 bg-canvas-soft border border-hairline rounded-full text-sm text-ink placeholder:text-ink-soft focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest transition-all"
            />
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            className="p-2.5 text-ink hover:text-forest rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-forest transition-colors"
            aria-label="Account details (demo)"
            onClick={() => alert('Account authentication is currently in demonstration mode.')}
          >
            <User size={20} />
          </button>

          <button
            type="button"
            className="relative p-2.5 text-ink hover:text-forest rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-forest transition-colors"
            aria-label={`Wishlist items (${wishlist.length})`}
            onClick={() => alert(`Saved items: ${wishlist.length} item(s) in wishlist`)}
          >
            <Heart size={20} className={wishlist.length > 0 ? "fill-terracotta text-terracotta" : ""} />
            {wishlist.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-terracotta text-white text-[10px] font-semibold rounded-full flex items-center justify-center tabular-nums">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 text-ink hover:text-forest rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-forest transition-colors"
            aria-label={`Shopping bag containing ${cartCount} items`}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4.5 h-4.5 bg-forest text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <nav
        aria-label="Category Navigation"
        className="hidden lg:block border-t border-hairline-soft bg-canvas"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-11 flex items-center justify-center gap-8 text-xs tracking-wide uppercase font-semibold text-ink-body">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="py-3 text-ink-body hover:text-forest transition-colors relative hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-sage"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-canvas border-b border-hairline px-4 pt-3 pb-6 space-y-4">
          <div className="relative w-full">
            <input
              type="search"
              placeholder="Search artisan catalog..."
              className="w-full h-10 pl-9 pr-4 bg-canvas-soft border border-hairline rounded-full text-sm text-ink placeholder:text-ink-soft focus:outline-none focus:border-forest"
            />
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
          </div>
          <div className="flex flex-col space-y-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-ink hover:bg-canvas-soft rounded-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
