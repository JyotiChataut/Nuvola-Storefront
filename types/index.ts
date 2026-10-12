export interface Product {
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
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  itemCount: number;
  image: string;
  description: string;
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
