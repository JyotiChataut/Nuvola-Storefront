import type {
  Announcement,
  CatalogRepository,
  Category,
  ImageAsset,
  Product,
  ProductPage,
  ProductQuery,
} from "@/types";
import {
  compareBySort,
  DEFAULT_SORT,
  scoreProduct,
} from "@/lib/catalog/repository";

const PLACEHOLDER_IMAGE = "/images/product-placeholder.svg";
const REQUEST_TIMEOUT_MS = 5000;
const NEW_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;

interface ApiImage {
  src: string;
  alt: string;
}

interface ApiVariant {
  id: string;
  title: string;
  sku: string;
  priceCents: number;
  compareAtCents: number | null;
  onHand: number;
}

interface ApiPresentation {
  seller?: {
    name: string;
    location: string;
    rating: number;
    tenure: string;
    verified: boolean;
  };
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  craftTag?: string;
}

interface ApiProduct {
  id: string;
  slug: string;
  title: string;
  description: string;
  categoryId: string | null;
  categorySlug: string | null;
  categoryName: string | null;
  presentation: ApiPresentation;
  media: ApiImage[];
  variants: ApiVariant[];
  priceCents: number;
  compareAtCents: number | null;
  createdAt: string;
}

interface ApiCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  itemCount: number;
  image: ApiImage | null;
}

interface ApiCatalog {
  store: {
    name: string;
    slug: string;
    currency: string;
    timezone: string;
  };
  categories: ApiCategory[];
  products: ApiProduct[];
  generatedAt: string;
}

export interface ApiCatalogRepositoryOptions {
  baseUrl: string;
  storeSlug: string;
  announcement: Announcement;
}

function toImage(image: ApiImage | null, fallbackAlt: string): ImageAsset {
  if (!image || image.src.trim() === "") {
    return { src: PLACEHOLDER_IMAGE, alt: fallbackAlt };
  }
  return { src: image.src, alt: image.alt.trim() || fallbackAlt };
}

function toProduct(
  raw: ApiProduct,
  currency: string,
  storeName: string,
): Product {
  const variants = [...raw.variants].sort(
    (a, b) => a.priceCents - b.priceCents,
  );
  const selected =
    variants.find((variant) => variant.onHand > 0) ?? variants[0];
  const priceCents = selected?.priceCents ?? raw.priceCents;
  const compareAtCents = selected?.compareAtCents ?? raw.compareAtCents;
  const originalPrice =
    compareAtCents !== null && compareAtCents > priceCents
      ? compareAtCents / 100
      : undefined;

  const gallery =
    raw.media.length > 0
      ? raw.media.map((image, index) =>
          toImage(
            image,
            index === 0
              ? `${raw.title} product photograph`
              : `${raw.title} product photograph ${index + 1}`,
          ),
        )
      : [toImage(null, `${raw.title} image unavailable`)];

  const presentation = raw.presentation ?? {};
  const createdAt = Date.parse(raw.createdAt);
  const isNew =
    presentation.isNew ??
    (Number.isFinite(createdAt) && Date.now() - createdAt < NEW_WINDOW_MS);

  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    description: raw.description,
    categoryId: raw.categoryId ?? "cat-uncategorized",
    categorySlug: raw.categorySlug ?? "uncategorized",
    categoryName: raw.categoryName ?? "Uncategorized",
    seller: presentation.seller ?? {
      name: storeName,
      location: "Direct from the maker",
      rating: 0,
      tenure: "Nuvola merchant",
      verified: true,
    },
    price: priceCents / 100,
    originalPrice,
    currency,
    rating: presentation.rating ?? 0,
    reviewCount: presentation.reviewCount ?? 0,
    stockCount: raw.variants.reduce(
      (total, variant) => total + Math.max(0, variant.onHand),
      0,
    ),
    isNew,
    craftTag: presentation.craftTag,
    variantId: selected?.id,
    image: gallery[0],
    gallery,
  };
}

/**
 * Catalog backed by the Nuvola API (`GET /v1/public/catalog/:storeSlug`).
 *
 * The storefront has no variant picker yet, so each product maps to its
 * cheapest in-stock variant. Checkout sends that `variantId`; the API owns
 * prices and stock. Reads are uncached so stock and prices stay close to live.
 */
export class ApiCatalogRepository implements CatalogRepository {
  private readonly announcement: Announcement;
  private readonly baseUrl: string;
  private readonly storeSlug: string;

  constructor(options: ApiCatalogRepositoryOptions) {
    this.announcement = options.announcement;
    this.baseUrl = options.baseUrl.replace(/\/+$/, "");
    this.storeSlug = options.storeSlug;
  }

  private async load(): Promise<{
    categories: Category[];
    products: Product[];
  }> {
    const response = await fetch(
      `${this.baseUrl}/v1/public/catalog/${encodeURIComponent(this.storeSlug)}`,
      {
        cache: "no-store",
        headers: { accept: "application/json" },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      },
    );

    if (!response.ok) {
      throw new Error(`Catalog request failed with ${response.status}.`);
    }

    const body = (await response.json()) as ApiCatalog;
    const currency = body.store.currency;
    const storeName = body.store.name;

    return {
      categories: body.categories.map((category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        itemCount: category.itemCount,
        image: toImage(category.image, `${category.name} category image`),
      })),
      products: body.products.map((product) =>
        toProduct(product, currency, storeName),
      ),
    };
  }

  async getAnnouncement(): Promise<Announcement> {
    return this.announcement;
  }

  async getCategories(): Promise<Category[]> {
    const { categories } = await this.load();
    return categories;
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const { categories } = await this.load();
    return categories.find((category) => category.slug === slug);
  }

  async getAllProducts(): Promise<Product[]> {
    const { products } = await this.load();
    return products;
  }

  async getProductById(id: string): Promise<Product | undefined> {
    const { products } = await this.load();
    return products.find((product) => product.id === id);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const { products } = await this.load();
    return products.find((product) => product.slug === slug);
  }

  async getProductsByCategory(categorySlug: string): Promise<Product[]> {
    const { products } = await this.load();
    return products.filter((product) => product.categorySlug === categorySlug);
  }

  async getFeaturedProducts(limit = 4): Promise<Product[]> {
    const { products } = await this.load();
    return products.slice(0, limit);
  }

  async getTrendingProducts(): Promise<Product[]> {
    const { products } = await this.load();
    return products.filter((product) => product.isNew || product.rating >= 4.5);
  }

  async searchProducts(query: ProductQuery = {}): Promise<ProductPage> {
    const { products } = await this.load();
    const term = (query.q ?? "").trim().toLowerCase();
    const sort = query.sort ?? DEFAULT_SORT;
    const minPrice =
      typeof query.minPrice === "number" ? query.minPrice : undefined;
    const maxPrice =
      typeof query.maxPrice === "number" ? query.maxPrice : undefined;

    const matched = products.filter((product) => {
      if (query.categorySlug && product.categorySlug !== query.categorySlug) {
        return false;
      }
      if (minPrice !== undefined && product.price < minPrice) return false;
      if (maxPrice !== undefined && product.price > maxPrice) return false;
      if (term && scoreProduct(product, term) === 0) return false;
      return true;
    });

    const ordered =
      term || sort !== "relevance"
        ? [...matched].sort((a, b) => compareBySort(a, b, sort, term))
        : matched;

    const total = ordered.length;
    const pageSize =
      query.pageSize && query.pageSize > 0 ? Math.floor(query.pageSize) : total;
    const totalPages =
      pageSize > 0 ? Math.max(1, Math.ceil(total / pageSize)) : 1;
    const requestedPage = Math.floor(query.page ?? 1);
    const page = Math.min(Math.max(1, requestedPage || 1), totalPages);
    const start = (page - 1) * pageSize;

    return {
      items: ordered.slice(start, start + pageSize),
      total,
      page,
      pageSize,
      totalPages,
    };
  }
}
