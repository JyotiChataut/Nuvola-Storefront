import { Product, Category, Announcement } from "@/types";

export const ANNOUNCEMENT_DATA: Announcement = {
  id: "ann-1",
  text: "Direct from independent workshops · Carbon-neutral delivery on all artisan orders over $75",
  linkText: "Learn about our standards",
  linkHref: "#editorial",
};

export const CATEGORIES_DATA: Category[] = [
  {
    id: "cat-ceramics",
    name: "Ceramics & Stoneware",
    slug: "ceramics",
    itemCount: 42,
    image: "/images/categories/ceramics.jpg",
    description: "Wheel-thrown vessels and glazed tabletop pieces",
  },
  {
    id: "cat-textiles",
    name: "Loomed Textiles",
    slug: "textiles",
    itemCount: 28,
    image: "/images/categories/textiles.jpg",
    description: "Natural linen, wool throws, and organic table linens",
  },
  {
    id: "cat-woodwork",
    name: "Carved Woodwork",
    slug: "woodwork",
    itemCount: 35,
    image: "/images/categories/woodwork.jpg",
    description: "Solid walnut boards, spoons, and turned kitchenware",
  },
  {
    id: "cat-glassware",
    name: "Handblown Glass",
    slug: "glassware",
    itemCount: 19,
    image: "/images/categories/glassware.jpg",
    description: "Amber tint drinkware and sculptural decorative decanters",
  },
  {
    id: "cat-fashion",
    name: "Fashion",
    slug: "fashion",
    itemCount: 15,
    image: "/images/categories/fashion.jpg",
    description: "Curated apparel from ethical studios",
  },
  {
    id: "cat-jewellery",
    name: "Jewellery",
    slug: "jewellery",
    itemCount: 22,
    image: "/images/categories/jewellery.jpg",
    description: "Handcrafted fine jewellery pieces",
  },
  {
    id: "cat-perfumes",
    name: "Perfumes",
    slug: "perfumes",
    itemCount: 12,
    image: "/images/categories/perfumes.jpg",
    description: "Artisan-blended fragrances",
  },
  {
    id: "cat-wallets",
    name: "Wallets",
    slug: "wallets",
    itemCount: 8,
    image: "/images/categories/wallets.jpg",
    description: "Minimalist leather wallets",
  },
  {
    id: "cat-party-wear-shoes",
    name: "Party Wear Shoes",
    slug: "party-wear-shoes",
    itemCount: 10,
    image: "/images/categories/party-shoes.jpg",
    description: "Elegant footwear for special occasions",
  },
  {
    id: "cat-watches",
    name: "Watches",
    slug: "watches",
    itemCount: 5,
    image: "/images/categories/watches.jpg",
    description: "Precision crafted timepieces",
  },
  {
    id: "cat-iphones",
    name: "iPhones",
    slug: "iphones",
    itemCount: 3,
    image: "/images/categories/iphones.jpg",
    description: "Refurbished premium iPhones",
  },
  {
    id: "cat-purses",
    name: "Purses",
    slug: "purses",
    itemCount: 14,
    image: "/images/categories/purses.jpg",
    description: "Artisan crafted purses",
  },
  {
    id: "cat-handbags",
    name: "Handbags",
    slug: "handbags",
    itemCount: 18,
    image: "/images/categories/handbags.jpg",
    description: "Statement handbags",
  },
  {
    id: "cat-sneakers",
    name: "Sneakers",
    slug: "sneakers",
    itemCount: 25,
    image: "/images/categories/sneakers.jpg",
    description: "Ethical artisan sneakers",
  },
];

export const ALL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    title: "Ash-Glazed Ribbed Stoneware Vase",
    slug: "ash-glazed-ribbed-stoneware-vase",
    seller: {
      name: "Kanso Pottery Studio",
      location: "Kyoto, JP",
      rating: 4.9,
      tenure: "Member since 2022",
      verified: true,
    },
    category: "Ceramics",
    categorySlug: "ceramics",
    price: 88,
    originalPrice: 110,
    rating: 4.9,
    reviewCount: 38,
    stockCount: 4,
    craftTag: "Wheel Thrown",
    image: "/images/products/stoneware-vase.jpg",
    imageAlt: "Ribbed stoneware vase",
    gallery: [
      "/images/products/stoneware-vase.jpg",
      "/images/products/stoneware-vase-2.jpg",
      "/images/products/stoneware-vase-3.jpg",
      "/images/products/stoneware-vase-4.jpg",
      "/images/products/stoneware-vase-5.jpg",
    ],
  },
  {
    id: "prod-2",
    title: "Washed European Flax Linen Throw",
    slug: "washed-european-flax-linen-throw",
    seller: {
      name: "Atelier Vester",
      location: "Copenhagen, DK",
      rating: 4.8,
      tenure: "Member since 2023",
      verified: true,
    },
    category: "Textiles",
    categorySlug: "textiles",
    price: 145,
    rating: 4.8,
    reviewCount: 64,
    stockCount: 9,
    isNew: true,
    craftTag: "Organic Flax",
    image: "/images/products/linen-throw.jpg",
    imageAlt: "Linen blanket",
    gallery: [
      "/images/products/linen-throw.jpg",
      "/images/products/linen-throw-2.jpg",
      "/images/products/linen-throw-3.jpg",
      "/images/products/linen-throw-4.jpg",
      "/images/products/linen-throw-5.jpg",
    ],
  },
];

export async function getAnnouncement(): Promise<Announcement> {
  return ANNOUNCEMENT_DATA;
}
export async function getCategories(): Promise<Category[]> {
  return CATEGORIES_DATA;
}
export async function getTrendingProducts(): Promise<Product[]> {
  return ALL_PRODUCTS.filter((p) => p.isNew || p.rating > 4.5);
}
export async function getAllProducts(): Promise<Product[]> {
  return ALL_PRODUCTS;
}
export async function getProductById(id: string): Promise<Product | undefined> {
  return ALL_PRODUCTS.find((p) => p.id === id);
}
export async function getProductsByCategory(
  categorySlug: string,
): Promise<Product[]> {
  return ALL_PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}
export async function getCategoryBySlug(
  slug: string,
): Promise<Category | undefined> {
  return CATEGORIES_DATA.find((c) => c.slug === slug);
}
export async function getFeaturedProducts(): Promise<Product[]> {
  return ALL_PRODUCTS.slice(0, 4);
}
