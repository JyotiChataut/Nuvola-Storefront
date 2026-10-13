'use client';

import React, { useState } from 'react';
import { ImageAsset } from '@/types';
import { SafeImage } from './SafeImage';

interface ProductGalleryProps {
  images: ImageAsset[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-canvas-soft border border-hairline">
        <SafeImage src="" alt="" className="object-cover" fallbackLabel={title} />
      </div>
    );
  }

  const safeIndex = Math.min(activeIndex, images.length - 1);
  const active = images[safeIndex];

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-canvas-soft border border-hairline">
        <SafeImage
          key={active.src}
          src={active.src}
          alt={active.alt}
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-cover"
          priority
          fallbackLabel={title}
        />
      </div>

      {images.length > 1 && (
        <ul role="list" className="grid grid-cols-5 gap-2 sm:gap-3">
          {images.map((image, index) => {
            const isActive = index === safeIndex;
            return (
              <li key={image.src}>
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View image ${index + 1} of ${images.length}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative block aspect-square w-full overflow-hidden rounded-sm border bg-canvas-soft transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest ${
                    isActive
                      ? 'border-forest'
                      : 'border-hairline hover:border-sage'
                  }`}
                >
                  <SafeImage
                    src={image.src}
                    alt=""
                    sizes="(max-width: 1024px) 20vw, 12vw"
                    className="object-cover"
                    fallbackLabel={title}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
