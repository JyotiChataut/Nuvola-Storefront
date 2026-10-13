import type {
  Announcement,
  CatalogRepository,
  Category,
  ImageAsset,
  Product,
} from "@/types";

export interface DemoProduct {
  id: string;
  title: string;
  slug: string;
  seller: {
    name: string;
    location: string;
    rating: number;
    tenure: string;
    verified: boolean;
  };
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  stockCount: number;
  isNew?: boolean;
  craftTag?: string;
  image: string;
  imageAlt: string;
  gallery: string[];
}

export interface DemoCategory {
  id: string;
  name: string;
  slug: string;
  itemCount: number;
  image: string;
  description: string;
}

export interface DemoDataset {
  announcement: Announcement;
  categories: DemoCategory[];
  products: DemoProduct[];
}

const DEFAULT_CURRENCY = "USD";

function buildDemoDescription(
  raw: DemoProduct,
  category: DemoCategory | undefined,
): string {
  const categoryName = category?.name ?? raw.category;
  const parts = [
    `${raw.title} is a demonstration listing in the ${categoryName} category.`,
    `Placeholder record attributed to ${raw.seller.name} (${raw.seller.location}).`,
  ];
  if (raw.craftTag) {
    parts.push(`Finished with ${raw.craftTag}.`);
  }
  parts.push(
    "This is placeholder product copy used to exercise the storefront UI — it is not a real product, merchant, or availability claim.",
  );
  return parts.join(" ");
}

function toImageAsset(src: string, alt: string): ImageAsset {
  return { src, alt };
}

function toGallery(raw: DemoProduct): ImageAsset[] {
  return raw.gallery.map((src, index) =>
    toImageAsset(
      src,
      index === 0
        ? raw.imageAlt
        : `${raw.title} — demonstration photograph ${index + 1}`,
    ),
  );
}

function toProduct(raw: DemoProduct, category?: DemoCategory): Product {
  const gallery = toGallery(raw);
  const image = gallery[0] ?? toImageAsset(raw.image, raw.imageAlt);

  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    description: buildDemoDescription(raw, category),
    categoryId: category?.id ?? `cat-${raw.categorySlug}`,
    categorySlug: raw.categorySlug,
    categoryName: category?.name ?? raw.category,
    seller: { ...raw.seller },
    price: raw.price,
    originalPrice: raw.originalPrice,
    currency: DEFAULT_CURRENCY,
    rating: raw.rating,
    reviewCount: raw.reviewCount,
    stockCount: raw.stockCount,
    isNew: raw.isNew,
    craftTag: raw.craftTag,
    image,
    gallery: gallery.length > 0 ? gallery : [image],
  };
}

function toCategory(raw: DemoCategory): Category {
  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    description: raw.description,
    itemCount: raw.itemCount,
    image: toImageAsset(
      raw.image,
      `${raw.name} demonstration category imagery`,
    ),
  };
}

export class LocalDemoCatalogRepository implements CatalogRepository {
  private readonly announcement: Announcement;
  private readonly categories: Category[];
  private readonly products: Product[];

  constructor(dataset: DemoDataset) {
    this.announcement = dataset.announcement;
    this.categories = dataset.categories.map(toCategory);

    const rawBySlug = new Map(
      dataset.categories.map((category) => [category.slug, category]),
    );

    this.products = dataset.products.map((raw) =>
      toProduct(raw, rawBySlug.get(raw.categorySlug)),
    );
  }

  async getAnnouncement(): Promise<Announcement> {
    return this.announcement;
  }

  async getCategories(): Promise<Category[]> {
    return [...this.categories];
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return this.categories.find((category) => category.slug === slug);
  }

  async getAllProducts(): Promise<Product[]> {
    return [...this.products];
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.find((product) => product.id === id);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return this.products.find((product) => product.slug === slug);
  }

  async getProductsByCategory(categorySlug: string): Promise<Product[]> {
    return this.products.filter(
      (product) => product.categorySlug === categorySlug,
    );
  }

  async getFeaturedProducts(limit = 4): Promise<Product[]> {
    return this.products.slice(0, limit);
  }

  async getTrendingProducts(): Promise<Product[]> {
    return this.products.filter(
      (product) => product.isNew || product.rating >= 4.5,
    );
  }
}
