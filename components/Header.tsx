'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Heart, User, Menu, X, ArrowRight } from 'lucide-react';
import { useStorefront } from '@/context/storefront-context';
import { Category } from '@/types';
import { HeaderSearch } from './HeaderSearch';

interface HeaderProps {
  categories: Category[];
}

const VISIBLE_CATEGORY_LIMIT = 10;

const NAV_ITEM =
  'flex h-11 items-center rounded-sm px-1.5 -mx-1.5 text-[11px] xl:text-caption transition-[transform,color,background-color,box-shadow] duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-forest hover:bg-canvas-soft focus-visible:bg-canvas-soft hover:shadow-lift focus-visible:shadow-lift motion-safe:hover:-translate-y-0.5 motion-safe:focus-visible:-translate-y-0.5';

export const Header: React.FC<HeaderProps> = ({ categories }) => {
  const { cartCount, wishlist, setIsCartOpen } = useStorefront();
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setIsCatalogOpen(false);
  }, [pathname]);

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

  const homeHash = (hash: string) => (pathname === '/' ? hash : `/${hash}`);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 bg-canvas/95 backdrop-blur-md border-b border-hairline transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-[72px] flex items-center gap-2 sm:gap-4 lg:gap-6">
        <div className="flex items-center gap-1 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsCatalogOpen((open) => !open)}
            className="flex items-center gap-2 px-2.5 h-10 text-ink hover:text-forest hover:bg-canvas-soft rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-forest transition-colors lg:hidden"
            aria-expanded={isCatalogOpen}
            aria-controls="catalog-dropdown"
            aria-haspopup="true"
            aria-label="Browse all categories"
          >
            {isCatalogOpen ? (
              <X size={22} aria-hidden="true" />
            ) : (
              <Menu size={22} aria-hidden="true" />
            )}
            <span className="hidden sm:inline text-title-sm font-semibold whitespace-nowrap">
              All Categories
            </span>
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 text-xl sm:text-2xl tracking-tight font-bold text-ink hover:text-forest transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-forest inline-block" aria-hidden="true" />
            Nuvola
          </Link>
        </div>

        <div className="hidden md:flex flex-1 min-w-0 justify-center">
          <HeaderSearch
            className="max-w-md"
            placeholder="Search jewellery, watches, handbags..."
            inputClassName="w-full h-10 pl-10 pr-4 bg-canvas-soft border border-hairline rounded-full text-sm text-ink placeholder:text-ink-soft focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest transition-all"
          />
        </div>

        <div className="flex items-center gap-0.5 sm:gap-1 shrink-0 ml-auto md:ml-0">
          <button
            type="button"
            className="p-2.5 text-ink hover:text-forest rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-forest transition-colors"
            aria-label="Account details (demo)"
            onClick={() =>
              alert('Account authentication is currently in demonstration mode.')
            }
          >
            <User size={20} aria-hidden="true" />
          </button>

          <Link
            href="/wishlist"
            className="relative p-2.5 text-ink hover:text-forest rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-forest transition-colors"
            aria-label={`Wishlist, ${wishlist.length} saved item${wishlist.length === 1 ? '' : 's'}`}
          >
            <Heart
              size={20}
              className={wishlist.length > 0 ? 'fill-terracotta text-terracotta' : ''}
              aria-hidden="true"
            />
            {wishlist.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-terracotta text-white text-[10px] font-semibold rounded-full flex items-center justify-center tabular-nums">
                {wishlist.length}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 text-ink hover:text-forest rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-forest transition-colors"
            aria-label={`Shopping bag containing ${cartCount} items`}
          >
            <ShoppingBag size={20} aria-hidden="true" />
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4.5 h-4.5 bg-forest text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <nav
        aria-label="Product categories"
        className="hidden lg:block border-t border-hairline-soft bg-canvas"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="no-scrollbar overflow-x-auto">
            <ul className="flex w-max min-w-full items-center gap-x-2.5 xl:gap-x-5 h-11 whitespace-nowrap">
              <li className="shrink-0">
                <button
                  type="button"
                  onClick={() => setIsCatalogOpen((open) => !open)}
                  aria-expanded={isCatalogOpen}
                  aria-controls="catalog-dropdown"
                  aria-haspopup="true"
                  aria-label="Browse all categories"
                  className={`${NAV_ITEM} gap-2 border-b-2 border-transparent font-semibold text-ink hover:text-forest`}
                >
                  {isCatalogOpen ? (
                    <X size={16} aria-hidden="true" />
                  ) : (
                    <Menu size={16} aria-hidden="true" />
                  )}
                  All Categories
                </button>
              </li>
              <li aria-hidden="true" className="h-4 w-px bg-hairline shrink-0" />
              {categories.slice(0, VISIBLE_CATEGORY_LIMIT).map((category) => {
                const href = `/categories/${category.slug}`;
                const isActive = pathname === href;
                return (
                  <li key={category.id} className="shrink-0">
                    <Link
                      href={href}
                      aria-current={isActive ? 'page' : undefined}
                      className={`${NAV_ITEM} border-b-2 font-medium ${
                        isActive
                          ? 'border-sage text-ink'
                          : 'border-transparent text-ink-body hover:text-forest'
                      }`}
                    >
                      {category.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>

      {isCatalogOpen && (
        <div
          id="catalog-dropdown"
          className="absolute inset-x-0 top-full max-h-[calc(100vh-4rem)] overflow-y-auto bg-canvas border-b border-hairline shadow-overlay"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="md:hidden mb-5">
              <HeaderSearch
                inputClassName="w-full h-10 pl-9 pr-4 bg-canvas-soft border border-hairline rounded-full text-sm text-ink placeholder:text-ink-soft focus:outline-none focus:border-forest"
                iconSize={16}
                onNavigate={() => setIsCatalogOpen(false)}
              />
            </div>

            <div className="flex items-baseline justify-between gap-4 mb-4">
              <h2 className="text-title-md font-bold text-ink">Shop by Category</h2>
              <span className="text-caption text-ink-muted tabular-nums">
                {categories.length} categories
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1.5">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  onClick={() => setIsCatalogOpen(false)}
                  className="group flex items-center justify-between gap-3 px-3 py-3 rounded-sm hover:bg-canvas-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-forest transition-colors"
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
                href={homeHash('#editorial')}
                onClick={() => setIsCatalogOpen(false)}
                className="text-title-sm font-semibold text-forest hover:text-forest-hover underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded-sm"
              >
                Read our standards
              </Link>
              <Link
                href={homeHash('#trending')}
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
