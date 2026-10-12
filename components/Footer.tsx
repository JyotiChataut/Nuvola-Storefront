import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-canvas border-t border-hairline py-16 text-xs text-ink-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Mission Column */}
          <div className="col-span-2 space-y-3">
            <Link href="/" className="text-xl font-bold text-ink flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-forest inline-block"></span>
              Nuvola
            </Link>
            <p className="max-w-sm text-ink-body leading-relaxed">
              A curated marketplace engineered for authentic provenance, fair maker margins, and calm human discovery.
            </p>
            <p className="text-[11px] text-ink-muted">
              Operating under the Guild Charter for Independent Makers.
            </p>
          </div>

          {/* Catalog Columns */}
          <div className="space-y-2">
            <h4 className="font-semibold text-ink text-xs uppercase tracking-wider">Catalog</h4>
            <ul className="space-y-1.5">
              <li><Link href="#categories" className="hover:text-forest transition-colors">Ceramics & Vases</Link></li>
              <li><Link href="#categories" className="hover:text-forest transition-colors">Loomed Linens</Link></li>
              <li><Link href="#categories" className="hover:text-forest transition-colors">Turned Wood</Link></li>
              <li><Link href="#categories" className="hover:text-forest transition-colors">Mouthblown Glass</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-ink text-xs uppercase tracking-wider">Makers</h4>
            <ul className="space-y-1.5">
              <li><Link href="#editorial" className="hover:text-forest transition-colors">Workshop Directory</Link></li>
              <li><Link href="#editorial" className="hover:text-forest transition-colors">Seller Code of Ethics</Link></li>
              <li><Link href="#editorial" className="hover:text-forest transition-colors">Apply as Artisan</Link></li>
              <li><Link href="#editorial" className="hover:text-forest transition-colors">Fair Share Index</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-ink text-xs uppercase tracking-wider">Assurance</h4>
            <ul className="space-y-1.5">
              <li><span className="text-ink-body">30-Day Return Guarantee</span></li>
              <li><span className="text-ink-body">Carbon Neutral Shipping</span></li>
              <li><span className="text-ink-body">Material Traceability</span></li>
              <li><span className="text-ink-body">Secure Escrow Payments</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Attribution */}
        <div className="pt-8 border-t border-hairline-soft flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>© {new Date().getFullYear()} Nuvola Marketplace Inc. All artisan works property of respective ateliers.</p>
          <div className="flex items-center gap-4">
            <span className="text-sage font-medium">Demonstration Platform (Phase 1)</span>
            <span>·</span>
            <span>WCAG 2.1 AA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
