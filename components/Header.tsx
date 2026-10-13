'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Heart, User, Menu, X, ArrowRight } from 'lucide-react';
import { useStorefront } from '@/context/storefront-context';
import { CATEGORIES_DATA } from '@/lib/data';

export const Header: React.FC = () => {
  const { cartCount, wishlist, setIsCartOpen } = useStorefront();
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isCatalogOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCatalogOpen(false);
    };
    const handlePointerDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsCatalogOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [isCatalogOpen]);

  const featuredLinks = [
    { label: 'Ceramics', href: '#categories' },
    { label: 'Textiles', href: '#categories' },
    { label: 'Woodwork', href: '#categories' },
    { label: 'Glassware', href: '#categories' },
    { label: 'Our Standards', href: '#editorial' },
  ];

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 bg-canvas/95 backdrop-blur-md border-b border-hairline transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setIsCatalogOpen((open) => !open)}
          className="flex items-center gap-2 px-2.5 py-2 text-ink hover:text-forest hover:bg-canvas-soft rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-forest transition-colors"
          aria-expanded={isCatalogOpen}
          aria-controls="catalog-dropdown"
          aria-haspopup="true"
          aria-label="Browse all categories"
        >
          {isCatalogOpen ? <X size={22} /> : <Menu size={22} />}
          <span className="hidden sm:inline text-title-sm font-semibold">All Categories</span>
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
              placeholder="Search jewellery, watches, handbags..."
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
            <Heart size={20} className={wishlist.length > 0 ? 'fill-terracotta text-terracotta' : ''} />
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
        aria-label="Featured categories"
        className="hidden lg:block border-t border-hairline-soft bg-canvas"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-11 flex items-center justify-center gap-8 text-xs tracking-wide uppercase font-semibold text-ink-body">
          {featuredLinks.map((link) => (
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

      {isCatalogOpen && (
        <div
          id="catalog-dropdown"
          className="absolute inset-x-0 top-full bg-canvas border-b border-hairline shadow-overlay"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="md:hidden mb-5">
              <div className="relative w-full">
                <input
                  type="search"
                  placeholder="Search the catalog..."
                  className="w-full h-10 pl-9 pr-4 bg-canvas-soft border border-hairline rounded-full text-sm text-ink placeholder:text-ink-soft focus:outline-none focus:border-forest"
                />
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
              </div>
            </div>

            <div className="flex items-baseline justify-between gap-4 mb-4">
              <h2 className="text-title-md font-bold text-ink">Shop by Category</h2>
              <span className="text-caption text-ink-muted tabular-nums">
                {CATEGORIES_DATA.length} categories
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1.5">
              {CATEGORIES_DATA.map((category) => (
                <Link
                  key={category.id}
                  href="#categories"
                  onClick={() => setIsCatalogOpen(false)}
                  className="group flex items-center justify-between gap-3 px-3 py-2.5 rounded-sm hover:bg-canvas-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-forest transition-colors"
                >
                  <span className="min-w-0">
                    <span className="block text-title-sm font-semibold text-ink group-hover:text-forest transition-colors truncate">
                      {category.name}
                    </span>
                    <span className="block text-caption text-ink-muted truncate">
                      {category.description}
                    </span>
                  </span>
                  <span className="shrink-0 flex items-center gap-2 text-caption text-ink-muted tabular-nums">
                    {category.itemCount}
                    <ArrowRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-forest"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-hairline-soft flex items-center justify-between gap-4">
              <Link
                href="#editorial"
                onClick={() => setIsCatalogOpen(false)}
                className="text-title-sm font-semibold text-forest hover:text-forest-hover underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded-sm"
              >
                Read our standards
              </Link>
              <Link
                href="#trending"
                onClick={() => setIsCatalogOpen(false)}
                className="text-caption text-ink-muted hover:text-forest transition-colors"
              >
                View trending releases
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
