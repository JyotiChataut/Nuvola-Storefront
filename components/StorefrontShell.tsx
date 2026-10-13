import React from 'react';
import { getAnnouncement, getCategories } from '@/lib/data';
import { AnnouncementBar } from './AnnouncementBar';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';

export async function StorefrontShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [announcement, categories] = await Promise.all([
    getAnnouncement(),
    getCategories(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar
        text={announcement.text}
        linkText={announcement.linkText}
        linkHref={announcement.linkHref}
      />
      <Header categories={categories} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer categories={categories} />
      <CartDrawer />
    </div>
  );
}
