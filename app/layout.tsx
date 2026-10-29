import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { StorefrontProvider } from '@/context/storefront-context';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Nuvola | Curated Independent Marketplace',
  description: 'Authentic craft and intentional goods sourced directly from independent workshops.',
};

// Catalog, stock, and prices come from the API at request time.
export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-canvas text-ink font-sans selection:bg-sage-light selection:text-ink">
        <StorefrontProvider>
          {children}
        </StorefrontProvider>
      </body>
    </html>
  );
}
