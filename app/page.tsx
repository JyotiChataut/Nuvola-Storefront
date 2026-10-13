import { getCategories, getTrendingProducts } from '@/lib/data';
import { StorefrontShell } from '@/components/StorefrontShell';
import { Hero } from '@/components/Hero';
import { FeaturedCategories } from '@/components/FeaturedCategories';
import { TrendingProducts } from '@/components/TrendingProducts';
import { EditorialSection } from '@/components/EditorialSection';
import { NewsletterForm } from '@/components/NewsletterForm';

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getTrendingProducts(),
  ]);

  return (
    <StorefrontShell>
      <Hero />
      <FeaturedCategories categories={categories} />
      <TrendingProducts products={products} />
      <EditorialSection />
      <NewsletterForm />
    </StorefrontShell>
  );
}
