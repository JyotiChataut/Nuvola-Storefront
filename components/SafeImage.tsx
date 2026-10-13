'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface SafeImageProps {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
  fallbackLabel?: string;
}

export function SafeImage({
  src,
  alt,
  sizes,
  className,
  priority,
  fallbackLabel,
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    const isDecorative = alt.trim() === '';
    const monogram = (fallbackLabel?.trim() || alt.trim() || 'N')
      .charAt(0)
      .toUpperCase();

    return (
      <span
        role={isDecorative ? undefined : 'img'}
        aria-hidden={isDecorative || undefined}
        aria-label={isDecorative ? undefined : alt}
        className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-canvas-strong text-ink-muted"
      >
        <span
          aria-hidden="true"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-canvas text-title-md font-bold text-ink tabular-nums"
        >
          {monogram}
        </span>
        <span className="text-badge font-semibold uppercase tracking-wider">
          Image unavailable
        </span>
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      priority={priority}
      onError={() => setFailed(true)}
    />
  );
}
