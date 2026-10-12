import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const Hero: React.FC = () => {
  return (
    <section aria-labelledby="hero-heading" className="relative bg-canvas-soft border-b border-hairline overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-sage-light text-ink text-badge font-semibold rounded-full uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-forest"></span>
              Independent Guild Standards
            </div>

            <h1
              id="hero-heading"
              className="text-2xl sm:text-3xl lg:text-display-xl font-bold text-ink tracking-tight"
            >
              Objects shaped with patience, meant for a lifetime.
            </h1>

            <p className="text-body-sm sm:text-body-md text-ink-body max-w-xl leading-relaxed">
              Discover honest homeware, loomed organic textiles, and stoneware directly from verified craftspeople across 14 countries. Transparent provenance, zero mass production.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Link
                href="#trending"
                className="inline-flex justify-center items-center px-6 py-3 bg-forest hover:bg-forest-hover text-white text-sm font-semibold rounded-sm shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-forest"
              >
                Explore Trending Goods
              </Link>
              <Link
                href="#categories"
                className="inline-flex justify-center items-center px-5 py-3 bg-canvas border border-hairline-strong hover:border-forest text-ink text-sm font-semibold rounded-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
              >
                Browse Curated Workshops
              </Link>
            </div>

            <div className="pt-4 grid grid-cols-3 gap-6 border-t border-hairline-soft max-w-md text-caption text-ink-muted">
              <div>
                <span className="block font-bold text-ink text-title-md tabular-nums">100%</span>
                Verified Workshops
              </div>
              <div>
                <span className="block font-bold text-ink text-title-md tabular-nums">30-Day</span>
                Artisan Return Window
              </div>
              <div>
                <span className="block font-bold text-ink text-title-md">Direct</span>
                Fair Revenue to Makers
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full rounded-md overflow-hidden bg-canvas-soft border border-hairline shadow-raised">
              <Image
                src="/images/hero/hero-artisanal.jpg"
                alt="Artisanal ceramics and neutral homeware displayed in a sunlit craft workshop"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 42vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 bg-canvas/90 backdrop-blur-sm p-3.5 rounded-sm border border-hairline/60 text-caption text-ink">
                <p className="font-semibold text-title-sm">Featured Exhibition: The Textured Vessel</p>
                <p className="text-ink-muted">Stoneware ceramics by Kyoto & Copenhagen Guilds</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
