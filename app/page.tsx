import { getAnnouncement, getCategories, getTrendingProducts } from '@/lib/data';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { FeaturedCategories } from '@/components/FeaturedCategories';
import { TrendingProducts } from '@/components/TrendingProducts';
import { EditorialSection } from '@/components/EditorialSection';
import { NewsletterForm } from '@/components/NewsletterForm';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';

export default async function HomePage() {
  const [announcement, categories, products] = await Promise.all([
    getAnnouncement(),
    getCategories(),
    getTrendingProducts(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar
        text={announcement.text}
        linkText={announcement.linkText}
        linkHref={announcement.linkHref}
      />
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <FeaturedCategories categories={categories} />
        <TrendingProducts products={products} />
        <EditorialSection />
        <NewsletterForm />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
