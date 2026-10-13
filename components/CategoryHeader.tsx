import React from 'react';
import { Category } from '@/types';
import { Breadcrumbs } from './Breadcrumbs';
import { SafeImage } from './SafeImage';

interface CategoryHeaderProps {
  category: Category;
  productCount: number;
}

export function CategoryHeader({ category, productCount }: CategoryHeaderProps) {
  return (
    <section
      aria-labelledby="category-heading"
      className="bg-canvas-soft border-b border-hairline"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Breadcrumbs
          items={[{ label: 'Home', href: '/' }, { label: category.name }]}
        />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-sage-light text-ink text-badge font-semibold rounded-full uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-forest" aria-hidden="true" />
                Category
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-canvas-strong text-ink-body text-badge font-semibold rounded-full uppercase">
                Demo catalog
              </span>
            </div>

            <h1
              id="category-heading"
              className="text-2xl sm:text-3xl lg:text-display-xl font-bold text-ink tracking-tight"
            >
              {category.name}
            </h1>

            <p className="text-body-sm sm:text-body-md text-ink-body max-w-xl leading-relaxed">
              {category.description}
            </p>

            <p className="text-caption text-ink-muted tabular-nums">
              {productCount} {productCount === 1 ? 'product' : 'products'} in this collection
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] w-full rounded-md overflow-hidden bg-canvas-soft border border-hairline shadow-raised">
              <SafeImage
                src={category.image.src}
                alt={category.image.alt}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
                priority
                fallbackLabel={category.name}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
