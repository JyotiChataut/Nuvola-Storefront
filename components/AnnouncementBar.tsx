import React from 'react';
import Link from 'next/link';

interface AnnouncementBarProps {
  text: string;
  linkText?: string;
  linkHref?: string;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  text,
  linkText,
  linkHref,
}) => {
  return (
    <aside
      aria-label="Announcement"
      className="bg-canvas-strong border-b border-hairline px-4 py-2 text-center text-xs text-ink-body font-medium transition-colors"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
        <span>{text}</span>
        {linkText && linkHref && (
          <Link
            href={linkHref}
            className="underline underline-offset-4 text-forest hover:text-forest-hover font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded-sm"
          >
            {linkText}
          </Link>
        )}
      </div>
    </aside>
  );
};
