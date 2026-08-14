import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { AnalyticsProvider } from '@/components/providers/AnalyticsProvider';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://genjecxlabs.com'),
  title: {
    default: 'Genjecx | AI R&D Studio',
    template: '%s | Genjecx',
  },
  description: 'Genjecx designs intelligent systems and the infrastructure beneath them for companies building long-term intelligence.',
  applicationName: 'Genjecx',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'Genjecx',
    title: 'Genjecx | AI R&D Studio',
    description: 'Intelligent systems and infrastructure built to evolve, compound and remain owned.',
    url: '/',
  },
  twitter: {
    card: 'summary',
    title: 'Genjecx | AI R&D Studio',
    description: 'Intelligent systems and infrastructure built to evolve, compound and remain owned.',
  },
  icons: { icon: '/favicon.png' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#FAFAFA] text-[#0F172A]">
        <AnalyticsProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
