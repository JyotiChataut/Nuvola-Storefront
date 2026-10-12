import { Product, Category, Announcement } from "@/types";

// WARNING: Demonstration fixtures. Not connected to live inventory.
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
];

export const TRENDING_PRODUCTS: Product[] = [
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
    imageAlt:
      "Textured ivory and beige ribbed ceramic stoneware vase on warm background",
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
    imageAlt:
      "Folded natural washed neutral linen blanket with subtle fringed border",
  },
  {
    id: "prod-3",
    title: "End-Grain Black Walnut Prep Board",
    slug: "end-grain-black-walnut-prep-board",
    seller: {
      name: "Timber & Grain Guild",
      location: "Oregon, US",
      rating: 5.0,
      tenure: "Member since 2021",
      verified: true,
    },
    category: "Woodwork",
    categorySlug: "woodwork",
    price: 120,
    rating: 5.0,
    reviewCount: 92,
    stockCount: 3,
    craftTag: "FSC Certified",
    image: "/images/products/walnut-board.jpg",
    imageAlt: "Rich dark walnut chopping and serving board with chamfered edge",
  },
  {
    id: "prod-4",
    title: "Fluted Amber Glass Sipping Tumblers (Set of 2)",
    slug: "fluted-amber-glass-tumblers",
    seller: {
      name: "Luce Glassworks",
      location: "Murano, IT",
      rating: 4.7,
      tenure: "Member since 2023",
      verified: true,
    },
    category: "Glassware",
    categorySlug: "glassware",
    price: 64,
    originalPrice: 75,
    rating: 4.7,
    reviewCount: 26,
    stockCount: 5,
    craftTag: "Mouth Blown",
    image: "/images/products/amber-tumblers.jpg",
    imageAlt:
      "Warm translucent amber tinted fluted glass cup on reflective surface",
  },
];

export async function getAnnouncement(): Promise<Announcement> {
  return ANNOUNCEMENT_DATA;
}

export async function getCategories(): Promise<Category[]> {
  return CATEGORIES_DATA;
}

export async function getTrendingProducts(): Promise<Product[]> {
  return TRENDING_PRODUCTS;
}
