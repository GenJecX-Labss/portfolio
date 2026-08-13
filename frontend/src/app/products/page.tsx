import { ProductsExperience } from '@/components/marketing/MarketingSections';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Products', description: 'Explore Genjecx intelligent systems, intelligence infrastructure, custom models and AI R&D capabilities.', alternates: { canonical: '/products' } };
export default function ProductsPage() { return <ProductsExperience />; }
