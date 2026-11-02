# Nuvola Storefront

A modern e-commerce storefront built with Next.js App Router and Tailwind CSS. Designed to run standalone with local demo data or connect seamlessly to the Nuvola backend API.

---

## Overview & Key Features

- **Product Discovery & Browsing**: Category rails, collection filtering, sorting (price, new arrivals, rating), and paginated search.
- **Product Details**: Multi-angle image gallery with fallback handling, specs overview, seller trust metrics, and responsive sticky purchase bar.
- **Cart & Wishlist State**: Client-side persisted cart drawer/page and wishlist using React Context and `localStorage`.
- **Checkout Flow**: Multi-step checkout UI with server-side validation and API forwarding.
- **Hybrid Data Layer**: Operates out-of-the-box using bundled demo fixtures or dynamically fetches catalog and places orders via the Nuvola public API when configured.

---

## Development Stack

- **Framework**: Next.js 14 (App Router, Server & Client Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Icons & Animation**: Lucide React, Framer Motion
- **Runtime**: Node.js (v18+ recommended; CI tested on v22)

---

## Architecture

```
Browser (React Client Components & Context)
   │
   ▼
Next.js App Router (Server Components & API Routes)
   │
   ├── [No API Configured] ──► Local Demo Repository (In-memory mock catalog)
   │
   └── [API Configured] ────► ApiCatalogRepository / Checkout Route Bridge
                                 │
                                 ▼
                          Nuvola Backend API (Public HTTP endpoints)
```

- **Storefront**: Next.js 14 App Router rendering pages dynamically with responsive UI components.
- **State Management**: React Context (`StorefrontContext`) managing cart, wishlist, and client-side notifications.
- **Backend Bridge**: `/api/checkout` acts as a server-side proxy to the Nuvola backend, keeping internal API URLs and payloads encapsulated.
- **CMS / Database**: Catalog data is abstracted via the `CatalogRepository` interface. When connected to the Nuvola API, backend CMS content and database records are consumed over REST; otherwise, static fixtures under `lib/` are served.

---

## Project Structure

```
├── app/                  # Next.js App Router pages and API routes
│   ├── api/checkout/     # Server-side checkout bridge route
│   ├── cart/             # Shopping cart page
│   ├── categories/[slug] # Dynamic category listing and filtering
│   ├── checkout/         # Multi-step checkout view
│   ├── products/[slug]   # Product detail page with gallery and specs
│   ├── search/           # Search and pagination results page
│   └── wishlist/         # Saved items page
├── components/           # Reusable UI components (Hero, Grid, CartDrawer, etc.)
├── context/              # React Context providers (cart, wishlist)
├── lib/
│   ├── catalog/          # Repository pattern implementations (API vs. Local demo)
│   ├── data.ts           # Unified data access layer & fallback fixtures
│   ├── format.ts         # Currency and date formatting utilities
│   └── pagination.ts     # Pagination logic
├── public/               # Static assets, category thumbnails, and product images
└── types/                # Core TypeScript definitions (Product, Cart, Order, etc.)
```

---

## Getting Started

### Prerequisites

- Node.js 18.x or higher (Node 20+ recommended)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:JyotiChataut/Nuvola-Market.git
   cd Nuvola-Storefront
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables (optional):
   ```bash
   cp .env.example .env.local
   ```
   > **Note**: If `NUVOLA_API_URL` is omitted, the storefront automatically runs in offline demo mode using local fixture data.

### Development & Production Commands

| Command             | Description                                                        |
| :------------------ | :----------------------------------------------------------------- |
| `npm run dev`       | Starts local Next.js development server at `http://localhost:3000` |
| `npm run build`     | Compiles production build                                          |
| `npm run start`     | Runs the production build                                          |
| `npm run typecheck` | Validates TypeScript types without emitting files                  |
| `npm run verify`    | Runs `typecheck` followed by `build` (matches CI pipeline)         |

---

## Environment Variables

Defined in [.env.example]:

| Variable            | Description                                                            | Default / Example       |
| :------------------ | :--------------------------------------------------------------------- | :---------------------- |
| `NUVOLA_API_URL`    | Base URL of the Nuvola backend API. Leave empty for offline demo mode. | `http://localhost:4000` |
| `NUVOLA_STORE_SLUG` | Target store slug for catalog and orders.                              | `nuvola-market`         |

---

## Key Engineering & Security Considerations

- **Server-Side API Proxying**: Checkout orders are posted through `/api/checkout` to avoid exposing internal endpoints or API topology to client browsers.
- **Graceful Fallbacks**: The repository pattern (`CatalogRepository`) guarantees full UI browseability even when backend services are unreachable or unconfigured.
- **Zero Committed Secrets**: All environment configs are restricted to `.env.local` (ignored by git), with only placeholder templates committed in `.env.example`.
- **Image Error Boundaries**: Custom image wrappers handle external and local assets with fallback SVG placeholders to avoid broken UI states.

---

## License

Copyright (c) 2026 Jyoti Chataut. All Rights Reserved.

This project is proprietary software made available for portfolio and educational review. Unauthorized copying, modification, distribution, or commercial reuse is strictly prohibited without prior written permission. Third-party dependencies and assets remain governed by their respective licenses. See [LICENSE] for full terms.
