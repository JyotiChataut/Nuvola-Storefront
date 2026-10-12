import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Sparkles, Scale, RefreshCw } from 'lucide-react';

export const EditorialSection: React.FC = () => {
  const pillars = [
    {
      icon: <ShieldCheck size={20} className="text-forest" />,
      title: 'Vetted Guild Members',
      desc: 'Every workshop is visited or verified for ethical craftsmanship and material safety.',
    },
    {
      icon: <Scale size={20} className="text-forest" />,
      title: 'Fair Margin Guarantee',
      desc: 'Makers keep 82% of retail price, far exceeding traditional gallery and department markups.',
      metric: '82%',
    },
    {
      icon: <RefreshCw size={20} className="text-forest" />,
      title: 'Repair & Replace Support',
      desc: 'Direct communication with creators for custom inquiries, care guides, and lifetime repairs.',
    },
    {
      icon: <Sparkles size={20} className="text-forest" />,
      title: 'No Fabricated Scarcity',
      desc: 'Truthful inventory counts, authentic batch timelines, and transparent materials.',
    },
  ];

  return (
    <section id="editorial" aria-labelledby="editorial-heading" className="py-16 md:py-24 bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full rounded-md overflow-hidden bg-canvas-soft border border-hairline shadow-raised">
              <Image
                src="/images/editorial/craft-studio.jpg"
                alt="Craftsperson shaping raw stoneware clay in quiet natural workshop"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-ink/15" />
              <div className="absolute bottom-4 left-4 right-4 bg-canvas/90 backdrop-blur-sm p-4 rounded-sm border border-hairline text-caption">
                <span className="font-bold text-ink block text-title-sm">Studio Spotlight</span>
                <span className="text-ink-muted">In conversation with Master Ceramist Kenji Takahashi</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <span className="text-badge font-semibold tracking-wider uppercase text-forest">Our Operating Model</span>
            <h2 id="editorial-heading" className="text-xl sm:text-2xl lg:text-display-lg font-bold text-ink leading-tight">
              We reject algorithmic dropshipping in favor of enduring objects.
            </h2>
            <p className="text-body-sm sm:text-body-md text-ink-body leading-relaxed max-w-xl">
              Traditional e-commerce algorithms reward disposable trends, predatory discounts, and hidden supply chains. Nuvola was founded to establish a calm, durable bridge between discerning buyers and independent master ateliers.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-3">
              {pillars.map((item, idx) => (
                <div key={idx} className="p-4 bg-canvas-soft rounded-sm border border-hairline-soft space-y-2">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <h3 className="font-semibold text-title-sm text-ink">{item.title}</h3>
                  </div>
                  <p className="text-caption text-ink-muted leading-relaxed">
                    {item.metric ? (
                      <>
                        Makers keep <span className="tabular-nums font-semibold text-ink">82%</span> of retail price, far exceeding traditional gallery and department markups.
                      </>
                    ) : (
                      item.desc
                    )}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="#trending"
                className="inline-flex items-center gap-2 text-title-sm font-semibold text-forest hover:text-forest-hover underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded-sm"
              >
                Read our complete Seller Code of Ethics &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
