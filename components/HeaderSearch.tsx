'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

interface HeaderSearchProps {
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  iconSize?: number;
  onNavigate?: () => void;
}

export function HeaderSearch({
  placeholder = 'Search the catalog...',
  className = '',
  inputClassName = '',
  iconSize = 18,
  onNavigate,
}: HeaderSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setValue(params.get('q') ?? '');
  }, [pathname]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = value.trim();
    onNavigate?.();
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : '/search');
  };

  return (
    <form
      role="search"
      action="/search"
      method="get"
      onSubmit={handleSubmit}
      className={`relative w-full ${className}`}
    >
      <input
        type="search"
        name="q"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        aria-label="Search the catalog"
        autoComplete="off"
        className={`${inputClassName} [&::-webkit-search-cancel-button]:hidden`}
      />
      <Search
        size={iconSize}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
        aria-hidden="true"
      />
    </form>
  );
}
