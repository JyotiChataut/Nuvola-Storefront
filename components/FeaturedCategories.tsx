import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Category } from '@/types';

interface FeaturedCategoriesProps {
  categories: Category[];
}

export const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({ categories }) => {
  return (
    <section id="categories" aria-labelledby="categories-heading" className="py-14 md:py-20 bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-badge font-semibold tracking-wider uppercase text-forest">Disciplines</span>
            <h2 id="categories-heading" className="text-xl sm:text-2xl lg:text-display-lg font-bold text-ink mt-1">
              Curated Craft Disciplines
            </h2>
          </div>
          <p className="text-body-sm text-ink-muted max-w-md">
            Explore dedicated catalog sections categorized by natural raw materials and master artisan traditions.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group relative flex flex-col rounded-md overflow-hidden bg-canvas-soft border border-hairline hover:border-sage transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-canvas-soft">
                <Image
                  src={cat.image.src}
                  alt={cat.image.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 280px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-ink/10 group-hover:bg-ink/0 transition-colors" />
              </div>
              <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-title-sm sm:text-title-md text-ink group-hover:text-forest transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-caption text-ink-muted line-clamp-1 mt-0.5">{cat.description}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-hairline-soft flex items-center justify-between text-caption text-ink-body">
                  <span className="tabular-nums font-medium">{cat.itemCount} Goods</span>
                  <span className="text-forest font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    View &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
