import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/data';
import { StorefrontShell } from '@/components/StorefrontShell';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ProductGallery } from '@/components/ProductGallery';
import { ProductPurchasePanel } from '@/components/ProductPurchasePanel';
import { MerchantTrustCard } from '@/components/MerchantTrustCard';
import { ProductSpecs } from '@/components/ProductSpecs';
import { StickyBuyBar } from '@/components/StickyBuyBar';

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Product not found | Nuvola',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: `${product.title} | Nuvola`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <StorefrontShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-28 lg:pb-12">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: product.categoryName, href: `/categories/${product.categorySlug}` },
            { label: product.title },
          ]}
        />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7">
            <ProductGallery images={product.gallery} title={product.title} />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <ProductPurchasePanel product={product} />
            <MerchantTrustCard product={product} />
            <ProductSpecs product={product} />
          </div>
        </div>
      </div>

      <StickyBuyBar product={product} />
    </StorefrontShell>
  );
}
