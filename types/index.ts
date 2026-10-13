export interface ImageAsset {
  src: string;
  alt: string;
}

export interface Seller {
  name: string;
  location: string;
  rating: number;
  tenure: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;

  categoryId: string;
  categorySlug: string;
  categoryName: string;

  seller: Seller;

  price: number;
  originalPrice?: number;
  currency: string;

  rating: number;
  reviewCount: number;
  stockCount: number;
  isNew?: boolean;
  craftTag?: string;

  image: ImageAsset;
  gallery: ImageAsset[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  itemCount: number;
  image: ImageAsset;
}

export interface Announcement {
  id: string;
  text: string;
  linkText?: string;
  linkHref?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ProductSort = "relevance" | "price-asc" | "price-desc" | "rating";

export interface ProductQuery {
  q?: string;
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: ProductSort;
  page?: number;
  pageSize?: number;
}

export interface ProductPage {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CatalogRepository {
  getAnnouncement(): Promise<Announcement>;
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  getAllProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductsByCategory(categorySlug: string): Promise<Product[]>;
  getFeaturedProducts(limit?: number): Promise<Product[]>;
  getTrendingProducts(): Promise<Product[]>;
  searchProducts(query?: ProductQuery): Promise<ProductPage>;
}
